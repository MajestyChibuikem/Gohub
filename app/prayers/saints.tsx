import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { createPrayerStyles } from './prayers.style';

// Import JSON files


import Catena from '@assets/prayers/SaintsAndDevotions/catena.json';
import prayerofsaintfrancis from '@assets/prayers/SaintsAndDevotions/prayerofsaintfrancis.json';
import StPatricksPrayer from '@assets/prayers/SaintsAndDevotions/stpatricksprayer.json';
import prayertotheholyspirit from '@assets/prayers/SaintsAndDevotions/prayertotheholyspirit.json';

type PrayerType = {
    id: string;
    title: Record<string, string>;
    content: any;
};

const saintsPrayer: PrayerType[] = [
    { 
      id: 'catena', 
      title: { en: 'Catena' }, 
      content: Catena
    },
    { 
      id: 'prayer-of-saint-francis', 
      title: { en: 'Prayer of Saint Francis' }, 
      content: prayerofsaintfrancis 
    },
    { 
      id: 'St-Patricks-Prayer', 
      title: { en: 'St Patrick\'s Prayer' }, 
      content: StPatricksPrayer 
    },
    { 
        id: 'Prayer-to-the-holy-spirit', 
        title: { en: 'Prayer to the Holy Spirit' }, 
        content: prayertotheholyspirit 
      }
];


export default function SaintsPrayersScreen() {
  const { prayer: paramPrayer } = useLocalSearchParams();
  const { language } = useLanguage();
  const theme = useTheme();
  const styles = createPrayerStyles(theme);

  const [selectedPrayer, setSelectedPrayer] = useState(
    paramPrayer || saintsPrayer[0].id
  );

  const currentPrayer = saintsPrayer.find((p) => p.id === selectedPrayer);

  const renderContent = (content: any, lang: string = 'en') => {
    if (!content) return null;

    // Handle simple string
    if (typeof content === 'string') {
      return <Text style={styles.prayerText}>{content}</Text>;
    }

    // Handle array of strings
    if (Array.isArray(content)) {
      return content.map((item, i) => (
        <Text key={i} style={styles.prayerText}>
          {typeof item === 'string' ? item : renderContent(item, lang)}
        </Text>
      ));
    }

    // Handle verse/response pairs
    if (content.V && content.R) {
      return (
        <View style={styles.prayerItem}>
          <Text style={styles.prayerLeader}>V: {content.V}</Text>
          <Text style={styles.prayerResponse}>R: {content.R}</Text>
        </View>
      );
    }

    // Handle language-specific content
    if (content[lang]) {
      return renderContent(content[lang], lang);
    }

    // Handle sections
    if (content.sections) {
      return content.sections.map((section: any, index: number) => (
        <View key={index} style={styles.section}>
          {section.title && (
            <Text style={styles.sectionTitle}>
              {section.title[lang] || section.title.en}
            </Text>
          )}
          {renderContent(section.content, lang)}
        </View>
      ));
    }

    // Fallback for other objects
    return Object.entries(content).map(([key, value]) => (
      <View key={key} style={styles.nestedSection}>
        {renderContent(value, lang)}
      </View>
    ));
  };

  return (
    <ScrollView style={[styles.container, styles.contentContainer]}>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select Prayer:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedPrayer}
            onValueChange={setSelectedPrayer}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {saintsPrayer.map((prayer) => (
              <Picker.Item key={prayer.id} label={prayer.title[language || 'en']} value={prayer.id} />
            ))}
          </Picker>
        </View>
      </View>

      {currentPrayer && (
        <>
          <Text style={styles.prayerTitle}>{currentPrayer?.title[language || 'en']}</Text>
          <View style={styles.prayerContent}>
            {renderContent(currentPrayer.content, language || 'en')}
          </View>
        </>
      )}
    </ScrollView>
  );
}