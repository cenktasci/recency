'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menü öğelerini dil değişimine göre tanımlayalım
  const menuItems = [
    { id: 'home', path: '/', label: language === 'tr' ? 'Ana Sayfa' : 'Home' },
    { id: 'products', path: '/products', label: language === 'tr' ? 'Ürünler' : 'Products' },
    { id: 'about', path: '/about', label: language === 'tr' ? 'Hakkımızda' : 'About' },
    { id: 'contact', path: '/contact', label: language === 'tr' ? 'İletişim' : 'Contact' }
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-semibold transition-colors duration-300">
              <span className="bg-gradient-to-r from-sky-400 to-[#1e2f4d] bg-clip-text text-transparent hover:opacity-80">
                RECENCY
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className={`px-2 py-1 text-sm font-medium rounded-md ${
                language === 'tr' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={toggleLanguage}
            >
              TR
            </button>
            <button
              className={`px-2 py-1 text-sm font-medium rounded-md ${
                language === 'en' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={toggleLanguage}
            >
              EN
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-0 z-40 transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
        style={{ top: '56px' }} // Header yüksekliği kadar boşluk bırak
      >
        <div className="absolute inset-0 bg-white">
          <nav className="flex flex-col items-center w-full h-full pt-4">
            {menuItems.map((item, index) => (
              <div key={item.id} className="w-full text-center">
                <Link
                  href={item.path}
                  className="inline-block w-full py-4 text-lg font-medium text-gray-900 hover:text-blue-500 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {index !== menuItems.length - 1 && (
                  <div className="h-px w-16 bg-gray-200 mx-auto" />
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop Header */}
      <header className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-semibold transition-colors duration-300">
              <span className="bg-gradient-to-r from-sky-400 to-[#1e2f4d] bg-clip-text text-transparent hover:opacity-80">
                RECENCY
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.path}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-2">
              <button
                className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                  language === 'tr' 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={toggleLanguage}
              >
                TR
              </button>
              <button
                className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                  language === 'en' 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={toggleLanguage}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
} 