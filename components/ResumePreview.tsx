import { Resume } from '@/types'
import dynamic from 'next/dynamic'

const ModernTemplate = dynamic(() => import('./templates/ModernTemplate'))
const ProfessionalTemplate = dynamic(() => import('./templates/ProfessionalTemplate'))
const CreativeTemplate = dynamic(() => import('./templates/CreativeTemplate'))
const DeveloperTemplate = dynamic(() => import('./templates/DeveloperTemplate'))
const ExecutiveTemplate = dynamic(() => import('./templates/ExecutiveTemplate'))
const MinimalistTemplate = dynamic(() => import('./templates/MinimalistTemplate'))

export default function ResumePreview({ resume }: { resume: Resume }) {
    let aiContent = null
    try {
        if (resume.ai_generated_content) {
            aiContent = JSON.parse(resume.ai_generated_content)
        }
    } catch (e) {
        console.error("Failed to parse AI content")
    }

    const templateId = resume.personal_info?.template || 'modern'

    const renderTemplate = () => {
        switch (templateId) {
            case 'modern': return <ModernTemplate resume={resume} aiContent={aiContent} />;
            case 'professional': return <ProfessionalTemplate resume={resume} aiContent={aiContent} />;
            case 'creative': return <CreativeTemplate resume={resume} aiContent={aiContent} />;
            case 'developer': return <DeveloperTemplate resume={resume} aiContent={aiContent} />;
            case 'executive': return <ExecutiveTemplate resume={resume} aiContent={aiContent} />;
            case 'minimalist': return <MinimalistTemplate resume={resume} aiContent={aiContent} />;
            default: return <ModernTemplate resume={resume} aiContent={aiContent} />;
        }
    }

    return (
        <div id="resume-preview" className="shadow-2xl rounded-sm w-full max-w-[210mm] mx-auto overflow-hidden bg-white border border-slate-200">
            {renderTemplate()}
        </div>
    )
}
