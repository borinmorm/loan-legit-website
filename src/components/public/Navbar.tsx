import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSiteContent } from '@/contexts/SiteContentContext';
import logo from '@/assets/logo.png';

const getImageSrc = (customUrl: string, fallback: string) => {
  return customUrl && customUrl.trim() !== '' ? customUrl : fallback;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { content } = useSiteContent();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Verification', href: '/#verification' },
    { name: 'Contact', href: '/#contact' },
  ];

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('/#')) {
      const sectionId = href.substring(2);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      {/* Top bar */}
      <div className="hidden md:block gradient-primary">
        <div className="container flex items-center justify-between py-2 text-sm text-primary-foreground">
          <div className="flex items-center gap-6">
            <a href={`mailto:${content.email}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="h-4 w-4" />
              {content.email}
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {content.address}
            </span>
          </div>
          <a href={content.applyUrl || content.website} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
            Apply Now →
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={getImageSrc(content.logoUrl, logo)} alt={`${content.companyName} Logo`} className="h-12 w-auto" />
          <div className="hidden sm:block">
            {/* <span className="text-lg font-bold text-primary">{content.companyName}</span> */}
            <span className="text-lg font-bold text-primary">THIND AND NANDHA</span>
            <p className="text-xs text-muted-foreground">{content.tagline}</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                if (link.href.startsWith('/#')) {
                  e.preventDefault();
                  scrollToSection(link.href);
                }
              }}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {/* <Link to="/admin/login">
            <Button variant="ghost" size="sm">Admin</Button>
          </Link> */}
          <a href={content.applyUrl || content.website} target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="default">Apply for Loan</Button>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-foreground"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-card animate-fade-in">
          <div className="container py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith('/#')) {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }
                }}
                className="block py-2 text-foreground/80 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-border space-y-3">
              {/* <Link to="/admin/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">Admin Login</Button>
              </Link> */}
              <a href={content.applyUrl || content.website} target="_blank" rel="noopener noreferrer">
                <Button variant="hero" className="w-full">Apply for Loan</Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
