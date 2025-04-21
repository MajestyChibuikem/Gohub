import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  availableLanguages: string[];
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  availableLanguages: ['en'],
});

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const availableLanguages = ['en', 'es', 'fr', 'de']; // Add more as needed

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (savedLanguage && availableLanguages.includes(savedLanguage)) {
          setLanguage(savedLanguage);
        } else {
          const systemLanguage = Localization.locale.split('-')[0];
          const langToUse = availableLanguages.includes(systemLanguage) 
            ? systemLanguage 
            : 'en';
          setLanguage(langToUse);
        }
      } catch (error) {
        console.error('Failed to load language', error);
      }
    };

    loadLanguage();
  }, []);

  const handleSetLanguage = async (lang: string) => {
    if (availableLanguages.includes(lang)) {
      setLanguage(lang);
      try {
        await AsyncStorage.setItem('selectedLanguage', lang);
      } catch (error) {
        console.error('Failed to save language', error);
      }
    }
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: handleSetLanguage,
      availableLanguages,
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);