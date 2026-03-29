import { AnimatedSection } from "@/components/AnimatedSection";
import { Star, Quote } from "lucide-react";
import { useTestimonials } from "@/hooks/useDatabase";

export const TestimonialsSection = () => {
  const { data: testimonials = [], isLoading } = useTestimonials();
  
  // Sort by display order
  const sorted = [...testimonials].sort((a, b) => a.display_order - b.display_order);

  if (isLoading) {
    return (
      <section className="section-padding">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">Loading testimonials...</p>
        </div>
      </section>
    );
  }

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

          {sorted.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No testimonials yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {sorted.map((testimonial, i) => (
                <AnimatedSection key={testimonial.id} delay={i * 120}>
                  <div className="glass-card rounded-xl p-6 h-full flex flex-col hover:border-primary/20 transition-all duration-300">
                    <Quote size={24} className="text-primary/30 mb-4" />
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <Star key={j} size={12} className="fill-primary text-primary" />
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      {testimonial.author_image_url && (
                        <img 
                          src={testimonial.author_image_url}
                          alt={testimonial.author_name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="font-heading font-semibold text-foreground text-sm">
                          {testimonial.author_name}
                        </p>
                        {testimonial.author_title && (
                          <p className="text-xs text-muted-foreground">{testimonial.author_title}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};
