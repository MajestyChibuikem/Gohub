// context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the theme interface
export interface Theme {
  background: string;
  text: string;
  card: string;
  accent: string;
  secondary: string;
  error: string;
  surface: string;
  border: string;
  notification: string;
  shadowColor: string;
  textSecondary: string;
  subtle: string;
  highlight: string;
}

// Define font size options
export type FontSizeOption = 'small' | 'medium' | 'large' | 'x-large';

export interface ThemeSettings {
  themeMode: 'light' | 'dark' | 'system';
  fontSize: FontSizeOption;
}

// Font size values mapped to their options
export const fontSizeValues: Record<FontSizeOption, number> = {
  'small': 14,
  'medium': 16,
  'large': 18,
  'x-large': 20,
};

const lightTheme: Theme = {
  background: '#ffffff',
  text: '#000000',
  card: '#f2f2f2',
  accent: '#6200ee',
  secondary: '#03dac6',
  error: '#B00020',
  surface: '#ffffff',
  border: '#e0e0e0',
  notification: '#f50057',
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  textSecondary: '#757575',
  subtle: '#f5f5f5',
  highlight: '#ede7f6',
};

const darkTheme: Theme = {
  background: '#121212',
  text: '#ffffff',
  card: '#333333',
  accent: '#bb86fc',
  secondary: '#03dac6',
  error: '#cf6679',
  surface: '#1e1e1e',
  border: '#424242',
  notification: '#ff4081',
  shadowColor: 'rgba(0, 0, 0, 0.5)',
  textSecondary: '#b0b0b0',
  subtle: '#292929',
  highlight: '#311b92',
};

const defaultSettings: ThemeSettings = {
  themeMode: 'system',
  fontSize: 'medium',
};

// Create context with theme and settings
interface ThemeContextType {
  theme: Theme;
  settings: ThemeSettings;
  updateSettings: (newSettings: Partial<ThemeSettings>) => void;
  getFontSize: (baseSize: number) => number;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  settings: defaultSettings,
  updateSettings: () => {},
  getFontSize: () => 16,
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const systemColorScheme = useColorScheme();
  const [settings, setSettings] = useState<ThemeSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  // load & save settings…
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem('@gohub_theme_settings');
        if (json) setSettings(JSON.parse(json));
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  useEffect(() => {
    if (!isLoading) {
      AsyncStorage.setItem('@gohub_theme_settings', JSON.stringify(settings));
    }
  }, [settings, isLoading]);

  // pick the right color palette:
  const theme = useMemo<Theme>(() => {
    if (settings.themeMode === 'light') return lightTheme;
    if (settings.themeMode === 'dark')  return darkTheme;
    return systemColorScheme === 'dark' ? darkTheme : lightTheme;
  }, [settings.themeMode, systemColorScheme]);

  const getFontSize = (baseSize: number): number => {
    const scale = fontSizeValues[settings.fontSize] / fontSizeValues['medium']; // medium is default (scale = 1)
    return Math.round(baseSize * scale);
  };

  const updateSettings = (newSettings: Partial<ThemeSettings>) => {
    setSettings(s => ({ ...s, ...newSettings }));
  };

  const ctx = useMemo(() => ({
    theme,
    settings,
    updateSettings,
    getFontSize,
  }), [theme, settings]);

  if (isLoading) return null;
  return <ThemeContext.Provider value={ctx}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);