import { AnimatedSection } from "@/components/AnimatedSection";
import { useEffect, useRef, useState, memo } from "react";
import { useSettingsMap } from "@/hooks/useDatabase";

const CountUp = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) { setCount(target); clearInterval(timer); }
            else { setCount(Math.floor(current)); }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const StatsSectionComponent = () => {
  const { settings } = useSettingsMap();

  const stats = [
    { value: parseInt(settings.stat_1_value || "8"), suffix: settings.stat_1_suffix || "+", label: settings.stat_1_label || "Years Experience" },
    { value: parseInt(settings.stat_2_value || "350"), suffix: settings.stat_2_suffix || "+", label: settings.stat_2_label || "Projects Delivered" },
    { value: parseInt(settings.stat_3_value || "60"), suffix: settings.stat_3_suffix || "+", label: settings.stat_3_label || "Brands & Clients" },
    { value: parseInt(settings.stat_4_value || "50"), suffix: settings.stat_4_suffix || "M+", label: settings.stat_4_label || "Views Generated" },
  ];

  return (
    <section className="py-16 md:py-20 border-y border-border/30">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-muted-foreground text-sm tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export const StatsSection = memo(StatsSectionComponent);
