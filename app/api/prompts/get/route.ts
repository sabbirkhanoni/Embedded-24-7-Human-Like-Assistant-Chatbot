import { NextResponse } from "next/server";
import { AuthorizationGuard } from "@/lib/AuthorizationGuard";
import { db } from "@/db/client";
import { eq } from "drizzle-orm";
import { prompts } from "@/db/schema";

export async function GET() {
  try {
    // Auth check
    const user = await AuthorizationGuard();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    // Fetch prompts from database
    const sources = await db.select().from(prompts).where(eq(prompts.user_email, user.email));
    return NextResponse.json({ sources }, { status: 200 });
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompts" },
      { status: 500 }
    );
  }
}
