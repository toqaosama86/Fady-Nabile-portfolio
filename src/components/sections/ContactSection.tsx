import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState, memo } from "react";
import { useSettingsMap, useCreateContactMessage } from "@/hooks/useDatabase";
import { useToast } from "@/hooks/use-toast";

const ContactSectionComponent = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const { settings } = useSettingsMap();
  const createMessage = useCreateContactMessage();
  const { toast } = useToast();

  const email = settings.contact_email || "marcus@marcusreed.com";
  const phone = settings.contact_phone || "+1 (555) 123-4567";
  const location = settings.contact_location || "Los Angeles, CA";
  const whatsapp = settings.whatsapp_url || "";

  const socials = [
    settings.social_instagram && { label: "Instagram", url: settings.social_instagram },
    settings.social_youtube && { label: "YouTube", url: settings.social_youtube },
    settings.social_linkedin && { label: "LinkedIn", url: settings.social_linkedin },
    settings.social_behance && { label: "Behance", url: settings.social_behance },
    settings.social_twitter && { label: "Twitter/X", url: settings.social_twitter },
    settings.social_tiktok && { label: "TikTok", url: settings.social_tiktok },
  ].filter(Boolean) as { label: string; url: string }[];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await createMessage.mutateAsync(formData);
      toast({ title: "Message sent!", description: "I'll get back to you soon." });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast({ title: "Failed to send", description: "Please try again.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-surface-overlay">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-primary font-heading font-medium tracking-[0.2em] uppercase text-xs mb-4">Contact</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Let's <span className="text-gradient-gold">Create Together</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Have a project in mind? Let's talk about how we can bring your vision to life.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="glass-card rounded-xl p-6 flex items-center gap-4 hover:border-primary/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"><Mail size={20} className="text-primary" /></div>
                <div><p className="text-sm text-muted-foreground">Email</p><p className="text-foreground font-medium">{email}</p></div>
              </div>
              <div className="glass-card rounded-xl p-6 flex items-center gap-4 hover:border-primary/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"><Phone size={20} className="text-primary" /></div>
                <div><p className="text-sm text-muted-foreground">{whatsapp ? "WhatsApp" : "Phone"}</p><p className="text-foreground font-medium">{phone}</p></div>
              </div>
              <div className="glass-card rounded-xl p-6 flex items-center gap-4 hover:border-primary/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"><MapPin size={20} className="text-primary" /></div>
                <div><p className="text-sm text-muted-foreground">Location</p><p className="text-foreground font-medium">{location}</p></div>
              </div>

              {socials.length > 0 && (
                <div className="flex gap-4 pt-4 flex-wrap">
                  {socials.map((social) => (
                    <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm hover:bg-primary/10 hover:text-primary transition-all duration-300">
                      {social.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required maxLength={100} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all" />
              <input type="email" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required maxLength={255} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all" />
              <textarea placeholder="Tell me about your project..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows={5} maxLength={1000} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none" />
              <Button variant="hero" size="lg" className="w-full" disabled={sending}>
                <Send size={16} className="mr-2" /> {sending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export const ContactSection = memo(ContactSectionComponent);
