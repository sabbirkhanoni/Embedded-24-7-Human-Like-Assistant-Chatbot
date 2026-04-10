import { db } from "@/db/client";
import { prompts } from "@/db/schema";
import { summarizeContent } from "@/lib/AI";
import { AuthorizationGuard } from "@/lib/AuthorizationGuard";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // 🔐 Auth check
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

    // =========================
    // 📂 HANDLE FILE UPLOAD
    // =========================
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

      const fileContent = await file.text();

      if (!fileContent.trim()) {
        return NextResponse.json(
          { error: "File is empty" },
          { status: 400 }
        );
      }

      // 🤖 AI processing
      try {
        processedData = await summarizeContent(fileContent);
      } catch (aiError: any) {
        console.error("AI Processing Error (File):", aiError);
        return NextResponse.json(
          { error: "Failed to process file content", details: aiError.message },
          { status: 400 }
        );
      }
    }

    // =========================
    // 📄 HANDLE JSON INPUT
    // =========================
    else {
      const body = await request.json();
      console.log("🔍 Request body:", JSON.stringify(body, null, 2));
      type = body.type;

      if (!type) {
        console.error("❌ Type is missing from request body");
        return NextResponse.json(
          { error: "Type is required. Must be 'website', 'text', or 'file'" },
          { status: 400 }
        );
      }

      // -------------------------
      // 🌐 WEBSITE MODE
      // -------------------------
      if (type === "website") {
        console.log("🌐 Processing website mode. URL:", body.url);
        if (!body.url) {
          console.error("❌ URL is missing from request body");
          return NextResponse.json(
            { error: "URL is required" },
            { status: 400 }
          );
        }

        if (!process.env.ZENROWS_API_KEY) {
          console.error("ZENROWS_API_KEY is missing");
          return NextResponse.json(
            { error: "Server configuration error: ZENROWS_API_KEY is missing" },
            { status: 500 }
          );
        }

        try {
          const urlZ = new URL("https://api.zenrows.com/v1/");
          urlZ.searchParams.set("apikey", process.env.ZENROWS_API_KEY!);
          urlZ.searchParams.set("url", body.url);
          urlZ.searchParams.set("response_type", "markdown");

          const result = await fetch(urlZ.toString(), {
            headers: {
              "User-Agent": "PAI-ChatBot/1.0",
            },
            timeout: 30000, // 30 second timeout
          });

          if (!result.ok) {
            console.error(`Zenrows API Error: ${result.status} - ${result.statusText}`);
            return NextResponse.json(
              { error: `Failed to fetch website: ${result.statusText}` },
              { status: 400 }
            );
          }

          const htmlContent = await result.text();

          if (!htmlContent) {
            return NextResponse.json(
              { error: "Empty website content received" },
              { status: 400 }
            );
          }

          // 🤖 AI processing
          try {
            processedData = await summarizeContent(htmlContent);
          } catch (aiError: any) {
            console.error("AI Processing Error (Website):", aiError);
            return NextResponse.json(
              { error: "Failed to process website content", details: aiError.message },
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

      // -------------------------
      // 📝 TEXT MODE
      // -------------------------
      else if (type === "text") {
        const { title, content } = body;

        if (!title || !content) {
          return NextResponse.json(
            { error: "Title and content are required" },
            { status: 400 }
          );
        }

        // 🤖 AI processing
        try {
          processedData = await summarizeContent(content);
        } catch (aiError: any) {
          console.error("AI Processing Error (Text):", aiError);
          return NextResponse.json(
            { error: "Failed to process text content", details: aiError.message },
            { status: 400 }
          );
        }
      }

      // -------------------------
      // ❌ INVALID TYPE
      // -------------------------
      else {
        return NextResponse.json(
          { error: "Invalid type. Must be 'website', 'text', or 'file'" },
          { status: 400 }
        );
      }
    }

    await db.insert(prompts).values({
      user_email: user.email,
      type : "website",
      name: body.url,
      status: "active",
      source_url: body.url,
      content: processedData
    })

    // =========================
    // ✅ FINAL RESPONSE
    // =========================
    return NextResponse.json(
      {
        message: "Prompt source imported successfully",
        type,
        data: processedData,
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}