'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { 
  Home, 
  Package, 
  Mail, 
  Settings, 
  LogOut,
  Menu as MenuIcon,
  Database
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    const adminType = localStorage.getItem('adminType');
    
    if (pathname === '/admin') {
      // If on login page and already logged in, redirect to dashboard
      if (isLoggedIn === 'true' && adminType) {
        router.push('/admin/dashboard');
      } else {
        setIsLoading(false);
        setIsAuthenticated(false);
      }
    } else {
      // If not on login page and not logged in, redirect to login
      if (!isLoggedIn || isLoggedIn !== 'true' || !adminType) {
        router.push('/admin');
      } else {
        setIsLoading(false);
        setIsAuthenticated(true);
      }
    }
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminType');
    router.push('/admin');
  };

  const menuItems = [
    { 
      icon: Home, 
      title: language === 'tr' ? 'Ana Sayfa' : 'Dashboard',
      path: '/admin/dashboard'
    },
    { 
      icon: Package, 
      title: language === 'tr' ? 'Ürünler' : 'Products',
      path: '/admin/products'
    },
    { 
      icon: Mail, 
      title: language === 'tr' ? 'İletişim' : 'Contact',
      path: '/admin/contact'
    },
    { 
      icon: Database, 
      title: language === 'tr' ? 'Veri Yönetimi' : 'Data Management',
      path: '/admin/data'
    },
    { 
      icon: Settings, 
      title: language === 'tr' ? 'Ayarlar' : 'Settings',
      path: '/admin/settings'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {language === 'tr' ? 'Yükleniyor...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  // If not authenticated and on login page, show only login page
  if (!isAuthenticated && pathname === '/admin') {
    return children;
  }

  // If authenticated, show admin layout
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-full flex flex-col">
          {/* Logo Area */}
          <div className="p-4 flex items-center justify-between border-b">
            {isSidebarOpen && (
              <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
            )}
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <MenuIcon size={20} />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button 
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                      pathname === item.path
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                    onClick={() => router.push(item.path)}
                  >
                    <item.icon size={20} />
                    {isSidebarOpen && (
                      <span className="ml-3">{item.title}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} />
              {isSidebarOpen && (
                <span className="ml-3">
                  {language === 'tr' ? 'Çıkış Yap' : 'Logout'}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
} 