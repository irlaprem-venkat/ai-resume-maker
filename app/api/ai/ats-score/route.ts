import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const { resumeContent, targetJobDescription } = await req.json();
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: "GROQ_API_KEY is not configured" }, { status: 500 });
        }

        const prompt = `
    You are an expert ATS (Applicant Tracking System) parser and recruiter.
    Analyze the provided Resume Content against the Target Job Description (if provided).
    
    Resume Content: ${JSON.stringify(resumeContent)}
    Target Job Description: ${targetJobDescription || "None provided, evaluate against general best practices"}

    Return ONLY a JSON object with the following structure. Do not wrap in markdown tags or include any other text.
    {
      "score": <number between 0 and 100>,
      "keywordMatches": [<array of strings>],
      "missingSkills": [<array of strings>],
      "recommendations": [<array of strings>]
    }
    `;

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama3-70b-8192",
                messages: [
                    { role: "system", content: "You output only valid JSON. No prefix or suffix." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.1,
                response_format: { type: "json_object" }
            })
        });

        if (!response.ok) {
            console.error("Groq ATS Score error:", response.status, response.statusText);
            throw new Error("ATS Score API Failed");
        }
        const data = await response.json();

        // Parse the JSON strictly from Groq
        const result = JSON.parse(data.choices[0].message.content);

        return NextResponse.json(result);
    } catch (error) {
        console.error("ATS Score Error:", error);
        return NextResponse.json({ error: "Failed to evaluate ATS Score" }, { status: 500 });
    }
}
