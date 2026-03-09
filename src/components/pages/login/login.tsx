"use client";

import { signIn } from "next-auth/react";

export const LoginPage = () => {
    return (
        <div className="min-h-screen flex flex-col px-6">
            {/* Top spacer */}
            <div className="flex-1" />

            {/* Center content */}
            <div className="flex flex-col items-center text-center">
                {/* Logo */}
                <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-3xl border border-neutral-200 bg-white shadow-sm">
                    <img
                        src="/favicon/favicon.svg"
                        alt="Epoch"
                        className="h-20 w-20"
                    />
                </div>

                {/* Title */}
                <h1 className="text-2xl font-semibold">Epoch</h1>
                <p className="mt-2 max-w-xs text-sm text-neutral-500">
                    A simple personal log for tracking life events, routines,
                    and expenses.
                </p>

                {/* CTA */}
                <button
                    onClick={() => signIn("google")}
                    className="mt-8 w-full max-w-sm flex items-center justify-center gap-3 rounded-xl bg-black py-3 text-white font-medium hover:bg-neutral-800 cursor-pointer"
                >
                    <img src="/google.svg" alt="" className="h-5 w-5" />
                    Continue with Google
                </button>

                {/* Trust copy */}
                <p className="mt-6 max-w-xs text-xs text-neutral-400">
                    Your personal event log.
                    <br />
                    Simple, private, and built for everyday life.
                </p>
            </div>

            {/* Bottom spacer */}
            <div className="flex-1" />
        </div>
    );
};
