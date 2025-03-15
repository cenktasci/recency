'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export default function AdminLogin() {
  const router = useRouter();
  const { language } = useLanguage();
  const { setAdmin } = useAdmin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if already logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    const adminType = localStorage.getItem('adminType');
    
    if (isLoggedIn === 'true' && adminType) {
      router.push('/admin/dashboard');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Süper admin kontrolü
    if (
      username === process.env.NEXT_PUBLIC_SUPERADMIN_USERNAME &&
      password === process.env.NEXT_PUBLIC_SUPERADMIN_PASSWORD
    ) {
      localStorage.setItem('adminLoggedIn', 'true');
      setAdmin('superadmin');
      router.push('/admin/dashboard');
      return;
    }

    // Normal admin kontrolü
    if (
      username === process.env.NEXT_PUBLIC_ADMIN_USERNAME &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      localStorage.setItem('adminLoggedIn', 'true');
      setAdmin('admin');
      router.push('/admin/dashboard');
      return;
    }

    setError(language === 'tr' ? 'Geçersiz kullanıcı adı veya şifre' : 'Invalid username or password');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{language === 'tr' ? 'Yükleniyor...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-8">
          {language === 'tr' ? 'Yönetici Girişi' : 'Admin Login'}
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'tr' ? 'Kullanıcı Adı' : 'Username'}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'tr' ? 'Şifre' : 'Password'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {language === 'tr' ? 'Giriş Yap' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
} 