import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Plus, FileText, MoreVertical, Edit2, Download, Trash2 } from "lucide-react";

export default async function DashboardPage() {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    // Fetching resumes for the logged-in user
    const { data: resumes, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("user_id", session?.user.id)
        .order("updated_at", { ascending: false });

    if (error) {
        console.error("Error fetching resumes:", error);
    }

    return (
        <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">My Resumes</h1>
                    <p className="text-muted-foreground">Manage and update your AI-generated resumes.</p>
                </div>
                <Link
                    href="/resume/create"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]"
                >
                    <Plus className="w-5 h-5" /> Create New
                </Link>
            </div>

            {(!resumes || resumes.length === 0) ? (
                <div className="glass-panel border-dashed border-white/20 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                        <FileText className="w-8 h-8 text-white/40" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No resumes yet</h3>
                    <p className="text-muted-foreground max-w-sm mb-8">
                        You haven't created any resumes yet. Start building your first AI-powered resume to land your dream job.
                    </p>
                    <Link
                        href="/resume/create"
                        className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all"
                    >
                        <Plus className="w-5 h-5" /> Create Your First Resume
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resumes.map((resume) => (
                        <div key={resume.id} className="glass-panel p-6 rounded-2xl group relative overflow-hidden transition-all hover:-translate-y-1 hover:border-primary/50">
                            <div className="absolute top-0 right-0 p-4">
                                <button className="text-muted-foreground hover:text-white transition-colors bg-white/5 rounded-lg p-2 backdrop-blur-sm opacity-0 group-hover:opacity-100">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center mb-5">
                                <FileText className="w-6 h-6 text-primary" />
                            </div>

                            <h3 className="text-lg font-semibold text-white mb-1 truncate">{resume.title || "Untitled Resume"}</h3>
                            <p className="text-sm text-muted-foreground mb-6">Template: {resume.template_name}</p>

                            <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                                <Link href={`/resume/${resume.id}`} className="flex-1 bg-white/5 hover:bg-white/10 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                                    <Edit2 className="w-4 h-4" /> Edit
                                </Link>
                                <button className="bg-white/5 hover:bg-white/10 text-white px-3 py-2 rounded-lg transition-colors">
                                    <Download className="w-4 h-4" />
                                </button>
                                <button className="bg-white/5 hover:bg-destructive/20 text-destructive px-3 py-2 rounded-lg transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
