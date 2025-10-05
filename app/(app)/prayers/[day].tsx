import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLanguage } from '../../../context/LanguageContext';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import { loadPrayer } from '../../../utils/prayerMap';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const periods = ['morning', 'mid-day', 'evening'] as const;

export default function PrayerScreen() {
  const { day: paramDay, period: paramPeriod } = useLocalSearchParams<{
    day: string;
    period: 'morning' | 'mid-day' | 'evening';
  }>();
  const router = useRouter();
  const { language } = useLanguage() as { language: 'en' | 'es' };
  const { theme, getFontSize } = useTheme();
  const { isAuthenticated, isActivated } = useAuth();

  // Route guard - redirect if not authenticated or not activated
  useEffect(() => {
    if (!isAuthenticated) {
      console.log('🔒 PrayerScreen: User not authenticated, redirecting to login');
      router.replace('/(auth)/login');
    } else if (!isActivated) {
      console.log('⏳ PrayerScreen: User not activated, redirecting to pending activation');
      router.replace('/pending-activation');
    }
  }, [isAuthenticated, isActivated, router]);

  // Show nothing while redirecting
  if (!isAuthenticated || !isActivated) {
    return null;
  }

  console.log('📱 [day].tsx - Component loaded');
  console.log('📅 Params received:', { day: paramDay, period: paramPeriod });

  const [day, setDay] = useState(paramDay || 'Monday');
  const [period, setPeriod] = useState<typeof periods[number]>(paramPeriod || 'morning');

  useEffect(() => {
    console.log('🔄 [day].tsx - useEffect triggered');
    console.log('📅 Setting params:', { day, period });
    router.setParams({ day, period });
  }, [day, period]);

  console.log('📖 Loading prayer for:', { day, period });
  const prayer = loadPrayer(day, period);
  console.log('📖 Prayer loaded:', prayer ? 'Success' : 'Failed', prayer);

  const renderContent = (content: string | string[]) => {
    const texts = Array.isArray(content) ? content : [content];
    return texts.map((line, i) => (
      <Text key={i} style={{ marginVertical: 5, color: theme.text, fontSize: getFontSize(16) }}>
        {line}
      </Text>
    ));
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background, padding: 20 }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Day Picker */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: getFontSize(16), marginBottom: 5, color: theme.text }}>
          Select Day:
        </Text>
        <View style={{ borderRadius: 8, overflow: 'hidden', backgroundColor: theme.card }}>
          <Picker
            selectedValue={day}
            onValueChange={setDay}
            style={{ color: theme.text, backgroundColor: theme.card }}
            itemStyle={{ fontSize: getFontSize(16) }}
          >
            {days.map(d => (
              <Picker.Item key={d} label={d} value={d} />
            ))}
          </Picker>
        </View>

        {/* Period Picker */}
        <Text style={{
          fontWeight: 'bold',
          fontSize: getFontSize(16),
          marginTop: 15,
          marginBottom: 5,
          color: theme.text
        }}>
          Select Period:
        </Text>
        <View style={{ borderRadius: 8, overflow: 'hidden', backgroundColor: theme.card }}>
          <Picker
            selectedValue={period}
            onValueChange={setPeriod}
            style={{ color: theme.text, backgroundColor: theme.card }}
            itemStyle={{ fontSize: getFontSize(16) }}
          >
            {periods.map(p => (
              <Picker.Item key={p} label={p.replace('-', ' ').toUpperCase()} value={p} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Prayer Title */}
      <Text style={{ fontSize: getFontSize(24), fontWeight: 'bold', marginBottom: 20, color: theme.text }}>
        {prayer[language]}
      </Text>

      {/* Prayer Sections */}
      {prayer.sections?.map((section, index) => (
        <View key={index} style={{ marginBottom: 30 }}>
          {section.title && (
            <Text style={{
              fontWeight: 'bold',
              fontSize: getFontSize(18),
              marginBottom: 10,
              color: theme.accent,
            }}>
              {section.title[language]}
            </Text>
          )}
          {section.content && (
            <View style={{ marginLeft: 10 }}>
              {renderContent(section.content[language])}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
