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
  };
}

interface SiteContentContextType {
  content: SiteContent;
  updateContent: (newContent: Partial<SiteContent>) => void;
  toggleMode: () => void;
  setThemeColors: (theme: Partial<SiteContent['theme']>) => void;
}

const defaultContent: SiteContent = {
  companyName: "RATAUL LENDING INVESTOR AND TRADING CORP",
  tagline: "Your Trusted Financial Partner",
  heroTitle: "Fast, Secure & Legal Online Loans",
  heroSubtitle: "SEC-registered and government-certified lending services in the Philippines. Get the financial support you need with complete peace of mind.",
  aboutText: "RATAUL LENDING INVESTOR AND TRADING CORP. operates legally under the supervision of the Securities and Exchange Commission (SEC) of the Philippines and is fully certified by the government to provide online loan services. We are committed to providing safe, secure, and fully legal financial services.",
  address: "Retail 107, Ground Floor, 8 Rockwell Center, Plaza Dr, Makati City, 1210 Metro Manila, Philippines",
  plusCode: "H27P+CJ Makati City, Metro Manila, Philippines",
  googleMapsUrl: "https://maps.app.goo.gl/AbMkajbhS6Lpy99m9",
  email: "lendingph.info@gmail.com",
  website: "https://www.fastlendingofficial-php.com/login",
  applyUrl: "https://www.fastlendingofficial-php.com/login",
  secNumber: "CS201730454",
  certAuthority: "NO: 2541",
  registrationDate: "September 15, 2017",
  secVerifyUrl: "https://checkwithsec.sec.gov.ph/",
  logoUrl: "",
  heroImageUrl: "",
  aboutImageUrl: "",
  mode: 'light',
  theme: {
    primary: '',
    secondary: ''
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
      if (content.theme.secondary) document.documentElement.style.setProperty('--secondary', content.theme.secondary);
    }
  }, [content.theme]);

  const updateContent = (newContent: Partial<SiteContent>) => {
    setContent(prev => {
      const next = { ...prev, ...newContent };
      try {
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

  const setThemeColors = (theme: Partial<SiteContent['theme']>) => {
    setContent(prev => {
      const next = { ...prev, theme: { ...prev.theme, ...theme } };
      try {
        if (theme.primary) document.documentElement.style.setProperty('--primary', theme.primary);
        if (theme.secondary) document.documentElement.style.setProperty('--secondary', theme.secondary);
        localStorage.setItem('site:content', JSON.stringify(next));
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
