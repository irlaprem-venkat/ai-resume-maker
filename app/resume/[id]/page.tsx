import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ResumePreview from '@/components/ResumePreview'
import DownloadPDFButton from '@/components/DownloadPDFButton'

export default async function ResumePage({ params }: { params: { id: string } }) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: resume, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', params.id)
        .single()

    if (error || !resume || resume.user_id !== user.id) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Resume not found</h1>
                    <Link href="/dashboard" className="text-blue-600 hover:underline">Return to Dashboard</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <Link href="/dashboard" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                        </Link>
                        <h1 className="text-2xl font-bold mt-2 text-slate-900 dark:text-white">Resume Preview</h1>
                    </div>
                    <div className="flex gap-4">
                        <DownloadPDFButton targetId="resume-preview" filename={`${resume.personal_info?.fullName?.replace(/\s+/g, '-')}-resume.pdf`} />
                    </div>
                </div>

                <div className="overflow-x-auto pb-12">
                    <ResumePreview resume={resume} />
                </div>
            </div>
        </div>
    )
}
