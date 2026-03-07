'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resumeSchema, ResumeFormValues } from '@/lib/schema'
import { Plus, Trash2, ArrowRight, Loader2, Wand2, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const TEMPLATES = [
    { id: 'modern', name: 'Modern', desc: 'Clean lines, ATS optimized.' },
    { id: 'professional', name: 'Professional', desc: 'Classic layout for corporate roles.' },
    { id: 'creative', name: 'Creative', desc: 'Vibrant accents, stands out.' },
    { id: 'developer', name: 'Developer', desc: 'Tech focused, monospace font.' },
    { id: 'executive', name: 'Executive', desc: 'Elegant, high contrast headers.' },
    { id: 'minimalist', name: 'Minimalist', desc: 'Extreme whitespace, distraction free.' },
]

export default function ResumeForm() {
    const router = useRouter()
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedTemplate, setSelectedTemplate] = useState('modern')

    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<ResumeFormValues>({
        resolver: zodResolver(resumeSchema),
        defaultValues: {
            personalInfo: { fullName: '', email: '', phone: '', location: '', website: '', summary: '', template: 'modern' },
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

            // Immediately redirect to the new resume
            router.push(`/resume/${result.resumeId}`)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsGenerating(false)
        }
    }

    const inputClasses = "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 outline-none"
    const sectionClasses = "bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700/50 relative overflow-hidden"

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto pb-24">
            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl flex items-center gap-3">
                    <span className="font-semibold">Error:</span> {error}
                </div>
            )}

            {/* Personal Info */}
            <section className={sectionClasses}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 flex items-center justify-center text-sm">1</div>
                    Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Full Name *</label>
                        <input {...register("personalInfo.fullName")} className={inputClasses} placeholder="John Doe" />
                        {errors.personalInfo?.fullName && <p className="text-red-500 text-xs mt-1.5">{errors.personalInfo.fullName.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Email *</label>
                        <input type="email" {...register("personalInfo.email")} className={inputClasses} placeholder="john@example.com" />
                        {errors.personalInfo?.email && <p className="text-red-500 text-xs mt-1.5">{errors.personalInfo.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Phone</label>
                        <input {...register("personalInfo.phone")} className={inputClasses} placeholder="+1 (555) 000-0000" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Location</label>
                        <input {...register("personalInfo.location")} className={inputClasses} placeholder="City, Country" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Website / LinkedIn / Portfolio</label>
                        <input {...register("personalInfo.website")} className={inputClasses} placeholder="https://linkedin.com/in/johndoe" />
                    </div>
                </div>
                <div className="mt-5">
                    <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Raw Summary (optional)</label>
                    <textarea {...register("personalInfo.summary")} rows={3} className={inputClasses} placeholder="Briefly describe your background. Our AI will automatically improve it to sound highly professional." />
                </div>
            </section>

            {/* Experience */}
            <section className={sectionClasses}>
                <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -ml-16 -mt-16 pointer-events-none" />
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 flex items-center justify-center text-sm">2</div>
                        Experience
                    </h2>
                </div>
                <div className="space-y-6">
                    {expFields.map((field, index) => (
                        <div key={field.id} className="p-6 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl relative group transition-all hover:border-indigo-200 dark:hover:border-indigo-800">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <button type="button" onClick={() => expRemove(index)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full p-2 transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pr-10">
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Company *</label>
                                    <input {...register(`experience.${index}.company`)} className={inputClasses} placeholder="Tech Corp" />
                                    {errors.experience?.[index]?.company && <p className="text-red-500 text-xs mt-1.5">{errors.experience[index].company?.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Position *</label>
                                    <input {...register(`experience.${index}.position`)} className={inputClasses} placeholder="Software Engineer" />
                                    {errors.experience?.[index]?.position && <p className="text-red-500 text-xs mt-1.5">{errors.experience[index].position?.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Start Date *</label>
                                    <input {...register(`experience.${index}.startDate`)} placeholder="MM/YYYY" className={inputClasses} />
                                    {errors.experience?.[index]?.startDate && <p className="text-red-500 text-xs mt-1.5">{errors.experience[index].startDate?.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">End Date</label>
                                    <input {...register(`experience.${index}.endDate`)} placeholder="MM/YYYY or Present" className={inputClasses} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Raw Responsibilities & Achievements</label>
                                    <textarea {...register(`experience.${index}.description`)} rows={4} className={inputClasses} placeholder="Just list what you did. E.g. Built new API, fixed bugs, managed 2 people. AI will transform this into powerful bullet points." />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => expAppend({ company: '', position: '', startDate: '', endDate: '', description: '' })} className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center font-medium px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl transition-colors">
                        <Plus className="w-4 h-4 mr-2" /> Add Another Role
                    </button>
                </div>
            </section>

            {/* Education */}
            <section className={sectionClasses}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 flex items-center justify-center text-sm">3</div>
                        Education
                    </h2>
                </div>
                <div className="space-y-6">
                    {eduFields.map((field, index) => (
                        <div key={field.id} className="p-6 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl relative group transition-all hover:border-purple-200 dark:hover:border-purple-800">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <button type="button" onClick={() => eduRemove(index)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full p-2 transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pr-10">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Institution *</label>
                                    <input {...register(`education.${index}.institution`)} className={inputClasses} placeholder="University Name" />
                                    {errors.education?.[index]?.institution && <p className="text-red-500 text-xs mt-1.5">{errors.education[index].institution?.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Degree *</label>
                                    <input {...register(`education.${index}.degree`)} placeholder="e.g. B.S., Master's" className={inputClasses} />
                                    {errors.education?.[index]?.degree && <p className="text-red-500 text-xs mt-1.5">{errors.education[index].degree?.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Field of Study *</label>
                                    <input {...register(`education.${index}.field`)} className={inputClasses} placeholder="Computer Science" />
                                    {errors.education?.[index]?.field && <p className="text-red-500 text-xs mt-1.5">{errors.education[index].field?.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Start Year *</label>
                                    <input {...register(`education.${index}.startDate`)} placeholder="YYYY" className={inputClasses} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">End Year</label>
                                    <input {...register(`education.${index}.endDate`)} placeholder="YYYY or Expected" className={inputClasses} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => eduAppend({ institution: '', degree: '', field: '', startDate: '', endDate: '' })} className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center font-medium px-4 py-2 bg-purple-50 dark:bg-purple-500/10 rounded-xl transition-colors">
                        <Plus className="w-4 h-4 mr-2" /> Add Education
                    </button>
                </div>
            </section>

            {/* Skills */}
            <section className={sectionClasses}>
                <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center text-sm">4</div>
                    Skills
                </h2>
                <div>
                    <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Key Skills (comma separated) *</label>
                    <textarea {...register("skills")} rows={3} className={inputClasses} placeholder="React, Node.js, Project Management, Python, Agile..." />
                    <p className="text-xs text-slate-500 mt-2">Our AI will categorize and format these naturally within your new resume.</p>
                    {errors.skills && <p className="text-red-500 text-xs mt-1.5">{errors.skills.message}</p>}
                </div>
            </section>

            {/* Template Selection */}
            <section className={sectionClasses}>
                <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -ml-16 -mt-16 pointer-events-none" />
                <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 flex items-center justify-center text-sm">5</div>
                    Choose Template
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {TEMPLATES.map((tmpl) => (
                        <div
                            key={tmpl.id}
                            onClick={() => {
                                setSelectedTemplate(tmpl.id);
                                setValue('personalInfo.template', tmpl.id);
                            }}
                            className={cn(
                                "group cursor-pointer rounded-2xl border-2 transition-all p-4 duration-300 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/50",
                                selectedTemplate === tmpl.id
                                    ? "border-indigo-500 shadow-lg shadow-indigo-500/20"
                                    : "border-transparent hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md"
                            )}
                        >
                            {selectedTemplate === tmpl.id && (
                                <div className="absolute top-3 right-3 text-indigo-500 bg-indigo-50 dark:bg-indigo-500/20 rounded-full">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                            )}
                            <div className="aspect-[1/1.2] bg-white dark:bg-slate-950 rounded-xl mb-4 shadow-sm border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center group-hover:scale-[1.02] transition-transform">
                                <span className="text-slate-400 font-medium text-sm">Preview</span>
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg">{tmpl.name}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{tmpl.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="flex flex-col items-center pt-8 border-t border-slate-200 dark:border-slate-800">
                <button
                    type="submit"
                    disabled={isGenerating}
                    className={cn(
                        "relative group flex items-center justify-center gap-3 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all w-full md:w-auto overflow-hidden shadow-2xl hover:shadow-indigo-500/25",
                        isGenerating && "opacity-80 scale-100 pointer-events-none"
                    )}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient hidden md:block" />

                    <span className="relative z-10 flex items-center gap-3">
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-6 h-6 animate-spin" />
                                Analyzing and Optimizing...
                            </>
                        ) : (
                            <>
                                <Wand2 className="w-6 h-6" />
                                Generate Final Resume
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </span>
                </button>
                <p className="text-sm text-slate-500 mt-4 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Auto-saves to your Dashboard
                </p>
            </div>
        </form>
    )
}
