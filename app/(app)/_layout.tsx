import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
  const { theme } = useTheme();
  const { isActivated } = useAuth();

  // Base screens that are always shown
  const baseScreens = [
    <Tabs.Screen
      key="index"
      name="index"
      options={{
        title: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        ),
      }}
    />,
    <Tabs.Screen
      key="settings"
      name="settings"
      options={{
        title: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" size={size} color={color} />
        ),
      }}
    />
  ];

  // Additional screens for activated users
  const activatedScreens = isActivated ? [
    <Tabs.Screen
      key="prayers"
      name="prayers"
      options={{
        title: 'Prayers',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="book" size={size} color={color} />
        ),
      }}
    />,
    <Tabs.Screen
      key="hymns"
      name="hymns"
      options={{
        title: 'Hymns',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="musical-notes" size={size} color={color} />
        ),
      }}
    />
  ] : [];

  // Combine all screens
  const allScreens = [...baseScreens, ...activatedScreens];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
        },
      }}
    >
      {allScreens}
    </Tabs>
  );
} 