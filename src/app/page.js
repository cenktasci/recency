'use client';

//sabitler
import Header from './layout/Header';
import Footer from './layout/Footer';

//dashboard
import Hero from './components/dashboard/Hero';
import Products from './components/dashboard/Products';
import Motto from './components/dashboard/Motto';
import Certificates from './components/dashboard/Certificates';
import Common from './components/common/ContactCTA';

export default function Home() {
  return (
    <main className="min-h-screen pt-[60px] md:pt-0 overflow-x-hidden">
      <Header />
      <Hero />
      <Products />
      <Certificates />
      <Motto />
      <Common />
      <Footer />
    </main>
  );
}