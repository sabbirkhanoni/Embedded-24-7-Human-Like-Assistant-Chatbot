import { NextResponse } from "next/server";
import { AuthorizationGuard } from "@/lib/AuthorizationGuard";

export async function GET() {
  try {
    // 🔐 Auth check
    const user = await AuthorizationGuard();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    return NextResponse.json([]); // Return an empty array for now
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompts" },
      { status: 500 }
    );
  }
}
