'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Globe, 
  Mail, 
  Bell, 
  Shield, 
  Palette,
  Save,
  Building,
  Share2
} from 'lucide-react';

// Import JSON data
import siteSettings from '../../data/settings.json';

export default function Settings() {
  const { language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState(siteSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (section, subsection, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...(subsection
          ? {
              [subsection]: {
                ...prev[section][subsection],
                [field]: value
              }
            }
          : { [field]: value })
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // API çağrısını simüle et
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // LocalStorage'a kaydet
      localStorage.setItem('siteSettings', JSON.stringify(formData));
      
      // API endpoint'ine gönder (JSON dosyasını güncelle)
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message);
      }
      
      // Dil değiştiyse güncelle
      if (formData.localization.defaultLanguage !== language) {
        setLanguage(formData.localization.defaultLanguage);
      }

      alert(language === 'tr' ? 'Ayarlar kaydedildi!' : 'Settings saved!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert(language === 'tr' ? 'Bir hata oluştu: ' + error.message : 'An error occurred: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    {
      id: 'general',
      icon: Building,
      title: language === 'tr' ? 'Şirket Bilgileri' : 'Company Info'
    },
    {
      id: 'appearance',
      icon: Palette,
      title: language === 'tr' ? 'Görünüm' : 'Appearance'
    },
    {
      id: 'localization',
      icon: Globe,
      title: language === 'tr' ? 'Yerelleştirme' : 'Localization'
    },
    {
      id: 'notifications',
      icon: Bell,
      title: language === 'tr' ? 'Bildirimler' : 'Notifications'
    },
    {
      id: 'social',
      icon: Share2,
      title: language === 'tr' ? 'Sosyal Medya' : 'Social Media'
    },
    {
      id: 'security',
      icon: Shield,
      title: language === 'tr' ? 'Güvenlik' : 'Security'
    }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          {language === 'tr' ? 'Site Ayarları' : 'Site Settings'}
        </h1>
        <p className="text-gray-600 mt-1">
          {language === 'tr' 
            ? 'Tüm site ayarlarını buradan yönetebilirsiniz' 
            : 'Manage all site settings here'}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b">
          <div className="flex space-x-8 px-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon size={18} className="mr-2" />
                <span>{tab.title}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'tr' ? 'Şirket Adı' : 'Company Name'}
                </label>
                <input
                  type="text"
                  value={formData.site.name}
                  onChange={(e) => handleInputChange('site', null, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'tr' ? 'Açıklama' : 'Description'}
                </label>
                <textarea
                  value={formData.site.description}
                  onChange={(e) => handleInputChange('site', null, 'description', e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'tr' ? 'E-posta' : 'Email'}
                </label>
                <input
                  type="email"
                  value={formData.site.email}
                  onChange={(e) => handleInputChange('site', null, 'email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'tr' ? 'Telefon' : 'Phone'}
                </label>
                <input
                  type="text"
                  value={formData.site.phone}
                  onChange={(e) => handleInputChange('site', null, 'phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'tr' ? 'Adres' : 'Address'}
                </label>
                <input
                  type="text"
                  value={formData.site.address}
                  onChange={(e) => handleInputChange('site', null, 'address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'tr' ? 'Tema' : 'Theme'}
                </label>
                <select
                  value={formData.appearance.theme}
                  onChange={(e) => handleInputChange('appearance', null, 'theme', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="light">{language === 'tr' ? 'Açık' : 'Light'}</option>
                  <option value="dark">{language === 'tr' ? 'Koyu' : 'Dark'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'tr' ? 'Ana Renk' : 'Primary Color'}
                </label>
                <input
                  type="color"
                  value={formData.appearance.primaryColor}
                  onChange={(e) => handleInputChange('appearance', null, 'primaryColor', e.target.value)}
                  className="w-full h-10 px-1 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'localization' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'tr' ? 'Varsayılan Dil' : 'Default Language'}
                </label>
                <select
                  value={formData.localization.defaultLanguage}
                  onChange={(e) => handleInputChange('localization', null, 'defaultLanguage', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="tr">Türkçe</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'tr' ? 'Varsayılan Para Birimi' : 'Default Currency'}
                </label>
                <select
                  value={formData.localization.defaultCurrency}
                  onChange={(e) => handleInputChange('localization', null, 'defaultCurrency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="TRY">TRY - Turkish Lira</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {language === 'tr' ? 'E-posta Bildirimleri' : 'Email Notifications'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {language === 'tr' 
                      ? 'Yeni siparişler için e-posta bildirimleri' 
                      : 'Email notifications for new orders'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notifications.email.enabled}
                    onChange={(e) => handleInputChange('notifications', 'email', 'enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {language === 'tr' ? 'Push Bildirimleri' : 'Push Notifications'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {language === 'tr' 
                      ? 'Tarayıcı push bildirimleri' 
                      : 'Browser push notifications'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notifications.push.enabled}
                    onChange={(e) => handleInputChange('notifications', 'push', 'enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                <input
                  type="url"
                  value={formData.site.social.facebook}
                  onChange={(e) => handleInputChange('site', 'social', 'facebook', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://facebook.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                <input
                  type="url"
                  value={formData.site.social.instagram}
                  onChange={(e) => handleInputChange('site', 'social', 'instagram', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://instagram.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                <input
                  type="url"
                  value={formData.site.social.twitter}
                  onChange={(e) => handleInputChange('site', 'social', 'twitter', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://twitter.com/..."
                />
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'tr' ? 'Maksimum Giriş Denemesi' : 'Maximum Login Attempts'}
                </label>
                <input
                  type="number"
                  value={formData.security.loginAttempts}
                  onChange={(e) => handleInputChange('security', null, 'loginAttempts', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  max="10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'tr' ? 'Oturum Süresi (saniye)' : 'Session Timeout (seconds)'}
                </label>
                <input
                  type="number"
                  value={formData.security.sessionTimeout}
                  onChange={(e) => handleInputChange('security', null, 'sessionTimeout', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="300"
                  step="300"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {language === 'tr' ? 'İki Faktörlü Doğrulama' : 'Two-Factor Authentication'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {language === 'tr' 
                      ? 'Ek güvenlik katmanı için 2FA kullanın' 
                      : 'Use 2FA for additional security'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.security.twoFactorAuth}
                    onChange={(e) => handleInputChange('security', null, 'twoFactorAuth', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t">
            <button
              type="submit"
              disabled={isSaving}
              className={`flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isSaving ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              <Save size={18} className="mr-2" />
              {isSaving 
                ? (language === 'tr' ? 'Kaydediliyor...' : 'Saving...') 
                : (language === 'tr' ? 'Ayarları Kaydet' : 'Save Settings')
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 