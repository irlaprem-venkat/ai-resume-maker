-- Profiles table linked to auth.users
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free', -- 'free', 'pro'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Core Resume metadata
CREATE TABLE public.resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,           -- e.g., "Software Engineer Roles"
  template_id TEXT NOT NULL,     -- e.g., "modern-tech", "minimal"
  theme_color TEXT DEFAULT '#0f172a',
  ats_score INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT false,
  public_slug TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- JSONB document storage for flexible drag-and-drop resume data
CREATE TABLE public.resume_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID REFERENCES public.resumes(id) ON DELETE CASCADE UNIQUE,
  content JSONB NOT NULL DEFAULT '{}', -- structure: { personal: {}, experience: [], education: [], skills: [], projects: [] }
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics & Tracking
CREATE TABLE public.ai_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,     -- e.g., "generate_summary", "improve_bullet"
  prompt_tokens INTEGER,
  completion_tokens INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  resume_id UUID REFERENCES public.resumes(id) ON DELETE CASCADE,
  format TEXT NOT NULL,          -- "pdf", "docx"
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies Example
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can access their own profile" ON public.profiles FOR ALL USING (auth.uid() = id);

-- Automatic Profile Creation Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access their own resumes" ON public.resumes FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.resume_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can access their resume sections" ON public.resume_sections FOR ALL USING (
  EXISTS (SELECT 1 FROM public.resumes WHERE resumes.id = resume_sections.resume_id AND resumes.user_id = auth.uid())
);

ALTER TABLE public.ai_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their ai logs" ON public.ai_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their ai logs" ON public.ai_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their downloads" ON public.downloads FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their downloads" ON public.downloads FOR INSERT WITH CHECK (auth.uid() = user_id);
