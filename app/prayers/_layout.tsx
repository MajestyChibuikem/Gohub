// app/(tabs)/_layout.tsx
import React from 'react';
import { Platform, View } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '../../components/HapticTab';
import { useTheme } from '../../context/ThemeContext';

export default function TabLayout() {
  const { theme, getFontSize } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.textSecondary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
        },
        tabBarLabelStyle: {
          fontSize: getFontSize(12),
        },
        // Use a simple View for the background instead of TabBarBackground component
        tabBarBackground: () => (
          <View style={{ flex: 1, backgroundColor: theme.surface }} />
        ),
      }}
      backBehavior="history"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarButton: HapticTab,
        }}
      />
      <Tabs.Screen
        name="prayers"
        options={{
          title: 'Prayers',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'book' : 'book-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarButton: HapticTab,
        }}
      />
      <Tabs.Screen
        name="hymns"
        options={{
          title: 'Hymns',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'musical-notes' : 'musical-notes-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarButton: HapticTab,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'settings' : 'settings-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarButton: HapticTab,
        }}
      />
    </Tabs>
  );
}