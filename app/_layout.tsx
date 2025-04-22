// app/_layout.tsx
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '../context/ThemeContext';
import { useTheme } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { FavoritesProvider } from '@/context/favoriteContext';

// Import and setup any required fonts
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    // Add other fonts here as needed
  });

  // Keep the splash screen visible until fonts have loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
   <FavoritesProvider>
     <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
   </FavoritesProvider>
  );
}

function RootLayoutNav() {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar style={theme.background === '#ffffff' ? 'dark' : 'light'} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="prayers" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}