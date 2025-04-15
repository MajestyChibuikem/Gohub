import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index" // This must be "index" for the home tab
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="prayers"
        options={{
          title: 'Prayers',
          tabBarIcon: ({ color }) => <MaterialIcons name="menu-book" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="hymns"
        options={{
          title: 'Hymns',
          tabBarIcon: ({ color }) => <MaterialIcons name="music-note" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}