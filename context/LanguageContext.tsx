import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LanguageContextType = {
  language: 'en' | 'es';
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  useEffect(() => {
    AsyncStorage.getItem('language').then((lang) => {
      if (lang === 'en' || lang === 'es') setLanguage(lang);
    });
  }, []);

  const toggleLanguage = async () => {
    const newLang = language === 'en' ? 'es' : 'en';
    setLanguage(newLang);
    await AsyncStorage.setItem('language', newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};