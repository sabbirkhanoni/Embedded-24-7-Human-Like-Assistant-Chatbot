import { db } from "@/db/client";
import { templates } from "@/db/schema";
import { AuthorizationGuard } from "@/lib/AuthorizationGuard";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await AuthorizationGuard();
        if (!user) {
            return NextResponse.json({
                success: false,
                error: "Unauthorized",
            }, { status: 401 });
        }

        const response = await db.select().from(templates).where(eq(templates.user_email, user.email));

        if (response) {
            return NextResponse.json({
                success: true,
                templates: response,
            }, { status: 200 });
        } else {
            return NextResponse.json({
                success: false,
                error: "Failed to fetch templates",
            }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: "Internal Server Error",
        }, { status: 500 });
    }
}