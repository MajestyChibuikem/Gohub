// for the prayer tab list
import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function PrayersScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Prayers List</Text>
      <Link href="/prayers/monday">Monday Prayer</Link>
    </View>
  );
}