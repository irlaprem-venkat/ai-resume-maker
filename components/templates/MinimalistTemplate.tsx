import { Resume } from '@/types'

export default function MinimalistTemplate({ resume, aiContent }: { resume: any, aiContent: any }) {
    const info = resume.personal_info || resume.personalInfo || resume || {};
    const experience = aiContent?.experience || resume.experience || [];
    const education = aiContent?.education || resume.education || [];
    const summary = aiContent?.summary || info.summary;
    const skills = aiContent?.skills || resume.skills || [];
    const personal_info = info;

    return (
        <div className="bg-white text-black w-full min-h-[297mm] h-full p-12 font-sans tracking-wide">
            <header className="mb-12">
                <h1 className="text-3xl font-normal mb-2 tracking-widest">{personal_info?.fullName}</h1>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
                    {personal_info?.email && <span>{personal_info.email}</span>}
                    {personal_info?.phone && <span>{personal_info.phone}</span>}
                    {personal_info?.location && <span>{personal_info.location}</span>}
                    {personal_info?.website && <a href={personal_info.website}>{personal_info.website}</a>}
                </div>
            </header>

            {summary && (
                <section className="mb-10">
                    <p className="text-sm leading-8 text-gray-700 font-light">{summary}</p>
                </section>
            )}

            {experience && experience.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-6">Experience</h2>
                    <div className="space-y-8">
                        {experience.map((exp: any, i: number) => (
                            <div key={i} className="grid grid-cols-12 gap-4">
                                <div className="col-span-3 text-xs text-gray-500 font-medium pt-1">
                                    {exp.startDate} - <br /> {exp.endDate || 'Present'}
                                </div>
                                <div className="col-span-9">
                                    <h3 className="font-medium text-base mb-1">{exp.position}</h3>
                                    <div className="text-sm text-gray-600 mb-3">{exp.company}</div>
                                    {exp.description && (
                                        <div className="text-sm text-gray-700 leading-relaxed font-light space-y-2">
                                            {exp.description.split('\n').filter((d: string) => d.trim()).map((item: string, j: number) => (
                                                <p key={j}>{item.replace(/^- /, '')}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div className="grid grid-cols-12 gap-4">
                {education && education.length > 0 && (
                    <section className="col-span-6 pr-4">
                        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-6">Education</h2>
                        <div className="space-y-6">
                            {education.map((edu: any, i: number) => (
                                <div key={i}>
                                    <h3 className="font-medium mb-1">{edu.degree} — {edu.field}</h3>
                                    <div className="text-sm text-gray-600 mb-1">{edu.institution}</div>
                                    <div className="text-xs text-gray-400">
                                        {edu.startDate} - {edu.endDate || 'Expected'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {skills && skills.length > 0 && (
                    <section className="col-span-6 pl-4 border-l border-gray-100">
                        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-6">Skills</h2>
                        <div className="flex flex-col gap-2 text-sm text-gray-700 font-light">
                            {skills.map((skill: string, i: number) => (
                                <div key={i}>{skill}</div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
