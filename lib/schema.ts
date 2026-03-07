import * as z from 'zod'

export const resumeSchema = z.object({
    personalInfo: z.object({
        fullName: z.string().min(2, 'Name is required'),
        email: z.string().email('Invalid email address'),
        phone: z.string().optional(),
        location: z.string().optional(),
        website: z.string().optional(),
        summary: z.string().optional(),
        template: z.string().optional().default('modern')
    }),
    experience: z.array(
        z.object({
            company: z.string().min(2, 'Company is required'),
            position: z.string().min(2, 'Position is required'),
            startDate: z.string().min(1, 'Start date is required'),
            endDate: z.string().optional(),
            description: z.string().optional()
        })
    ),
    education: z.array(
        z.object({
            institution: z.string().min(2, 'Institution is required'),
            degree: z.string().min(2, 'Degree is required'),
            field: z.string().min(2, 'Field is required'),
            startDate: z.string().min(1, 'Start date is required'),
            endDate: z.string().optional()
        })
    ),
    skills: z.string().min(2, 'At least one skill is required (comma separated)')
})

export type ResumeFormValues = z.infer<typeof resumeSchema>
