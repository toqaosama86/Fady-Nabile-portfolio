import { useEffect } from 'react';
import { useSettings } from './useDatabase';

/**
 * Hook to apply dynamic design settings (colors, fonts) from database
 * Updates CSS custom properties on the root element
 */
export const useDesignSettings = () => {
  const { data: settings = [], isLoading } = useSettings();

  useEffect(() => {
    if (isLoading || settings.length === 0) return;

    // Convert settings array to map for easier access
    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      if (s.value) settingsMap[s.key] = s.value;
    });

    // Get root element
    const root = document.documentElement;

    // Apply color settings
    const colorSettings = [
      'color_primary',
      'color_accent',
      'color_gold',
      'color_gold_light',
      'color_gold_dark',
      'color_background',
      'color_surface',
      'color_surface_elevated',
      'color_secondary',
      'color_muted',
    ];

    colorSettings.forEach((colorKey) => {
      const value = settingsMap[colorKey];
      if (value) {
        // Convert key format: color_primary -> --primary
        const cssVarName = `--${colorKey.replace('color_', '')}`;
        root.style.setProperty(cssVarName, value);
      }
    });

    // Apply font family settings
    if (settingsMap.font_family_heading) {
      root.style.setProperty('--font-heading', settingsMap.font_family_heading);
    }
    if (settingsMap.font_family_body) {
      root.style.setProperty('--font-body', settingsMap.font_family_body);
    }
  }, [settings, isLoading]);

  return { isLoading };
};
