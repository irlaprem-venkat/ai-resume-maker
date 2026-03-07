import { Resume } from '@/types'

export default function DeveloperTemplate({ resume, aiContent }: { resume: Resume, aiContent: any }) {
    const { personal_info } = resume
    const experience = aiContent?.experience || resume.experience
    const education = aiContent?.education || resume.education
    const summary = aiContent?.summary || personal_info?.summary
    const skills = aiContent?.skills || resume.skills

    return (
        <div className="bg-[#0D1117] text-[#C9D1D9] w-full min-h-[297mm] h-full p-10 font-mono text-sm leading-relaxed border-t-4 border-[#58A6FF]">
            <header className="mb-8 border-b border-[#30363D] pb-6">
                <div className="flex justify-between items-end mb-4">
                    <h1 className="text-4xl font-bold text-[#58A6FF] tracking-tight">{personal_info?.fullName}</h1>
                    <div className="text-right text-[#8B949E] text-xs space-y-1">
                        {personal_info?.email && <div>{`// ${personal_info.email}`}</div>}
                        {personal_info?.phone && <div>{`// ${personal_info.phone}`}</div>}
                        {personal_info?.location && <div>{`// ${personal_info.location}`}</div>}
                        {personal_info?.website && <div>{`// ${personal_info.website}`}</div>}
                    </div>
                </div>
            </header>

            {summary && (
                <section className="mb-8">
                    <h2 className="text-[#3FB950] font-bold mb-3 flex items-center gap-2 text-base">
                        <span className="text-[#8B949E]">{`>`}</span> about_me.md
                    </h2>
                    <p className="text-[#C9D1D9] text-justify bg-[#161B22] p-4 rounded border border-[#30363D]">{summary}</p>
                </section>
            )}

            {skills && skills.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-[#3FB950] font-bold mb-3 flex items-center gap-2 text-base">
                        <span className="text-[#8B949E]">{`>`}</span> tech_stack.json
                    </h2>
                    <div className="flex flex-wrap gap-2 bg-[#161B22] p-4 rounded border border-[#30363D]">
                        {skills.map((skill: string, i: number) => (
                            <span key={i} className="text-[#58A6FF] bg-[#1F2428] px-2 py-0.5 rounded text-xs border border-[#30363D]">
                                "{skill}"{i < skills.length - 1 ? ',' : ''}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {experience && experience.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-[#3FB950] font-bold mb-4 flex items-center gap-2 text-base">
                        <span className="text-[#8B949E]">{`>`}</span> git log --author="{personal_info?.fullName?.split(' ')[0]}"
                    </h2>
                    <div className="space-y-6">
                        {experience.map((exp: any, i: number) => (
                            <div key={i} className="relative pl-4 border-l-2 border-[#30363D]">
                                <div className="absolute w-2 h-2 bg-[#8B949E] rounded-full -left-[5px] top-1.5" />
                                <div className="mb-2">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-[#E6EDF3] text-base">{exp.position}</h3>
                                        <span className="text-[#8B949E] text-xs">
                                            [{exp.startDate} - {exp.endDate || 'HEAD'}]
                                        </span>
                                    </div>
                                    <div className="text-[#A5D6FF] font-semibold text-sm">@{exp.company}</div>
                                </div>
                                {exp.description && (
                                    <div className="text-[#C9D1D9] space-y-1.5 mt-2">
                                        {exp.description.split('\n').filter((d: string) => d.trim()).map((item: string, j: number) => (
                                            <div key={j} className="flex gap-2">
                                                <span className="text-[#D2A8FF] shrink-0">*</span>
                                                <span className="leading-relaxed">{item.replace(/^- /, '')}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {education && education.length > 0 && (
                <section>
                    <h2 className="text-[#3FB950] font-bold mb-3 flex items-center gap-2 text-base">
                        <span className="text-[#8B949E]">{`>`}</span> cat education.txt
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {education.map((edu: any, i: number) => (
                            <div key={i} className="bg-[#161B22] p-4 rounded border border-[#30363D]">
                                <h3 className="font-bold text-[#E6EDF3]">{edu.degree} in {edu.field}</h3>
                                <div className="text-[#8B949E] mt-1">{edu.institution}</div>
                                <div className="text-[#8B949E] text-xs mt-2">Status: {edu.startDate} - {edu.endDate || 'Expected'}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
