import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Prevent SSR issues
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      
      // Set initial value
      setMatches(media.matches);

      // Create event listener
      const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

      // Listen for changes
      media.addEventListener('change', listener);

      // Clean up
      return () => media.removeEventListener('change', listener);
    }
  }, [query]);

  return matches;
}

// Predefined media queries
export const mediaQueries = {
  mobile: '(max-width: 639px)',
  tablet: '(min-width: 640px) and (max-width: 767px)', 
  'tablet-lg': '(min-width: 768px) and (max-width: 1023px)',
  laptop: '(min-width: 1024px) and (max-width: 1279px)',
  desktop: '(min-width: 1280px)',
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)', 
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
  motion: '(prefers-reduced-motion: no-preference)',
  hover: '(hover: hover)',
} as const;