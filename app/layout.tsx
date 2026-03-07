import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
    title: "AI Resume Maker",
    description: "Create your professional, premium resume using AI instantly.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={cn("dark", "font-sans", inter.variable)}>
            <body className={`${inter.variable} font-sans min-h-screen bg-background text-foreground antialiased flex flex-col`}>
                <Navbar />
                <main className="flex-1 flex flex-col pt-20">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
