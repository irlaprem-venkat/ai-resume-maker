import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
    try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()

        // Ensure user profile exists (Safety check for constraint)
        const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', user.id)
            .single()

        if (!profile) {
            await supabase.from('profiles').insert({
                id: user.id,
                email: user.email!,
                full_name: user.user_metadata?.full_name || body.personalInfo.fullName
            })
        }

        const apiKey = process.env.GROQ_API_KEY
        let parsedAIContent = null

        if (apiKey) {
            const systemPrompt = `You are a professional resume writer. You MUST respond with a valid JSON object. 
            Do not include any text, markdown, or commentary before or after the JSON.`
            const userPrompt = `Rewrite this resume professionally. Ensure the output matches this EXACT schema:
            {
              "summary": "professional summary text",
              "experience": [{"company": "...", "position": "...", "startDate": "...", "endDate": "...", "description": "..."}],
              "education": [{"institution": "...", "degree": "...", "field": "...", "startDate": "...", "endDate": "..."}],
              "skills": ["skill1", "skill2"]
            }
            
            Input Data: ${JSON.stringify(body)}`

            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userPrompt }
                    ],
                    temperature: 0.3,
                    response_format: { type: "json_object" }
                })
            })

            if (response.ok) {
                const result = await response.json()
                try {
                    parsedAIContent = JSON.parse(result.choices[0].message.content)
                } catch (e) {
                    console.error('JSON Parse Error')
                }
            }
        }

        // If AI failed or no key, use raw data
        if (!parsedAIContent) {
            parsedAIContent = {
                summary: body.personalInfo.summary,
                experience: body.experience,
                education: body.education,
                skills: typeof body.skills === 'string' ? body.skills.split(',').map((s: string) => s.trim()) : body.skills
            }
        }

        // Final step: Merge personalInfo into the content we save
        const finalContent = {
            ...parsedAIContent,
            personalInfo: body.personalInfo
        }

        // Insert Resume
        const { data: resume, error: rErr } = await supabase
            .from('resumes')
            .insert({
                user_id: user.id,
                title: `${body.personalInfo.fullName}'s Resume`,
                template_id: body.personalInfo.template || 'modern'
            })
            .select().single()

        if (rErr) throw rErr

        // Insert Sections
        const { error: sErr } = await supabase
            .from('resume_sections')
            .insert({
                resume_id: resume.id,
                content: finalContent
            })

        if (sErr) throw sErr

        return NextResponse.json({ success: true, resumeId: resume.id })
    } catch (error: any) {
        console.error('API Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
