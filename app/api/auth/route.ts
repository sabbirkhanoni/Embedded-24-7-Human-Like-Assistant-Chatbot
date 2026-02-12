
import scalekit from "@/lib/scalekit";
import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const state = crypto.randomBytes(16).toString("hex");
        (await cookies()).set("skstate" , state, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
        })

        const redirectURI = process.env.SCALEKIT_REDIRECT_URI!;
        const options = {
            scopes: ['openid', 'profile', 'email', 'offline_access'],  
            state: state, 
        }

        const authURL = scalekit.getAuthorizationUrl(redirectURI, options);
        return NextResponse.redirect(authURL);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to initiate authentication" },
            { status: 500 }
        );
    }
}