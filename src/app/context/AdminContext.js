'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [adminType, setAdminType] = useState(null); // 'admin' or 'superadmin'

  useEffect(() => {
    // Check admin type from localStorage
    const storedAdminType = localStorage.getItem('adminType');
    if (storedAdminType) {
      setAdminType(storedAdminType);
    }
  }, []);

  const setAdmin = (type) => {
    setAdminType(type);
    localStorage.setItem('adminType', type);
  };

  const clearAdmin = () => {
    setAdminType(null);
    localStorage.removeItem('adminType');
  };

  return (
    <AdminContext.Provider value={{ adminType, setAdmin, clearAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
} 