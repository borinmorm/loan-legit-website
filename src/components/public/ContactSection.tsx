import { MapPin, Mail, Globe, ExternalLink, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSiteContent } from '@/contexts/SiteContentContext';

const ContactSection = () => {
  const { content } = useSiteContent();

  return (
    <section id="contact" className="py-20 gradient-hero">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Contact Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            Our Location
          </h2>
          <p className="text-muted-foreground">
            Visit our office or reach out to us through our contact channels.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map embed */}
          <div className="rounded-2xl overflow-hidden shadow-xl h-96 lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.802394377611!2d121.04556491531665!3d14.556570281825407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9099d3c5b73%3A0x7d8c9d9c3d3b3c3c!2s8%20Rockwell%2C%20Makati%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1699000000000!5m2!1sen!2sph"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="RATAUL Office Location"
            />
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <h3 className="text-xl font-bold text-foreground mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Office Address</h4>
                    <p className="text-muted-foreground text-sm">{content.address}</p>
                    <p className="text-muted-foreground text-xs mt-1">Plus code: {content.plusCode}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <a 
                      href={`mailto:${content.email}`} 
                      className="text-secondary hover:underline"
                    >
                      {content.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center shrink-0">
                    <Globe className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Website</h4>
                    <a 
                      href={content.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-secondary hover:underline text-sm break-all"
                    >
                      {content.website}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-border">
                <a href={content.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" className="gap-2">
                    <Navigation className="h-4 w-4" />
                    Get Directions
                  </Button>
                </a>
                <a href={`mailto:${content.email}`}>
                  <Button variant="outline" className="gap-2">
                    <Mail className="h-4 w-4" />
                    Send Email
                  </Button>
                </a>
              </div>
            </div>

            {/* CTA Card */}
            <div className="gradient-primary rounded-2xl p-8 text-primary-foreground">
              <h3 className="text-xl font-bold mb-2">Ready to Apply?</h3>
              <p className="text-primary-foreground/80 mb-6">
                Start your loan application today and get approved within 24 hours.
              </p>
              <a href={content.applyUrl || content.website} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg" className="gap-2">
                  Apply Now
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
