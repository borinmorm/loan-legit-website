import { useSiteContent } from '@/contexts/SiteContentContext';

const Footer = () => {
  const { content } = useSiteContent();

  return (
    <footer className="bg-foreground text-background">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{content.companyName}</h3>
            <p className="text-background/70 text-sm">
              SEC-registered lending company providing safe, secure, and legal financial services in the Philippines.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li><a href="#about" className="hover:text-secondary transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-secondary transition-colors">Our Services</a></li>
              <li><a href="#verification" className="hover:text-secondary transition-colors">SEC Verification</a></li>
              <li><a href="#contact" className="hover:text-secondary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li>SEC Reg: {content.secNumber}</li>
              <li>Cert. of Authority: {content.certAuthority}</li>
              <li>Registered: {content.registrationDate}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li>{content.email}</li>
              <li className="leading-relaxed">{content.address}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            © 2019 {content.companyName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-background/60">
            <a href="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-secondary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
