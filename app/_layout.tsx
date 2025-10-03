// app/_layout.tsx
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { StatusBar } from 'expo-status-bar';

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
    <ThemeProvider>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
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
        key={`${isAuthenticated}-${isActivated}-${Date.now()}`} // Force re-render on auth/activation change
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