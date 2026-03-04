import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FileText, Plus, LogOut, Clock } from 'lucide-react'
import { Resume } from '@/types'

export default async function DashboardPage() {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    const { data: resumes, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
            <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold flex items-center gap-2">
                        <FileText className="w-6 h-6 text-blue-600" />
                        AI Resume Maker
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-600 dark:text-slate-400">{user.email}</span>
                        <form action="/auth/signout" method="post">
                            <button className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors" title="Log out">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Your Resumes</h1>
                    <Link
                        href="/resume/create"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Create New
                    </Link>
                </div>

                {error ? (
                    <div className="p-4 bg-red-50 text-red-600 rounded-lg">Error loading resumes</div>
                ) : resumes && resumes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resumes.map((resume: Resume) => (
                            <Link
                                href={`/resume/${resume.id}`}
                                key={resume.id}
                                className="group flex flex-col p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">{resume.title || 'Untitled Resume'}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                                        {resume.personal_info?.summary || 'No summary provided.'}
                                    </p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center text-xs text-slate-400">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Updated {new Date(resume.updated_at).toLocaleDateString()}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                        <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No resumes yet</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">Create your first AI-optimized resume to start landing interviews.</p>
                        <Link
                            href="/resume/create"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            Create Resume
                        </Link>
                    </div>
                )}
            </main>
        </div>
    )
}
