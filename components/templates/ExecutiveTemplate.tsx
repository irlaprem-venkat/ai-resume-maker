import { Resume } from '@/types'

export default function ExecutiveTemplate({ resume, aiContent }: { resume: Resume, aiContent: any }) {
    const { personal_info } = resume
    const experience = aiContent?.experience || resume.experience
    const education = aiContent?.education || resume.education
    const summary = aiContent?.summary || personal_info?.summary
    const skills = aiContent?.skills || resume.skills

    return (
        <div className="bg-[#FAF9F6] text-slate-900 w-full min-h-[297mm] h-full p-12 font-sans border-x-[16px] border-slate-900">
            <header className="mb-10 text-center">
                <h1 className="text-5xl font-extrabold uppercase tracking-widest text-slate-900 mb-4">{personal_info?.fullName}</h1>
                <div className="w-16 h-1 bg-slate-900 mx-auto mb-4" />
                <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 font-semibold tracking-wider">
                    {personal_info?.email && <span>{personal_info.email.toUpperCase()}</span>}
                    {personal_info?.phone && <span>{personal_info.phone}</span>}
                    {personal_info?.location && <span>{personal_info.location.toUpperCase()}</span>}
                </div>
            </header>

            {summary && (
                <section className="mb-10 border-y border-slate-300 py-6">
                    <p className="text-base leading-relaxed text-slate-800 text-center font-medium italic mx-auto max-w-3xl">
                        "{summary}"
                    </p>
                </section>
            )}

            {experience && experience.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 mb-6 pb-2 border-b-2 border-slate-900">Executive Experience</h2>
                    <div className="space-y-8">
                        {experience.map((exp: any, i: number) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-slate-900 text-lg tracking-wide uppercase">{exp.position}</h3>
                                    <span className="text-sm text-slate-500 font-bold tracking-widest uppercase">
                                        {exp.startDate} - {exp.endDate || 'PRESENT'}
                                    </span>
                                </div>
                                <div className="text-base text-slate-700 font-semibold mb-3 tracking-wide">{exp.company}</div>
                                {exp.description && (
                                    <p className="text-slate-800 leading-relaxed text-justify">
                                        {exp.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div className="grid grid-cols-2 gap-10">
                {education && education.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 mb-6 pb-2 border-b-2 border-slate-900">Education</h2>
                        <div className="space-y-5">
                            {education.map((edu: any, i: number) => (
                                <div key={i}>
                                    <h3 className="font-bold text-slate-900 tracking-wide">{edu.degree}</h3>
                                    <div className="text-slate-700 font-medium mb-1">{edu.field}</div>
                                    <div className="text-sm text-slate-600 italic mb-1">{edu.institution}</div>
                                    <div className="text-xs text-slate-500 font-bold tracking-widest">
                                        {edu.startDate} - {edu.endDate || 'EXPECTED'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 mb-6 pb-2 border-b-2 border-slate-900">Areas of Expertise</h2>
                        <ul className="text-slate-800 flex flex-col gap-2 font-medium">
                            {skills.map((skill: string, i: number) => (
                                <li key={i} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-slate-900" />
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    )
}
