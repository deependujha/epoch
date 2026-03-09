import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import "./globals.css";
import { OAuthProviderWrapper } from "@/components/oauth-provider/oauth-provider-wrapper";
import { ItemsProvider } from "@/context/items-context";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Epoch",
    description:
        "A simple personal log for tracking life events, expenses, and routines.",
    icons: {
        icon: [
            {
                url: "/favicon/favicon-96x96.png",
                sizes: "96x96",
                type: "image/png",
            },
        ],
        apple: "/favicon/apple-touch-icon.png",
    },
    manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <OAuthProviderWrapper>
                    <ItemsProvider>{children}</ItemsProvider>
                </OAuthProviderWrapper>
                <Toaster position="top-right" richColors />
                <Analytics />
            </body>
        </html>
    );
}
