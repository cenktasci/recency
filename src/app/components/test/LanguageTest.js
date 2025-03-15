'use client';

import { useLanguage } from '../../context/LanguageContext';

export default function LanguageTest() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Dil Değişimi Testi / Language Change Test</h2>
      
      <div className="mb-4">
        <p className="text-lg">Mevcut Dil / Current Language: <strong>{language}</strong></p>
      </div>
      
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${
            language === 'tr' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={toggleLanguage}
        >
          Türkçe
        </button>
        
        <button
          className={`px-4 py-2 rounded-md ${
            language === 'en' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={toggleLanguage}
        >
          English
        </button>
      </div>
      
      <div className="border-t pt-4">
        <h3 className="text-xl font-semibold mb-2">
          {language === 'tr' ? 'Çeviri Testi' : 'Translation Test'}
        </h3>
        
        <ul className="space-y-2">
          <li>
            <strong>{language === 'tr' ? 'Ana Sayfa' : 'Home'}</strong>
          </li>
          <li>
            <strong>{language === 'tr' ? 'Ürünler' : 'Products'}</strong>
          </li>
          <li>
            <strong>{language === 'tr' ? 'Hakkımızda' : 'About'}</strong>
          </li>
          <li>
            <strong>{language === 'tr' ? 'İletişim' : 'Contact'}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
} 