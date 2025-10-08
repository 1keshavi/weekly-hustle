-- Fix update_event_counts function to add search_path
CREATE OR REPLACE FUNCTION public.update_event_counts()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.status = 'interested' THEN
      UPDATE public.events SET interested_count = interested_count + 1 WHERE id = NEW.event_id;
    ELSIF NEW.status = 'going' THEN
      UPDATE public.events SET going_count = going_count + 1 WHERE id = NEW.event_id;
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.status = 'interested' THEN
      UPDATE public.events SET interested_count = interested_count - 1 WHERE id = OLD.event_id;
    ELSIF OLD.status = 'going' THEN
      UPDATE public.events SET going_count = going_count - 1 WHERE id = OLD.event_id;
    END IF;
    IF NEW.status = 'interested' THEN
      UPDATE public.events SET interested_count = interested_count + 1 WHERE id = NEW.event_id;
    ELSIF NEW.status = 'going' THEN
      UPDATE public.events SET going_count = going_count + 1 WHERE id = NEW.event_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.status = 'interested' THEN
      UPDATE public.events SET interested_count = interested_count - 1 WHERE id = OLD.event_id;
    ELSIF OLD.status = 'going' THEN
      UPDATE public.events SET going_count = going_count - 1 WHERE id = OLD.event_id;
    END IF;
  END IF;
  RETURN NULL;
END;
$function$;

-- Create helper function to check if user is event organizer
CREATE OR REPLACE FUNCTION public.is_event_organizer(_user_id uuid, _event_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.events
    WHERE id = _event_id
      AND created_by = _user_id
  )
$$;

-- Fix profiles RLS policy - users can only see their own profile
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Fix event_participation RLS policy - users can see their own participation, organizers can see their event's participants
DROP POLICY IF EXISTS "Users can view all participation" ON public.event_participation;
CREATE POLICY "Users can view own participation or event participants"
ON public.event_participation
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id 
  OR public.is_event_organizer(auth.uid(), event_id)
);