import { Stack } from 'expo-router';
import { useTheme } from '../../../context/ThemeContext';

export default function HymnsLayout() {
  const { theme } = useTheme();

  console.log('🎵 HymnsLayout - Component loaded');
  console.log('📱 Registering hymn screens in layout');

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
          title: 'Hymns',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="christmas-hymns"
        options={{
          title: 'Christmas Hymns',
        }}
      />
      <Stack.Screen
        name="marian-hymns"
        options={{
          title: 'Marian Hymns',
        }}
      />
      <Stack.Screen
        name="common-of-the-mass-hymns"
        options={{
          title: 'Common of the Mass',
        }}
      />
      <Stack.Screen
        name="communion-hymns"
        options={{
          title: 'Communion Hymns',
        }}
      />
      <Stack.Screen
        name="dismissal-hymns"
        options={{
          title: 'Dismissal Hymns',
        }}
      />
      <Stack.Screen
        name="entrance-hymns"
        options={{
          title: 'Entrance Hymns',
        }}
      />
      <Stack.Screen
        name="lent-hymns"
        options={{
          title: 'Lent Hymns',
        }}
      />
      <Stack.Screen
        name="offertory-hymns"
        options={{
          title: 'Offertory Hymns',
        }}
      />
      <Stack.Screen
        name="other-hymns"
        options={{
          title: 'Other Hymns',
        }}
      />
      <Stack.Screen
        name="general-hymns"
        options={{
          title: 'General Hymns',
        }}
      />
      <Stack.Screen
        name="hymns-for-the-dead"
        options={{
          title: 'Hymns for the Dead',
        }}
      />
    </Stack>
  );
} 