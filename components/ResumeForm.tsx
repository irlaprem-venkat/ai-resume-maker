'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resumeSchema, ResumeFormValues } from '@/lib/schema'
import { Plus, Trash2, ArrowRight, Loader2, Wand2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ResumeForm() {
    const router = useRouter()
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const { register, control, handleSubmit, formState: { errors } } = useForm<ResumeFormValues>({
        resolver: zodResolver(resumeSchema),
        defaultValues: {
            personalInfo: { fullName: '', email: '', phone: '', location: '', website: '', summary: '' },
            experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
            education: [{ institution: '', degree: '', field: '', startDate: '', endDate: '' }],
            skills: ''
        }
    })

    const { fields: expFields, append: expAppend, remove: expRemove } = useFieldArray({ control, name: "experience" })
    const { fields: eduFields, append: eduAppend, remove: eduRemove } = useFieldArray({ control, name: "education" })

    const onSubmit = async (data: ResumeFormValues) => {
        setIsGenerating(true)
        setError(null)

        try {
            const response = await fetch('/api/generate-resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Failed to generate resume')
            }

            router.push(`/resume/${result.resumeId}`)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
            )}

            {/* Personal Info */}
            <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Full Name *</label>
                        <input {...register("personalInfo.fullName")} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent" />
                        {errors.personalInfo?.fullName && <p className="text-red-500 text-xs mt-1">{errors.personalInfo.fullName.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email *</label>
                        <input type="email" {...register("personalInfo.email")} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent" />
                        {errors.personalInfo?.email && <p className="text-red-500 text-xs mt-1">{errors.personalInfo.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <input {...register("personalInfo.phone")} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <input {...register("personalInfo.location")} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Website / Portfolio</label>
                        <input {...register("personalInfo.website")} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent" />
                    </div>
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">Raw Summary (optional)</label>
                    <textarea {...register("personalInfo.summary")} rows={3} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent" placeholder="Briefly describe your background. Our AI will improve it." />
                </div>
            </section>

            {/* Experience */}
            <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Experience</h2>
                    <button type="button" onClick={() => expAppend({ company: '', position: '', startDate: '', endDate: '', description: '' })} className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
                        <Plus className="w-4 h-4 mr-1" /> Add Experience
                    </button>
                </div>
                <div className="space-y-6">
                    {expFields.map((field, index) => (
                        <div key={field.id} className="p-4 border border-slate-100 dark:border-slate-700 rounded-xl relative">
                            <button type="button" onClick={() => expRemove(index)} className="absolute top-4 right-4 text-red-500 hover:text-red-600 border border-red-100 dark:border-red-900 rounded p-1 bg-red-50 dark:bg-transparent transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Company *</label>
                                    <input {...register(`experience.${index}.company`)} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent" />
                                    {errors.experience?.[index]?.company && <p className="text-red-500 text-xs mt-1">{errors.experience[index].company?.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Position *</label>
                                    <input {...register(`experience.${index}.position`)} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent" />
                                    {errors.experience?.[index]?.position && <p className="text-red-500 text-xs mt-1">{errors.experience[index].position?.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Start Date *</label>
                                    <input {...register(`experience.${index}.startDate`)} placeholder="MM/YYYY" className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent" />
                                    {errors.experience?.[index]?.startDate && <p className="text-red-500 text-xs mt-1">{errors.experience[index].startDate?.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">End Date</label>
                                    <input {...register(`experience.${index}.endDate`)} placeholder="MM/YYYY or Present" className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-1">Raw Responsibilities / Achievements</label>
                                    <textarea {...register(`experience.${index}.description`)} rows={3} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent" placeholder="Just list what you did. AI will make it ATS-friendly." />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Education */}
            <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Education</h2>
                    <button type="button" onClick={() => eduAppend({ institution: '', degree: '', field: '', startDate: '', endDate: '' })} className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
                        <Plus className="w-4 h-4 mr-1" /> Add Education
                    </button>
                </div>
                <div className="space-y-6">
                    {eduFields.map((field, index) => (
                        <div key={field.id} className="p-4 border border-slate-100 dark:border-slate-700 rounded-xl relative">
                            <button type="button" onClick={() => eduRemove(index)} className="absolute top-4 right-4 text-red-500 hover:text-red-600 border border-red-100 dark:border-red-900 rounded p-1 bg-red-50 dark:bg-transparent transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Institution *</label>
                                    <input {...register(`education.${index}.institution`)} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent" />
                                    {errors.education?.[index]?.institution && <p className="text-red-500 text-xs mt-1">{errors.education[index].institution?.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Degree *</label>
                                    <input {...register(`education.${index}.degree`)} placeholder="e.g. B.S., Master's" className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent" />
                                    {errors.education?.[index]?.degree && <p className="text-red-500 text-xs mt-1">{errors.education[index].degree?.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Field of Study *</label>
                                    <input {...register(`education.${index}.field`)} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent" />
                                    {errors.education?.[index]?.field && <p className="text-red-500 text-xs mt-1">{errors.education[index].field?.message}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Start *</label>
                                        <input {...register(`education.${index}.startDate`)} placeholder="YYYY" className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">End</label>
                                        <input {...register(`education.${index}.endDate`)} placeholder="YYYY" className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills */}
            <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <h2 className="text-xl font-bold mb-4">Skills</h2>
                <div>
                    <label className="block text-sm font-medium mb-1">Key Skills (comma separated) *</label>
                    <textarea {...register("skills")} rows={3} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent" placeholder="React, Node.js, Project Management, Python..." />
                    {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills.message}</p>}
                </div>
            </section>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={isGenerating}
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            AI is optimizing your resume...
                        </>
                    ) : (
                        <>
                            <Wand2 className="w-5 h-5" />
                            Generate Resume with AI
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </div>
        </form>
    )
}
