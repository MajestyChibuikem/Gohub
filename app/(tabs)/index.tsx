// app/(tabs)/home.tsx
import { Link } from 'expo-router';
import { Text, View, Image, Pressable } from 'react-native';
import { getCurrentPrayerPeriod } from '../../utils/prayerTimes';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const theme = useTheme();

  const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });
  const currentPeriod = getCurrentPrayerPeriod();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, padding: 20 }}>
      {/* Logo */}
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Image
          source={require('../../assets/images/logo.png')} // update this path if needed
          style={{ width: 100, height: 100, resizeMode: 'contain' }}
        />
      </View>

      {/* Preface */}
      <View style={{ marginBottom: 40 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: theme.text }}>
          A Compilation of Prayers and Songs
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center', color: theme.text, marginTop: 10 }}>
          for
        </Text>
        <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center', marginTop: 5, color: theme.accent }}>
          Godfrey Okoye University
        </Text>

        <Text style={{ fontSize: 14, textAlign: 'center', marginTop: 20, color: theme.text }}>
          Compilers/Editors:
        </Text>
        <Text style={{ fontSize: 14, textAlign: 'center', color: theme.text }}>
          Sr. Mary Gloria Njoku DDL
        </Text>
        <Text style={{ fontSize: 14, textAlign: 'center', color: theme.text }}>
          Rev. Fr. Prof. Christian Anieke
        </Text>
      </View>

      {/* Today's Prayer Link */}
      <Link
        href={{
          pathname: '/prayers/[day]',
          params: { day: currentDay, period: currentPeriod }
        }}
        asChild
      >
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: theme.card,
            padding: 15,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '500', color: theme.text }}>
            Today’s Prayer ({currentDay} {currentPeriod})
          </Text>
          <Ionicons name="arrow-forward-circle" size={28} color={theme.accent} />
        </Pressable>
      </Link>
    </View>
  );
}
