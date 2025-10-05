Step-by-Step Fix for Hydration Error
Step 1: Fix AuthContext.tsx
Problem: Using localStorage on line 53 causes hydration mismatch because it's not available during SSR.
Replace lines 48-62 with this:
typescriptconst getDeviceId = async (): Promise<string> => {
  try {
    if (typeof window !== 'undefined') {
      // Use AsyncStorage instead of localStorage for web
      let deviceId = await AsyncStorage.getItem('gohub_device_id');
      if (!deviceId) {
        deviceId = 'web_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        await AsyncStorage.setItem('gohub_device_id', deviceId);
      }
      return deviceId;
    } else {
      const deviceId = await Application.getAndroidId() || Application.applicationId || 'unknown-device';
      return deviceId;
    }
  } catch (error) {
    console.error('Error getting device ID:', error);
    return 'unknown-device';
  }
};

Step 2: Fix ThemeContext.tsx
Problem: Returns null while loading, causing hydration mismatch.
Replace lines 123-125 with this:
typescript// Don't block rendering, show default theme while loading
return <ThemeContext.Provider value={ctx}>{children}</ThemeContext.Provider>;
Remove this line completely (line 103):
typescriptif (isLoading) return null;  // DELETE THIS LINE

Step 3: Fix LanguageContext.tsx
Problem: AsyncStorage reads during render cause hydration issues.
Add hydration check. Replace lines 20-48 with this:
typescriptexport const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [isHydrated, setIsHydrated] = useState(false);
  const availableLanguages = ['en', 'es', 'fr', 'de'];

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
      } finally {
        setIsHydrated(true);
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

Step 4: Fix app/_layout.tsx
Problem: Need to handle web hydration properly.
Replace the entire file with this:
typescriptimport React, { useEffect, useState } from 'react';
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
    return null;
  }

  return (
    <>
      <StatusBar style={theme.background === '#ffffff' ? 'dark' : 'light'} />
      <Stack
        key={`${isAuthenticated}-${isActivated}`}
        screenOptions={{ headerShown: false }}
      >
        {isAuthenticated && isActivated ? (
          <Stack.Screen name="(app)" />
        ) : isAuthenticated && !isActivated ? (
          <Stack.Screen
            name="pending-activation"
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen name="(auth)" />
        )}
      </Stack>
    </>
  );
}

Step 5: Deploy & Test

Save all files
Clear build cache:

bash   npx expo start --clear

Test locally on web:

bash   npm run web

If it works, redeploy to Vercel:

bash   git add .
   git commit -m "Fix hydration error for web"
   git push

What Changed:

✅ Removed localStorage from AuthContext (use AsyncStorage everywhere)
✅ Removed null return from ThemeContext while loading
✅ Added web hydration check to root layout
✅ Reordered provider wrapping (Theme → Language → Auth)

This should completely fix the white screen issue! 🎉