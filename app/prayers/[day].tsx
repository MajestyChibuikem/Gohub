//dynamic prayer screen
import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';

export default function PrayerScreen() {
  const { day, period } = useLocalSearchParams();
  const { language } = useLanguage();

  // Mock data - replace with your actual data loading
  const prayerData = {
    en: "Morning prayer text in English...",
    es: "Texto de oración matutina en español..."
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        {day} • {period}
      </Text>
      <Text style={{ fontSize: 16, marginTop: 20 }}>
        {prayerData[language]}
      </Text>
    </View>
  );
}