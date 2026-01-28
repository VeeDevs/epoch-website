-- Fix search_path on update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Drop the overly permissive booking insert policy
DROP POLICY IF EXISTS "Anyone can create a booking" ON public.bookings;

-- Create more secure booking insert policy - allow both authenticated users and public submissions
CREATE POLICY "Users can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (
    -- Allow authenticated users to create bookings linked to themselves
    (auth.uid() IS NOT NULL AND user_id = auth.uid())
    OR 
    -- Allow public/anonymous bookings (user_id is null)
    (user_id IS NULL)
  );