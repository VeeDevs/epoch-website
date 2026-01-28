-- Update reviews table to auto-approve by default
ALTER TABLE public.reviews ALTER COLUMN is_approved SET DEFAULT true;

-- Also allow anyone to insert reviews (not just authenticated users)
DROP POLICY IF EXISTS "Authenticated users can create reviews" ON public.reviews;

CREATE POLICY "Anyone can create reviews" 
ON public.reviews 
FOR INSERT 
WITH CHECK (true);