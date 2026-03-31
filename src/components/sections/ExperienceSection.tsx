import { AnimatedSection } from "@/components/AnimatedSection";
import { Briefcase } from "lucide-react";
import { memo } from "react";
import { useExperience } from "@/hooks/useDatabase";

const fallbackExperience = [
  { id: "1", role: "Senior Video Editor", company: "Framehaus Studios", period: "2022 — Present", description: "Lead editor for global brand campaigns." },
  { id: "2", role: "Freelance Video Editor", company: "Self-Employed", period: "2019 — 2022", description: "Built a global client base across 15+ countries." },
  { id: "3", role: "Video Editor", company: "Artwave Agency", period: "2017 — 2019", description: "Edited commercials and branded content." },
  { id: "4", role: "Junior Editor", company: "PixelCraft Media", period: "2016 — 2017", description: "Started career in post-production." },
];

const ExperienceSectionComponent = () => {
  const { data: dbExperience = [], isLoading } = useExperience();

  const items = dbExperience.length > 0
    ? dbExperience.map((e) => ({
        id: e.id,
        role: e.position,
        company: e.company_name,
        period: e.is_current
          ? `${e.start_date || ''} — Present`
          : `${e.start_date || ''} — ${e.end_date || ''}`,
        description: e.description || '',
      }))
    : fallbackExperience;

  return (
    <section className="section-padding bg-surface-overlay">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-primary font-heading font-medium tracking-[0.2em] uppercase text-xs mb-4">Experience</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              My <span className="text-gradient-gold">Journey</span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-10">
              {items.map((exp, i) => (
                <AnimatedSection key={exp.id} delay={i * 120}>
                  <div className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background z-10 mt-2" />
                    <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? '' : 'md:ml-auto'}`}>
                      <div className="glass-card rounded-xl p-6 hover:border-primary/20 transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase size={14} className="text-primary" />
                          <span className="text-xs text-primary font-medium">{exp.period}</span>
                        </div>
                        <h3 className="font-heading font-semibold text-foreground text-lg">{exp.role}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{exp.company}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export const ExperienceSection = memo(ExperienceSectionComponent);
