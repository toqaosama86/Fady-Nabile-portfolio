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

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <ShowreelSection />
      <ProjectsSection />
      <BrandsSection />
      <ServicesSection />
      <ExperienceSection />
      <TestimonialsSection />
      <ProcessSection />
      <ToolsSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
};

export default Index;
