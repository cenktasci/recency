import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* Company Info */}
          <div className="col-span-2 sm:col-span-1 space-y-2 sm:space-y-3 mb-4 sm:mb-0 text-center sm:text-left">
            <h3 className="text-2xl sm:text-base font-bold bg-gradient-to-r from-sky-400 to-[#1e2f4d] bg-clip-text text-transparent">
              RECENCY
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-400">
              {language === 'tr' 
                ? 'Endüstriyel yıkama makineleri ve çözümleri konusunda lider marka'
                : 'Leading brand in industrial washing machines and solutions'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-medium">
              {language === 'tr' ? 'Hızlı Bağlantılar' : 'Quick Links'}
            </h4>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="text-[10px] sm:text-xs text-gray-400 hover:text-white block">
                  {language === 'tr' ? 'Ana Sayfa' : 'Home'}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-[10px] sm:text-xs text-gray-400 hover:text-white block">
                  {language === 'tr' ? 'Ürünler' : 'Products'}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[10px] sm:text-xs text-gray-400 hover:text-white block">
                  {language === 'tr' ? 'Hakkımızda' : 'About'}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[10px] sm:text-xs text-gray-400 hover:text-white block">
                  {language === 'tr' ? 'İletişim' : 'Contact'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-medium">
              {language === 'tr' ? 'Ürünlerimiz' : 'Our Products'}
            </h4>
            <ul className="space-y-1">
              <li>
                <Link href="/products/high-speed" className="text-[10px] sm:text-xs text-gray-400 hover:text-white block">
                  {language === 'tr' ? 'Yüksek Hızlı Makineler' : 'High Speed Machines'}
                </Link>
              </li>
              <li>
                <Link href="/products/dryers" className="text-[10px] sm:text-xs text-gray-400 hover:text-white block">
                  {language === 'tr' ? 'Kurutma Makineleri' : 'Dryer Machines'}
                </Link>
              </li>
              <li>
                <Link href="/products/special" className="text-[10px] sm:text-xs text-gray-400 hover:text-white block">
                  {language === 'tr' ? 'Özel Sistemler' : 'Special Systems'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 sm:col-span-1 space-y-2 text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-medium">
              {language === 'tr' ? 'İletişim' : 'Contact'}
            </h4>
            <ul className="space-y-1">
              <li>
                <p className="text-[10px] sm:text-xs text-gray-400">
                  {language === 'tr' ? 'Adres: İstanbul, Türkiye' : 'Address: Istanbul, Turkey'}
                </p>
              </li>
              <li>
                <p className="text-[10px] sm:text-xs text-gray-400">
                  {language === 'tr' ? 'Telefon: ' : 'Phone: '}+90 (XXX) XXX XX XX
                </p>
              </li>
              <li>
                <p className="text-[10px] sm:text-xs text-gray-400">
                  {language === 'tr' ? 'E-posta: ' : 'Email: '}info@example.com
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800/50 mt-4 pt-3 text-center text-[9px] sm:text-[10px] text-gray-400/70">
          <p>&copy; 2025 Recency {language === 'tr' ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  );
} 