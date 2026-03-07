import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black/50 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="font-bold text-xl tracking-tight text-gradient mb-4 block">
                            AI Resume Maker
                        </Link>
                        <p className="text-muted-foreground text-sm max-w-sm mb-6">
                            Create professional, ATS-friendly resumes in minutes using the power of Artificial Intelligence and premium 3D design.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-white transition-colors">
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-white transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Product</h3>
                        <ul className="space-y-3">
                            <li><Link href="#features" className="text-muted-foreground hover:text-white text-sm transition-colors">Features</Link></li>
                            <li><Link href="#templates" className="text-muted-foreground hover:text-white text-sm transition-colors">Templates</Link></li>
                            <li><Link href="#pricing" className="text-muted-foreground hover:text-white text-sm transition-colors">Pricing</Link></li>
                            <li><Link href="/builder" className="text-primary hover:text-primary-foreground text-sm transition-colors">Try Builder</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Legal</h3>
                        <ul className="space-y-3">
                            <li><Link href="/privacy" className="text-muted-foreground hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-muted-foreground hover:text-white text-sm transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} AI Resume Maker. All rights reserved.</p>
                    <p className="mt-4 md:mt-0">Designed with ❤️ for professionals.</p>
                </div>
            </div>
        </footer>
    );
}
