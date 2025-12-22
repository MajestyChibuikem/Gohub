import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';

export default function RootLayout() {
  const [isWebReady, setIsWebReady] = useState(Platform.OS !== 'web');

  const [fontsLoaded] = useFonts({
    'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Handle web hydration
  useEffect(() => {
    if (Platform.OS === 'web') {
      setIsWebReady(true);
    }
  }, []);

  if (!fontsLoaded || !isWebReady) {
    return null;
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <RootLayoutNav />
      </LanguageProvider>
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar style={theme.background === '#ffffff' ? 'dark' : 'light'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(app)" />
      </Stack>
    </>
  );
}