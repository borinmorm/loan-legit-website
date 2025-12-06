import { ExternalLink, CheckCircle, FileText, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSiteContent } from '@/contexts/SiteContentContext';

const VerificationSection = () => {
  const { content } = useSiteContent();

  const credentials = [
    { label: 'Company Name', value: content.companyName },
    { label: 'SEC Registration Number', value: content.secNumber },
    { label: 'Certificate of Authority', value: content.certAuthority },
    { label: 'Registration Date', value: content.registrationDate },
  ];

  return (
    <section id="verification" className="py-20 bg-card">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">SEC Verification</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            Registered & Regulated by the SEC
          </h2>
          <p className="text-muted-foreground">
            Verify our legitimacy through the official Securities and Exchange Commission (SEC) website.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-3xl p-8 md:p-12 border border-border">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center">
                <Building className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Government of the Philippines</h3>
                <p className="text-muted-foreground">Securities and Exchange Commission</p>
              </div>
            </div>

            {/* Credentials grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {credentials.map((cred) => (
                <div key={cred.label} className="bg-card rounded-xl p-5 border border-border">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{cred.label}</p>
                      <p className="font-semibold text-foreground">{cred.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Verification CTA */}
            <div className="bg-success/10 rounded-xl p-6 border border-success/20">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <FileText className="h-6 w-6 text-success mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Verify Our Registration</h4>
                    <p className="text-sm text-muted-foreground">
                      Check our credentials on the official SEC website
                    </p>
                  </div>
                </div>
                <a href={content.secVerifyUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="success" className="gap-2">
                    Verify Now
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerificationSection;
