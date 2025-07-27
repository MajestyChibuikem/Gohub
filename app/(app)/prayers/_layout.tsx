import { Stack } from 'expo-router';
import { useTheme } from '../../../context/ThemeContext';

export default function PrayersLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Prayers',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[day]"
        options={{
          title: 'Daily Prayer',
        }}
      />
      <Stack.Screen
        name="traditionalprayers"
        options={{
          title: 'Traditional Prayers',
        }}
      />
      <Stack.Screen
        name="sacramentalprayers"
        options={{
          title: 'Sacramental Prayers',
        }}
      />
      <Stack.Screen
        name="saints"
        options={{
          title: 'Saints & Devotions',
        }}
      />
      <Stack.Screen
        name="daily"
        options={{
          title: 'Daily Life Prayers',
        }}
      />
    </Stack>
  );
}