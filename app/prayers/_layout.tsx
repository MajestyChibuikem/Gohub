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
      <Stack.Screen 
        name="sacrementalprayers" 
        options={{ 
          title: 'sacramental prayers',
          headerShown: true 
        }} 
      />
      <Stack.Screen
      name ="saints"
      options={{ 
        title: 'saints and devotions',
        headerShown: true 
      }}
      />
    </Stack>
  );
}