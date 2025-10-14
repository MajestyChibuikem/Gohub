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

  // Custom styles for university prayer
  const customStyles = StyleSheet.create({
    universityTitle: {
      fontSize: getFontSize(32),
      fontWeight: 'bold',
      color: '#1E3A8A', // Dark blue like the printed version
      textAlign: 'center',
      marginVertical: 25,
      paddingHorizontal: 20,
    },
    // Custom layout for the "G" interaction
    gLayoutContainer: {
      flexDirection: 'row',
      marginBottom: 25,
      paddingHorizontal: 20,
    },
    gColumn: {
      width: 80, // Fixed width for the "G"
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    gLetter: {
      fontSize: getFontSize(96), // Much larger - 4-5 lines tall
      fontWeight: 'bold',
      color: '#DC143C', // Bright red like the image
      lineHeight: getFontSize(96),
      marginTop: -5,
      marginLeft: -5,
    },
    gTextColumn: {
      flex: 1,
      paddingLeft: 15, // Space between G and text
    },
    gText: {
      fontSize: getFontSize(18), // Larger for better readability
      lineHeight: getFontSize(28), // More generous line spacing
      color: theme.text,
      textAlign: 'left', // Left aligned like the printed version
    },
    paragraph: {
      fontSize: getFontSize(18),
      lineHeight: getFontSize(28),
      color: theme.text,
      marginBottom: 25, // More space between paragraphs
      paddingHorizontal: 20,
      textAlign: 'left', // Left aligned like the printed version
    },
    conclusion: {
      fontSize: getFontSize(20),
      fontStyle: 'italic',
      color: '#DC143C', // Bright red
      textAlign: 'center',
      marginTop: 35,
      marginBottom: 50,
      fontWeight: '600',
      paddingHorizontal: 20,
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

    // Render first section with custom "G" layout
    if (section.dropCap && content[0]) {
      const firstLetter = content[0].charAt(0);
      const restOfText = content[0].substring(1);
      
      return (
        <View key={index} style={customStyles.gLayoutContainer}>
          {/* G Column - Fixed width */}
          <View style={customStyles.gColumn}>
            <Text style={customStyles.gLetter}>{firstLetter}</Text>
          </View>
          {/* Text Column - Flexible width */}
          <View style={customStyles.gTextColumn}>
            <Text style={customStyles.gText}>{restOfText}</Text>
          </View>
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
          {/* Title - Bold, H2-like, Special Color */}
          <Text style={customStyles.universityTitle}>
            {selectedPrayer.title[language]}
          </Text>

          {/* Prayer Sections with Custom Formatting */}
          {sections.map((section, idx) => renderSection(section, idx))}
        </>
      )}
    </ScrollView>
  );
} 