import Navbar from '@/components/public/Navbar';
import HeroSection from '@/components/public/HeroSection';
import AboutSection from '@/components/public/AboutSection';
import ServicesSection from '@/components/public/ServicesSection';
import VerificationSection from '@/components/public/VerificationSection';
import ContactSection from '@/components/public/ContactSection';
import Footer from '@/components/public/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <VerificationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
