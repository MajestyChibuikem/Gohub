import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { createPrayerStyles } from './prayers.style';

// Import prayers
import angelus from '@assets/prayers/traditional/angelus.json';
import reginaCaeli from '@assets/prayers/traditional/ReginaCaeli.json';
import holyRosary from '@assets/prayers/traditional/TheHolyRosary.json';
import orderOfTheMass from '@assets/prayers/traditional/OrderOfTheMass.json';

type PrayerSection = {
  type: string;
  title?: Record<string, string>;
  content: Record<string, string[]>;
};

type Prayer = {
  id: string;
  title: string;
  content: any;
};

const prayers: Prayer[] = [
  { id: 'angelus', title: 'THE ANGELUS', content: angelus },
  { id: 'regina-caeli', title: 'Regina Caeli', content: reginaCaeli },
  { id: 'holy-rosary', title: 'Holy Rosary', content: holyRosary },
  { id: 'order-of-the-mass', title: 'Order of the Mass', content: orderOfTheMass },
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
    typeof paramPrayer === 'string' ? paramPrayer : prayers[0].id
  );

  const selectedPrayer = prayers.find(p => p.id === selectedPrayerId);
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
            {prayers.map(p => (
              <Picker.Item key={p.id} label={p.title} value={p.id} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Title */}
      {selectedPrayer && (
        <>
          <Text style={styles.prayerTitle}>{selectedPrayer.title}</Text>

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
