import Link from "next/link";
import { ArrowRight, FileText, Sparkles, Download } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
            <main className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Craft Your Perfect <br />
                    <span className="text-blue-600 dark:text-blue-400">AI-Powered Resume</span>
                </h1>

                <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl">
                    Enter your details, and our AI will optimize your resume to be professional, ATS-friendly, and engaging. Land your dream job today.
                </p>

                <div className="flex gap-4 mt-4">
                    <Link
                        href="/resume/create"
                        className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30"
                    >
                        Create Resume
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-full font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                    >
                        Go to Dashboard
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
                    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <FileText className="w-10 h-10 text-blue-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2 dark:text-white">Easy Input</h3>
                        <p className="text-slate-600 dark:text-slate-400">Quickly enter your experience, education, and skills in a simple form.</p>
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <Sparkles className="w-10 h-10 text-blue-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2 dark:text-white">AI Optimization</h3>
                        <p className="text-slate-600 dark:text-slate-400">Our AI rewrites your content with strong action verbs and professional phrasing.</p>
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <Download className="w-10 h-10 text-blue-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2 dark:text-white">Export to PDF</h3>
                        <p className="text-slate-600 dark:text-slate-400">Download your beautifully formatted ATS-friendly resume as a PDF instantly.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
