import type { Metadata } from "next";
import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import "./globals.css";
import SiteShell from "@/components/layout/SiteShell";

export const metadata: Metadata = {
    title: "WereBefore - Fashion E-Commerce",
    description: "Premium fashion e-commerce with AI-powered virtual try-on. Shop sneakers, watches, shirts, pants, and more.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased" suppressHydrationWarning>
                <Auth0Provider>
                    <SiteShell>{children}</SiteShell>
                </Auth0Provider>
            </body>
        </html>
    );
}
