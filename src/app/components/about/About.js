'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Motto from '../dashboard/Motto';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import ContactCTA from '../common/ContactCTA';

export default function About() {
  const { language } = useLanguage();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  
  // Parallax effect for hero section
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  
  // State for scroll-to-top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Check scroll position to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3
      }
    }
  };

  // Team members data
  const teamMembers = [
    {
      name: 'Ahmet Yılmaz',
      role: language === 'tr' ? 'Kurucu & CEO' : 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: language === 'tr' 
        ? 'Sektörde 15 yıllık deneyime sahip, yenilikçi çözümler konusunda uzman.'
        : 'Has 15 years of experience in the industry, expert in innovative solutions.'
    },
    {
      name: 'Ayşe Kaya',
      role: language === 'tr' ? 'Pazarlama Direktörü' : 'Marketing Director',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: language === 'tr'
        ? 'Dijital pazarlama stratejileri konusunda uzmanlaşmış, yaratıcı kampanyalar geliştirir.'
        : 'Specialized in digital marketing strategies, develops creative campaigns.'
    },
    {
      name: 'Mehmet Demir',
      role: language === 'tr' ? 'Teknik Direktör' : 'Technical Director',
      image: 'https://randomuser.me/api/portraits/men/68.jpg',
      bio: language === 'tr'
        ? 'Yazılım geliştirme ve teknik çözümler konusunda 10 yıllık deneyime sahip.'
        : 'Has 10 years of experience in software development and technical solutions.'
    }
  ];

  // Company milestones
  const milestones = [
    {
      year: '2010',
      title: language === 'tr' ? 'Şirket Kuruluşu' : 'Company Founded',
      description: language === 'tr'
        ? 'Recency, İstanbul\'da kuruldu ve ilk ofisini açtı.'
        : 'Recency was founded in Istanbul and opened its first office.'
    },
    {
      year: '2015',
      title: language === 'tr' ? 'Uluslararası Genişleme' : 'International Expansion',
      description: language === 'tr'
        ? 'İlk uluslararası ofisimizi Londra\'da açtık.'
        : 'We opened our first international office in London.'
    },
    {
      year: '2018',
      title: language === 'tr' ? 'Ödül Kazanma' : 'Award Winning',
      description: language === 'tr'
        ? 'Sektörün en prestijli ödüllerinden birini kazandık.'
        : 'We won one of the most prestigious awards in the industry.'
    },
    {
      year: '2023',
      title: language === 'tr' ? 'Yeni Teknolojiler' : 'New Technologies',
      description: language === 'tr'
        ? 'Yapay zeka destekli yeni ürünlerimizi piyasaya sürdük.'
        : 'We launched our new AI-powered products.'
    }
  ];

  // Stats
  const stats = [
    { value: '10+', label: language === 'tr' ? 'Yıllık Deneyim' : 'Years Experience' },
    { value: '50+', label: language === 'tr' ? 'Tamamlanan Proje' : 'Projects Completed' },
    { value: '20+', label: language === 'tr' ? 'Uzman Ekip' : 'Expert Team Members' },
    { value: '5+', label: language === 'tr' ? 'Ülkede Hizmet' : 'Countries Served' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-[60px] md:pt-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-x-hidden">
        {/* Hero Section with Parallax */}
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
              className="text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-6"
            >
              {language === 'tr' ? 'Hakkımızda' : 'About Us'}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm md:text-xl text-white/90 mb-4 md:mb-6 max-w-3xl mx-auto"
            >
              {language === 'tr' 
                ? 'Recency olarak, müşterilerimize en yüksek kalitede hizmet sunmayı ve sektörde öncü olmayı hedefliyoruz.'
                : 'At Recency, we aim to provide the highest quality service to our customers and to be a leader in the industry.'}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-16 h-1 md:w-20 md:h-1 bg-blue-400 mx-auto rounded-full mb-6 md:mb-12"
            ></motion.div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section id="stats-section" className="py-10 md:py-16 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <h3 className="text-2xl md:text-4xl font-bold text-blue-600 mb-1 md:mb-2">{stat.value}</h3>
                  <p className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-10 md:py-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_70%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_70%)]"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-xl p-5 md:p-10 border border-white/20 overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
              
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
                <motion.div variants={fadeInUp}>
                  <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-6">
                    {language === 'tr' ? 'Vizyonumuz & Misyonumuz' : 'Our Vision & Mission'}
                  </h2>
                  <p className="text-sm md:text-lg text-gray-600 mb-3 md:mb-6">
                    {language === 'tr' 
                      ? 'Recency olarak, teknoloji ve inovasyonu bir araya getirerek müşterilerimize en iyi çözümleri sunmayı hedefliyoruz. Sektörde öncü olmak ve sürekli gelişim için çalışıyoruz.'
                      : 'At Recency, we aim to provide the best solutions to our customers by combining technology and innovation. We work to be a leader in the industry and for continuous development.'}
                  </p>
                  <p className="text-sm md:text-lg text-gray-600">
                    {language === 'tr'
                      ? 'Müşteri memnuniyeti bizim için en önemli değerdir. Her projede en yüksek kalite standartlarını sağlamak için çalışıyoruz.'
                      : 'Customer satisfaction is the most important value for us. We work to ensure the highest quality standards in every project.'}
                  </p>
                  
                  <div className="mt-4 md:mt-8 flex flex-wrap gap-2 md:gap-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div className="ml-2 md:ml-4">
                        <h3 className="text-xs md:text-base font-medium text-gray-900">{language === 'tr' ? 'Güvenilirlik' : 'Reliability'}</h3>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="ml-2 md:ml-4">
                        <h3 className="text-xs md:text-base font-medium text-gray-900">{language === 'tr' ? 'Hız' : 'Speed'}</h3>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div className="ml-2 md:ml-4">
                        <h3 className="text-xs md:text-base font-medium text-gray-900">{language === 'tr' ? 'İnovasyon' : 'Innovation'}</h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Mobile Office Image (visible only on small screens) */}
                <motion.div 
                  variants={fadeInUp}
                  className="mt-5 md:hidden relative h-48 rounded-xl overflow-hidden shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                  <Image 
                    src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" 
                    alt="Recency Office"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300"
                    unoptimized
                  />
                </motion.div>
                
                {/* Desktop Office Image (hidden on small screens) */}
                <motion.div 
                  variants={fadeInUp}
                  className="hidden md:block relative h-80 rounded-2xl overflow-hidden shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                  <Image 
                    src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" 
                    alt="Recency Office"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300"
                    unoptimized
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Milestones Section */}
        <section className="py-12 md:py-20 bg-blue-50/70 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-3 md:mb-4">
                {language === 'tr' ? 'Kilometre Taşlarımız' : 'Our Milestones'}
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                {language === 'tr'
                  ? 'Yıllar içinde büyüme ve başarı hikayemiz.'
                  : 'Our story of growth and success over the years.'}
              </p>
              <div className="w-16 h-1 md:w-20 md:h-1.5 bg-blue-600 mx-auto rounded-full mt-4 md:mt-6"></div>
            </motion.div>

            {/* Mobile Timeline (visible only on small screens) */}
            <div className="md:hidden space-y-6">
              {milestones.map((milestone, index) => (
                <motion.div 
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        duration: 0.5, 
                        ease: [0.22, 1, 0.36, 1],
                        delay: index * 0.1
                      }
                    }
                  }}
                  className="bg-white rounded-xl shadow-lg p-5 relative"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 rounded-l-xl"></div>
                  <div className="pl-3">
                    <div className="inline-block px-3 py-1.5 rounded-full bg-blue-100 text-blue-600 font-bold text-base mb-2">{milestone.year}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop Timeline (hidden on small screens) */}
            <div className="hidden md:block relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 rounded-full"></div>
              
              {/* Timeline Items */}
              <div className="relative">
                {milestones.map((milestone, index) => (
                  <motion.div 
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          duration: 0.6, 
                          ease: [0.22, 1, 0.36, 1],
                          delay: index * 0.15
                        }
                      }
                    }}
                    className={`flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 lg:pr-16 text-right' : 'pl-12 lg:pl-16 text-left'}`}>
                      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
                        <div className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-bold text-xl mb-4">{milestone.year}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                        <p className="text-base text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-blue-600 border-4 border-blue-100 z-10"></div>
                    </div>
                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 md:py-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.1),transparent_70%)]"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-3 md:mb-4">
                {language === 'tr' ? 'Ekibimiz' : 'Our Team'}
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                {language === 'tr'
                  ? 'Başarımızın arkasındaki uzman ve tutkulu ekibimizle tanışın.'
                  : 'Meet our expert and passionate team behind our success.'}
              </p>
              <div className="w-16 h-1 md:w-20 md:h-1.5 bg-blue-600 mx-auto rounded-full mt-4 md:mt-6"></div>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
            >
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative h-64 md:h-72 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-300"
                      unoptimized
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-20 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white/90 text-xs md:text-sm">{member.bio}</p>
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-sm md:text-base text-blue-600 font-medium">{member.role}</p>
                    <div className="mt-3 pt-3 md:mt-4 md:pt-4 border-t border-gray-100 flex space-x-3 md:space-x-4">
                      <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* İletişim CTA Bileşeni */}
        <ContactCTA />
        
        {/* Scroll to Top Button - Fixed at bottom right */}
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: showScrollTop ? 1 : 0, 
            scale: showScrollTop ? 1 : 0,
            y: showScrollTop ? 0 : 20
          }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 bg-blue-600/90 hover:bg-blue-700 p-3 md:p-4 rounded-full cursor-pointer shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      </main>
      <Motto />
      <Footer />
    </>
  );
} 