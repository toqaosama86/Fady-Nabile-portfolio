-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT,
  image_url TEXT,
  link_url TEXT,
  display_order INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  link_url TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  author_title TEXT,
  author_image_url TEXT,
  content TEXT NOT NULL,
  rating INT DEFAULT 5,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  display_order INT DEFAULT 0,
  features JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create experience table
CREATE TABLE IF NOT EXISTS experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  position TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  skills JSONB DEFAULT '[]'::jsonb,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create tools table
CREATE TABLE IF NOT EXISTS tools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  icon_url TEXT,
  proficiency_level INT DEFAULT 50,
  years_of_experience DECIMAL(3,1),
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  role TEXT DEFAULT 'admin',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access
CREATE POLICY "projects_public_read" ON projects FOR SELECT USING (true);
CREATE POLICY "brands_public_read" ON brands FOR SELECT USING (true);
CREATE POLICY "testimonials_public_read" ON testimonials FOR SELECT USING (true);
CREATE POLICY "services_public_read" ON services FOR SELECT USING (true);
CREATE POLICY "experience_public_read" ON experience FOR SELECT USING (true);
CREATE POLICY "tools_public_read" ON tools FOR SELECT USING (true);
CREATE POLICY "settings_public_read" ON settings FOR SELECT USING (true);

-- Create RLS policies for admin write access
CREATE POLICY "projects_admin_write" ON projects FOR INSERT, UPDATE, DELETE 
  USING (auth.uid() IN (SELECT user_id FROM admin_users WHERE is_active = true));

CREATE POLICY "brands_admin_write" ON brands FOR INSERT, UPDATE, DELETE 
  USING (auth.uid() IN (SELECT user_id FROM admin_users WHERE is_active = true));

CREATE POLICY "testimonials_admin_write" ON testimonials FOR INSERT, UPDATE, DELETE 
  USING (auth.uid() IN (SELECT user_id FROM admin_users WHERE is_active = true));

CREATE POLICY "services_admin_write" ON services FOR INSERT, UPDATE, DELETE 
  USING (auth.uid() IN (SELECT user_id FROM admin_users WHERE is_active = true));

CREATE POLICY "experience_admin_write" ON experience FOR INSERT, UPDATE, DELETE 
  USING (auth.uid() IN (SELECT user_id FROM admin_users WHERE is_active = true));

CREATE POLICY "tools_admin_write" ON tools FOR INSERT, UPDATE, DELETE 
  USING (auth.uid() IN (SELECT user_id FROM admin_users WHERE is_active = true));

CREATE POLICY "settings_admin_write" ON settings FOR INSERT, UPDATE, DELETE 
  USING (auth.uid() IN (SELECT user_id FROM admin_users WHERE is_active = true));

CREATE POLICY "admin_users_admin_only" ON admin_users FOR SELECT, INSERT, UPDATE, DELETE 
  USING (auth.uid() IN (SELECT user_id FROM admin_users WHERE is_active = true));

-- Create indexes for better performance
CREATE INDEX idx_projects_display_order ON projects(display_order);
CREATE INDEX idx_projects_is_featured ON projects(is_featured);
CREATE INDEX idx_brands_display_order ON brands(display_order);
CREATE INDEX idx_testimonials_display_order ON testimonials(display_order);
CREATE INDEX idx_services_display_order ON services(display_order);
CREATE INDEX idx_experience_display_order ON experience(display_order);
CREATE INDEX idx_tools_display_order ON tools(display_order);
CREATE INDEX idx_settings_key ON settings(key);
CREATE INDEX idx_admin_users_user_id ON admin_users(user_id);
