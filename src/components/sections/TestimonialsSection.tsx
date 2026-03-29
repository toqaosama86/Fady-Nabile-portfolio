import { AnimatedSection } from "@/components/AnimatedSection";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Marketing Director",
    company: "BMW Middle East",
    text: "Marcus delivered beyond expectations. His editing elevated our campaign to a cinematic level that our audience loved. The attention to pacing and storytelling was remarkable.",
  },
  {
    name: "Omar Al-Rashid",
    role: "Creative Producer",
    company: "Artwave Agency",
    text: "One of the most talented editors I've worked with. Marcus understands the brief instantly and delivers polished, on-brand content every single time.",
  },
  {
    name: "Lisa Chen",
    role: "Content Lead",
    company: "Samsung Gulf",
    text: "Working with Marcus on our product launch was a game-changer. Fast turnaround, incredible quality, and he brought creative ideas we hadn't even considered.",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-primary font-heading font-medium tracking-[0.2em] uppercase text-xs mb-4">
              Testimonials
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Client <span className="text-gradient-gold">Voices</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 120}>
                <div className="glass-card rounded-xl p-6 h-full flex flex-col hover:border-primary/20 transition-all duration-300">
                  <Quote size={24} className="text-primary/30 mb-4" />
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={12} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
