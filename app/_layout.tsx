import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import { LanguageProvider } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
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
        <AuthProvider>
          <RootLayoutNav />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { theme } = useTheme();
  const { isActivated, isAuthenticated, isLoading } = useAuth();

  console.log('🔍 RootLayoutNav - Auth State:', { isAuthenticated, isActivated, isLoading });

  if (isLoading) {
    return null; // Show loading state
  }

  return (
    <>
      <StatusBar style={theme.background === '#ffffff' ? 'dark' : 'light'} />
      <Stack
        key={`${isAuthenticated}-${isActivated}`}
        screenOptions={{ headerShown: false }}
      >
        {isAuthenticated && isActivated ? (
          // Authenticated AND activated user - show app with full access
          <Stack.Screen name="(app)" />
        ) : isAuthenticated && !isActivated ? (
          // Authenticated but NOT activated - show pending activation screen
          <Stack.Screen 
            name="pending-activation" 
            options={{ headerShown: false }}
          />
        ) : (
          // Not authenticated - show auth screens
          <Stack.Screen name="(auth)" />
        )}
      </Stack>
    </>
  );
}