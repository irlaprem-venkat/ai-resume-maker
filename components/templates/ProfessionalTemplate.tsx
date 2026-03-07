import { Resume } from '@/types'

export default function ProfessionalTemplate({ resume, aiContent }: { resume: any, aiContent: any }) {
    const info = resume.personal_info || resume.personalInfo || resume || {};
    const experience = aiContent?.experience || resume.experience || [];
    const education = aiContent?.education || resume.education || [];
    const summary = aiContent?.summary || info.summary;
    const skills = aiContent?.skills || resume.skills || [];
    const personal_info = info;

    return (
        <div className="bg-white text-slate-900 w-full min-h-[297mm] h-full p-10 font-serif">
            <header className="text-center mb-8 border-b-2 border-slate-800 pb-6">
                <h1 className="text-5xl font-bold uppercase tracking-widest text-slate-900 mb-3">{personal_info?.fullName}</h1>
                <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 text-sm text-slate-700">
                    {personal_info?.location && <span>{personal_info.location}</span>}
                    {personal_info?.phone && (
                        <>
                            <span className="text-slate-400">|</span>
                            <span>{personal_info.phone}</span>
                        </>
                    )}
                    {personal_info?.email && (
                        <>
                            <span className="text-slate-400">|</span>
                            <span>{personal_info.email}</span>
                        </>
                    )}
                    {personal_info?.website && (
                        <>
                            <span className="text-slate-400">|</span>
                            <a href={personal_info.website} className="hover:underline">{personal_info.website}</a>
                        </>
                    )}
                </div>
            </header>

            {summary && (
                <section className="mb-6">
                    <p className="text-sm leading-relaxed text-slate-800 text-justify">{summary}</p>
                </section>
            )}

            {experience && experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-4 border-b border-slate-300 pb-1">Professional Experience</h2>
                    <div className="space-y-5">
                        {experience.map((exp: any, i: number) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-slate-900 text-base">{exp.position}</h3>
                                    <span className="text-sm text-slate-600 font-semibold">
                                        {exp.startDate} — {exp.endDate || 'Present'}
                                    </span>
                                </div>
                                <div className="text-sm text-slate-800 font-semibold mb-2 italic">{exp.company}</div>
                                {exp.description && (
                                    <ul className="list-disc list-outside ml-4 text-sm text-slate-700 space-y-1">
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
                    <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-4 border-b border-slate-300 pb-1">Education</h2>
                    <div className="space-y-4">
                        {education.map((edu: any, i: number) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-slate-900">{edu.institution}</h3>
                                    <span className="text-sm text-slate-600 font-semibold">
                                        {edu.startDate} — {edu.endDate || 'Expected'}
                                    </span>
                                </div>
                                <div className="text-sm text-slate-800 italic">{edu.degree} in {edu.field}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {skills && skills.length > 0 && (
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-4 border-b border-slate-300 pb-1">Core Competencies</h2>
                    <div className="text-sm text-slate-800 leading-relaxed">
                        {skills.join(' • ')}
                    </div>
                </section>
            )}
        </div>
    )
}
