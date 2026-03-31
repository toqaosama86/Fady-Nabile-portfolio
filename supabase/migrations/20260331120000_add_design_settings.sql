-- Initialize default design settings in the settings table
-- These settings will be used to customize colors, fonts, and section order

-- Color settings (HSL format: hue saturation lightness)
INSERT INTO public.settings (key, value) 
VALUES 
  ('color_primary', '38 90% 55%'),
  ('color_background', '240 15% 5%'),
  ('color_accent', '38 90% 55%'),
  ('color_gold', '38 90% 55%'),
  ('color_gold_light', '38 85% 70%'),
  ('color_gold_dark', '38 95% 40%'),
  ('color_surface', '240 12% 8%'),
  ('color_surface_elevated', '240 10% 12%'),
  ('color_secondary', '240 10% 12%'),
  ('color_muted', '240 8% 14%')
ON CONFLICT (key) DO NOTHING;

-- Font family settings
INSERT INTO public.settings (key, value)
VALUES
  ('font_family_heading', 'Space Grotesk, sans-serif'),
  ('font_family_body', 'Inter, sans-serif')
ON CONFLICT (key) DO NOTHING;

-- Section order (comma-separated list of section names)
INSERT INTO public.settings (key, value)
VALUES
  ('section_order', 'hero,about,stats,showreel,projects,brands,services,experience,testimonials,process,tools,contact,footer')
ON CONFLICT (key) DO NOTHING;

-- Visibility settings for each section
INSERT INTO public.settings (key, value)
VALUES
  ('section_hero_visible', 'true'),
  ('section_about_visible', 'true'),
  ('section_stats_visible', 'true'),
  ('section_showreel_visible', 'true'),
  ('section_projects_visible', 'true'),
  ('section_brands_visible', 'true'),
  ('section_services_visible', 'true'),
  ('section_experience_visible', 'true'),
  ('section_testimonials_visible', 'true'),
  ('section_process_visible', 'true'),
  ('section_tools_visible', 'true'),
  ('section_contact_visible', 'true'),
  ('section_footer_visible', 'true')
ON CONFLICT (key) DO NOTHING;
