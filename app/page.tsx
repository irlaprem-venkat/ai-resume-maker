"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, FileText, Zap, Shield, CheckCircle } from "lucide-react";

// Dynamically import the 3D Hero Scene to avoid SSR issues
const HeroScene = dynamic(
    () => import("@/components/3d/HeroScene").then((mod) => mod.HeroScene),
    { ssr: false }
);

const features = [
    {
        icon: <Sparkles className="w-6 h-6 text-primary" />,
        title: "AI-Powered Writing",
        description: "Generate compelling, keyword-rich bullet points tailored to your industry instantly."
    },
    {
        icon: <Zap className="w-6 h-6 text-primary" />,
        title: "Lightning Fast",
        description: "Build a professional resume in minutes, not hours. Real-time preview included."
    },
    {
        icon: <Shield className="w-6 h-6 text-primary" />,
        title: "ATS-Friendly",
        description: "Our templates are tested and optimized to pass through Applicant Tracking Systems."
    },
    {
        icon: <FileText className="w-6 h-6 text-primary" />,
        title: "Premium Templates",
        description: "Stand out with professionally designed templates built by top-tier UI/UX experts."
    }
];

export default function LandingPage() {
    return (
        <div className="relative w-full overflow-hidden">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0 h-screen pointer-events-none">
                <HeroScene />
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="glass-panel px-6 py-2 rounded-full mb-8 flex items-center gap-2 border-primary/30"
                    >
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">✨ AI Resume Maker V2.0 is Live</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl"
                    >
                        Craft Your Perfect Resume with <span className="text-gradient">Artificial Intelligence</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
                    >
                        Leverage advanced AI to generate, optimize, and format your resume. Stand out from the crowd and land your dream job faster than ever.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                    >
                        <Link
                            href="/builder"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                        >
                            Build Your AI Resume <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="#templates"
                            className="glass-panel hover:bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center transition-all"
                        >
                            View Templates
                        </Link>
                    </motion.div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 bg-black/40 backdrop-blur-xl border-t border-white/5 relative z-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose Us?</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to create a stunning, professional resume that gets you hired.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="glass-panel p-6 rounded-2xl hover:-translate-y-2 transition-transform duration-300 group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 relative z-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
                    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to accelerate your career?</h2>
                        <p className="text-xl text-muted-foreground mb-10">Join thousands of professionals who have already landed their dream jobs using our platform.</p>
                        <Link
                            href="/builder"
                            className="inline-flex bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg items-center gap-2 transition-transform hover:scale-105"
                        >
                            Get Started for Free <ArrowRight className="w-5 h-5" />
                        </Link>
                        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground font-medium">
                            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> No credit card required</span>
                            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> 14-day free trial</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
