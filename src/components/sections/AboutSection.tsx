import { AnimatedSection } from "@/components/AnimatedSection";
import { useSettingsMap } from "@/hooks/useDatabase";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import editorPortraitFallback from "@/assets/editor-portrait.jpg";

export const AboutSection = () => {
  const { settings } = useSettingsMap();

  const name = settings.editor_name || "Marcus Reed";
  const aboutP1 = settings.about_paragraph_1 || `I'm ${name} — a video editor with 8+ years of experience turning ideas into visual stories that move people. Based in Los Angeles, I've worked with global brands, agencies, and independent creators across 15+ countries.`;
  const aboutP2 = settings.about_paragraph_2 || "My editing style blends cinematic pacing with modern rhythm. I specialize in commercials, brand campaigns, social content, and documentary storytelling — always focused on emotion, flow, and impact.";
  const aboutP3 = settings.about_paragraph_3 || "Every project is a collaboration. I bring technical precision and creative instinct to every timeline, ensuring your story resonates with its audience.";
  const portrait = settings.about_portrait_image || editorPortraitFallback;
  const availability = settings.about_availability || "Currently Available";
  const availabilityNote = settings.about_availability_note || "Open for freelance & contract work";
  const cvUrl = settings.site_cv_url;

  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-primary font-heading font-medium tracking-[0.2em] uppercase text-xs mb-4">About Me</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                The Editor Behind<br /><span className="text-gradient-gold">the Cut</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{aboutP1}</p>
                <p>{aboutP2}</p>
                <p>{aboutP3}</p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-lg overflow-hidden relative">
                <img src={portrait} alt={`${name} — Video Editor`} loading="lazy" width={800} height={1000} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass-card rounded-lg p-4 space-y-3">
                    <div>
                      <p className="text-sm font-heading font-semibold text-foreground">{availability}</p>
                      <p className="text-xs text-muted-foreground mt-1">{availabilityNote}</p>
                    </div>
                    {cvUrl && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <a href={cvUrl} download target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4 mr-2" />
                          Download CV
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute -inset-4 bg-primary/5 rounded-2xl -z-10 blur-2xl" />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
