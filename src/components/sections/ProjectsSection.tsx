import { AnimatedSection } from "@/components/AnimatedSection";
import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";

const categories = ["All", "Commercials", "Brand Campaigns", "Social Media", "YouTube", "Documentary"];

const projects = [
  {
    title: "Summer Drive Campaign",
    category: "Commercials",
    client: "BMW Middle East",
    year: "2024",
    description: "A high-energy commercial showcasing the new X5 across desert landscapes.",
    services: "Editing, Color Grading, Sound Design",
    thumbnail: null,
    videoUrl: "#",
  },
  {
    title: "Origin Stories Series",
    category: "Brand Campaigns",
    client: "Nike MENA",
    year: "2024",
    description: "A 5-part docu-series following emerging athletes across the region.",
    services: "Editing, Motion Graphics",
    thumbnail: null,
    videoUrl: "#",
  },
  {
    title: "Flavors of Home",
    category: "YouTube",
    client: "Tasty Arabia",
    year: "2023",
    description: "Viral cooking series with 12M+ views, blending culture and cuisine.",
    services: "Full Post-Production",
    thumbnail: null,
    videoUrl: "#",
  },
  {
    title: "Launch Day",
    category: "Social Media",
    client: "Samsung Gulf",
    year: "2024",
    description: "Product launch reel for Galaxy S24, optimized for Instagram and TikTok.",
    services: "Editing, Motion Graphics, Reels",
    thumbnail: null,
    videoUrl: "#",
  },
  {
    title: "Invisible Threads",
    category: "Documentary",
    client: "Al Jazeera Docs",
    year: "2023",
    description: "Award-nominated documentary exploring artisan craftsmanship in Morocco.",
    services: "Editing, Color Grading",
    thumbnail: null,
    videoUrl: "#",
  },
  {
    title: "Ramadan Nights",
    category: "Commercials",
    client: "Coca-Cola",
    year: "2023",
    description: "Emotional Ramadan campaign celebrating togetherness and community.",
    services: "Editing, Sound Design",
    thumbnail: null,
    videoUrl: "#",
  },
];

export const ProjectsSection = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-primary font-heading font-medium tracking-[0.2em] uppercase text-xs mb-4">
              Portfolio
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Selected <span className="text-gradient-gold">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A curated selection of commercial, brand, and creative projects that define my editing style.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <AnimatedSection key={project.title} delay={i * 100}>
                <div className="group glass-card rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-500">
                  {/* Thumbnail */}
                  <div className="aspect-video bg-gradient-to-br from-secondary to-muted relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/40 backdrop-blur-sm">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <Play size={20} className="text-primary-foreground ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-heading font-semibold px-2 py-1 rounded-full bg-background/70 backdrop-blur text-foreground">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] text-primary font-medium tracking-wider uppercase">
                        {project.category}
                      </span>
                      <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-heading font-semibold text-foreground text-lg mb-1">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{project.client}</span>
                      <span>{project.services.split(",")[0]}</span>
                    </div>
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
