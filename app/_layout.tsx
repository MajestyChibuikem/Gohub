import { Stack } from 'expo-router';
import { LanguageProvider } from '../context/LanguageContext';
import { ThemeProvider } from '../context/ThemeContext';

export default function RootLayout() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Stack
          screenOptions={{
            headerShown: false, // Disable headers globally
            gestureEnabled: true, // swipe back on iOS
          }}
        />
      </ThemeProvider>
    </LanguageProvider>
  );
}