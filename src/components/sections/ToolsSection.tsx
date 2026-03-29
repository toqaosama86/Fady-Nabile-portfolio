import { AnimatedSection } from "@/components/AnimatedSection";

const tools = [
  { name: "Premiere Pro", level: 95 },
  { name: "After Effects", level: 90 },
  { name: "DaVinci Resolve", level: 85 },
  { name: "Photoshop", level: 80 },
  { name: "Audition", level: 75 },
];

const skills = [
  "Cinematic Storytelling", "Sound Design", "Color Grading", "Pacing & Rhythm",
  "Motion Design", "Sound Sync", "Multi-cam Editing", "4K/6K Workflows",
  "Social Media Optimization", "Brand Consistency",
];

export const ToolsSection = () => {
  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-primary font-heading font-medium tracking-[0.2em] uppercase text-xs mb-4">
              Tools & Skills
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              My <span className="text-gradient-gold">Toolkit</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Tools */}
            <div>
              <h3 className="font-heading font-semibold text-foreground text-lg mb-6">Software</h3>
              <div className="space-y-5">
                {tools.map((tool) => (
                  <div key={tool.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm text-foreground font-medium">{tool.name}</span>
                      <span className="text-xs text-muted-foreground">{tool.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-gold-dark via-primary to-gold-light transition-all duration-1000"
                        style={{ width: `${tool.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="font-heading font-semibold text-foreground text-lg mb-6">Creative Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
