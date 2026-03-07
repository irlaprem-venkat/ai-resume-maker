export interface Resume {
    id: string;
    user_id: string;
    title: string;
    personal_info: PersonalInfo;
    experience: Experience[];
    education: Education[];
    skills: string[];
    ai_generated_content: string | null;
    created_at: string;
    updated_at: string;
}

export interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin?: string;
    summary: string;
    template?: string;
}

export interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
}
