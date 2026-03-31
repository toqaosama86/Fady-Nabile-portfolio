import { useSettingsMap } from "@/hooks/useDatabase";
import { memo } from "react";

const FooterSectionComponent = () => {
  const { settings } = useSettingsMap();
  const name = settings.editor_name || "Marcus Reed";
  const nameParts = name.split(" ");
  const firstName = nameParts[0] || name;
  const lastName = nameParts.slice(1).join(" ");

  return (
    <footer className="border-t border-border/30 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-heading font-bold text-lg tracking-tight text-foreground">
          {firstName.toUpperCase()}<span className="text-primary">{lastName ? lastName.toUpperCase() : ""}</span>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#projects" className="hover:text-primary transition-colors">Work</a>
          <a href="#services" className="hover:text-primary transition-colors">Services</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </div>
        <p className="text-xs text-muted-foreground" > 
          © <a href="https://toqa-osama.vercel.app/" className="hover:text-primary transition-colors">Toqa Osama.</a> All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export const FooterSection = memo(FooterSectionComponent);
