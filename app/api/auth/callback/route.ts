import { db } from "@/db/client";
import scalekit from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";
import {user as User} from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    if (error) {
        return NextResponse.json(
            { error, errorDescription },
            {status: 401 }
        );
    }
    if (!code) {
        return NextResponse.json(
            { error: "Authorization code not found" },
            { status: 400 }
        );
    }

    try {
        const redirectURI = process.env.SCALEKIT_REDIRECT_URI!;

        const authResult = await scalekit.authenticateWithCode(code, redirectURI);
        const {user , idToken } = authResult;
        const claims = await scalekit.validateToken(idToken);
        const organizationId = 
            (claims as any).organization_id ||
            (claims as any).org_id ||
            (claims as any).oid ||
            null;

      if(!organizationId){
        return NextResponse.json(
            { error: "Organization ID not found in token claims" },
            { status: 500 }
        );
      }

      const existingUser = await db.select().from(User).where(eq(User.email, user.email));

    if(existingUser.length === 0){
        await db.insert(User).values({
            email: user?.email,
            name: user?.name || user?.email.split("@")[0],
            organization_id: organizationId
        });
    }

    const response = NextResponse.redirect(new URL("/", request.url));

    const userSession = {
        email : user.email,
        organization_id: organizationId,
    };

    response.cookies.set("userSession", JSON.stringify(userSession), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 // 1 day
    });

    return response;

    } catch (error) {
        return NextResponse.json(
            { error: "Authentication failed", details: (error as Error).message },
            { status: 500 }
        );
    }

}