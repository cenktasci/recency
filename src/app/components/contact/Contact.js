'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import { motion, useScroll, useTransform } from 'framer-motion';
import Motto from '../dashboard/Motto';
import Image from 'next/image';
import Head from 'next/head';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Send
} from 'lucide-react';

export default function Contact({ pageData, formData }) {
  const { language } = useLanguage();
  const { translations, contactInfo, socialMedia } = pageData;
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    category: 'product',
    priority: 'normal'
  });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  const [focusedField, setFocusedField] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const heroTexts = {
    tr: [
      {
        title: 'Bizimle İletişime Geçin',
        subtitle: 'Size yardımcı olmak için buradayız'
      },
      {
        title: 'Profesyonel Destek',
        subtitle: '7/24 teknik destek hizmeti'
      },
      {
        title: 'Hızlı Çözümler',
        subtitle: 'Uzman ekibimizle yanınızdayız'
      }
    ],
    en: [
      {
        title: 'Get in Touch with Us',
        subtitle: 'We are here to help you'
      },
      {
        title: 'Professional Support',
        subtitle: '24/7 technical support service'
      },
      {
        title: 'Quick Solutions',
        subtitle: 'We are by your side with our expert team'
      }
    ]
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts[language].length);
    }, 3000);

    return () => clearInterval(interval);
  }, [language]);

  useEffect(() => {
    // Harita yüklendiğinde state'i güncelle
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create message object
      const message = {
        id: Date.now(),
        ...formState,
        status: 'unread',
        createdAt: new Date().toISOString(),
        readAt: null,
        repliedAt: null,
        reply: null,
        attachments: []
      };

      // Get existing messages from localStorage
      const existingData = JSON.parse(localStorage.getItem('admin_messages') || '{"messages":[]}');
      
      // Add new message
      existingData.messages.push(message);
      
      // Save back to localStorage
      localStorage.setItem('admin_messages', JSON.stringify(existingData));

      // Reset form
      setFormState({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        category: 'product',
        priority: 'normal'
      });

      alert(language === 'tr' ? 'Mesajınız gönderildi!' : 'Your message has been sent!');
    } catch (error) {
      console.error('Error sending message:', error);
      alert(language === 'tr' ? 'Bir hata oluştu!' : 'An error occurred!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  // İstatistikler
  const stats = [
    {
      value: '10+',
      label: language === 'tr' ? 'Yıllık Deneyim' : 'Years Experience'
    },
    {
      value: '500+',
      label: language === 'tr' ? 'Mutlu Müşteri' : 'Happy Clients'
    },
    {
      value: '24/7',
      label: language === 'tr' ? 'Destek' : 'Support'
    },
    {
      value: '50+',
      label: language === 'tr' ? 'Uzman Ekip' : 'Expert Team'
    }
  ];

  // Sosyal medya linkleri
  const socialLinks = [
    {
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
        </svg>
      ),
      href: '#'
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      href: '#'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      href: '#'
    },
    {
      name: 'Instagram',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
        </svg>
      ),
      href: '#'
    }
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <Header />
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Parallax Background */}
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ y: heroY }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/90 mix-blend-multiply z-10"></div>
            <Image
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
              alt="Modern Office"
              fill
              style={{ objectFit: 'cover' }}
              unoptimized
              priority
            />
          </motion.div>
          
          {/* Hero Content */}
          <motion.div 
            className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
            style={{ opacity, scale }}
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-6"
            >
              {language === 'tr' ? 'Bizimle İletişime Geçin' : 'Get in Touch with Us'}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-base md:text-lg text-white/90 mb-4 md:mb-6 max-w-3xl mx-auto"
            >
              {language === 'tr' 
                ? 'Size yardımcı olmak için buradayız. Uzman ekibimizle yanınızdayız.'
                : 'We are here to help you. We are by your side with our expert team.'}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto rounded-full mb-6 md:mb-12"
            ></motion.div>
          </motion.div>
        </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-8 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
            {/* Contact Information - Moved to top for mobile */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 md:space-y-6 order-1 lg:order-2"
            >
              {/* Map */}
              <div className="relative h-[200px] md:h-[300px] rounded-2xl overflow-hidden bg-gray-100 shadow-md">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isMapLoaded ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <iframe
                    src={contactInfo.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => setIsMapLoaded(true)}
                  ></iframe>
                </motion.div>
              </div>

              {/* Contact Info Cards - More Mobile Friendly Version */}
              <div className="grid grid-cols-2 gap-1.5 md:gap-3">
                <div className="bg-white p-2 md:p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center space-x-1.5 md:space-x-3">
                    <div className="flex-shrink-0">
                      <div className="p-1 md:p-2 bg-blue-50 rounded-md">
                        <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] md:text-xs text-gray-600">
                        {contactInfo.address[language]}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-2 md:p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center space-x-1.5 md:space-x-3">
                    <div className="flex-shrink-0">
                      <div className="p-1 md:p-2 bg-blue-50 rounded-md">
                        <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] md:text-xs text-gray-600">{contactInfo.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-2 md:p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center space-x-1.5 md:space-x-3">
                    <div className="flex-shrink-0">
                      <div className="p-1 md:p-2 bg-blue-50 rounded-md">
                        <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] md:text-xs text-gray-600">{contactInfo.email}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-2 md:p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center space-x-1.5 md:space-x-3">
                    <div className="flex-shrink-0">
                      <div className="p-1 md:p-2 bg-blue-50 rounded-md">
                        <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] md:text-xs text-gray-600">
                        {contactInfo.workHours[language]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Links - More Mobile Friendly Version */}
              <div className="bg-white p-2 md:p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-center space-x-2 md:space-x-3">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="p-1 md:p-2 bg-gray-50 rounded-md text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {link.icon}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form - Moved to bottom for mobile */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 order-2 lg:order-1"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                {translations.title[language]}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative group">
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      {translations.form.name[language]}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formState.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus('name')}
                        onBlur={handleBlur}
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm"
                        required
                      />
                      <div className="absolute inset-0 rounded-lg transition-all duration-300 group-hover:ring-2 group-hover:ring-blue-100 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      {translations.form.email[language]}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formState.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={handleBlur}
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm"
                        required
                      />
                      <div className="absolute inset-0 rounded-lg transition-all duration-300 group-hover:ring-2 group-hover:ring-blue-100 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative group">
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      {translations.form.phone[language]}
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        onFocus={() => handleFocus('phone')}
                        onBlur={handleBlur}
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm"
                        required
                      />
                      <div className="absolute inset-0 rounded-lg transition-all duration-300 group-hover:ring-2 group-hover:ring-blue-100 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      {translations.form.company[language]}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        value={formState.company}
                        onChange={handleChange}
                        onFocus={() => handleFocus('company')}
                        onBlur={handleBlur}
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm"
                        required
                      />
                      <div className="absolute inset-0 rounded-lg transition-all duration-300 group-hover:ring-2 group-hover:ring-blue-100 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative group">
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      {translations.form.subject[language]}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        onFocus={() => handleFocus('subject')}
                        onBlur={handleBlur}
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm"
                        required
                      />
                      <div className="absolute inset-0 rounded-lg transition-all duration-300 group-hover:ring-2 group-hover:ring-blue-100 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      {formData.categories[0].name[language]}
                    </label>
                    <div className="relative">
                      <select
                        name="category"
                        id="category"
                        value={formState.category}
                        onChange={handleChange}
                        onFocus={() => handleFocus('category')}
                        onBlur={handleBlur}
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm"
                      >
                        {formData.categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name[language]}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-0 rounded-lg transition-all duration-300 group-hover:ring-2 group-hover:ring-blue-100 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <label className="text-xs font-medium text-gray-600 mb-1 block">
                    {translations.form.message[language]}
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm resize-none"
                      required
                    ></textarea>
                    <div className="absolute inset-0 rounded-lg transition-all duration-300 group-hover:ring-2 group-hover:ring-blue-100 pointer-events-none"></div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  <span>{translations.form.submit[language]}</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Motto />
      <Footer />
    </>
  );
} 