// context/ThemeContext.tsx
import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';

const lightTheme = {
  background: '#ffffff',
  text: '#000000',
  card: '#f2f2f2',
  accent: '#6200ee',
};

const darkTheme = {
  background: '#121212',
  text: '#ffffff',
  card: '#333333',
  accent: '#bb86fc',
};

const ThemeContext = createContext(lightTheme);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
