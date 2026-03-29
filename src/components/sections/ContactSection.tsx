import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will connect to backend later
    alert("Message sent! (Demo mode)");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding bg-surface-overlay">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-primary font-heading font-medium tracking-[0.2em] uppercase text-xs mb-4">
              Contact
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Let's <span className="text-gradient-gold">Create Together</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Have a project in mind? Let's talk about how we can bring your vision to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact info */}
            <div className="space-y-6">
              <div className="glass-card rounded-xl p-6 flex items-center gap-4 hover:border-primary/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground font-medium">marcus@marcusreed.com</p>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6 flex items-center gap-4 hover:border-primary/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">WhatsApp</p>
                  <p className="text-foreground font-medium">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6 flex items-center gap-4 hover:border-primary/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-foreground font-medium">Los Angeles, CA</p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                {["Instagram", "YouTube", "LinkedIn", "Behance"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm hover:bg-primary/10 hover:text-primary transition-all duration-300"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
              <div>
                <textarea
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                />
              </div>
              <Button variant="hero" size="lg" className="w-full">
                <Send size={16} className="mr-2" /> Send Message
              </Button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
