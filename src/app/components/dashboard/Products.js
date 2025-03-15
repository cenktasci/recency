'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { useState } from 'react';
import productsData from '../../data/products.json';

export default function Products() {
  const { language } = useLanguage();
  const [playingVideo, setPlayingVideo] = useState(null);

  // Filter out unpublished products
  const publishedCategories = productsData[language].categories.filter(category => category.published !== false);

  // Use the first three published categories or fallback to default if not enough published categories
  const productCategories = publishedCategories.length >= 3 
    ? [
        {
          id: publishedCategories[0].id,
          title: publishedCategories[0].name,
          video: '/machine1.mp4'
        },
        {
          id: publishedCategories[1].id,
          title: publishedCategories[1].name,
          video: '/dyeing-machine.mp4'
        },
        {
          id: publishedCategories[2].id,
          title: publishedCategories[2].name,
          video: '/denim-machine.mp4'
        }
      ]
    : [
        {
          id: 'washing',
          title: language === 'tr' ? 'Yüksek Hızlı Yıkama Makineleri' : 'High Speed Washing Machines',
          video: '/machine1.mp4'
        },
        {
          id: 'dyeing',
          title: language === 'tr' ? 'Tekstil Boyama Makineleri' : 'Textile Dyeing Machines',
          video: '/dyeing-machine.mp4'
        },
        {
          id: 'denim',
          title: language === 'tr' ? 'Denim Yıkama ve Boyama' : 'Denim Washing and Dyeing',
          video: '/denim-machine.mp4'
        }
      ];

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-blue-600 bg-clip-text text-transparent sm:text-4xl">
            {language === 'tr' ? 'Ürün Kategorilerimiz' : 'Our Product Categories'}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {language === 'tr' 
              ? 'En son teknoloji ile donatılmış endüstriyel yıkama çözümlerimiz'
              : 'Industrial washing solutions equipped with the latest technology'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {productCategories.map((category, index) => (
            <Link href={`/products/${category.id}`} key={category.id} className="group">
              <div key={index} className="relative group">
                <div className="aspect-[4/5] relative overflow-hidden rounded-xl bg-black">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="object-cover w-full h-full"
                  >
                    <source src={category.video} type="video/mp4" />
                  </video>
                  {/* Subtle Gray Overlay */}
                  <div className="absolute inset-0 bg-gray-900/5 group-hover:bg-gray-900/0 transition-colors duration-500" />
                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="mt-4">
                  <div className="flex flex-col space-y-1.5">
                    <h3 className="text-base font-medium tracking-wide text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {index === 0 ? (language === 'tr' ? 'Endüstriyel Yıkama' : 'Industrial Washing') : 
                       index === 1 ? (language === 'tr' ? 'Tekstil Boyama' : 'Textile Dyeing') :
                                   (language === 'tr' ? 'Denim İşleme' : 'Denim Processing')}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-light">
                      {index === 0 ? (language === 'tr' ? 'Modern yıkama teknolojileri' : 'Modern washing technologies') :
                       index === 1 ? (language === 'tr' ? 'Hassas boyama sistemleri' : 'Precise dyeing systems') :
                                   (language === 'tr' ? 'Özel denim efektleri' : 'Special denim effects')}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 