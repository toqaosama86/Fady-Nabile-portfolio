import { AnimatedSection } from "@/components/AnimatedSection";
import { Play } from "lucide-react";
import { useState } from "react";
import { useSettingsMap } from "@/hooks/useDatabase";

export const ShowreelSection = () => {
  const [playing, setPlaying] = useState(false);
  const { settings } = useSettingsMap();

  const videoUrl = settings.showreel_url || "https://www.youtube.com/embed/dQw4w9WgXcQ";
  const title = settings.showreel_title || "2024 Showreel";
  const duration = settings.showreel_duration || "3:24 min";

  return (
    <section id="showreel" className="section-padding bg-surface-overlay">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-primary font-heading font-medium tracking-[0.2em] uppercase text-xs mb-4">Showreel</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              See the <span className="text-gradient-gold">Work in Motion</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A curated selection of my best work — from commercials to brand campaigns, showcasing pacing, storytelling, and visual impact.
            </p>
          </div>

          <div className="relative aspect-video rounded-xl overflow-hidden glass-card glow-gold">
            {playing ? (
              <iframe
                src={`${videoUrl}?autoplay=1`}
                title="Showreel"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <button
                onClick={() => setPlaying(true)}
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-muted group cursor-pointer"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-primary shadow-lg shadow-primary/30">
                  <Play size={32} className="text-primary-foreground ml-1" />
                </div>
                <div className="absolute bottom-6 left-6">
                  <p className="font-heading font-semibold text-foreground text-lg">{title}</p>
                  <p className="text-muted-foreground text-sm">{duration}</p>
                </div>
              </button>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
