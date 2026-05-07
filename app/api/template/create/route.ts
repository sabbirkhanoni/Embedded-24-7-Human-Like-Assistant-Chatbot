import { db } from "@/db/client";
import { templates } from "@/db/schema";
import { AuthorizationGuard } from "@/lib/AuthorizationGuard";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try{
        const user = await AuthorizationGuard();
        if(!user){
            return NextResponse.json({
                success: false,
                error: "Unauthorized",
            }, { status: 401 });
        }

        const { name, description, tone, allowedTopics, blockedTopics, sourceIds } = await request.json();
        if(!name || !description || !tone){
            return NextResponse.json({
                success: false,
                error: "Please provide all required information",
            }, { status: 400 });
        }

        if(!sourceIds || !Array.isArray(sourceIds) || sourceIds.length === 0){
            return NextResponse.json({
                success: false,
                error: "Please provide valid source IDs",
            }, { status: 400 });
        }

        const response = await db.insert(templates).values({
            user_email: user.email,
            name,
            description,
            tone,
            allowed_topics: allowedTopics || "",
            blocked_topics: blockedTopics || "",
            source_ids: sourceIds,
            status: "active",
        });

        if(response){
            return NextResponse.json({
                success: true,
                message: "Template created successfully",
            }, { status: 200 });
        } else {
            return NextResponse.json({
                success: false,
                error: "Failed to create template",
            }, { status: 500 });
        }
    } catch(error){
        return NextResponse.json({
            success: false,
            error: "Internal Server Error",
        }, { status: 500 });
    }   
}