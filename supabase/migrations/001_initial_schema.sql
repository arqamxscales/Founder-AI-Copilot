-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users profile table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'trial', 'pro')),
  analyses_used INTEGER NOT NULL DEFAULT 0,
  analyses_limit INTEGER NOT NULL DEFAULT 1,
  trial_started_at TIMESTAMPTZ,
  trial_ends_at TIMESTAMPTZ,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Startup idea analyses
CREATE TABLE public.analyses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  idea_description TEXT NOT NULL,
  target_market TEXT,
  business_model TEXT,
  stage TEXT CHECK (stage IN ('idea', 'mvp', 'growth', 'scaling')),
  status TEXT NOT NULL DEFAULT 'pending' 
    CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  survive_score INTEGER CHECK (survive_score BETWEEN 0 AND 100),
  overall_verdict TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Individual agent results
CREATE TABLE public.agent_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  analysis_id UUID REFERENCES public.analyses(id) ON DELETE CASCADE NOT NULL,
  agent_name TEXT NOT NULL,
  agent_role TEXT NOT NULL,
  agent_emoji TEXT,
  score INTEGER CHECK (score BETWEEN 0 AND 100),
  verdict TEXT NOT NULL,
  arguments JSONB NOT NULL DEFAULT '[]',
  recommendations JSONB NOT NULL DEFAULT '[]',
  risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agent debate messages (real-time)
CREATE TABLE public.debate_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  analysis_id UUID REFERENCES public.analyses(id) ON DELETE CASCADE NOT NULL,
  agent_name TEXT NOT NULL,
  message TEXT NOT NULL,
  message_type TEXT CHECK (message_type IN ('attack', 'defend', 'question', 'verdict')),
  sequence_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.debate_messages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own analyses" ON public.analyses
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own agent results" ON public.agent_results
  FOR SELECT USING (
    auth.uid() = (SELECT user_id FROM public.analyses WHERE id = analysis_id)
  );

CREATE POLICY "Users can view own debate messages" ON public.debate_messages
  FOR SELECT USING (
    auth.uid() = (SELECT user_id FROM public.analyses WHERE id = analysis_id)
  );

-- Trigger: create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger: update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- RPC: Increment analyses used
CREATE OR REPLACE FUNCTION public.increment_analyses_used(user_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.profiles
  SET analyses_used = analyses_used + 1
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;
