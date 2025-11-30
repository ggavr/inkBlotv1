-- Inkblot Crew Auth Schema
-- Run this migration in your Supabase SQL Editor

-- Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create subscription status enum
CREATE TYPE subscription_status AS ENUM ('none', 'active', 'paused', 'cancelled');

-- Create waitlist status enum
CREATE TYPE waitlist_status AS ENUM ('pending', 'invited', 'active');

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  country TEXT,
  marketing_consent BOOLEAN DEFAULT FALSE,
  terms_accepted_at TIMESTAMPTZ,
  subscription_status subscription_status DEFAULT 'none',
  discord_invite_sent BOOLEAN DEFAULT FALSE,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create library waitlist table
CREATE TABLE IF NOT EXISTS public.library_waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  country TEXT NOT NULL,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  status waitlist_status DEFAULT 'pending',
  UNIQUE(user_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_status ON public.profiles(subscription_status);
CREATE INDEX IF NOT EXISTS idx_library_waitlist_status ON public.library_waitlist(status);
CREATE INDEX IF NOT EXISTS idx_library_waitlist_country ON public.library_waitlist(country);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.library_waitlist ENABLE ROW LEVEL SECURITY;

-- Profiles RLS Policies
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can insert their own profile (for onboarding)
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Library Waitlist RLS Policies
-- Users can view their own waitlist entry
CREATE POLICY "Users can view own waitlist entry"
  ON public.library_waitlist
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own waitlist entry
CREATE POLICY "Users can insert own waitlist entry"
  ON public.library_waitlist
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Service role can do everything (for admin operations)
CREATE POLICY "Service role full access to profiles"
  ON public.profiles
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role full access to waitlist"
  ON public.library_waitlist
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, country, marketing_consent, terms_accepted_at, onboarding_completed)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name'),
    NEW.raw_user_meta_data ->> 'country',
    COALESCE((NEW.raw_user_meta_data ->> 'marketing_consent')::boolean, false),
    CASE 
      WHEN NEW.raw_user_meta_data ->> 'country' IS NOT NULL THEN NOW()
      ELSE NULL
    END,
    -- Mark onboarding as completed if all required fields are present (email/password signup)
    CASE 
      WHEN NEW.raw_user_meta_data ->> 'country' IS NOT NULL THEN true
      ELSE false
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.profiles TO anon, authenticated;
GRANT ALL ON public.library_waitlist TO anon, authenticated;

-- Comments for documentation
COMMENT ON TABLE public.profiles IS 'User profiles with subscription and consent data';
COMMENT ON TABLE public.library_waitlist IS 'Waitlist entries for the Inkblot Library feature';
COMMENT ON COLUMN public.profiles.subscription_status IS 'Synced from Shopify/payment provider';
COMMENT ON COLUMN public.profiles.discord_invite_sent IS 'Whether Discord invite email has been sent';
COMMENT ON COLUMN public.profiles.onboarding_completed IS 'Whether user has completed post-signup onboarding (country + consent)';

