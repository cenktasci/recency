'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Save, RefreshCw } from 'lucide-react';

// Import JSON files
import contactFormData from '../../data/contactFormData.json';
import contactPageData from '../../data/contactPageData.json';
import settingsData from '../../data/settings.json';
import messagesData from '../../data/messages.json';

const jsonFiles = {
  contactForm: contactFormData,
  contactPage: contactPageData,
  settings: settingsData,
  messages: messagesData
};

export default function DataManagement() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState(Object.keys(jsonFiles)[0]);
  const [jsonData, setJsonData] = useState(jsonFiles);
  const [editedData, setEditedData] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setEditedData(JSON.stringify(jsonData[activeTab], null, 2));
  }, [activeTab]);

  const handleDataChange = (e) => {
    setEditedData(e.target.value);
    setError('');
  };

  const validateJSON = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSave = async () => {
    if (!validateJSON(editedData)) {
      setError(language === 'tr' ? 'Geçersiz JSON formatı' : 'Invalid JSON format');
      return;
    }

    setIsSaving(true);
    try {
      // TODO: Implement API endpoint to save JSON data
      // For now, we'll just simulate an API call and save to localStorage
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newData = JSON.parse(editedData);
      localStorage.setItem(`admin_${activeTab}`, JSON.stringify(newData));
      
      setJsonData(prev => ({
        ...prev,
        [activeTab]: newData
      }));

      alert(language === 'tr' ? 'Veriler kaydedildi!' : 'Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      setError(language === 'tr' ? 'Kaydetme hatası' : 'Error saving data');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setEditedData(JSON.stringify(jsonData[activeTab], null, 2));
    setError('');
  };

  // Get file names for tabs with translations
  const tabs = [
    {
      id: 'messages',
      title: language === 'tr' ? 'Mesajlar' : 'Messages'
    },
    {
      id: 'contactForm',
      title: language === 'tr' ? 'İletişim Formu' : 'Contact Form'
    },
    {
      id: 'contactPage',
      title: language === 'tr' ? 'İletişim Sayfası' : 'Contact Page'
    },
    {
      id: 'settings',
      title: language === 'tr' ? 'Ayarlar' : 'Settings'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          {language === 'tr' ? 'Veri Yönetimi' : 'Data Management'}
        </h1>
        <p className="text-gray-600 mt-1">
          {language === 'tr' 
            ? 'JSON verilerini düzenleyin ve yönetin' 
            : 'Edit and manage JSON data'}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b">
          <div className="flex flex-wrap gap-4 px-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {language === 'tr' ? 'JSON Düzenleyici' : 'JSON Editor'}
            </div>
            <div className="space-x-4">
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <RefreshCw size={16} className="inline-block mr-2" />
                {language === 'tr' ? 'Sıfırla' : 'Reset'}
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isSaving ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                <Save size={16} className="inline-block mr-2" />
                {isSaving 
                  ? (language === 'tr' ? 'Kaydediliyor...' : 'Saving...') 
                  : (language === 'tr' ? 'Kaydet' : 'Save')
                }
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <textarea
            value={editedData}
            onChange={handleDataChange}
            className="w-full h-[600px] p-4 font-mono text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
} 