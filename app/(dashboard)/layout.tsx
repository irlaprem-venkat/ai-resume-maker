import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { LayoutDashboard, FileText, Settings, LogOut, Sparkles } from "lucide-react";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row">
            {/* Sidebar sidebar */}
            <aside className="w-full md:w-64 border-r border-white/10 glass-panel md:min-h-screen flex flex-col z-10 sticky top-0">
                <div className="p-6">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white shrink-0">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-lg tracking-tight text-gradient">
                            AI Resume
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white bg-white/10 hover:bg-white/20 transition-colors">
                        <LayoutDashboard className="w-5 h-5 text-primary" />
                        <span className="font-medium text-sm">Dashboard</span>
                    </Link>
                    <Link href="/builder" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors">
                        <FileText className="w-5 h-5" />
                        <span className="font-medium text-sm">New Resume</span>
                    </Link>
                    <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors">
                        <Settings className="w-5 h-5" />
                        <span className="font-medium text-sm">Settings</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-white/10 mt-auto">
                    <div className="flex items-center gap-3 px-3 py-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs uppercase">
                            {session.user.email?.charAt(0) || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{session.user.email}</p>
                        </div>
                    </div>
                    <form action="/auth/signout" method="post">
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-white hover:bg-destructive/20 transition-colors">
                            <LogOut className="w-5 h-5 text-destructive" />
                            <span className="font-medium text-sm text-destructive">Sign Out</span>
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
                <div className="relative z-0 flex-1 overflow-y-auto w-full p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
