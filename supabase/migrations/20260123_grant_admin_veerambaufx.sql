-- Grant admin privileges to veerambaufx@gmail.com
-- This migration inserts an admin role for the specified user

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users
WHERE email = 'veerambaufx@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;
