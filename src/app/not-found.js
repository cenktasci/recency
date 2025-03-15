'use client';

import Link from 'next/link';
import { useLanguage } from './context/LanguageContext';

export default function NotFound() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-xl mx-auto px-4 py-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {language === 'tr' ? '404 - Sayfa Bulunamadı' : '404 - Page Not Found'}
        </h2>
        <p className="text-gray-600 mb-8">
          {language === 'tr' 
            ? 'Aradığınız sayfa bulunamadı veya taşınmış olabilir.'
            : 'The page you are looking for does not exist or has been moved.'}
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          {language === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home'}
        </Link>
      </div>
    </div>
  );
} 