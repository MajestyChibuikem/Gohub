// app/prayers/[day].tsx
import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Text, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLanguage } from '../../context/LanguageContext';
import { loadPrayer } from '../../utils/prayerMap';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const periods = ['morning', 'mid-day', 'evening'] as const;

export default function PrayerScreen() {
  const router = useRouter();
  const { day: paramDay, period: paramPeriod } = useLocalSearchParams<{
    day: string;
    period: 'morning' | 'mid-day' | 'evening';
  }>();
  const { language } = useLanguage();

  const [day, setDay] = useState(paramDay || 'Monday');
  const [period, setPeriod] = useState<typeof periods[number]>(paramPeriod || 'morning');

  useEffect(() => {
    // Update the URL params dynamically when the picker changes
    router.setParams({ day, period });
  }, [day, period]);

  const prayer = loadPrayer(day, period);

  const renderContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
      return content.map((text, i) => (
        <Text key={i} style={{ marginVertical: 5 }}>{text}</Text>
      ));
    }
    return <Text>{content}</Text>;
  };

  return (
    <ScrollView style={{ padding: 20 }} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Day & Period Picker */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Select Day:</Text>
        <View style={{ borderRadius: 8, overflow: 'hidden', backgroundColor: '#f2f2f2' }}>
          <Picker
            selectedValue={day}
            onValueChange={setDay}
            style={{ color: '#6200ee', backgroundColor: '#f2f2f2' }}
            itemStyle={{ fontSize: 16, color: '#6200ee' }}
          >
            {days.map(d => (
              <Picker.Item key={d} label={d} value={d} />
            ))}
          </Picker>
        </View>
  
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 15, marginBottom: 5 }}>Select Period:</Text>
        <View style={{ borderRadius: 8, overflow: 'hidden', backgroundColor: '#f2f2f2' }}>
          <Picker
            selectedValue={period}
            onValueChange={setPeriod}
            style={{ color: '#6200ee', backgroundColor: '#f2f2f2' }}
            itemStyle={{ fontSize: 16, color: '#6200ee' }}
          >
            {periods.map(p => (
              <Picker.Item key={p} label={p.replace('-', ' ').toUpperCase()} value={p} />
            ))}
          </Picker>
        </View>
      </View>
  
      {/* Prayer Title */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        {prayer[language]}
      </Text>
  
      {/* Prayer Sections */}
      {prayer.sections?.map((section, index) => (
        <View key={index} style={{ marginBottom: 30 }}>
          {section.title && (
            <Text style={{
              fontWeight: 'bold',
              fontSize: 18,
              marginBottom: 10,
              color: '#6200ee'
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
