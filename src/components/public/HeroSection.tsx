import { ArrowRight, Shield, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSiteContent } from '@/contexts/SiteContentContext';
import office1 from '@/assets/office-1.png';

const getImageSrc = (customUrl: string, fallback: string) => {
  return customUrl && customUrl.trim() !== '' ? customUrl : fallback;
};

const HeroSection = () => {
  const { content } = useSiteContent();

  const features = [
    { icon: Shield, text: 'SEC Registered' },
    { icon: Clock, text: 'Fast Approval' },
    { icon: CheckCircle, text: '100% Legal' },
  ];

  return (
    <section className="relative overflow-hidden gradient-hero">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium">
              <CheckCircle className="h-4 w-4" />
              Government Certified Lending Platform
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {content.heroTitle.split(' ').map((word, i) => 
                i === 0 ? <span key={i} className="text-gradient">{word} </span> : word + ' '
              )}
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg">
              {content.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <a href={content.applyUrl || content.website} target="_blank" rel="noopener noreferrer">
                <Button variant="hero" size="xl">
                  Apply Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </a>
              <a href="#about">
                <Button variant="heroOutline" size="xl">
                  Learn More
                </Button>
              </a>
            </div>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-6 pt-4">
              {features.map((feature) => (
                <div key={feature.text} className="flex items-center gap-2 text-foreground/80">
                  <feature.icon className="h-5 w-5 text-secondary" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={getImageSrc(content.heroImageUrl, office1)} 
                alt="RATAUL Office" 
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 gradient-primary rounded-2xl -z-10 animate-float" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary/20 rounded-2xl -z-10 animate-float" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
