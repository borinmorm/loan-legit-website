import React from 'react';
import { useSiteContent } from '@/contexts/SiteContentContext';

const Privacy = () => {
  const { content } = useSiteContent();

  return (
    <main className="container py-20">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-muted-foreground mb-6">Last updated: December 6, 2023</p>

      <p className="mb-4">
        {content.companyName} ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <p className="mb-4">We may collect personal information that you provide directly to us such as name, email address, contact information, and any documents you upload when applying for a loan.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
      <p className="mb-4">We use the information we collect to provide, maintain, and improve our services, communicate with you, and comply with legal obligations.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p className="mb-4">If you have questions about this Privacy Policy, contact us at <a href={`mailto:${content.email}`} className="text-secondary">{content.email}</a> or visit our office at {content.address}.</p>
    </main>
  );
};

export default Privacy;
