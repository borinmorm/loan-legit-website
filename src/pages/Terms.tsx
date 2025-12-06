import React from 'react';
import { useSiteContent } from '@/contexts/SiteContentContext';

const Terms = () => {
  const { content } = useSiteContent();

  return (
    <main className="container py-20">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="text-muted-foreground mb-6">Last updated: December 6, 2023</p>

      <p className="mb-4">By accessing or using {content.companyName} (the "Service"), you agree to be bound by these Terms of Service.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Use of Service</h2>
      <p className="mb-4">You must be 18 years or older and provide accurate information when applying for loans. The Service is provided in accordance with Philippine law and SEC regulations.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Limitation of Liability</h2>
      <p className="mb-4">To the extent permitted by law, {content.companyName} will not be liable for indirect, incidental, or consequential damages.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p className="mb-4">For questions about these terms, contact us at <a href={`mailto:${content.email}`} className="text-secondary">{content.email}</a>.</p>
    </main>
  );
};

export default Terms;
