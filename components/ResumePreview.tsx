import { Resume } from '@/types'

export default function ResumePreview({ resume }: { resume: Resume }) {
    let aiContent = null
    try {
        if (resume.ai_generated_content) {
            aiContent = JSON.parse(resume.ai_generated_content)
        }
    } catch (e) {
        console.error("Failed to parse AI content")
    }

    const { personal_info } = resume
    const experience = aiContent?.experience || resume.experience
    const education = aiContent?.education || resume.education
    const summary = aiContent?.summary || personal_info?.summary
    const skills = aiContent?.skills || resume.skills

    return (
        <div id="resume-preview" className="bg-white text-slate-900 p-8 sm:p-12 shadow-xl rounded-sm w-full max-w-[210mm] min-h-[297mm] mx-auto border border-slate-200">
            {/* Header */}
            <header className="border-b-2 border-slate-800 pb-6 mb-6">
                <h1 className="text-4xl font-bold uppercase tracking-tight text-slate-900 mb-2">{personal_info?.fullName}</h1>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                    {personal_info?.email && <span>{personal_info.email}</span>}
                    {personal_info?.phone && (
                        <>
                            <span className="hidden sm:inline">•</span>
                            <span>{personal_info.phone}</span>
                        </>
                    )}
                    {personal_info?.location && (
                        <>
                            <span className="hidden sm:inline">•</span>
                            <span>{personal_info.location}</span>
                        </>
                    )}
                    {personal_info?.website && (
                        <>
                            <span className="hidden sm:inline">•</span>
                            <a href={personal_info.website} className="text-blue-600 hover:underline">{personal_info.website}</a>
                        </>
                    )}
                </div>
            </header>

            {/* Summary */}
            {summary && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 mb-2 border-b border-slate-200 pb-1">Professional Summary</h2>
                    <p className="text-sm leading-relaxed text-slate-700">{summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 mb-3 border-b border-slate-200 pb-1">Professional Experience</h2>
                    <div className="space-y-4">
                        {experience.map((exp: any, i: number) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-semibold text-slate-900">{exp.position}</h3>
                                    <span className="text-sm text-slate-600 font-medium">
                                        {exp.startDate} - {exp.endDate || 'Present'}
                                    </span>
                                </div>
                                <div className="text-sm text-blue-600 font-medium mb-2">{exp.company}</div>
                                {exp.description && (
                                    <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                                        {exp.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 mb-3 border-b border-slate-200 pb-1">Education</h2>
                    <div className="space-y-3">
                        {education.map((edu: any, i: number) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-semibold text-slate-900">{edu.degree} in {edu.field}</h3>
                                    <span className="text-sm text-slate-600 font-medium">
                                        {edu.startDate} - {edu.endDate || 'Expected'}
                                    </span>
                                </div>
                                <div className="text-sm text-slate-700">{edu.institution}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 mb-3 border-b border-slate-200 pb-1">Core Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-slate-100 text-slate-800 text-sm rounded-full border border-slate-200">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
