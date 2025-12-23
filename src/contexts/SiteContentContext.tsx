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
  companyName: "THIND AND NANDHA LENDING INVESTOR CORP",
  tagline: "Your Trusted Financial Partner",
  heroTitle: "Fast, Secure & Legal Online Loans",
  heroSubtitle: "SEC-registered and government-certified lending services in the Philippines. Get the financial support you need with complete peace of mind.",
  aboutText: "THIND AND NANDHA LENDING INVESTOR CORP.. operates legally under the supervision of the Securities and Exchange Commission (SEC) of the Philippines and is fully certified by the government to provide online loan services. We are committed to offering fast, secure, and reliable financial solutions to our clients. Our services are designed to meet your needs while ensuring compliance with all regulatory requirements, giving you the confidence and peace of mind you deserve when seeking financial assistance.",
  address: "UNIT 805 8TH, Pearl of the Orient Tower Roxas Blvd, Ermita, Manila, 1000 Metro Manila, Philippines",
  plusCode: "7Q62HXGH+RV Manila, Philippines",
  googleMapsUrl: "https://maps.app.goo.gl/rJ9KuyzcfZyLnSSF8",
  email: "lendingph.info@gmail.com",
  website: "https://www.fastlendingofficial-php.com/login",
  applyUrl: "https://www.fastlendingofficial-php.com/login",
  secNumber: "CS201711995",
  certAuthority: "NO: 2207",
  registrationDate: "April 6, 2017",
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
