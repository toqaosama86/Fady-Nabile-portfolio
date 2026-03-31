import { useEffect } from 'react';
import { useSettingsMap } from './useDatabase';

/**
 * Hook to load and apply the favicon from database settings
 */
export const useFaviconLoader = () => {
  const { settings } = useSettingsMap();

  useEffect(() => {
    if (!settings || !settings.site_favicon_url) return;

    const updateFavicon = (url: string) => {
      let link = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = url;
    };

    updateFavicon(settings.site_favicon_url);
  }, [settings?.site_favicon_url]);
};
