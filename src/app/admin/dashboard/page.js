'use client';

import { useLanguage } from '../../context/LanguageContext';
import { Package, Users, Mail, BarChart } from 'lucide-react';

export default function AdminDashboard() {
  const { language } = useLanguage();

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {language === 'tr' ? 'Genel Bakış' : 'Overview'}
          </h1>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Stat Cards */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">
                  {language === 'tr' ? 'Toplam Ürün' : 'Total Products'}
                </p>
                <h3 className="text-xl font-semibold text-gray-800">128</h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">
                  {language === 'tr' ? 'Müşteriler' : 'Customers'}
                </p>
                <h3 className="text-xl font-semibold text-gray-800">1,482</h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">
                  {language === 'tr' ? 'Yeni Mesajlar' : 'New Messages'}
                </p>
                <h3 className="text-xl font-semibold text-gray-800">8</h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <BarChart className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">
                  {language === 'tr' ? 'Toplam Satış' : 'Total Sales'}
                </p>
                <h3 className="text-xl font-semibold text-gray-800">$24,890</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {language === 'tr' ? 'Son Aktiviteler' : 'Recent Activities'}
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {language === 'tr' ? 'Yeni ürün eklendi' : 'New product added'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {language === 'tr' ? '2 saat önce' : '2 hours ago'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
} 