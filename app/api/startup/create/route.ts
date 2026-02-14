import { db } from "@/db/client";
import { startupdata } from "@/db/schema";
import { AuthorizationGuard } from "@/lib/AuthorizationGuard";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest){
    try {
        const user = await AuthorizationGuard();
        if(!user){
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
             }, { status: 401 })
        }

        const { businessName, industry, description, externalUrl, website } = await request.json();
        if(!businessName || !industry || !description || !externalUrl || !website){
            return NextResponse.json({
                success: false,
                message: "Missing required fields"
             }, { status: 400 })
        }

        const startupdataResponse = await db.insert(startupdata).values({
            user_email: user.email,
            business_name: businessName,
            industry,
            description,
            external_url: externalUrl,
            website
        });

        (await cookies()).set("startupdata", JSON.stringify({ businessName }));

        return NextResponse.json({
            success: true,
            data: startupdataResponse
        }, { status: 201 });    

    }   catch (error) {
        return NextResponse.json({
            success: false,
            message: "An error occurred while creating startup data",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 })
    }
}