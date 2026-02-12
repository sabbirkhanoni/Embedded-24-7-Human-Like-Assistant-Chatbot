"use server";

import { cookies } from "next/headers";

export const AuthorizationGuard = async () => {
    const cookieStore = cookies();
    const userSession = (await cookieStore).get("userSession");
    let user = null;

    if (userSession) {
        try{
            user = JSON.parse(userSession.value);
        } catch (error) {
            console.error("Error in AuthorizationGuard:", error);
        }
    }
    
    return user;
}