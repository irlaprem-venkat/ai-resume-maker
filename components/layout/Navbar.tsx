"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, Sparkles, User, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: "Features", href: "#features" },
        { name: "Templates", href: "#templates" },
        { name: "Pricing", href: "#pricing" },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 border-white/5 rounded-none md:rounded-full md:w-11/12 md:top-4 md:left-1/2 md:-translate-x-1/2 md:border md:px-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform duration-300">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gradient">
                            AI Resume
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors relative"
                            >
                                {pathname === link.href && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary"
                                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                                    />
                                )}
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/login"
                            className="text-sm font-medium text-white hover:text-primary transition-colors"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/resume/create"
                            className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 transition-all duration-300 px-4 py-2 rounded-lg text-sm font-medium hover:shadow-[0_0_15px_rgba(124,58,237,0.5)]"
                        >
                            Build Resume
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-muted-foreground hover:text-white"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="md:hidden glass-panel border-t border-white/5"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-white"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 flex flex-col gap-2">
                            <Link
                                href="/login"
                                className="px-3 py-2 text-base font-medium text-white text-center rounded-lg bg-white/5"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/resume/create"
                                className="px-3 py-2 text-base font-medium text-white text-center rounded-lg bg-primary hover:bg-primary/90"
                            >
                                Build Resume
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </nav>
    );
}
