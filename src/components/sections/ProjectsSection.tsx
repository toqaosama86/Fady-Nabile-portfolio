import { AnimatedSection } from "@/components/AnimatedSection";
import { useState, memo, useMemo, useCallback } from "react";
import { ExternalLink, Play } from "lucide-react";
import { useProjects } from "@/hooks/useDatabase";

const ProjectsSectionComponent = () => {
  const { data: projects = [], isLoading } = useProjects();
  const [active, setActive] = useState("All");

  // Memoize categories computation
  const categories = useMemo(() => 
    ["All", ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))],
    [projects]
  );
  
  // Memoize filtered projects
  const filtered = useMemo(() => 
    active === "All" ? projects : projects.filter((p) => p.category === active),
    [active, projects]
  );
  
  // Memoize sorted projects
  const sorted = useMemo(() => 
    [...filtered].sort((a, b) => a.display_order - b.display_order),
    [filtered]
  );

  // Memoize setActive for button clicks
  const handleCategoryChange = useCallback((cat: string) => {
    setActive(cat);
  }, []);

  if (isLoading) {
    return (
      <section id="projects" className="section-padding">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </section>
    );
  }

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
                onClick={() => handleCategoryChange(cat)}
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
          {sorted.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sorted.map((project, i) => (
                <AnimatedSection key={project.id} delay={i * 100}>
                  <div className="group glass-card rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-500 h-full flex flex-col">
                    {/* Thumbnail */}
                    <div className="aspect-video bg-gradient-to-br from-secondary to-muted relative overflow-hidden">
                      {project.image_url && (
                        <img 
                          src={project.image_url} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/40 backdrop-blur-sm">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                          {project.link_url ? (
                            <ExternalLink size={20} className="text-primary-foreground" />
                          ) : (
                            <Play size={20} className="text-primary-foreground ml-0.5" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] text-primary font-medium tracking-wider uppercase">
                          {project.category || "Other"}
                        </span>
                        {project.link_url && (
                          <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                      </div>
                      <h3 className="font-heading font-semibold text-foreground text-lg mb-1">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3 flex-1">
                        {project.description}
                      </p>
                      {project.link_url && (
                        <a
                          href={project.link_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 text-xs font-medium transition-colors mt-auto"
                        >
                          View Project →
                        </a>
                      )}
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

export const ProjectsSection = memo(ProjectsSectionComponent);
