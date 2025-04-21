// app/prayers/_layout.tsx
import { Stack } from 'expo-router';

export default function PrayersLayout() {
  return (
    <Stack>
      <Stack.Screen name="[day]" options={{ headerShown: false }} />
      <Stack.Screen 
        name="traditionalprayers" 
        options={{ 
          title: 'Traditional Prayers',
          headerShown: true 
        }} 
      />
    </Stack>
  );
}