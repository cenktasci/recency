'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  tr: {
    nav: {
      home: 'Ana Sayfa',
      products: 'Ürünler',
      about: 'Hakkımızda',
      contact: 'İletişim'
    },
    hero: {
      title: 'Endüstriyel Tekstil Boyama ve Yıkama Makineleri',
      subtitle: 'Tekstil sektörü için yenilikçi boyama ve yıkama çözümleri',
      exploreButton: 'Ürünleri Keşfet',
      contactButton: 'Bize Ulaşın'
    },
    products: {
      title: 'Ürün Kategorilerimiz',
      subtitle: 'En son teknoloji ile donatılmış endüstriyel tekstil boyama ve yıkama çözümleri',
      categories: [
        {
          name: 'Tekstil Boyama Makineleri',
          description: 'Hassas renk kontrolü ve yüksek verimlilik sağlayan profesyonel boyama sistemleri'
        },
        {
          name: 'Endüstriyel Yıkama Sistemleri',
          description: 'Özel tekstil ürünleri için geliştirilmiş yıkama çözümleri'
        },
        {
          name: 'Numune Boyama Makineleri',
          description: 'Ar-Ge ve küçük parti üretimler için özel boyama sistemleri'
        },
        {
          name: 'Otomasyon Sistemleri',
          description: 'Akıllı kontrol ve proses takip çözümleri'
        }
      ]
    },
    footer: {
      companyInfo: 'Endüstriyel tekstil boyama ve yıkama makineleri konusunda lider marka',
      quickLinks: 'Hızlı Bağlantılar',
      ourProducts: 'Ürünlerimiz',
      contact: 'İletişim',
      address: 'İstanbul, Türkiye',
      rights: 'Tüm hakları saklıdır.'
    },
    languageSwitch: 'EN'
  },
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      about: 'About',
      contact: 'Contact'
    },
    hero: {
      title: 'Industrial Textile Dyeing and Washing Machines',
      subtitle: 'Innovative dyeing and washing solutions for the textile industry',
      exploreButton: 'Explore Products',
      contactButton: 'Contact Us'
    },
    products: {
      title: 'Our Product Categories',
      subtitle: 'Industrial textile dyeing and washing solutions equipped with the latest technology',
      categories: [
        {
          name: 'Textile Dyeing Machines',
          description: 'Professional dyeing systems providing precise color control and high efficiency'
        },
        {
          name: 'Industrial Washing Systems',
          description: 'Specialized washing solutions for textile products'
        },
        {
          name: 'Sample Dyeing Machines',
          description: 'Special dyeing systems for R&D and small batch production'
        },
        {
          name: 'Automation Systems',
          description: 'Smart control and process monitoring solutions'
        }
      ]
    },
    footer: {
      companyInfo: 'Leading brand in industrial textile dyeing and washing machines',
      quickLinks: 'Quick Links',
      ourProducts: 'Our Products',
      contact: 'Contact',
      address: 'Istanbul, Turkey',
      rights: 'All rights reserved.'
    },
    languageSwitch: 'TR'
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('tr');

  useEffect(() => {
    // Check if there's a saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'tr' ? 'en' : 'tr';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value[k];
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 