import { AnimatedSection } from "@/components/AnimatedSection";
import { Film, Palette, Wand2, Smartphone, Youtube, Megaphone, Sparkles, Camera } from "lucide-react";

const services = [
  { icon: Film, title: "Video Editing", description: "Professional editing with cinematic pacing, storytelling, and seamless transitions." },
  { icon: Palette, title: "Color Grading", description: "Cinematic color correction and grading that sets the mood and elevates visuals." },
  { icon: Wand2, title: "Motion Graphics", description: "Dynamic titles, lower thirds, and animated elements that enhance your content." },
  { icon: Smartphone, title: "Reels & Short-Form", description: "Scroll-stopping edits optimized for Instagram, TikTok, and YouTube Shorts." },
  { icon: Youtube, title: "YouTube Editing", description: "Engaging long-form edits with retention hooks, b-roll integration, and pacing." },
  { icon: Megaphone, title: "Commercial Ads", description: "High-impact ad edits designed to convert, from concept to final delivery." },
  { icon: Sparkles, title: "Social Content", description: "Platform-native edits that drive engagement and build brand presence." },
  { icon: Camera, title: "Brand Videos", description: "End-to-end post-production support for brand storytelling and campaigns." },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-primary font-heading font-medium tracking-[0.2em] uppercase text-xs mb-4">
              Services
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              What I <span className="text-gradient-gold">Offer</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive post-production services tailored to your brand's vision and audience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 80}>
                <div className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all duration-500 group h-full">
                  <service.icon size={28} className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-heading font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
