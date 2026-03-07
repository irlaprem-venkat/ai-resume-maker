import { Resume } from '@/types'
import dynamic from 'next/dynamic'

const ModernTemplate = dynamic(() => import('./templates/ModernTemplate'))
const ProfessionalTemplate = dynamic(() => import('./templates/ProfessionalTemplate'))
const CreativeTemplate = dynamic(() => import('./templates/CreativeTemplate'))
const DeveloperTemplate = dynamic(() => import('./templates/DeveloperTemplate'))
const ExecutiveTemplate = dynamic(() => import('./templates/ExecutiveTemplate'))
const MinimalistTemplate = dynamic(() => import('./templates/MinimalistTemplate'))

export default function ResumePreview({ resume }: { resume: any }) {
    // Standardize mapping: The API saves personalInfo (camelCase) to resume_sections
    // but templates expect personal_info (snake_case).
    const personal_info = resume.personal_info || resume.personalInfo || {};

    // The rest of the AI content (summary, experience, education, skills) 
    // is also merged into the resume object.
    const aiContent = resume;

    // Create a standardized resume object for the templates
    const standardizedResume = {
        ...resume,
        personal_info
    };

    const templateId = resume.template_id || 'modern'

    const renderTemplate = () => {
        const props = { resume: standardizedResume, aiContent };
        switch (templateId) {
            case 'modern': return <ModernTemplate {...props} />;
            case 'professional': return <ProfessionalTemplate {...props} />;
            case 'creative': return <CreativeTemplate {...props} />;
            case 'developer': return <DeveloperTemplate {...props} />;
            case 'executive': return <ExecutiveTemplate {...props} />;
            case 'minimalist': return <MinimalistTemplate {...props} />;
            default: return <ModernTemplate {...props} />;
        }
    }

    return (
        <div id="resume-preview" className="shadow-2xl rounded-sm w-full max-w-[210mm] mx-auto overflow-hidden bg-white border border-slate-200">
            {renderTemplate()}
        </div>
    )
}
