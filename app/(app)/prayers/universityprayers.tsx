import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { createPrayerStyles } from './prayers.style';

// Import prayers
import UniversityPrayer from '@assets/prayers/others/universityPrayer.json';

type PrayerSection = {
  type: string;
  title?: Record<string, string>;
  content: Record<string, string[]>;
};

type PrayerType = {
  id: string;
  title: Record<string, string>;
  content: any;
};

const universityPrayers: PrayerType[] = [
  { id: 'university-prayer', title: { en: 'University Prayer', es: 'Oración Universitaria' }, content: UniversityPrayer },
];

const parseSections = (data: any): PrayerSection[] =>
  data.sections?.map((section: any) => ({
    type: section.type,
    title: section.title,
    content: section.content,
  })) || [];

export default function UniversityPrayersScreen() {
  const { prayer: paramPrayer } = useLocalSearchParams();
  const { theme, getFontSize } = useTheme();
  const { language } = useLanguage();
  const styles = createPrayerStyles(theme);

  console.log('📱 universityprayers.tsx - Component loaded');
  console.log('🙏 Prayer param received:', paramPrayer);

  const [selectedPrayerId, setSelectedPrayerId] = useState<string>(
    typeof paramPrayer === 'string' ? paramPrayer : universityPrayers[0].id
  );

  console.log('🎯 Selected prayer ID:', selectedPrayerId);
  console.log('📚 Available prayers:', universityPrayers.map(p => p.id));

  const selectedPrayer = universityPrayers.find(p => p.id === selectedPrayerId);
  const sections = selectedPrayer ? parseSections(selectedPrayer.content) : [];

  console.log('📖 Selected prayer found:', selectedPrayer ? 'Yes' : 'No');
  console.log('📄 Sections parsed:', sections.length);

  return (
    <ScrollView
      style={[styles.container, styles.contentContainer]}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Picker */}
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select Prayer:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedPrayerId}
            onValueChange={setSelectedPrayerId}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {universityPrayers.map(p => (
              <Picker.Item key={p.id} label={p.title[language]} value={p.id} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Title */}
      {selectedPrayer && (
        <>
          <Text style={styles.prayerTitle}>{selectedPrayer.title[language]}</Text>

          {/* Sections */}
          {sections.map((section, idx) => (
            <View key={idx} style={styles.section}>
              {section.title?.[language] && (
                <Text style={styles.sectionTitle}>
                  {section.title[language]}
                </Text>
              )}
              <View style={styles.nestedSection}>
                {section.content[language]?.map((line, i) => (
                  <Text key={i} style={styles.prayerText}>
                    {line}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
} 