// for the prayer tab list
import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function PrayersScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Prayers List</Text>
      <Link href="/prayers/monday">Monday Prayer</Link>
      <Link href="/prayers/tuesday">Tuesday Prayer</Link>
      <Link href="/prayers/wednesday">Wednesday Prayer</Link>
      <Link href="/prayers/thursday">Thursday Prayer</Link>
      <Link href="/prayers/friday">Friday Prayer</Link>
      <Link href="/prayers/saturday">Saturday Prayer</Link>
      <Link href="/prayers/sunday">Sunday Prayer</Link>
    </View>
  );
}