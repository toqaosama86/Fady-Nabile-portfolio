import { useSettings } from '@/hooks/useDatabase';
import { useDesignSettings } from '@/hooks/useDesignSettings';
import { Navbar } from "@/components/Navbar";
import { Suspense, lazy, memo } from 'react';

// Lazy load all sections to reduce initial bundle
const HeroSection = lazy(() => import("@/components/sections/HeroSection").then(m => ({ default: m.HeroSection })));
const AboutSection = lazy(() => import("@/components/sections/AboutSection").then(m => ({ default: m.AboutSection })));
const StatsSection = lazy(() => import("@/components/sections/StatsSection").then(m => ({ default: m.StatsSection })));
const ShowreelSection = lazy(() => import("@/components/sections/ShowreelSection").then(m => ({ default: m.ShowreelSection })));
const ProjectsSection = lazy(() => import("@/components/sections/ProjectsSection").then(m => ({ default: m.ProjectsSection })));
const BrandsSection = lazy(() => import("@/components/sections/BrandsSection").then(m => ({ default: m.BrandsSection })));
const ServicesSection = lazy(() => import("@/components/sections/ServicesSection").then(m => ({ default: m.ServicesSection })));
const ExperienceSection = lazy(() => import("@/components/sections/ExperienceSection").then(m => ({ default: m.ExperienceSection })));
const TestimonialsSection = lazy(() => import("@/components/sections/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const ProcessSection = lazy(() => import("@/components/sections/ProcessSection").then(m => ({ default: m.ProcessSection })));
const ToolsSection = lazy(() => import("@/components/sections/ToolsSection").then(m => ({ default: m.ToolsSection })));
const ContactSection = lazy(() => import("@/components/sections/ContactSection").then(m => ({ default: m.ContactSection })));
const FooterSection = lazy(() => import("@/components/sections/FooterSection").then(m => ({ default: m.FooterSection })));

// Loading skeleton for sections
const SectionLoader = () => (
  <div className="section-padding bg-background animate-pulse min-h-[400px]" />
);

// Map of section IDs to their components
const sectionComponents: Record<string, React.ReactNode> = {
  navbar: <Navbar />,
  hero: <Suspense fallback={<SectionLoader />}><HeroSection /></Suspense>,
  about: <Suspense fallback={<SectionLoader />}><AboutSection /></Suspense>,
  stats: <Suspense fallback={<SectionLoader />}><StatsSection /></Suspense>,
  showreel: <Suspense fallback={<SectionLoader />}><ShowreelSection /></Suspense>,
  projects: <Suspense fallback={<SectionLoader />}><ProjectsSection /></Suspense>,
  brands: <Suspense fallback={<SectionLoader />}><BrandsSection /></Suspense>,
  services: <Suspense fallback={<SectionLoader />}><ServicesSection /></Suspense>,
  experience: <Suspense fallback={<SectionLoader />}><ExperienceSection /></Suspense>,
  testimonials: <Suspense fallback={<SectionLoader />}><TestimonialsSection /></Suspense>,
  process: <Suspense fallback={<SectionLoader />}><ProcessSection /></Suspense>,
  tools: <Suspense fallback={<SectionLoader />}><ToolsSection /></Suspense>,
  contact: <Suspense fallback={<SectionLoader />}><ContactSection /></Suspense>,
  footer: <Suspense fallback={<SectionLoader />}><FooterSection /></Suspense>,
};

const Index = memo(() => {
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
});

Index.displayName = "Index";

export default Index;
