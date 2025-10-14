import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
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
  dropCap?: boolean;
};

type PrayerType = {
  id: string;
  title: Record<string, string>;
  content: any;
};

const universityPrayers: PrayerType[] = [
  { id: 'university-prayer', title: { en: 'Godfrey Okoye University Prayer', es: 'Oración de la Universidad Godfrey Okoye' }, content: UniversityPrayer },
];

const parseSections = (data: any): PrayerSection[] =>
  data.sections?.map((section: any) => ({
    type: section.type,
    title: section.title,
    content: section.content,
    dropCap: section.dropCap,
  })) || [];

export default function UniversityPrayersScreen() {
  const { prayer: paramPrayer } = useLocalSearchParams();
  const { theme, getFontSize } = useTheme();
  const { language } = useLanguage();
  const styles = createPrayerStyles(theme);

  const [selectedPrayerId, setSelectedPrayerId] = useState<string>(
    typeof paramPrayer === 'string' ? paramPrayer : universityPrayers[0].id
  );

  const selectedPrayer = universityPrayers.find(p => p.id === selectedPrayerId);
  const sections = selectedPrayer ? parseSections(selectedPrayer.content) : [];

  // Custom styles for university prayer - matching the printed image
  const customStyles = StyleSheet.create({
    universityTitle: {
      fontSize: getFontSize(28),
      fontWeight: 'bold',
      color: '#2C3E7F', // Dark blue like the printed version
      textAlign: 'center',
      marginVertical: 20,
      paddingHorizontal: 20,
      fontFamily: 'Georgia', // Serif font
    },
    // Container for drop cap layout
    dropCapContainer: {
      flexDirection: 'row',
      marginBottom: 20,
      paddingHorizontal: 15,
      alignItems: 'flex-start',
    },
    // Drop cap letter styling
    dropCapLetter: {
      fontSize: getFontSize(72),
      fontWeight: 'bold',
      color: '#C41E3A', // Crimson red like the printed version
      lineHeight: getFontSize(72),
      marginRight: 8,
      marginTop: 2,
      fontFamily: 'Georgia',
    },
    // Text wrapping around drop cap
    dropCapText: {
      flex: 1,
      fontSize: getFontSize(16),
      lineHeight: getFontSize(24),
      color: theme.text,
      textAlign: 'justify',
      fontFamily: 'Georgia',
      letterSpacing: 0.3,
    },
    // Regular paragraph styling
    paragraph: {
      fontSize: getFontSize(16),
      lineHeight: getFontSize(24),
      color: theme.text,
      marginBottom: 18,
      paddingHorizontal: 15,
      textAlign: 'justify',
      fontFamily: 'Georgia',
      letterSpacing: 0.3,
    },
    // Conclusion styling (red italic)
    conclusion: {
      fontSize: getFontSize(16),
      fontStyle: 'italic',
      color: '#C41E3A',
      textAlign: 'center',
      marginTop: 30,
      marginBottom: 50,
      fontWeight: '600',
      paddingHorizontal: 20,
      fontFamily: 'Georgia',
    },
  });

  const renderSection = (section: PrayerSection, index: number) => {
    const content = section.content[language];
    
    if (!content || content.length === 0) return null;

    // Render conclusion (last section) in red italic
    if (section.type === 'conclusion') {
      return (
        <Text key={index} style={customStyles.conclusion}>
          {content.join('\n')}
        </Text>
      );
    }

    // Render first section with drop cap
    if (section.dropCap && content[0]) {
      const firstLetter = content[0].charAt(0);
      const restOfText = content[0].substring(1);
      
      return (
        <View key={index} style={customStyles.dropCapContainer}>
          <Text style={customStyles.dropCapLetter}>{firstLetter}</Text>
          <Text style={customStyles.dropCapText}>{restOfText}</Text>
        </View>
      );
    }

    // Render all other sections as regular paragraphs
    return (
      <View key={index}>
        {content.map((paragraph, i) => (
          <Text key={i} style={customStyles.paragraph}>
            {paragraph}
          </Text>
        ))}
      </View>
    );
  };

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

      {/* University Prayer with Custom Styling */}
      {selectedPrayer && (
        <>
          <Text style={customStyles.universityTitle}>
            {selectedPrayer.title[language]}
          </Text>

          {sections.map((section, idx) => renderSection(section, idx))}
        </>
      )}
    </ScrollView>
  );
}