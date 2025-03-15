'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

export default function ContactCTA() {
  const { language } = useLanguage();

  return (
    <section className="bg-gradient-to-b from-indigo-900 to-blue-800 py-12 md:py-20 relative overflow-hidden">
      {/* Dekoratif Unsurlar */}
      <div className="absolute top-0 right-0">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
          <circle cx="200" cy="200" r="200" fill="white"/>
        </svg>
      </div>
      <div className="absolute bottom-0 left-0">
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
          <circle cx="150" cy="150" r="150" fill="white"/>
        </svg>
      </div>
      <div className="absolute -left-10 top-1/3 w-20 h-20 bg-blue-500 opacity-20 rounded-full blur-xl"></div>
      <div className="absolute -right-10 bottom-1/3 w-20 h-20 bg-blue-300 opacity-20 rounded-full blur-xl"></div>
      
      {/* İçerik */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Sol Taraf - Görsel */}
          <div className="w-full md:w-2/5 mb-8 md:mb-0">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-all duration-300 hover:shadow-blue-400/20">
              <Image 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2940&auto=format&fit=crop"
                width={600}
                height={400}
                alt="Ürün Uzmanı"
                className="w-full"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs text-white font-medium border border-white/20">
                  <svg className="w-3.5 h-3.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {language === 'tr' ? '24/7 Destek' : '24/7 Support'}
                </div>
              </div>
            </div>
          </div>
          
          {/* Sağ Taraf - Metin ve Buton */}
          <div className="w-full md:w-3/5 md:pl-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              {language === 'tr' ? 'Ürünlerimiz Hakkında Daha Fazla Bilgi Alın' : 'Get More Information About Our Products'}
            </h2>
            
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              {language === 'tr' 
                ? 'İhtiyaçlarınıza uygun çözümler için bizimle iletişime geçin. Uzman ekibimiz size yardımcı olmaktan memnuniyet duyacaktır.'
                : 'Contact us for solutions tailored to your needs. Our expert team will be happy to assist you.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center bg-white text-indigo-800 px-6 py-3 rounded-xl font-medium shadow-lg shadow-indigo-900/30 hover:shadow-xl transition-all duration-300 hover:bg-indigo-50"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {language === 'tr' ? 'Bize Ulaşın' : 'Contact Us'}
              </Link>
              
              <button className="inline-flex items-center justify-center bg-transparent border border-white/30 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-all duration-300">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {language === 'tr' ? 'Ürün Kataloğu' : 'Product Catalog'}
              </button>
            </div>
            
            {/* Özellikler Listesi */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-blue-100">
                  {language === 'tr' ? 'Teknik Destek' : 'Technical Support'}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-blue-100">
                  {language === 'tr' ? 'Hızlı Teslimat' : 'Fast Delivery'}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-blue-100">
                  {language === 'tr' ? 'Özel Çözümler' : 'Custom Solutions'}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-blue-100">
                  {language === 'tr' ? 'Garanti Desteği' : 'Warranty Support'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 