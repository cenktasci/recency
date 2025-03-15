'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import productsData from '../../data/products.json';
import ContactCTA from '../common/ContactCTA';

export default function Products() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // CSS Değişkenleri stil değişiklikleri için
  useEffect(() => {
    document.documentElement.style.setProperty('--color-gray-50', '#F9FAFB');
  }, []);

  // Basit kategori listesi
  const categories = [
    { id: 'all', name: language === 'tr' ? 'Tümü' : 'All' },
    ...productsData[language].categories
      .filter(category => category.published !== false)
      .map(category => ({
        id: category.id,
        name: category.name
      }))
  ];

  // Basit ürün filtreleme (component render sırasında yapılıyor)
  const allProducts = productsData[language].categories.filter(product => product.published !== false);
  const productList = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(product => product.id === selectedCategory);

  // Kategorilere göre ürünleri filtreler
  function handleCategoryChange(id) {
    console.log('Kategori değişti:', id);
    setSelectedCategory(id);
  }

  // Scroll kontrolü
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Sayfanın üstüne çıkma fonksiyonu
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  console.log('Render oldu. Dil:', language, 'Kategori:', selectedCategory, 'Ürün sayısı:', productList.length);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/90 mix-blend-multiply z-10"></div>
          <Image
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="Industrial Machines"
            fill
            style={{ objectFit: 'cover' }}
            unoptimized
            priority
          />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-6">
            {language === 'tr' ? 'Ürünlerimiz' : 'Our Products'}
          </h1>
          <p className="text-base md:text-xl text-white/90 mb-4 md:mb-6 max-w-3xl mx-auto">
            {language === 'tr' 
              ? 'En son teknoloji ile donatılmış endüstriyel yıkama ve boyama çözümlerimiz'
              : 'Our industrial washing and dyeing solutions equipped with the latest technology'}
          </p>
          <div className="w-20 h-1 md:w-24 md:h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mb-6 md:mb-12"></div>
        </div>
      </section>

      {/* Category Filters */}
      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 border flex items-center ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 border-transparent'
                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 border-gray-100 hover:shadow-sm'
                }`}
              >
                {selectedCategory === category.id && (
                  <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-8 md:py-12 bg-[var(--color-gray-50)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {productList.length === 0 ? (
            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl text-gray-600">
                {language === 'tr' ? 'Ürün bulunamadı.' : 'No products found.'}
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6">
              {productList.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  {/* Model Numarası */}
                  <div className="p-2 text-center">
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                      {product.modelNumber}
                    </h3>
                  </div>
                  
                  {/* Ürün resmi ve Ürün Adı */}
                  <div className="relative h-44 overflow-hidden bg-[var(--color-gray-50)]">
                    {/* Ürün resmi - zoom efekti kaldırıldı */}
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-500"
                      unoptimized
                    />
                    
                    {/* Ürün adı etiketi */}
                    <div className="absolute top-4 right-0 z-10">
                      <div className="px-4 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-l-md shadow-md">
                        {product.name}
                      </div>
                    </div>
                  </div>
                  
                  {/* İçerik bölümü - Flex ile büyüyebilir */}
                  <div className="p-4 flex-grow">
                    {/* Açıklama - Modernize edilmiş versiyon */}
                    <div className="bg-gradient-to-r from-[var(--color-gray-50)] to-[var(--color-gray-50)] p-3 rounded-lg shadow-sm border border-blue-100/50 mb-3 transform transition-all group-hover:scale-[1.02] group-hover:shadow">
                      <div className="flex items-start">
                        <div className="mt-0.5 mr-2 text-blue-500 flex-shrink-0">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="text-xs font-medium text-gray-600 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Özellikler - İlk özellik ve daha fazlası yan yana */}
                    <div className="flex items-center gap-2 mb-3">
                      {product.features.length > 0 && (
                        <div className="bg-[var(--color-gray-50)] px-2 py-2 rounded-lg flex items-center flex-1">
                          <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mr-1">
                            <svg className="w-2.5 h-2.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-[10px] text-gray-700 truncate">{product.features[0]}</span>
                        </div>
                      )}
                      
                      {product.features.length > 1 && (
                        <div className="flex-shrink-0 bg-[var(--color-gray-50)] px-3 py-2 rounded-lg text-xs text-gray-500 font-medium">
                          + {product.features.length - 1}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Footer - Detayları Gör butonu */}
                  <div className="mt-auto p-4 pt-0">
                    <button 
                      className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs font-medium flex items-center justify-center transition-all duration-300"
                    >
                      <span>{language === 'tr' ? 'Detayları Gör' : 'View Details'}</span>
                      <svg className="w-3 h-3 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* İletişim CTA Bileşeni */}
      <ContactCTA />

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 bg-blue-600/90 hover:bg-blue-700 p-3 md:p-4 rounded-full cursor-pointer shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </>
  );
} 