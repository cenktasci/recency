'use client';

import Header from '../layout/Header';
import Footer from '../layout/Footer';
import ProductsPage from '../components/products/Products';
import Motto from '../components/dashboard/Motto';

export default function Products() {
  return (
    <main className="min-h-screen pt-[60px] md:pt-0 overflow-x-hidden">
      <Header />
      <ProductsPage />
      <Motto />
      <Footer />
    </main>
  );
} 