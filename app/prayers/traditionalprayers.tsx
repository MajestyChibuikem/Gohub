import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { createPrayerStyles } from './prayers.style';

// Import prayers
import Angelus from '@assets/prayers/traditional/angelus.json';
import ReginaCaeli from '@assets/prayers/traditional/ReginaCaeli.json';
import TheHolyRosary from '@assets/prayers/traditional/TheHolyRosary.json';
import OrderOfTheMass from '@assets/prayers/traditional/OrderOfTheMass.json';

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

const traditionalPrayers: PrayerType[] = [
  { id: 'angelus', title: { en: 'Angelus' }, content: Angelus },
  { id: 'regina-caeli', title: { en: 'Regina Caeli' }, content: ReginaCaeli },
  { id: 'holy-rosary', title: { en: 'The Holy Rosary' }, content: TheHolyRosary },
  { id: 'order-of-mass', title: { en: 'Order of the Mass' }, content: OrderOfTheMass },
];

const parseSections = (data: any): PrayerSection[] =>
  data.sections?.map((section: any) => ({
    type: section.type,
    title: section.title,
    content: section.content,
  })) || [];

export default function TraditionalPrayersScreen() {
  const { prayer: paramPrayer } = useLocalSearchParams();
  const { theme, getFontSize } = useTheme();
  const { language } = useLanguage();
  const styles = createPrayerStyles(theme);

  const [selectedPrayerId, setSelectedPrayerId] = useState<string>(
    typeof paramPrayer === 'string' ? paramPrayer : traditionalPrayers[0].id
  );

  const selectedPrayer = traditionalPrayers.find(p => p.id === selectedPrayerId);
  const sections = selectedPrayer ? parseSections(selectedPrayer.content) : [];

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
            {traditionalPrayers.map(p => (
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
