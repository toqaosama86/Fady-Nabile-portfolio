import { useSettings } from '@/hooks/useDatabase';
import { useDesignSettings } from '@/hooks/useDesignSettings';
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ShowreelSection } from "@/components/sections/ShowreelSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { BrandsSection } from "@/components/sections/BrandsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ToolsSection } from "@/components/sections/ToolsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FooterSection } from "@/components/sections/FooterSection";

// Map of section IDs to their components
const sectionComponents: Record<string, React.ReactNode> = {
  navbar: <Navbar />,
  hero: <HeroSection />,
  about: <AboutSection />,
  stats: <StatsSection />,
  showreel: <ShowreelSection />,
  projects: <ProjectsSection />,
  brands: <BrandsSection />,
  services: <ServicesSection />,
  experience: <ExperienceSection />,
  testimonials: <TestimonialsSection />,
  process: <ProcessSection />,
  tools: <ToolsSection />,
  contact: <ContactSection />,
  footer: <FooterSection />,
};

const Index = () => {
  // Apply design settings (colors, fonts) from database
  useDesignSettings();

  // Get section order and visibility from settings
  const { data: settings = [] } = useSettings();

  // Convert settings to map
  const settingsMap: Record<string, string> = {};
  settings.forEach((s) => {
    if (s.value) settingsMap[s.key] = s.value;
  });

  // Parse section order from settings
  const sectionOrder = settingsMap.section_order
    ? settingsMap.section_order.split(',')
    : [
        'hero',
        'about',
        'stats',
        'showreel',
        'projects',
        'brands',
        'services',
        'experience',
        'testimonials',
        'process',
        'tools',
        'contact',
        'footer',
      ];

  // Filter sections based on visibility settings
  const visibleSections = sectionOrder.filter((sectionId) => {
    const visibilityKey = `section_${sectionId}_visible`;
    // Default to true if not specified
    return settingsMap[visibilityKey] !== 'false';
  });

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      {visibleSections.map((sectionId) => (
        <div key={sectionId}>
          {sectionComponents[sectionId]}
        </div>
      ))}
    </main>
  );
};

export default Index;
