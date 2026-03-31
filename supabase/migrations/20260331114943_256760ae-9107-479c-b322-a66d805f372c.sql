
-- Admin users table
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category TEXT,
  image_url TEXT,
  video_url TEXT,
  link_url TEXT,
  client_name TEXT,
  year TEXT,
  services_provided TEXT,
  results TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Brands table
CREATE TABLE public.brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  link_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

-- Testimonials table
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  author_title TEXT,
  author_image_url TEXT,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Services table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  icon TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Experience table
CREATE TABLE public.experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  position TEXT NOT NULL,
  description TEXT,
  start_date TEXT,
  end_date TEXT,
  is_current BOOLEAN NOT NULL DEFAULT false,
  skills JSONB DEFAULT '[]'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;

-- Tools table
CREATE TABLE public.tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT,
  icon_url TEXT,
  proficiency_level INTEGER NOT NULL DEFAULT 50,
  years_of_experience NUMERIC,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;

-- Settings table (key-value store for all site settings)
CREATE TABLE public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Contact messages table
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Security definer function to check admin status
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = _user_id AND is_active = true
  )
$$;

-- RLS Policies

-- admin_users: only admins can read
CREATE POLICY "Admins can view admin_users" ON public.admin_users
  FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));

-- Projects: public read, admin write
CREATE POLICY "Anyone can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Admins can insert projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update projects" ON public.projects FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete projects" ON public.projects FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- Brands: public read, admin write
CREATE POLICY "Anyone can view brands" ON public.brands FOR SELECT USING (true);
CREATE POLICY "Admins can insert brands" ON public.brands FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update brands" ON public.brands FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete brands" ON public.brands FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- Testimonials: public read, admin write
CREATE POLICY "Anyone can view testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Admins can insert testimonials" ON public.testimonials FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update testimonials" ON public.testimonials FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete testimonials" ON public.testimonials FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- Services: public read, admin write
CREATE POLICY "Anyone can view services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admins can insert services" ON public.services FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update services" ON public.services FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete services" ON public.services FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- Experience: public read, admin write
CREATE POLICY "Anyone can view experience" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Admins can insert experience" ON public.experience FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update experience" ON public.experience FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete experience" ON public.experience FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- Tools: public read, admin write
CREATE POLICY "Anyone can view tools" ON public.tools FOR SELECT USING (true);
CREATE POLICY "Admins can insert tools" ON public.tools FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update tools" ON public.tools FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete tools" ON public.tools FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- Settings: public read, admin write
CREATE POLICY "Anyone can view settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Admins can insert settings" ON public.settings FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update settings" ON public.settings FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete settings" ON public.settings FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- Contact messages: anyone can insert, admin can read/delete
CREATE POLICY "Anyone can submit contact" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view contacts" ON public.contact_messages FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete contacts" ON public.contact_messages FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- Storage bucket for portfolio assets
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-assets', 'portfolio-assets', true);

-- Storage policies
CREATE POLICY "Anyone can view portfolio assets" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-assets');
CREATE POLICY "Admins can upload portfolio assets" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-assets' AND public.is_admin(auth.uid()));
CREATE POLICY "Admins can update portfolio assets" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-assets' AND public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete portfolio assets" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio-assets' AND public.is_admin(auth.uid()));
