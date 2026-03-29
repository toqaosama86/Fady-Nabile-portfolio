import { Button } from "@/components/ui/button";
import { Play, ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-surface-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(38_90%_55%_/_0.05)_0%,_transparent_70%)]" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 md:px-8">
        <div className="animate-fade-in-up">
          <p className="text-primary font-heading font-medium tracking-[0.3em] uppercase text-xs md:text-sm mb-6">
            Professional Video Editor
          </p>
          
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-6">
            Crafting Stories
            <br />
            <span className="text-gradient-gold">Frame by Frame</span>
          </h1>
          
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            I transform raw footage into compelling visual narratives. Specializing in 
            commercials, brand campaigns, and cinematic storytelling that captivates audiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href="#projects">View Projects</a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="#showreel" className="flex items-center gap-2">
                <Play size={16} /> Watch Showreel
              </a>
            </Button>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  );
};
