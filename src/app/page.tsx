"use client";

import { LoginPage } from "@/components/pages/login/login";
import { TrackerPage } from "@/components/pages/tracker/tracker";
import { Scanner } from "@/components/scanner/scanner";
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session, status } = useSession();

    // While NextAuth is resolving session
    if (status === "loading") {
        return (
            <div className="flex min-h-screen items-center justify-center">
                {/* Optional: replace with logo/splash */}
                <img
                    src="/favicon/favicon.svg"
                    alt="Epoch"
                    className="h-28 w-28 opacity-60"
                />
            </div>
        );
    }

    // Not logged in
    if (!session) {
        return <LoginPage />;
    }

    // Logged in
    return <TrackerPage />;
}
