'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '../../context/LanguageContext';

const mainVideo = {
  videoUrl: 'https://cdn.coverr.co/videos/coverr-textile-manufacturing-machine-1092/1080p.mp4',
  fallbackImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop'
};

const productCategories = [
  {
    id: 'washing',
    image: '/1.jpeg',
    titleTR: 'Endüstriyel Yıkama Makineleri',
    titleEN: 'Industrial Washing Machines',
    descTR: 'Yüksek performanslı ve enerji verimli yıkama sistemleri',
    descEN: 'High-performance and energy-efficient washing systems'
  },
  {
    id: 'dyeing',
    image: '/2.jpeg',
    titleTR: 'Tekstil Boyama Makineleri',
    titleEN: 'Textile Dyeing Machines',
    descTR: 'Hassas renk kontrolü ve profesyonel boyama çözümleri',
    descEN: 'Precise color control and professional dyeing solutions'
  },
  {
    id: 'denim',
    image: '/3.jpeg',
    titleTR: 'Denim Yıkama ve Boyama',
    titleEN: 'Denim Washing and Dyeing',
    descTR: 'Özel denim efektleri ve profesyonel yıkama sistemleri',
    descEN: 'Special denim effects and professional washing systems'
  }
];

export default function Hero() {
  const { t, language } = useLanguage();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);

  return (
    <>
      <div className="relative h-[60vh] bg-black overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={() => setIsVideoError(true)}
            className={`object-cover w-full h-full transition-opacity duration-1000 ${
              isVideoLoaded && !isVideoError ? 'opacity-50' : 'opacity-0'
            }`}
          >
            <source src={mainVideo.videoUrl} type="video/mp4" />
          </video>
        </div>

        {/* Fallback Image */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            !isVideoLoaded || isVideoError ? 'opacity-50' : 'opacity-0'
          }`}
        >
          <Image
            src={mainVideo.fallbackImage}
            alt="Industrial Textile Machinery"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <div className="w-full md:w-3/4 lg:w-2/3 space-y-4 text-center">
            <h1 className="text-xl md:text-3xl font-bold text-white leading-tight animate-fade-in">
              {t('hero.title')}
            </h1>
            <p className="text-sm md:text-base text-gray-200 animate-fade-in-delay max-w-xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 z-[1]" />
      </div>

      {/* Product Categories */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-gray-900 via-blue-800 to-blue-600 bg-clip-text text-transparent sm:text-3xl">
              {language === 'tr' ? 'Makinalarımız' : 'Our Machines'}
            </h2>
            <p className="mt-4 text-base text-gray-600 font-normal max-w-2xl mx-auto">
              {language === 'tr' 
                ? 'En son teknoloji ile donatılmış endüstriyel makinalarımız'
                : 'Our industrial machines equipped with the latest technology'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productCategories.map((category) => (
              <div
                key={category.id}
                className="group relative overflow-hidden"
              >
                {/* Image Container */}
                <div className="aspect-[4/5] relative overflow-hidden rounded-xl">
                  <Image
                    src={category.image}
                    alt={language === 'tr' ? category.titleTR : category.titleEN}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover w-full h-full"
                    quality={100}
                    style={{ objectPosition: 'center center' }}
                  />
                  {/* Subtle Gray Overlay */}
                  <div className="absolute inset-0 bg-gray-900/5 group-hover:bg-gray-900/0 transition-colors duration-500" />
                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="mt-4">
                  <div className="flex flex-col space-y-1.5">
                    <h3 className="text-base font-medium tracking-wide text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {language === 'tr' ? category.titleTR : category.titleEN}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-light">
                      {language === 'tr' ? category.descTR : category.descEN}
                    </p>
                  </div>
                </div>

                {/* Category Icon - Now as a subtle background element */}
                <div className="absolute -right-8 -bottom-8 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  {category.id === 'washing' && (
                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  )}
                  {category.id === 'dyeing' && (
                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  )}
                  {category.id === 'denim' && (
                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 15l-5-5L5 21M5 3L3 5m0 0l2 2M3 5l2-2m2 4l2 2M9 3l2 2m-2-2l2-2m2 4l2 2m-2-2l2-2m2 4l2 2m-2-2l2-2" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 