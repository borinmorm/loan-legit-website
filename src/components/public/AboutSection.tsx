import { Shield, Users, Building, Award } from 'lucide-react';
import { useSiteContent } from '@/contexts/SiteContentContext';
import office2 from '@/assets/office-2.png';

const getImageSrc = (customUrl: string, fallback: string) => {
  return customUrl && customUrl.trim() !== '' ? customUrl : fallback;
};

const AboutSection = () => {
  const { content } = useSiteContent();

  const stats = [
    { icon: Shield, value: 'SEC', label: 'Registered' },
    { icon: Users, value: '10K+', label: 'Happy Clients' },
    { icon: Building, value: '2017', label: 'Established' },
    { icon: Award, value: '100%', label: 'Legal' },
  ];

  return (
    <section id="about" className="py-20 bg-card">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={getImageSrc(content.aboutImageUrl, office2)} 
                alt="THIND AND NANDHA Meeting Room" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Stats overlay */}
            <div className="absolute -bottom-8 left-4 right-4 md:left-8 md:right-8">
              <div className="grid grid-cols-4 gap-2 md:gap-4 bg-card rounded-xl shadow-xl p-4 md:p-6 border border-border">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-secondary mx-auto mb-1 md:mb-2" />
                    <div className="text-lg md:text-xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="space-y-6 lg:pl-8 pt-12 lg:pt-0">
            <div className="inline-block">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">About Us</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {content.companyName}
            </h2>
            
            <p className="text-muted-foreground leading-relaxed">
              {content.aboutText}
            </p>

            <p className="text-muted-foreground leading-relaxed">
              This platform is included in the official list of registered online lending platforms as of {content.registrationDate} in accordance with SEC regulations.
            </p>

            <div className="bg-muted/50 rounded-xl p-6 border-l-4 border-secondary">
              <h4 className="font-semibold text-foreground mb-2">Our Commitment</h4>
              <p className="text-sm text-muted-foreground">
                We are committed to providing safe, secure, and fully legal financial services. Feel free to verify our credentials through the SEC website, or contact us directly for more information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
