'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Save, RefreshCw, Plus, Trash2, Image as ImageIcon, X, Check } from 'lucide-react';
import productsData from '../../data/products.json';
import { useAdmin } from '../../context/AdminContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Basit çeviri fonksiyonu - gerçek projede API kullanılabilir
const translateToEnglish = (text) => {
  // Örnek çeviri eşleştirmeleri
  const translations = {
    'Yüksek Hızlı Yıkama Makineleri': 'High-Speed Washing Machines',
    'Endüstriyel Kurutma Makineleri': 'Industrial Dryers',
    'Özel Yıkama Sistemleri': 'Special Washing Systems',
    'Otomasyon Sistemleri': 'Automation Systems',
    'Profesyonel çamaşırhaneler için yüksek performanslı çözümler': 'High-performance solutions for professional laundries',
    'Enerji verimli ve hızlı kurutma sistemleri': 'Energy-efficient and fast drying systems',
    'Özel tekstil ürünleri için özelleştirilmiş çözümler': 'Customized solutions for special textile products',
    'Akıllı kontrol ve otomasyon çözümleri': 'Smart control and automation solutions',
    // Özellikler için çeviriler
    'Yüksek sıkma hızı': 'High spin speed',
    'Enerji tasarruflu': 'Energy efficient',
    'Akıllı kontrol sistemi': 'Smart control system',
    'Hassas kurutma programları': 'Sensitive drying programs',
    'Düşük enerji tüketimi': 'Low energy consumption',
    'Çoklu program seçeneği': 'Multiple program options',
    'Otomatik nem sensörü': 'Automatic moisture sensor',
    'Özel program desteği': 'Special program support',
    'Hassas yıkama seçenekleri': 'Delicate washing options',
    'Profesyonel temizlik': 'Professional cleaning',
    'Uzman destek hizmeti': 'Expert support service',
    'Uzaktan kontrol': 'Remote control',
    'Akıllı programlama': 'Smart programming',
    'Verimlilik takibi': 'Efficiency tracking',
    'Bakım planlaması': 'Maintenance planning',
  };

  // Eğer çeviri varsa onu döndür, yoksa metni aynen döndür
  return translations[text] || text;
};

// Büyük/küçük harf düzenlemesi için yardımcı fonksiyon
const preserveCapitalization = (original, translated) => {
  if (!original || !translated) return translated;
  
  // Her kelimenin baş harfini büyük yap
  return translated
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Google Translate API fonksiyonu
const translateText = async (text) => {
  // Boş metin kontrolü
  if (!text || text.trim() === '') {
    return '';
  }
  
  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=tr&tl=en&dt=t&q=${encodeURIComponent(text)}`
    );
    const data = await response.json();
    const translatedText = data[0][0][0];
    
    // Büyük/küçük harf düzenlemesi yap
    return preserveCapitalization(text, translatedText);
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
};

export default function Products() {
  const { language } = useLanguage();
  const { adminType } = useAdmin();
  const [jsonData, setJsonData] = useState(productsData);
  const [editedData, setEditedData] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [translationTimers, setTranslationTimers] = useState({});
  const [translatingFields, setTranslatingFields] = useState({});
  const [previousValues, setPreviousValues] = useState({});
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [dataToSave, setDataToSave] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    modelNumber: '',
    description: '',
    image: '',
    features: [''],
    specifications: {
      capacity: '',
      spinSpeed: '',
      dimensions: '',
      weight: '',
      power: ''
    },
    price: {
      amount: 0,
      currency: 'TRY'
    },
    published: false
  });
  
  const [newProductEN, setNewProductEN] = useState({
    name: '',
    description: '',
    features: ['']
  });
  
  const [newProductTranslating, setNewProductTranslating] = useState({
    name: false,
    description: false,
    features: {}
  });

  useEffect(() => {
    setEditedData(JSON.stringify(jsonData, null, 2));
  }, [jsonData]);

  const handleDataChange = (e) => {
    setEditedData(e.target.value);
    setError('');
    try {
      const newData = JSON.parse(e.target.value);
      setJsonData(newData);
    } catch (e) {
      // JSON parse error, ignore
    }
  };

  const validateJSON = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const syncTranslations = (data) => {
    const newData = { ...data };
    
    // TR'den EN'ye çeviri yap
    newData.tr.categories.forEach((trCategory, index) => {
      // EN kategorisini bul, yoksa oluştur
      if (!newData.en.categories[index]) {
        newData.en.categories[index] = { ...trCategory };
      }
      
      const enCategory = newData.en.categories[index];
      
      // Manuel değiştirilmiş alanları kontrol et
      // Eğer EN alanı "Çevriliyor..." değilse ve TR alanından farklıysa, manuel değiştirilmiş demektir
      const isNameManuallyEdited = enCategory.name && 
                                  enCategory.name !== "Çevriliyor..." && 
                                  enCategory.name !== trCategory.name &&
                                  enCategory.name !== translateToEnglish(trCategory.name);
                                  
      const isDescriptionManuallyEdited = enCategory.description && 
                                         enCategory.description !== "Çevriliyor..." && 
                                         enCategory.description !== trCategory.description &&
                                         enCategory.description !== translateToEnglish(trCategory.description);
      
      // Ana alanları çevir (eğer manuel değiştirilmemişse)
      if (trCategory.name && !isNameManuallyEdited) {
        // Eğer isim "Yüksek Hızlı Yıkama Makinası" ise özel çeviri uygula
        if (trCategory.name.includes("Yüksek Hızlı Yıkama")) {
          enCategory.name = "High-Speed Washing Machine";
        } else {
          enCategory.name = translateToEnglish(trCategory.name);
        }
      }
      
      if (trCategory.description && !isDescriptionManuallyEdited) {
        enCategory.description = translateToEnglish(trCategory.description);
      }
      
      // Özellikleri çevir (manuel değiştirilmemiş olanları)
      if (trCategory.features && trCategory.features.length > 0) {
        // Eğer EN features dizisi yoksa veya uzunluğu farklıysa, yeniden oluştur
        if (!enCategory.features || enCategory.features.length !== trCategory.features.length) {
          enCategory.features = trCategory.features.map(feature => translateToEnglish(feature));
        } else {
          // Her bir özelliği kontrol et
          trCategory.features.forEach((feature, featureIndex) => {
            const enFeature = enCategory.features[featureIndex];
            // Eğer özellik manuel değiştirilmemişse çevir
            const isFeatureManuallyEdited = enFeature && 
                                           enFeature !== "Çevriliyor..." && 
                                           enFeature !== feature &&
                                           enFeature !== translateToEnglish(feature);
            
            if (!isFeatureManuallyEdited) {
              enCategory.features[featureIndex] = translateToEnglish(feature);
            }
          });
        }
      }
      
      // Diğer alanları kopyala
      enCategory.id = trCategory.id;
      enCategory.modelNumber = trCategory.modelNumber;
      enCategory.image = trCategory.image;
      enCategory.specifications = { ...trCategory.specifications };
      enCategory.price = { ...trCategory.price };
      enCategory.published = trCategory.published;
    });

    return newData;
  };

  const handleSaveClick = () => {
    if (!validateJSON(editedData)) {
      setError(language === 'tr' ? 'Geçersiz JSON formatı' : 'Invalid JSON format');
      return;
    }

    try {
      let newData = JSON.parse(editedData);
      // Çevirileri senkronize et (manuel değişiklikleri koruyarak)
      const syncedData = syncTranslations(newData);
      
      // Kaydedilecek veriyi ayarla ve modalı göster
      setDataToSave(syncedData);
      setShowSaveModal(true);
    } catch (error) {
      console.error('Error preparing data:', error);
      setError(language === 'tr' ? 'Veri hazırlama hatası: ' + error.message : 'Error preparing data: ' + error.message);
    }
  };

  const handleFormSaveClick = () => {
    // Çevirileri senkronize et (manuel değişiklikleri koruyarak)
    const syncedData = syncTranslations(jsonData);
    
    // Kaydedilecek veriyi ayarla ve modalı göster
    setDataToSave(syncedData);
    setShowSaveModal(true);
  };

  const handleSaveConfirm = async () => {
    if (!dataToSave) return;
    
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Manuel değişiklikleri korumak için dataToSave'i doğrudan kullan
      const finalData = dataToSave;
      
      // LocalStorage'a kaydet
      localStorage.setItem('admin_products', JSON.stringify(finalData));
      
      // API endpoint'ine gönder (JSON dosyasını güncelle)
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });
      
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message);
      }
      
      setJsonData(finalData);
      setEditedData(JSON.stringify(finalData, null, 2));
      setShowSaveModal(false);
      toast.success(language === 'tr' ? 'Ürünler kaydedildi!' : 'Products saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error(language === 'tr' ? 'Kaydetme hatası: ' + error.message : 'Error saving data: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveCancel = () => {
    setShowSaveModal(false);
    setDataToSave(null);
  };

  const handleReset = () => {
    setEditedData(JSON.stringify(productsData, null, 2));
    setJsonData(productsData);
    setError('');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id === selectedCategory?.id ? null : category);
  };

  const handleFieldChange = async (field, value, language) => {
    if (!selectedCategory) return;

    const newData = { ...jsonData };
    const category = newData[language].categories.find(c => c.id === selectedCategory.id);
    if (category) {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        category[parent] = { ...category[parent], [child]: value };
      } else {
        category[field] = value;
      }

      // TR'den EN'ye otomatik çeviri yap (2 saniye bekleyerek)
      if (language === 'tr' && (field === 'name' || field === 'description')) {
        // Önceki değeri kaydet
        setPreviousValues(prev => ({
          ...prev,
          [field]: newData.en.categories.find(c => c.id === selectedCategory.id)?.[field] || ''
        }));
        
        // Önceki zamanlayıcıyı temizle
        if (translationTimers[field]) {
          clearTimeout(translationTimers[field]);
        }
        
        // Çeviri durumunu güncelle - çevriliyor
        setTranslatingFields(prev => ({
          ...prev,
          [field]: true
        }));
        
        // EN alanını temizle ve çevriliyor mesajını göster
        const enCategory = newData.en.categories.find(c => c.id === selectedCategory.id);
        if (enCategory) {
          enCategory[field] = "Çevriliyor...";
        }
        
        // Yeni zamanlayıcı oluştur
        const timerId = setTimeout(async () => {
          const translatedText = await translateText(value);
          
          // Çeviri tamamlandığında state'i güncelle
          setJsonData(prevData => {
            const newData = { ...prevData };
            const enCategory = newData.en.categories.find(c => c.id === selectedCategory.id);
            if (enCategory) {
              enCategory[field] = translatedText;
            }
            return newData;
          });
          
          // Çeviri durumunu güncelle - tamamlandı
          setTranslatingFields(prev => ({
            ...prev,
            [field]: false
          }));
          
          // Zamanlayıcıyı temizle
          setTranslationTimers(prev => ({
            ...prev,
            [field]: null
          }));
        }, 2000); // 2 saniye bekle
        
        // Zamanlayıcıyı kaydet
        setTranslationTimers(prev => ({
          ...prev,
          [field]: timerId
        }));
      } else if (language === 'tr' && !field.includes('.')) {
        // Diğer alanları hemen kopyala
        const enCategory = newData.en.categories.find(c => c.id === selectedCategory.id);
        if (enCategory) {
          enCategory[field] = value;
        }
      } else if (language === 'tr' && field.includes('.')) {
        const [parent, child] = field.split('.');
        const enCategory = newData.en.categories.find(c => c.id === selectedCategory.id);
        if (enCategory) {
          enCategory[parent] = { ...enCategory[parent], [child]: value };
        }
      } else if (language === 'en') {
        // EN tarafında yapılan değişiklikleri doğrudan kaydet
        // Çeviri işlemini durdur (eğer varsa)
        if (translationTimers[field]) {
          clearTimeout(translationTimers[field]);
          setTranslationTimers(prev => ({
            ...prev,
            [field]: null
          }));
        }
        
        // Çeviri durumunu güncelle - tamamlandı
        setTranslatingFields(prev => ({
          ...prev,
          [field]: false
        }));
      }

      setJsonData(newData);
      setSelectedCategory(category);
    }
  };

  const handleFeatureChange = async (index, value, language) => {
    if (!selectedCategory) return;

    const newData = { ...jsonData };
    const category = newData[language].categories.find(c => c.id === selectedCategory.id);
    if (category) {
      category.features[index] = value;

      // TR'den EN'ye otomatik çeviri yap (2 saniye bekleyerek)
      if (language === 'tr') {
        // Önceki değeri kaydet
        const timerKey = `feature_${index}`;
        setPreviousValues(prev => ({
          ...prev,
          [timerKey]: newData.en.categories.find(c => c.id === selectedCategory.id)?.features[index] || ''
        }));
        
        // Önceki zamanlayıcıyı temizle
        if (translationTimers[timerKey]) {
          clearTimeout(translationTimers[timerKey]);
        }
        
        // Çeviri durumunu güncelle - çevriliyor
        setTranslatingFields(prev => ({
          ...prev,
          [timerKey]: true
        }));
        
        // EN alanını temizle ve çevriliyor mesajını göster
        const enCategory = newData.en.categories.find(c => c.id === selectedCategory.id);
        if (enCategory) {
          enCategory.features[index] = "Çevriliyor...";
        }
        
        // Yeni zamanlayıcı oluştur
        const timerId = setTimeout(async () => {
          if (value && value.trim() !== '') {
            const translatedText = await translateText(value);
            
            // Çeviri tamamlandığında state'i güncelle
            setJsonData(prevData => {
              const newData = { ...prevData };
              const enCategory = newData.en.categories.find(c => c.id === selectedCategory.id);
              if (enCategory) {
                enCategory.features[index] = translatedText;
              }
              return newData;
            });
          }
          
          // Çeviri durumunu güncelle - tamamlandı
          setTranslatingFields(prev => ({
            ...prev,
            [timerKey]: false
          }));
          
          // Zamanlayıcıyı temizle
          setTranslationTimers(prev => ({
            ...prev,
            [timerKey]: null
          }));
        }, 2000); // 2 saniye bekle
        
        // Zamanlayıcıyı kaydet
        setTranslationTimers(prev => ({
          ...prev,
          [timerKey]: timerId
        }));
      } else if (language === 'en') {
        // EN tarafında yapılan değişiklikleri doğrudan kaydet
        const timerKey = `feature_${index}`;
        
        // Çeviri işlemini durdur (eğer varsa)
        if (translationTimers[timerKey]) {
          clearTimeout(translationTimers[timerKey]);
          setTranslationTimers(prev => ({
            ...prev,
            [timerKey]: null
          }));
        }
        
        // Çeviri durumunu güncelle - tamamlandı
        setTranslatingFields(prev => ({
          ...prev,
          [timerKey]: false
        }));
      }

      setJsonData(newData);
      setSelectedCategory(category);
    }
  };

  const addFeature = () => {
    if (!selectedCategory) return;

    const newData = { ...jsonData };
    const category = newData.tr.categories.find(c => c.id === selectedCategory.id);
    if (category) {
      category.features.push('');
      
      // EN tarafına da boş özellik ekle
      if (language === 'tr') {
        const enCategory = newData.en.categories.find(c => c.id === selectedCategory.id);
        if (enCategory) {
          enCategory.features.push('');
        }
      }
      
      setJsonData(newData);
      setSelectedCategory(category);
    }
  };

  const removeFeature = (index) => {
    if (!selectedCategory) return;

    const newData = { ...jsonData };
    const category = newData.tr.categories.find(c => c.id === selectedCategory.id);
    if (category) {
      category.features.splice(index, 1);
      
      // EN tarafından da özelliği kaldır
      if (language === 'tr') {
        const enCategory = newData.en.categories.find(c => c.id === selectedCategory.id);
        if (enCategory) {
          enCategory.features.splice(index, 1);
        }
      }
      
      setJsonData(newData);
      setSelectedCategory(category);
    }
  };

  // Çeviri işlemi devam ediyor mu kontrolü
  const isTranslating = () => {
    return Object.values(translatingFields).some(value => value === true);
  };

  const handleAddProductClick = () => {
    setShowAddProductModal(true);
  };

  const handleAddProductCancel = () => {
    setShowAddProductModal(false);
    setNewProduct({
      id: '',
      name: '',
      modelNumber: '',
      description: '',
      image: '',
      features: [''],
      specifications: {
        capacity: '',
        spinSpeed: '',
        dimensions: '',
        weight: '',
        power: ''
      },
      price: {
        amount: 0,
        currency: 'TRY'
      },
      published: false
    });
    
    setNewProductEN({
      name: '',
      description: '',
      features: ['']
    });
    
    setNewProductTranslating({
      name: false,
      description: false,
      features: {}
    });
  };

  const handleNewProductChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setNewProduct(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setNewProduct(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // If field is name or description, trigger translation
    if (field === 'name' || field === 'description') {
      // Set translating state
      setNewProductTranslating(prev => ({
        ...prev,
        [field]: true
      }));
      
      // Set English field to "Çevriliyor..."
      setNewProductEN(prev => ({
        ...prev,
        [field]: "Çevriliyor..."
      }));
      
      // Clear any existing timeout
      if (translationTimers[`new_${field}`]) {
        clearTimeout(translationTimers[`new_${field}`]);
      }
      
      // Create new timeout
      const timerId = setTimeout(async () => {
        const translatedText = await translateText(value);
        
        // Update English field with translated text
        setNewProductEN(prev => ({
          ...prev,
          [field]: translatedText
        }));
        
        // Set translating state to false
        setNewProductTranslating(prev => ({
          ...prev,
          [field]: false
        }));
        
        // Clear timer
        setTranslationTimers(prev => ({
          ...prev,
          [`new_${field}`]: null
        }));
      }, 2000);
      
      // Save timer ID
      setTranslationTimers(prev => ({
        ...prev,
        [`new_${field}`]: timerId
      }));
    }
  };
  
  const handleNewProductENChange = (field, value) => {
    // Update English field directly
    setNewProductEN(prev => ({
      ...prev,
      [field]: value
    }));
    
    // If there's a translation in progress, cancel it
    if (translationTimers[`new_${field}`]) {
      clearTimeout(translationTimers[`new_${field}`]);
      setTranslationTimers(prev => ({
        ...prev,
        [`new_${field}`]: null
      }));
    }
    
    // Set translating state to false
    setNewProductTranslating(prev => ({
      ...prev,
      [field]: false
    }));
  };

  const handleNewFeatureChange = (index, value) => {
    setNewProduct(prev => {
      const newFeatures = [...prev.features];
      newFeatures[index] = value;
      return {
        ...prev,
        features: newFeatures
      };
    });
    
    // Set translating state
    setNewProductTranslating(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [index]: true
      }
    }));
    
    // Set English field to "Çevriliyor..."
    setNewProductEN(prev => {
      const newFeatures = [...prev.features];
      newFeatures[index] = "Çevriliyor...";
      return {
        ...prev,
        features: newFeatures
      };
    });
    
    // Clear any existing timeout
    if (translationTimers[`new_feature_${index}`]) {
      clearTimeout(translationTimers[`new_feature_${index}`]);
    }
    
    // Create new timeout
    const timerId = setTimeout(async () => {
      const translatedText = await translateText(value);
      
      // Update English field with translated text
      setNewProductEN(prev => {
        const newFeatures = [...prev.features];
        newFeatures[index] = translatedText;
        return {
          ...prev,
          features: newFeatures
        };
      });
      
      // Set translating state to false
      setNewProductTranslating(prev => ({
        ...prev,
        features: {
          ...prev.features,
          [index]: false
        }
      }));
      
      // Clear timer
      setTranslationTimers(prev => ({
        ...prev,
        [`new_feature_${index}`]: null
      }));
    }, 2000);
    
    // Save timer ID
    setTranslationTimers(prev => ({
      ...prev,
      [`new_feature_${index}`]: timerId
    }));
  };
  
  const handleNewFeatureENChange = (index, value) => {
    // Update English field directly
    setNewProductEN(prev => {
      const newFeatures = [...prev.features];
      newFeatures[index] = value;
      return {
        ...prev,
        features: newFeatures
      };
    });
    
    // If there's a translation in progress, cancel it
    if (translationTimers[`new_feature_${index}`]) {
      clearTimeout(translationTimers[`new_feature_${index}`]);
      setTranslationTimers(prev => ({
        ...prev,
        [`new_feature_${index}`]: null
      }));
    }
    
    // Set translating state to false
    setNewProductTranslating(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [index]: false
      }
    }));
  };

  const addNewFeature = () => {
    setNewProduct(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
    
    setNewProductEN(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeNewFeature = (index) => {
    setNewProduct(prev => {
      const newFeatures = [...prev.features];
      newFeatures.splice(index, 1);
      return {
        ...prev,
        features: newFeatures
      };
    });
    
    setNewProductEN(prev => {
      const newFeatures = [...prev.features];
      newFeatures.splice(index, 1);
      return {
        ...prev,
        features: newFeatures
      };
    });
  };

  const handleAddProductConfirm = async () => {
    if (!newProduct.id || !newProduct.name) {
      toast.error(language === 'tr' ? 'ID ve Ürün Adı alanları zorunludur!' : 'ID and Product Name fields are required!');
      return;
    }

    // Check if ID already exists
    if (jsonData.tr.categories.some(c => c.id === newProduct.id)) {
      toast.error(language === 'tr' ? 'Bu ID zaten kullanılıyor!' : 'This ID is already in use!');
      return;
    }

    setIsSaving(true);
    try {
      // Create new product in both languages
      const newData = { ...jsonData };
      
      // Add to TR
      newData.tr.categories.push({
        ...newProduct
      });
      
      // Add to EN with translations or manual entries
      newData.en.categories.push({
        ...newProduct,
        name: newProductEN.name,
        description: newProductEN.description,
        features: newProductEN.features,
        published: newProduct.published
      });
      
      // Save to localStorage and API
      localStorage.setItem('admin_products', JSON.stringify(newData));
      
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message);
      }
      
      setJsonData(newData);
      setEditedData(JSON.stringify(newData, null, 2));
      setShowAddProductModal(false);
      
      // Reset new product form
      setNewProduct({
        id: '',
        name: '',
        modelNumber: '',
        description: '',
        image: '',
        features: [''],
        specifications: {
          capacity: '',
          spinSpeed: '',
          dimensions: '',
          weight: '',
          power: ''
        },
        price: {
          amount: 0,
          currency: 'TRY'
        },
        published: false
      });
      
      setNewProductEN({
        name: '',
        description: '',
        features: ['']
      });
      
      setNewProductTranslating({
        name: false,
        description: false,
        features: {}
      });
      
      toast.success(language === 'tr' ? 'Yeni ürün başarıyla eklendi!' : 'New product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(language === 'tr' ? 'Ürün ekleme hatası: ' + error.message : 'Error adding product: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          {language === 'tr' ? 'Ürün Yönetimi' : 'Product Management'}
        </h1>
        <p className="text-gray-600 mt-1">
          {language === 'tr' 
            ? 'Ürün verilerini düzenleyin ve yönetin' 
            : 'Edit and manage product data'}
        </p>
      </div>

      <div className={`flex gap-6 ${adminType === 'superadmin' ? '' : 'flex-col'}`}>
        {/* Form View */}
        <div className={`${adminType === 'superadmin' ? 'flex-1' : 'w-full'} bg-white rounded-xl shadow-sm`}>
          <div className="border-b p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800">
                {language === 'tr' ? 'Ürün Düzenle' : 'Edit Product'}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={handleAddProductClick}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                >
                  <Plus size={16} className="inline-block mr-2" />
                  {language === 'tr' ? 'Yeni Ürün Ekle' : 'Add New Product'}
                </button>
                <button
                  onClick={handleFormSaveClick}
                  disabled={isSaving || isTranslating()}
                  className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 ${
                    (isSaving || isTranslating()) ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  <Save size={16} className="inline-block mr-2" />
                  {isSaving 
                    ? (language === 'tr' ? 'Kaydediliyor...' : 'Saving...') 
                    : isTranslating()
                      ? (language === 'tr' ? 'Çeviri Devam Ediyor...' : 'Translation in Progress...')
                      : (language === 'tr' ? 'Kaydet' : 'Save')
                  }
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {jsonData.tr.categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    selectedCategory?.id === category.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{category.modelNumber}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {selectedCategory ? (
              <div className="space-y-6">
                {/* Publish Status */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="published"
                    checked={jsonData.tr.categories.find(c => c.id === selectedCategory.id)?.published || false}
                    onChange={(e) => handleFieldChange('published', e.target.checked, 'tr')}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="published" className="ml-2 text-sm font-medium text-gray-700">
                    {language === 'tr' ? 'Yayınla (Sitede göster)' : 'Publish (Show on site)'}
                  </label>
                </div>

                {/* Product Name - TR & EN */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ürün Adı (TR)
                    </label>
                    <input
                      type="text"
                      value={jsonData.tr.categories.find(c => c.id === selectedCategory.id)?.name || ''}
                      onChange={(e) => handleFieldChange('name', e.target.value, 'tr')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name (EN)
                    </label>
                    <input
                      type="text"
                      value={jsonData.en.categories.find(c => c.id === selectedCategory.id)?.name || ''}
                      onChange={(e) => handleFieldChange('name', e.target.value, 'en')}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        translatingFields['name'] ? 'border-blue-500 bg-blue-50 animate-pulse' : 'border-gray-300'
                      }`}
                    />
                  </div>
                </div>

                {/* Model Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'tr' ? 'Model Numarası' : 'Model Number'}
                  </label>
                  <input
                    type="text"
                    value={selectedCategory.modelNumber}
                    onChange={(e) => handleFieldChange('modelNumber', e.target.value, 'tr')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Description - TR & EN */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Açıklama (TR)
                    </label>
                    <textarea
                      value={jsonData.tr.categories.find(c => c.id === selectedCategory.id)?.description || ''}
                      onChange={(e) => handleFieldChange('description', e.target.value, 'tr')}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description (EN)
                    </label>
                    <textarea
                      value={jsonData.en.categories.find(c => c.id === selectedCategory.id)?.description || ''}
                      onChange={(e) => handleFieldChange('description', e.target.value, 'en')}
                      rows="3"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        translatingFields['description'] ? 'border-blue-500 bg-blue-50 animate-pulse' : 'border-gray-300'
                      }`}
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'tr' ? 'Görsel URL' : 'Image URL'}
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="url"
                      value={selectedCategory.image}
                      onChange={(e) => handleFieldChange('image', e.target.value, 'tr')}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {selectedCategory.image && (
                      <img
                        src={selectedCategory.image}
                        alt={selectedCategory.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                    )}
                  </div>
                </div>

                {/* Features - TR & EN */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Özellikler (TR)
                    </label>
                    <div className="space-y-2">
                      {jsonData.tr.categories.find(c => c.id === selectedCategory.id)?.features.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleFeatureChange(index, e.target.value, 'tr')}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => removeFeature(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Features (EN)
                    </label>
                    <div className="space-y-2">
                      {jsonData.en.categories.find(c => c.id === selectedCategory.id)?.features.map((feature, index) => (
                        <div key={index}>
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleFeatureChange(index, e.target.value, 'en')}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              translatingFields[`feature_${index}`] ? 'border-blue-500 bg-blue-50 animate-pulse' : 'border-gray-300'
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={addFeature}
                  className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                >
                  <Plus size={16} className="inline-block mr-2" />
                  {language === 'tr' ? 'Özellik Ekle' : 'Add Feature'}
                </button>

                {/* Specifications */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'tr' ? 'Teknik Özellikler' : 'Specifications'}
                  </label>
                  <div className="space-y-2">
                    {Object.entries(selectedCategory.specifications).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={key}
                          disabled
                          className="px-3 py-2 border border-gray-200 rounded-lg bg-gray-50"
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleFieldChange(`specifications.${key}`, e.target.value, 'tr')}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'tr' ? 'Fiyat' : 'Price'}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      value={selectedCategory.price.amount}
                      onChange={(e) => handleFieldChange('price.amount', parseInt(e.target.value), 'tr')}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      value={selectedCategory.price.currency}
                      onChange={(e) => handleFieldChange('price.currency', e.target.value, 'tr')}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="TRY">TRY</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                {language === 'tr' 
                  ? 'Düzenlemek için bir kategori seçin' 
                  : 'Select a category to edit'}
              </div>
            )}
          </div>
        </div>

        {/* JSON Editor - Only show for superadmin */}
        {adminType === 'superadmin' && (
          <div className="w-1/2 bg-white rounded-xl shadow-sm">
            <div className="border-b p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-800">
                  {language === 'tr' ? 'JSON Düzenleyici' : 'JSON Editor'}
                </h2>
                <div className="space-x-4">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    <RefreshCw size={16} className="inline-block mr-2" />
                    {language === 'tr' ? 'Sıfırla' : 'Reset'}
                  </button>
                  <button
                    onClick={handleSaveClick}
                    disabled={isSaving || isTranslating()}
                    className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 ${
                      (isSaving || isTranslating()) ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    <Save size={16} className="inline-block mr-2" />
                    {isSaving 
                      ? (language === 'tr' ? 'Kaydediliyor...' : 'Saving...') 
                      : isTranslating()
                        ? (language === 'tr' ? 'Çeviri Devam Ediyor...' : 'Translation in Progress...')
                        : (language === 'tr' ? 'Kaydet' : 'Save')
                    }
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4">
              {error && (
                <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
                  {error}
                </div>
              )}

              <textarea
                value={editedData}
                onChange={handleDataChange}
                className="w-full h-[800px] p-4 font-mono text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                spellCheck="false"
              />
            </div>
          </div>
        )}
      </div>

      {/* Yeni Ürün Ekleme Modalı */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[80vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {language === 'tr' ? 'Yeni Ürün Ekle' : 'Add New Product'}
              </h2>
              <button 
                onClick={handleAddProductCancel}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4 overflow-auto flex-1">
              <div className="space-y-6">
                {/* Publish Status */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="new-published"
                    checked={newProduct.published}
                    onChange={(e) => handleNewProductChange('published', e.target.checked)}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="new-published" className="ml-2 text-sm font-medium text-gray-700">
                    {language === 'tr' ? 'Yayınla (Sitede göster)' : 'Publish (Show on site)'}
                  </label>
                </div>

                {/* ID and Model Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID (Benzersiz Tanımlayıcı)
                  </label>
                  <input
                    type="text"
                    value={newProduct.id}
                    onChange={(e) => handleNewProductChange('id', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ornek-urun-id"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {language === 'tr' ? 'Sadece küçük harfler, rakamlar ve tire kullanın' : 'Use only lowercase letters, numbers, and hyphens'}
                  </p>
                </div>

                {/* Product Name - TR & EN */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ürün Adı (TR)
                    </label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => handleNewProductChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name (EN)
                    </label>
                    <input
                      type="text"
                      value={newProductEN.name}
                      onChange={(e) => handleNewProductENChange('name', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        newProductTranslating.name ? 'border-blue-500 bg-blue-50 animate-pulse' : 'border-gray-300'
                      }`}
                    />
                  </div>
                </div>

                {/* Model Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'tr' ? 'Model Numarası' : 'Model Number'}
                  </label>
                  <input
                    type="text"
                    value={newProduct.modelNumber}
                    onChange={(e) => handleNewProductChange('modelNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Description - TR & EN */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Açıklama (TR)
                    </label>
                    <textarea
                      value={newProduct.description}
                      onChange={(e) => handleNewProductChange('description', e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description (EN)
                    </label>
                    <textarea
                      value={newProductEN.description}
                      onChange={(e) => handleNewProductENChange('description', e.target.value)}
                      rows="3"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        newProductTranslating.description ? 'border-blue-500 bg-blue-50 animate-pulse' : 'border-gray-300'
                      }`}
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'tr' ? 'Görsel URL' : 'Image URL'}
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="url"
                      value={newProduct.image}
                      onChange={(e) => handleNewProductChange('image', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {newProduct.image && (
                      <img
                        src={newProduct.image}
                        alt="Product preview"
                        className="w-12 h-12 rounded object-cover"
                      />
                    )}
                  </div>
                </div>

                {/* Features - TR & EN */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Özellikler (TR)
                    </label>
                    <div className="space-y-2">
                      {newProduct.features.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleNewFeatureChange(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => removeNewFeature(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                            disabled={newProduct.features.length === 1}
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Features (EN)
                    </label>
                    <div className="space-y-2">
                      {newProductEN.features.map((feature, index) => (
                        <div key={index}>
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleNewFeatureENChange(index, e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              newProductTranslating.features && newProductTranslating.features[index] ? 'border-blue-500 bg-blue-50 animate-pulse' : 'border-gray-300'
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={addNewFeature}
                  className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                >
                  <Plus size={16} className="inline-block mr-2" />
                  {language === 'tr' ? 'Özellik Ekle' : 'Add Feature'}
                </button>

                {/* Specifications */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'tr' ? 'Teknik Özellikler' : 'Specifications'}
                  </label>
                  <div className="space-y-2">
                    {Object.entries(newProduct.specifications).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={key}
                          disabled
                          className="px-3 py-2 border border-gray-200 rounded-lg bg-gray-50"
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleNewProductChange(`specifications.${key}`, e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'tr' ? 'Fiyat' : 'Price'}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      value={newProduct.price.amount}
                      onChange={(e) => handleNewProductChange('price.amount', parseInt(e.target.value) || 0)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      value={newProduct.price.currency}
                      onChange={(e) => handleNewProductChange('price.currency', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="TRY">TRY</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t flex justify-end space-x-4">
              <button
                onClick={handleAddProductCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                {language === 'tr' ? 'İptal' : 'Cancel'}
              </button>
              <button
                onClick={handleAddProductConfirm}
                disabled={isSaving}
                className={`px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 flex items-center ${
                  isSaving ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSaving ? (
                  <>
                    <span className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    {language === 'tr' ? 'Ekleniyor...' : 'Adding...'}
                  </>
                ) : (
                  <>
                    <Plus size={16} className="mr-2" />
                    {language === 'tr' ? 'Ürün Ekle' : 'Add Product'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Kaydetme Onay Modalı */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[80vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {language === 'tr' ? 'Değişiklikleri Kaydet' : 'Save Changes'}
              </h2>
              <button 
                onClick={handleSaveCancel}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4 overflow-auto flex-1">
              <p className="mb-4">
                {language === 'tr' 
                  ? 'Aşağıdaki değişiklikler kaydedilecek:' 
                  : 'The following changes will be saved:'}
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Türkçe (TR)</h3>
                  <div className="bg-gray-50 p-4 rounded-lg max-h-[400px] overflow-auto">
                    <pre className="text-xs whitespace-pre-wrap">
                      {JSON.stringify(dataToSave?.tr, null, 2)}
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">İngilizce (EN)</h3>
                  <div className="bg-gray-50 p-4 rounded-lg max-h-[400px] overflow-auto">
                    <pre className="text-xs whitespace-pre-wrap">
                      {JSON.stringify(dataToSave?.en, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t flex justify-end space-x-4">
              <button
                onClick={handleSaveCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                {language === 'tr' ? 'İptal' : 'Cancel'}
              </button>
              <button
                onClick={handleSaveConfirm}
                disabled={isSaving || isTranslating()}
                className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center ${
                  (isSaving || isTranslating()) ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSaving ? (
                  <>
                    <span className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    {language === 'tr' ? 'Kaydediliyor...' : 'Saving...'}
                  </>
                ) : isTranslating() ? (
                  <>
                    <span className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    {language === 'tr' ? 'Çeviri Devam Ediyor...' : 'Translation in Progress...'}
                  </>
                ) : (
                  <>
                    <Check size={16} className="mr-2" />
                    {language === 'tr' ? 'Onayla ve Kaydet' : 'Confirm and Save'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 