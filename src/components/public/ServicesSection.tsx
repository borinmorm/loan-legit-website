import { Wallet, Clock, Shield, FileCheck, CreditCard, Headphones } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Wallet,
      title: 'Personal Loans',
      description: 'Quick personal loans with competitive interest rates for your immediate financial needs.',
    },
    {
      icon: Clock,
      title: 'Fast Approval',
      description: 'Get your loan approved within 24 hours with our streamlined application process.',
    },
    {
      icon: Shield,
      title: 'Secure Process',
      description: 'Your data is protected with bank-level security and encryption protocols.',
    },
    {
      icon: FileCheck,
      title: 'Simple Requirements',
      description: 'Minimal documentation required. Just valid ID and proof of income.',
    },
    {
      icon: CreditCard,
      title: 'Flexible Terms',
      description: 'Choose repayment terms that work best for your financial situation.',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Our dedicated team is available round the clock to assist you.',
    },
  ];

  return (
    <section id="services" className="py-20 gradient-hero">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            Why Choose  CREST OF NICE-J Lending?
          </h2>
          <p className="text-muted-foreground">
            We provide comprehensive lending solutions designed to meet your financial needs with transparency and trust.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="group bg-card rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-border hover:border-secondary/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
