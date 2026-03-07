import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { text, instruction } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "GROQ_API_KEY is not configured" }, { status: 500 });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are an expert ATS resume optimizer. Your task is to enhance the provided text based on the instruction. Output ONLY the enhanced text. No introductory remarks, no quotes around the output, no conversational filler." },
          { role: "user", content: `Context: ${text}\nInstruction: ${instruction}` }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      console.error("Groq API error:", response.status, response.statusText);
      throw new Error("API Route Failed");
    }
    const data = await response.json();

    return NextResponse.json({ result: data.choices[0].message.content });
  } catch (error) {
    console.error("AI Enhance Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
