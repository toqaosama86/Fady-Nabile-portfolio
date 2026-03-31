-- Add favicon and CV URL settings
INSERT INTO public.settings (key, value) 
VALUES 
  ('site_favicon_url', ''),
  ('site_cv_url', '')
ON CONFLICT (key) DO NOTHING;
