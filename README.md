# AI Resume Maker

A full-stack, Next.js (App Router) based production-ready web application that helps users create professional, ATS-friendly resumes using AI.

## Features
- **Modern UI**: Clean, responsive design built with Tailwind CSS.
- **Authentication**: Secure email/password login using Supabase Auth.
- **AI Optimization**: Uses Groq API (Llama3) to format and improve resume content with strong action verbs and professional phrasing.
- **PDF Export**: Instantly download your formatted resume as a PDF.
- **Secure Storage**: All data is securely stored in a Supabase PostgreSQL database with Row Level Security (RLS) policies.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, `lucide-react` icons
- **Form Handling**: `react-hook-form`, `zod`
- **Database & Auth**: Supabase (PostgreSQL)
- **AI Integration**: Groq API
- **PDF Generation**: `html2pdf.js`

## Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd ai-resume-maker
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Copy the `.env.example` file to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in the following variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `AI_API_KEY`

### 4. Supabase Setup
Run the SQL script provided in `schema.sql` inside your Supabase project's SQL Editor to set up the database schema and Row Level Security policies.

### 5. Start Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` in your browser.

## Deployment
This project is optimized for deployment on [Vercel](https://vercel.com/):
1. Push your code to GitHub.
2. Import the project into Vercel.
3. Add your environment variables in the Vercel dashboard.
4. Deploy!
