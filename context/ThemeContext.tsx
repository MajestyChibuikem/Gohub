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

// Tech Nxxt Light Palette
const lightTheme: Theme = {
  background: '#F1F5F9',
  text: '#0F172A',
  card: '#FFFFFF',
  accent: '#1E40AF',
  secondary: '#3B82F6',
  error: '#DC2626',
  surface: '#F8FAFC',
  border: '#E2E8F0',
  notification: '#2563EB',
  shadowColor: 'rgba(15, 23, 42, 0.08)',
  textSecondary: '#64748B',
  subtle: '#F1F5F9',
  highlight: '#DBEAFE',
};

// Tech Nxxt Dark Palette (Tactical Navy)
const darkTheme: Theme = {
  background: '#020617',
  text: '#F8FAFC',
  card: '#0F172A',
  accent: '#38BDF8',
  secondary: '#0EA5E9',
  error: '#EF4444',
  surface: '#1E293B',
  border: '#1E293B',
  notification: '#38BDF8',
  shadowColor: 'rgba(0, 0, 0, 0.5)',
  textSecondary: '#94A3B8',
  subtle: '#0F172A',
  highlight: '#1E40AF',
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

  // Load settings from storage
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem('@gohub_theme_settings');
        if (json) {
          setSettings(JSON.parse(json));
        }
      } catch (e) {
        console.error("Failed to load theme settings", e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Save settings when they change
  useEffect(() => {
    if (!isLoading) {
      AsyncStorage.setItem('@gohub_theme_settings', JSON.stringify(settings));
    }
  }, [settings, isLoading]);

  // Pick the right color palette based on settings
  const theme = useMemo<Theme>(() => {
    if (settings.themeMode === 'light') {
      return lightTheme;
    }
    if (settings.themeMode === 'dark') {
      return darkTheme;
    }
    // Default to system preference
    return systemColorScheme === 'dark' ? darkTheme : lightTheme;
  }, [settings.themeMode, systemColorScheme]);

  // Handle dynamic font scaling
  const getFontSize = (baseSize: number): number => {
    const scale = fontSizeValues[settings.fontSize] / fontSizeValues['medium']; 
    return Math.round(baseSize * scale);
  };

  // Update specific settings without overwriting others
  const updateSettings = (newSettings: Partial<ThemeSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const ctxValue = useMemo(() => ({
    theme,
    settings,
    updateSettings,
    getFontSize,
  }), [theme, settings]);

  return (
    <ThemeContext.Provider value={ctxValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
