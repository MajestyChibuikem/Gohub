// app/(tabs)/home.tsx
import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { getCurrentPrayerPeriod } from '../../utils/prayerTimes';

export default function HomeScreen() {
  const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });
  const currentPeriod = getCurrentPrayerPeriod();

  return (
    <View style={{ padding: 20 }}>
      <Link 
        href={{
          pathname: '/prayers/[day]',
          params: { day: currentDay, period: currentPeriod }
        }}
      >
        <Text>Today's Prayer ({currentDay} {currentPeriod})</Text>
      </Link>
    </View>
  );
}