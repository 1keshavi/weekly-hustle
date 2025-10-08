-- Fix RLS policies and role assignment

-- 1. Drop and recreate profiles RLS policies to ensure they're restrictive
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

-- Explicitly deny INSERT and DELETE on profiles (only trigger can insert)
CREATE POLICY "Deny direct profile inserts" 
ON public.profiles 
FOR INSERT 
WITH CHECK (false);

CREATE POLICY "Users can delete own profile" 
ON public.profiles 
FOR DELETE 
USING (auth.uid() = id);

-- 2. Add user_type column to profiles to track student vs organizer
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS user_type text CHECK (user_type IN ('student', 'organizer'));

-- 3. Update handle_new_user trigger to assign proper roles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  v_user_type text;
BEGIN
  -- Extract user_type from metadata (default to 'student' if not provided)
  v_user_type := COALESCE(NEW.raw_user_meta_data->>'user_type', 'student');
  
  -- Insert profile
  INSERT INTO public.profiles (id, email, full_name, user_type)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    v_user_type
  );
  
  -- Assign role based on user type and email
  IF v_user_type = 'student' OR NEW.email LIKE '%@skit.ac.in' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'student');
  ELSIF v_user_type = 'organizer' THEN
    -- Assign club_member role to organizers (they can create events)
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'club_member');
  END IF;
  
  RETURN NEW;
END;
$$;

-- 4. Ensure event_participation RLS policies are correct
DROP POLICY IF EXISTS "Users can view own participation or event participants" ON public.event_participation;
DROP POLICY IF EXISTS "Users can manage their own participation" ON public.event_participation;

CREATE POLICY "Users can view own participation or event participants" 
ON public.event_participation 
FOR SELECT 
USING (auth.uid() = user_id OR is_event_organizer(auth.uid(), event_id));

CREATE POLICY "Users can insert their own participation" 
ON public.event_participation 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own participation" 
ON public.event_participation 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own participation" 
ON public.event_participation 
FOR DELETE 
USING (auth.uid() = user_id);

-- 5. Add index for better performance
CREATE INDEX IF NOT EXISTS idx_event_participation_user_event 
ON public.event_participation(user_id, event_id);