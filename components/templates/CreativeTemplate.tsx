import { Resume } from '@/types'

export default function CreativeTemplate({ resume, aiContent }: { resume: any, aiContent: any }) {
    const info = resume.personal_info || resume.personalInfo || resume || {};
    const experience = aiContent?.experience || resume.experience || [];
    const education = aiContent?.education || resume.education || [];
    const summary = aiContent?.summary || info.summary;
    const skills = aiContent?.skills || resume.skills || [];
    const personal_info = info;

    return (
        <div className="bg-slate-50 text-slate-800 w-full min-h-[297mm] h-full flex flex-row font-sans text-sm">
            {/* Left Column (Sidebar) */}
            <aside className="w-[35%] bg-teal-800 text-teal-50 p-8 flex flex-col pt-12">
                <div className="mb-10 text-center">
                    <div className="w-32 h-32 rounded-full border-4 border-teal-600/50 mx-auto flex items-center justify-center bg-teal-700/50 mb-6">
                        <span className="text-4xl font-bold opacity-80">{personal_info?.fullName?.[0] || 'R'}</span>
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight mb-2 leading-tight">{personal_info?.fullName}</h1>
                    <div className="text-teal-200 font-medium tracking-wider uppercase text-xs">Professional Profile</div>
                </div>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-lg font-bold uppercase tracking-wider text-white mb-3 border-b border-teal-600 pb-1">Contact</h2>
                        <div className="space-y-3 text-teal-100 text-xs">
                            {personal_info?.email && <p className="break-all">{personal_info.email}</p>}
                            {personal_info?.phone && <p>{personal_info.phone}</p>}
                            {personal_info?.location && <p>{personal_info.location}</p>}
                            {personal_info?.website && <p className="break-all">{personal_info.website}</p>}
                        </div>
                    </section>

                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-wider text-white mb-3 border-b border-teal-600 pb-1 mt-6">Expertise</h2>
                            <div className="flex flex-col gap-2">
                                {skills.map((skill: string, i: number) => (
                                    <div key={i} className="bg-teal-700/40 px-3 py-1.5 rounded text-xs font-semibold">
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-wider text-white mb-3 border-b border-teal-600 pb-1 mt-6">Education</h2>
                            <div className="space-y-4">
                                {education.map((edu: any, i: number) => (
                                    <div key={i} className="text-xs">
                                        <div className="font-bold text-white mb-1">{edu.degree}</div>
                                        <div className="text-teal-200 mb-1">{edu.field}</div>
                                        <div className="opacity-80">{edu.institution}</div>
                                        <div className="opacity-60 mt-1">{edu.startDate} - {edu.endDate || 'Expected'}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </aside>

            {/* Right Column (Main Content) */}
            <main className="w-[65%] p-10 pt-12 space-y-8 bg-white">
                {summary && (
                    <section>
                        <h2 className="text-2xl font-bold uppercase tracking-wider text-teal-800 mb-4 flex items-center gap-2">
                            Summary
                        </h2>
                        <p className="leading-relaxed text-slate-600">{summary}</p>
                    </section>
                )}

                {experience && experience.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold uppercase tracking-wider text-teal-800 mb-6 border-b border-slate-200 pb-2">Experience</h2>
                        <div className="space-y-8">
                            {experience.map((exp: any, i: number) => (
                                <div key={i} className="relative pl-6 border-l-2 border-teal-200">
                                    <div className="absolute w-3 h-3 bg-teal-500 rounded-full -left-[7px] top-1.5" />
                                    <div className="mb-2">
                                        <h3 className="font-bold text-slate-900 text-lg">{exp.position}</h3>
                                        <div className="flex justify-between items-center mt-1">
                                            <span className="text-teal-700 font-semibold">{exp.company}</span>
                                            <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded">
                                                {exp.startDate} - {exp.endDate || 'Present'}
                                            </span>
                                        </div>
                                    </div>
                                    {exp.description && (
                                        <ul className="list-disc list-inside text-slate-600 space-y-1.5 mt-3 marker:text-teal-400">
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
            </main>
        </div>
    )
}
