'use client';

import Contact from '../components/contact/Contact';
import contactPageData from '../data/contactPageData.json';
import contactFormData from '../data/contactFormData.json';

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-[60px] md:pt-0 overflow-x-hidden">
      <Contact pageData={contactPageData} formData={contactFormData} />
    </main>
  );
} 