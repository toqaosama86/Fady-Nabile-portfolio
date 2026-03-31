import { AnimatedSection } from "@/components/AnimatedSection";
import { Search, Lightbulb, Scissors, RefreshCw, Send } from "lucide-react";
import { memo } from "react";

const steps = [
  { icon: Search, title: "Discovery", description: "Understanding your vision, goals, audience, and brand requirements." },
  { icon: Lightbulb, title: "Concept", description: "Developing the creative direction, structure, and editing approach." },
  { icon: Scissors, title: "Edit", description: "Crafting the story with precision — pacing, transitions, and rhythm." },
  { icon: RefreshCw, title: "Revisions", description: "Refining the edit based on your feedback until it's perfect." },
  { icon: Send, title: "Delivery", description: "Final export in all required formats, optimized for every platform." },
];

const ProcessSectionComponent = () => {
  return (
    <section className="section-padding bg-surface-overlay">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-primary font-heading font-medium tracking-[0.2em] uppercase text-xs mb-4">
              Process
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              How I <span className="text-gradient-gold">Work</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <AnimatedSection key={step.title} delay={i * 100}>
                <div className="text-center group">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300 relative">
                    <step.icon size={24} className="text-primary" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px] font-heading font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export const ProcessSection = memo(ProcessSectionComponent);
