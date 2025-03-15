'use client';

import Header from '../layout/Header';
import Footer from '../layout/Footer';
import LanguageTest from '../components/test/LanguageTest';

export default function TestPage() {
  return (
    <main className="min-h-screen pt-[60px] md:pt-0 overflow-x-hidden">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <LanguageTest />
      </div>
      <Footer />
    </main>
  );
} 