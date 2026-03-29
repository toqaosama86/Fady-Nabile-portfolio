import { AnimatedSection } from "@/components/AnimatedSection";
import { useTools } from "@/hooks/useDatabase";

export const ToolsSection = () => {
  const { data: tools = [], isLoading } = useTools();
  
  // Sort by display order
  const sorted = [...tools].sort((a, b) => a.display_order - b.display_order);
  
  // Group by category
  const toolsByCategory = sorted.reduce((acc, tool) => {
    const category = tool.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(tool);
    return acc;
  }, {} as Record<string, typeof sorted>);

  if (isLoading) {
    return (
      <section className="section-padding">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">Loading tools...</p>
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
              Tools & Skills
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              My <span className="text-gradient-gold">Toolkit</span>
            </h2>
          </div>

          {Object.keys(toolsByCategory).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tools added yet.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
                <div key={category}>
                  <h3 className="font-heading font-semibold text-foreground text-lg mb-6">{category}</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    {categoryTools.map((tool) => (
                      <div key={tool.id}>
                        <div className="flex items-center gap-3 mb-3">
                          {tool.icon_url && (
                            <img 
                              src={tool.icon_url} 
                              alt={tool.name}
                              className="w-6 h-6 object-contain"
                            />
                          )}
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1.5">
                              <span className="text-sm text-foreground font-medium">{tool.name}</span>
                              <span className="text-xs text-muted-foreground">{tool.proficiency_level}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-gold-dark via-primary to-gold-light transition-all duration-1000"
                            style={{ width: `${tool.proficiency_level}%` }}
                          />
                        </div>
                        {tool.years_of_experience && (
                          <p className="text-xs text-muted-foreground mt-2">
                            {tool.years_of_experience} years experience
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};
