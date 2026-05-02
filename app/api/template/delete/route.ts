import { NextResponse } from "next/server";
import { AuthorizationGuard } from "@/lib/AuthorizationGuard";
import { templates } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";

export async function DELETE() {
    try {

        const user = await AuthorizationGuard();

        if (!user) {
            return NextResponse.json({
                success: false,
                error: "Unauthorized",
            }, { status: 401 });
        }

        const response = await db.delete(templates).where(eq(templates.user_email, user.email));

        if (response) {
            return NextResponse.json({
                success: true,
                message: "Templates deleted successfully",
            }, { status: 200 });
        } else {
            return NextResponse.json({
                success: false,
                error: "Failed to delete templates",
            }, { status: 500 });
        }
        
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: "Internal Server Error",
        }, { status: 500 });
    }
}