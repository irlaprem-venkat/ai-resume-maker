import { Resume } from '@/types'

export default function ModernTemplate({ resume, aiContent }: { resume: any, aiContent: any }) {
    // Highly resilient field mapping to support both AI and raw data
    const info = resume.personal_info || resume.personalInfo || resume || {};
    const experience = aiContent?.experience || resume.experience || [];
    const education = aiContent?.education || resume.education || [];
    const summary = aiContent?.summary || info.summary;
    const skills = aiContent?.skills || resume.skills || [];
    const personal_info = info;

    return (
        <div className="bg-white text-slate-900 w-full min-h-[297mm] h-full p-8 font-sans">
            <header className="border-b-2 border-indigo-600 pb-6 mb-6">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">{personal_info?.fullName}</h1>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                    {personal_info?.email && <span>{personal_info.email}</span>}
                    {personal_info?.phone && (
                        <>
                            <span className="text-indigo-400">•</span>
                            <span>{personal_info.phone}</span>
                        </>
                    )}
                    {personal_info?.location && (
                        <>
                            <span className="text-indigo-400">•</span>
                            <span>{personal_info.location}</span>
                        </>
                    )}
                    {personal_info?.website && (
                        <>
                            <span className="text-indigo-400">•</span>
                            <a href={personal_info.website} className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">Portfolio</a>
                        </>
                    )}
                    {personal_info?.linkedin && (
                        <>
                            <span className="text-indigo-400">•</span>
                            <a href={personal_info.linkedin} className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </>
                    )}
                </div>
            </header>

            {summary && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-indigo-700 mb-2 uppercase tracking-wide">Summary</h2>
                    <p className="text-sm leading-relaxed text-slate-700">{summary}</p>
                </section>
            )}

            {experience && experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-indigo-700 mb-3 uppercase tracking-wide border-b border-slate-200 pb-1">Experience</h2>
                    <div className="space-y-4">
                        {experience.map((exp: any, i: number) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-semibold text-slate-900">{exp.position}</h3>
                                    <span className="text-sm text-slate-500 font-medium">
                                        {exp.startDate} - {exp.endDate || 'Present'}
                                    </span>
                                </div>
                                <div className="text-sm text-indigo-600 font-medium mb-2">{exp.company}</div>
                                {exp.description && (
                                    <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                                        {exp.description.split('\n').filter((d: string) => d.trim()).map((item: string, j: number) => (
                                            <li key={j} className="leading-relaxed">{item.replace(/^- /, '')}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {education && education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-indigo-700 mb-3 uppercase tracking-wide border-b border-slate-200 pb-1">Education</h2>
                    <div className="space-y-3">
                        {education.map((edu: any, i: number) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-semibold text-slate-900">{edu.degree} in {edu.field}</h3>
                                    <span className="text-sm text-slate-500 font-medium">
                                        {edu.startDate} - {edu.endDate || 'Expected'}
                                    </span>
                                </div>
                                <div className="text-sm text-slate-700">{edu.institution}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {skills && skills.length > 0 && (
                <section>
                    <h2 className="text-lg font-bold text-indigo-700 mb-3 uppercase tracking-wide border-b border-slate-200 pb-1">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-md font-medium">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
