import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SiteContent {
  companyName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  address: string;
  plusCode: string;
  googleMapsUrl: string;
  email: string;
  website: string;
  applyUrl: string;
  secNumber: string;
  certAuthority: string;
  registrationDate: string;
  secVerifyUrl: string;
  logoUrl: string;
  heroImageUrl: string;
  aboutImageUrl: string;
  /* Theme settings */
  mode: 'light' | 'dark';
  theme?: {
    primary?: string;
    secondary?: string;
    primaryForeground?: string;
    secondaryForeground?: string;
    ring?: string;
  }; 
}

interface SiteContentContextType {
  content: SiteContent;
  updateContent: (newContent: Partial<SiteContent>) => void;
  toggleMode: () => void;
  // second arg: persist to localStorage (default false)
  setThemeColors: (theme: Partial<SiteContent['theme']>, persist?: boolean) => void;
}

const defaultContent: SiteContent = {
  companyName: "CREST OF NICE-J LENDING CORPORATION.",
  tagline: "Your Trusted Financial Partner",
  heroTitle: "Fast, Secure & Legal Online Loans",
  heroSubtitle: "SEC-registered and government-certified lending services in the Philippines. Get the financial support you need with complete peace of mind.",
  aboutText: "CREST OF NICE-J LENDING CORPORATION. operates legally under the supervision of the Securities and Exchange Commission (SEC) of the Philippines and is fully certified by the government to provide online loan services. We are committed to offering fast, secure, and reliable financial solutions to our clients. Our services are designed to meet your needs while ensuring compliance with all regulatory requirements, giving you the confidence and peace of mind you deserve when seeking financial assistance.",
  address: "The Sapphire Residences Condominium Corporation 31st Street, corner 2nd Ave, Taguig, 1630 Metro Manila, Philippines",
  plusCode: "H23V+JW Taguig, Metro Manila, Philippines",
  googleMapsUrl: "https://maps.app.goo.gl/BwGXopDfUxFM7kUL9",
  email: "lendingph.info@gmail.com",
  website: "https://www.fastlendingofficial-php.com/login",
  applyUrl: "https://www.fastlendingofficial-php.com/login",
  secNumber: "CS201816600",
  certAuthority: "NO: 2952",
  registrationDate: "April 22, 2019",
  secVerifyUrl: "https://checkwithsec.sec.gov.ph/",
  logoUrl: "",
  heroImageUrl: "",
  aboutImageUrl: "",
  mode: 'light',
  theme: {
    primary: '221 83% 25%',
    primaryForeground: '210 40% 98%',
    secondary: '199 89% 48%',
    secondaryForeground: '0 0% 100%',
    ring: '221 83% 25%',
  }
};

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export const SiteContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem('site:content');
      return saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent;
    } catch (e) {
      return defaultContent;
    }
  });

  // apply saved mode
  React.useEffect(() => {
    try {
      const savedMode = localStorage.getItem('site:mode') as 'light' | 'dark' | null;
      const mode = savedMode || content.mode || 'light';
      if (mode === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    } catch (e) {}
  }, []);

  // apply saved theme colors (if provided)
  React.useEffect(() => {
    if (content.theme) {
      if (content.theme.primary) document.documentElement.style.setProperty('--primary', content.theme.primary);
      if (content.theme.primaryForeground) document.documentElement.style.setProperty('--primary-foreground', content.theme.primaryForeground);
      if (content.theme.secondary) document.documentElement.style.setProperty('--secondary', content.theme.secondary);
      if (content.theme.secondaryForeground) document.documentElement.style.setProperty('--secondary-foreground', content.theme.secondaryForeground);
      if (content.theme.ring) document.documentElement.style.setProperty('--ring', content.theme.ring);
    }
  }, [content.theme]);

  const updateContent = (newContent: Partial<SiteContent>) => {
    setContent(prev => {
      // Normalize any theme colors passed in via updateContent (accept hex or HSL triplets)
      const normalizedTheme = newContent.theme
        ? (() => {
            const nt: Partial<SiteContent['theme']> = {};
            if (newContent.theme!.primary) {
              const p = toHslTriplet(newContent.theme!.primary);
              nt.primary = p;
              nt.primaryForeground = computeForegroundFromTriplet(p);
              nt.ring = p; // use primary as ring color for consistency
            }
            if (newContent.theme!.secondary) {
              const s = toHslTriplet(newContent.theme!.secondary);
              nt.secondary = s;
              nt.secondaryForeground = computeForegroundFromTriplet(s);
            }
            return nt;
          })()
        : undefined;

      const next = { ...prev, ...newContent, ...(normalizedTheme ? { theme: { ...prev.theme, ...normalizedTheme } } : {}) } as SiteContent;

      try {
        // Apply to document if provided
        if (normalizedTheme?.primary) document.documentElement.style.setProperty('--primary', normalizedTheme.primary!);
        if (normalizedTheme?.primaryForeground) document.documentElement.style.setProperty('--primary-foreground', normalizedTheme.primaryForeground!);
        if (normalizedTheme?.secondary) document.documentElement.style.setProperty('--secondary', normalizedTheme.secondary!);
        if (normalizedTheme?.secondaryForeground) document.documentElement.style.setProperty('--secondary-foreground', normalizedTheme.secondaryForeground!);
        if (normalizedTheme?.ring) document.documentElement.style.setProperty('--ring', normalizedTheme.ring!);
        localStorage.setItem('site:content', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const toggleMode = () => {
    setContent(prev => {
      const nextMode: SiteContent['mode'] = prev.mode === 'dark' ? 'light' : 'dark';
      const next = { ...prev, mode: nextMode };
      try {
        if (next.mode === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        localStorage.setItem('site:mode', next.mode);
      } catch (e) {}
      return next;
    });
  };

  // Normalize a color value into "H S% L%" triplet that our CSS variables expect.
  const toHslTriplet = (color?: string) => {
    if (!color) return color;
    const c = color.trim();

    // hex -> convert to H S% L%
    if (c.startsWith('#')) {
      let hex = c.slice(1);
      if (hex.length === 3) hex = hex.split('').map(ch => ch + ch).join('');
      const r = parseInt(hex.slice(0, 2), 16) / 255;
      const g = parseInt(hex.slice(2, 4), 16) / 255;
      const b = parseInt(hex.slice(4, 6), 16) / 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0;
      let s = 0;
      const l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h = Math.round(h * 60);
        s = Math.round(s * 100);
        const lPct = Math.round(l * 100);
        return `${h} ${s}% ${lPct}%`;
      }

      return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    }

    // If it already looks like H S% L% (basic check), return as-is
    if (/^\d+\s+\d+%\s+\d+%$/.test(c)) return c;

    // Fallback: return original string (e.g. 'rgb(...)' or other formats)
    return c;
  };

  // Pick a readable foreground (light/dark) based on the lightness component of an H S% L% triplet.
  const computeForegroundFromTriplet = (triplet?: string) => {
    if (!triplet) return undefined;
    const m = triplet.trim().match(/(\d+)%\s*$/);
    const l = m ? parseInt(m[1], 10) : NaN;
    // For darker colors (lightness < 50) return a light foreground, otherwise a dark foreground
    return !isNaN(l) && l < 50 ? '210 40% 98%' : '222 47% 11%';
  };

  const setThemeColors = (theme: Partial<SiteContent['theme']>, persist = false) => {
    setContent(prev => {
      const normalizedTheme: Partial<SiteContent['theme']> = {};
      if (theme.primary) {
        const p = toHslTriplet(theme.primary);
        normalizedTheme.primary = p;
        normalizedTheme.primaryForeground = computeForegroundFromTriplet(p);
        normalizedTheme.ring = p;
      }
      if (theme.secondary) {
        const s = toHslTriplet(theme.secondary);
        normalizedTheme.secondary = s;
        normalizedTheme.secondaryForeground = computeForegroundFromTriplet(s);
      }

      const next = { ...prev, theme: { ...prev.theme, ...normalizedTheme } };
      try {
        if (normalizedTheme.primary) document.documentElement.style.setProperty('--primary', normalizedTheme.primary);
        if (normalizedTheme.primaryForeground) document.documentElement.style.setProperty('--primary-foreground', normalizedTheme.primaryForeground);
        if (normalizedTheme.secondary) document.documentElement.style.setProperty('--secondary', normalizedTheme.secondary);
        if (normalizedTheme.secondaryForeground) document.documentElement.style.setProperty('--secondary-foreground', normalizedTheme.secondaryForeground);
        if (normalizedTheme.ring) document.documentElement.style.setProperty('--ring', normalizedTheme.ring);
        if (persist) localStorage.setItem('site:content', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // listen for a simple window event to toggle theme from components
  React.useEffect(() => {
    const handler = () => {
      setContent(prev => {
        const nextMode: SiteContent['mode'] = prev.mode === 'dark' ? 'light' : 'dark';
        const next = { ...prev, mode: nextMode };
        try {
          if (next.mode === 'dark') document.documentElement.classList.add('dark');
          else document.documentElement.classList.remove('dark');
          localStorage.setItem('site:mode', next.mode);
        } catch (e) {}
        return next;
      });
    };

    window.addEventListener('toggle-theme', handler as EventListener);
    return () => window.removeEventListener('toggle-theme', handler as EventListener);
  }, []);

  return (
    <SiteContentContext.Provider value={{ content, updateContent, toggleMode, setThemeColors }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
};
