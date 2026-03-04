import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "AI Resume Maker",
    description: "Create your professional resume using AI",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased font-sans">
                {children}
            </body>
        </html>
    );
}
