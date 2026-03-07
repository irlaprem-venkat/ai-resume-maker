import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ModernTemplate from "@/components/templates/ModernTemplate";
import CreativeTemplate from "@/components/templates/CreativeTemplate";
import DeveloperTemplate from "@/components/templates/DeveloperTemplate";
import ExecutiveTemplate from "@/components/templates/ExecutiveTemplate";
import MinimalistTemplate from "@/components/templates/MinimalistTemplate";
import ProfessionalTemplate from "@/components/templates/ProfessionalTemplate";

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const supabase = createClient();
    const { data: resume } = await supabase
        .from("resumes")
        .select("title, profiles(full_name)")
        .eq("public_slug", params.slug)
        .eq("is_public", true)
        .single();

    if (!resume) return { title: "Resume Not Found" };

    return {
        title: `${(resume as any).profiles?.full_name}'s Resume | ${resume.title}`,
        description: "Professional AI-Generated Resume",
    };
}

export default async function PublicResumePage({ params }: Props) {
    const supabase = createClient();

    // Fetch Resume Metadata
    const { data: resume, error: resumeError } = await supabase
        .from("resumes")
        .select("*, profiles(full_name, avatar_url, email)")
        .eq("public_slug", params.slug)
        .eq("is_public", true)
        .single();

    if (resumeError || !resume) {
        notFound();
    }

    // Fetch Resume Content Structure
    const { data: sectionData } = await supabase
        .from("resume_sections")
        .select("content")
        .eq("resume_id", resume.id)
        .single();

    const data = sectionData?.content || { personalInfo: {}, experience: [], education: [], skills: [] };

    // Construct the resume object that templates expect
    const fullResume = {
        ...resume,
        personal_info: {
            fullName: resume.profiles?.full_name || "",
            email: resume.profiles?.email || "",
            ...(data.personalInfo || {})
        },
        experience: data.experience || [],
        education: data.education || [],
        skills: data.skills || []
    };

    // Dynamically render the template
    let TemplateComponent = MinimalistTemplate;

    switch (resume.template_id) {
        case "modern-tech":
        case "modern":
            TemplateComponent = ModernTemplate; break;
        case "creative-designer":
        case "creative":
            TemplateComponent = CreativeTemplate; break;
        case "developer":
            TemplateComponent = DeveloperTemplate; break;
        case "corporate-executive":
        case "executive":
            TemplateComponent = ExecutiveTemplate; break;
        case "professional":
            TemplateComponent = ProfessionalTemplate; break;
        case "minimal":
        default:
            TemplateComponent = MinimalistTemplate; break;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-8">
            <div className="bg-white text-black shadow-2xl rounded-sm overflow-hidden w-full max-w-[210mm] min-h-[297mm]">
                <TemplateComponent resume={fullResume as any} aiContent={data} />
            </div>
        </div>
    );
}
