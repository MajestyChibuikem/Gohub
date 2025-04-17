import { Stack } from 'expo-router';
import { LanguageProvider } from '../context/LanguageContext';
import { ThemeProvider } from '../context/ThemeContext';

export default function RootLayout() {
  return (
    <LanguageProvider>
      <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          gestureEnabled: true, // swipe back on iOS
        }}
      />
      </ThemeProvider>
    </LanguageProvider>
  );
}
