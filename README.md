# AI Resume Maker SaaS V2.0

A production-grade Next.js SaaS application that uses AI to construct, optimize, and score professional resumes.

## Features Built
- 🪄 **AI Content Generation**: Powered by Groq/Llama-3 for instant resume summaries and bullet points.
- 🎯 **ATS Scoring Engine**: Analyzes your resume against job descriptions to provide a compatibility score.
- 🎨 **Premium UI/UX**: Built with Framer Motion, TailwindCSS, and ShadCN. Dark mode glassmorphism aesthetics.
- 📄 **6 Template Variations**: Ranging from minimalist to modern-tech designs.
- 🔗 **Public Resumes & QR Codes**: Publish your resume to a public URL and generate an optimized QR code.
- 💾 **Supabase Integration**: Edge-ready PostgreSQL database with secure RLS and Auth.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Database/Auth**: Supabase
- **Styling**: Tailwind CSS, ShadCN UI
- **Animations**: Framer Motion, React Three Fiber
- **AI Provider**: Groq API
- **State Management**: Zustand, React Hook Form

---

## 🚀 Setting Up the Project Locally

### 1. Requirements
Ensure you have Node.js 18.17+ and Git installed.

### 2. Clone and Install
```bash
git clone <repository-url>
cd ai-resume-maker
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Groq API for AI Generation
GROQ_API_KEY=your_groq_api_key
```

### 4. Database Setup
1. Create a project on [Supabase](https://supabase.com).
2. Go to the SQL Editor and paste the contents of `schema.sql` located in this root directory to initialize the tables and Row Level Security (RLS) policies.

### 5. Run the Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deployment to Vercel

1. **Push to GitHub**:
   Upload your local project to a GitHub repository.
2. **Import to Vercel**:
   Log into [Vercel](https://vercel.com/) and click **Add New** -> **Project**. Select your newly pushed GitHub repository.
3. **Configure Environment Variables**:
   In the Vercel deployment settings, add all the variables from your `.env.local` file.
4. **Deploy**:
   Click Deploy. Vercel automatically detects Next.js configurations (`next build`).
   Your application will be live globally on Vercel's Edge Network in minutes!

## Production Best Practices Implemented
- **Edge Deployment**: AI inference endpoints (`/api/ai/enhance`, `/api/ai/ats-score`) are marked explicitly as `export const runtime = 'edge'` for minimal latency.
- **Strict RLS**: All database interactions are protected by Supabase RLS directly attached to `auth.uid()`, strictly isolating user data.
- **Client/Server Partitions**: Leveraging React Server Components for dashboards, and limiting heavy stateful components to `app/(editor)` bundles only.
