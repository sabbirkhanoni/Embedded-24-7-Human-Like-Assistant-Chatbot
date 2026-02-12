'use client';

import { AuthorizationGuard } from "@/lib/AuthorizationGuard";
import { useEffect, useState } from "react";

export function useUser() {
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const user = await AuthorizationGuard();
            setEmail(user?.email);
            setLoading(false);
        };
        getUser();
    }, []);

    return { email, loading };
}