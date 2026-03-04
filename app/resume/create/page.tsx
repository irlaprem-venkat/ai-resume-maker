import ResumeForm from '@/components/ResumeForm'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function CreateResumePage() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link href="/dashboard" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold mt-4">Create New Resume</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">Enter your rough details. Our AI will structure and optimize it professionally.</p>
                </div>

                <ResumeForm />
            </div>
        </div>
    )
}
