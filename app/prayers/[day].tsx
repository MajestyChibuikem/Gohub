// app/prayers/[day].tsx
import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLanguage } from '../../context/LanguageContext';
import { loadPrayer } from '../../utils/prayerMap';
import { useTheme } from '../../context/ThemeContext';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const periods = ['morning', 'mid-day', 'evening'] as const;

export default function PrayerScreen() {
  const router = useRouter();
  const { day: paramDay, period: paramPeriod } = useLocalSearchParams<{
    day: string;
    period: 'morning' | 'mid-day' | 'evening';
  }>();
  const { language } = useLanguage();
  const theme = useTheme(); // ✅ Themed colors from context

  const [day, setDay] = useState(paramDay || 'Monday');
  const [period, setPeriod] = useState<typeof periods[number]>(paramPeriod || 'morning');

  useEffect(() => {
    router.setParams({ day, period });
  }, [day, period]);

  const prayer = loadPrayer(day, period);

  const renderContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
      return content.map((text, i) => (
        <Text key={i} style={{ marginVertical: 5, color: theme.text }}>
          {text}
        </Text>
      ));
    }
    return <Text style={{ color: theme.text }}>{content}</Text>;
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background, padding: 20 }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Day & Period Picker */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: theme.text }}>
          Select Day:
        </Text>
        <View style={{ borderRadius: 8, overflow: 'hidden', backgroundColor: theme.card }}>
          <Picker
            selectedValue={day}
            onValueChange={setDay}
            style={{ color: theme.text, backgroundColor: theme.card }}
            itemStyle={{ fontSize: 16 }}
          >
            {days.map(d => (
              <Picker.Item key={d} label={d} value={d} />
            ))}
          </Picker>
        </View>

        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            marginTop: 15,
            marginBottom: 5,
            color: theme.text,
          }}
        >
          Select Period:
        </Text>
        <View style={{ borderRadius: 8, overflow: 'hidden', backgroundColor: theme.card }}>
          <Picker
            selectedValue={period}
            onValueChange={setPeriod}
            style={{ color: theme.text, backgroundColor: theme.card }}
            itemStyle={{ fontSize: 16 }}
          >
            {periods.map(p => (
              <Picker.Item key={p} label={p.replace('-', ' ').toUpperCase()} value={p} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Prayer Title */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: theme.text }}>
        {prayer[language]}
      </Text>

      {/* Prayer Sections */}
      {prayer.sections?.map((section, index) => (
        <View key={index} style={{ marginBottom: 30 }}>
          {section.title && (
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                marginBottom: 10,
                color: theme.accent,
              }}
            >
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
