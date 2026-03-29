import { AnimatedSection } from "@/components/AnimatedSection";

const brands = [
  "Nike", "BMW", "Samsung", "Coca-Cola", "Adidas",
  "Red Bull", "Adobe", "Netflix", "Al Jazeera", "Sony",
  "Google", "Spotify"
];

export const BrandsSection = () => {
  return (
    <section className="py-16 md:py-24 border-y border-border/30 bg-surface-overlay">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <AnimatedSection>
          <p className="text-center text-muted-foreground text-sm tracking-[0.2em] uppercase font-heading mb-10">
            Trusted by Leading Brands
          </p>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {brands.map((brand) => (
              <div
                key={brand}
                className="flex items-center justify-center h-16 text-muted-foreground/50 hover:text-primary/70 transition-colors duration-300"
              >
                <span className="font-heading font-bold text-lg tracking-wide">{brand}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
