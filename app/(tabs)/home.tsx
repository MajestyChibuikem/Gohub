// for today's prayers
import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { getCurrentPrayerPeriod } from '../../utils/prayerTimes';

export default function HomeScreen() {
  const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
  const currentPeriod = getCurrentPrayerPeriod();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Today's Prayer</Text>
      <Text style={{ fontSize: 16, marginVertical: 10 }}>
        {currentDay} • {currentPeriod}
      </Text>

      <Link href={`/prayers/${currentDay}?period=${currentPeriod}`} asChild>
        <Pressable style={{ backgroundColor: '#6200ee', padding: 15, borderRadius: 8 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>View Prayer</Text>
        </Pressable>
      </Link>
    </View>
  );
}