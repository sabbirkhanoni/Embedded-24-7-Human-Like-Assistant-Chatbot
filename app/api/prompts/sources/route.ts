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
   } catch (error) {
      console.error("Error during authorization:", error);
      return NextResponse.json(
        { error: "Authorization failed" },
        { status: 500 }
      );
    }
  }
