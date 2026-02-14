import { startupdata } from "@/db/schema";
import { AuthorizationGuard } from "@/lib/AuthorizationGuard";
import {cookies}  from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { eq } from "drizzle-orm";


export async function GET() {
    try {
        const user = await AuthorizationGuard();

        if(!user){
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
             }, { status: 401 })
        }

        const cookie = await cookies();
        const startupdataCookie = cookie.get("startupdata");

        if(startupdataCookie?.value){
            return NextResponse.json({
                exists: true,
                source : "cookie",
                data: JSON.parse(startupdataCookie.value)
             }, { status: 200 })
        }

        const [record] = await db.select().from(startupdata).where(eq(startupdata.user_email, user.email));

        if(record){
            cookie.set("startupdata", JSON.stringify({
                businessName: record.business_name 
            }),
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                path: "/",
                maxAge: 60 * 60 * 24 * 7 // 1 week
            });

            return NextResponse.json({
                exists: true,
                source: "database",
                data: record,
                }, { status: 200 });
        }

         return NextResponse.json({
            exists: false,
            data : null
         }, { status: 404 });      

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "An error occurred while fetching metadata",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 })
    }
}