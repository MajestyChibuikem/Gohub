// context/ThemeContext.tsx
import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';

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

// Create the context with proper typing
const ThemeContext = createContext<Theme>(lightTheme);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): Theme => useContext(ThemeContext);