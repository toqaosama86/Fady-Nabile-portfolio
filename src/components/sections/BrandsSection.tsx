import { AnimatedSection } from "@/components/AnimatedSection";
import { useBrands } from "@/hooks/useDatabase";
import { memo } from "react";

const BrandsSectionComponent = () => {
  const { data: brands = [], isLoading } = useBrands();
  
  // Sort by display order
  const sorted = [...brands].sort((a, b) => a.display_order - b.display_order);

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 border-y border-border/30 bg-surface-overlay">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <p className="text-muted-foreground">Loading brands...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 border-y border-border/30 bg-surface-overlay">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <AnimatedSection>
          <p className="text-center text-muted-foreground text-sm tracking-[0.2em] uppercase font-heading mb-10">
            Trusted by Leading Brands
          </p>
          {sorted.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No brands added yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
              {sorted.map((brand) => (
                <div
                  key={brand.id}
                  className="flex items-center justify-center h-16 hover:opacity-80 transition-opacity duration-300"
                >
                  {brand.logo_url ? (
                    <img 
                      src={brand.logo_url}
                      alt={brand.name}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <a 
                      href={brand.link_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-heading font-bold text-lg tracking-wide text-muted-foreground/50 hover:text-primary/70 transition-colors"
                    >
                      {brand.name}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};

export const BrandsSection = memo(BrandsSectionComponent);
