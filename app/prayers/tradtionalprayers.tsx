// app/prayers/traditionalprayers.tsx
import { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { createTraditionalPrayerStyles } from './traditionalprayers.styles';

const traditionalPrayers = [
  { id: 'angelus', title: 'The Angelus' },
  { id: 'regina-caeli', title: 'Regina Caeli' },
  { id: 'rosary', title: 'Holy Rosary' },
  { id: 'litany-sacred-heart', title: 'Litany of the Sacred Heart' },
];

export default function TraditionalPrayersScreen() {
  const { language } = useLanguage();
  const theme = useTheme();
  const styles = createTraditionalPrayerStyles(theme);
  
  const [selectedPrayer, setSelectedPrayer] = useState(traditionalPrayers[0].id);

  // Load prayer content based on selection
  const prayerContent = {
    en: {
      angelus: ["V. The Angel of the Lord declared unto Mary.", "R. And she conceived of the Holy Spirit.", ...],
      'regina-caeli': ["Queen of Heaven, rejoice, alleluia...", ...],
      // Add other prayers
    },
    // Add other languages
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select Prayer:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedPrayer}
            onValueChange={setSelectedPrayer}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {traditionalPrayers.map(prayer => (
              <Picker.Item 
                key={prayer.id} 
                label={prayer.title} 
                value={prayer.id} 
              />
            ))}
          </Picker>
        </View>
      </View>

      <Text style={styles.prayerTitle}>
        {traditionalPrayers.find(p => p.id === selectedPrayer)?.title}
      </Text>

      <View style={styles.prayerContent}>
        {prayerContent[language][selectedPrayer]?.map((text, index) => (
          <Text key={index} style={styles.prayerText}>
            {text}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}