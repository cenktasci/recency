'use client';

import Image from 'next/image';
import { useLanguage } from '../../context/LanguageContext';
import { useRef, useEffect, useState } from 'react';
import Head from 'next/head';

const certificates = [
  {
    id: 1,
    image: '/certificates/certificates.pdf',
    pdfPreview: true,
    titleTR: 'Kalite Sertifikası',
    titleEN: 'Quality Certificate',
    descTR: 'Endüstriyel Standartlara Uygunluk',
    descEN: 'Industrial Standards Compliance'
  },
  {
    id: 2,
    image: '/certificates/certificates.pdf',
    pdfPreview: true,
    titleTR: 'CE Sertifikası',
    titleEN: 'CE Certificate',
    descTR: 'Avrupa Standartlarına Uygunluk',
    descEN: 'European Standards Compliance'
  },
  {
    id: 3,
    image: '/certificates/certificates.pdf',
    pdfPreview: true,
    titleTR: 'TSEK',
    titleEN: 'TSEK',
    descTR: 'Türk Standartlarına Uygunluk',
    descEN: 'Turkish Standards Compliance'
  }
];

export default function Certificates() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const sectionRef = useRef(null);

  const handleCertificateClick = (cert) => {
    if (cert.pdfPreview) {
      setSelectedPdf(cert.image);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPdf(null);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>

      <section ref={sectionRef} className="py-8 bg-gradient-to-b from-gray-50 to-white">
        {/* Sertifikalarımız Başlığı */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-blue-600 bg-clip-text text-transparent sm:text-4xl">
              {language === 'tr' ? 'Sertifikalarımız' : 'Our Certificates'}
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              {language === 'tr' 
                ? 'Kalite ve standartlara uygunluk belgelerimiz'
                : 'Our quality and standards compliance certificates'}
            </p>
          </div>
        </div>
        
        {/* Mobile Grid View */}
        <div className="md:hidden grid grid-cols-1 gap-3 mt-16">
          {certificates.map((cert, index) => (
            <div
              key={cert.id}
              className="transform transition-all duration-300"
              onClick={() => handleCertificateClick(cert)}
            >
              <div className="flex items-center space-x-4 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    {language === 'tr' ? cert.titleTR : cert.titleEN}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {language === 'tr' ? cert.descTR : cert.descEN}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-16 md:mt-0">
          <div className="hidden md:grid grid-cols-3 gap-4">
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                className={`transform transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } delay-${index * 100}`}
              >
                <div 
                  onClick={() => handleCertificateClick(cert)}
                  className="group relative bg-white rounded-lg p-4 hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-100"
                >
                  {/* Icon Container */}
                  <div className="h-32 flex items-center justify-center mb-3">
                    <div className="transform transition-transform duration-300 group-hover:scale-105">
                      <svg className="w-10 h-10 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      {language === 'tr' ? cert.titleTR : cert.titleEN}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {language === 'tr' ? cert.descTR : cert.descEN}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PDF Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={handleCloseModal}></div>

            <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="mt-2 relative" style={{ height: '70vh' }}>
                      <iframe
                        src={`${selectedPdf}#view=Fit`}
                        className="w-full h-full"
                        title="PDF Viewer"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto"
                  onClick={handleCloseModal}
                >
                  {language === 'tr' ? 'Kapat' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 