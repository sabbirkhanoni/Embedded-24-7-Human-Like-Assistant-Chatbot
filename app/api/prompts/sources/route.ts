import { db } from "@/db/client";
import { prompts } from "@/db/schema";
import { summarizeContent } from "@/lib/AI";
import { AuthorizationGuard } from "@/lib/AuthorizationGuard";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Auth check
    const user = await AuthorizationGuard();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const contentType = request.headers.get("content-type");
    let type: string | null = null;
    let processedData: any = null;
    let rawContent: string = "";
    let body: any = null;
    let textTitle: string = "";
    let websiteUrl: string = "";

    //File
    if (contentType?.includes("multipart/form-data")) {
      const formData = await request.formData();
      type = formData.get("type") as string;

      if (type !== "file") {
        return NextResponse.json(
          { error: "Invalid type for multipart request" },
          { status: 400 }
        );
      }

      const file = formData.get("file") as File;
      if (!file) {
        return NextResponse.json(
          { error: "File is required" },
          { status: 400 }
        );
      }

      rawContent = await file.text();
      if (!rawContent.trim()) {
        return NextResponse.json(
          { error: "File is empty" },
          { status: 400 }
        );
      }

      // Process Content
      try {
        processedData = await summarizeContent(rawContent);
        console.log("File summarized successfully");
      } catch (aiError: any) {
        return NextResponse.json(
          { error: "Failed to process file content", details: aiError.message },
          { status: 400 }
        );
      }
    }
    else {
      body = await request.json();
      type = body.type;
      if (!type) {
        return NextResponse.json(
          { error: "Type is required. Must be 'website', 'text', or 'file'" },
          { status: 400 }
        );
      }

      //website
      if (type === "website") {
        if (!body.url) {
          return NextResponse.json(
            { error: "URL is required" },
            { status: 400 }
          );
        }
        
      
        websiteUrl = body.url;

        if (!process.env.ZENROWS_API_KEY) {
          return NextResponse.json(
            { error: "Server configuration error: ZENROWS_API_KEY is missing" },
            { status: 500 }
          );
        }

        try {
          // Validate and encode URL
          const urlToFetch = new URL(body.url);
          
          // Zenrows API request
          const zenrowsUrl = new URL("https://api.zenrows.com/v1/");
          zenrowsUrl.searchParams.set("url", urlToFetch.toString());
          zenrowsUrl.searchParams.set("apikey", process.env.ZENROWS_API_KEY!);
          zenrowsUrl.searchParams.set("js_render", "true"); // Enable JavaScript rendering

          const result = await fetch(zenrowsUrl.toString(), {
            method: "GET",
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            },
          });

          if (!result.ok) {
            const errorText = await result.text();
            return NextResponse.json(
              {
                error: `Failed to fetch website: ${result.statusText}`,
                details: errorText,
              },
              { status: 400 }
            );
          }

          rawContent = await result.text();

          if (!rawContent || rawContent.trim().length === 0) {
            return NextResponse.json(
              { error: "Empty website content received" },
              { status: 400 }
            );
          }


          // AI processing
          try {

            //content max 10000
            const contentToSummarize = rawContent.length > 10000 
              ? rawContent.substring(0, 10000) 
              : rawContent;
            
            console.log("📄 Content to summarize length:", contentToSummarize.length);
            
            processedData = await summarizeContent(contentToSummarize);
            console.log("Website summarized successfully");
          } catch (aiError: any) {
            return NextResponse.json(
              { 
                error: "Failed to process website content", 
                details: aiError.message || "AI summarization failed"
              },
              { status: 400 }
            );
          }
        } catch (fetchError: any) {
          console.error("Website fetch error:", fetchError);
          return NextResponse.json(
            { error: "Failed to fetch website", details: fetchError.message },
            { status: 400 }
          );
        }
      }
      //text
      else if (type === "text") {
        const { title, content } = body;

        if (!title || !content) {
          return NextResponse.json(
            { error: "Title and content are required" },
            { status: 400 }
          );
        }

        textTitle = title;
        rawContent = content;

        // AI processing
        try {
          processedData = await summarizeContent(content);
          console.log("Text summarized successfully");
        } catch (aiError: any) {
          return NextResponse.json(
            { error: "Failed to process text content", details: aiError.message },
            { status: 400 }
          );
        }
      }
      else {
        return NextResponse.json(
          { error: "Invalid type. Must be 'website', 'text', or 'file'" },
          { status: 400 }
        );
      }
    }
  
  

    //save to database
    try {
      console.log("Saving to database...");
      
      // Get user email from auth
      const userEmail = user.email || user.id;
      console.log("User email:", userEmail);

      const title = type === "text" 
        ? textTitle 
        : `${type} source - ${new Date().toLocaleDateString()}`;

      const sourceUrl = type === "website" 
        ? websiteUrl 
        : "";

      const insertData = {
        user_email: userEmail,
        type: type || "unknown",
        name: title,
        status: "active",
        source_url: sourceUrl,
        content: processedData,
        metadata: JSON.stringify({ 
          sourceType: type,
          importedAt: new Date().toISOString() 
        }),
      };

      const result = await db.insert(prompts).values(insertData);

      console.log("Saved to database successfully");
    } catch (dbError: any) {
      return NextResponse.json(
        { error: "Failed to save to database", details: dbError.message },
        { status: 500 }
      );
    }

    //End
    return NextResponse.json(
      {
        success: true,
        message: "Prompt source imported successfully",
        type,
        data: processedData,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
