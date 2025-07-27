import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { createPrayerStyles } from './prayers.style';

import GraceAfterMeals from '@assets/prayers/DailyLife/GraceAfterMeals.json';
import GraceBeforeMeals from '@assets/prayers/DailyLife/GraceBeforeMeals.json';
import MorningOffering from '@assets/prayers/DailyLife/MorningOffering.json';
import SleepPrayer from '@assets/prayers/DailyLife/SleepPrayer.json';

type PrayerType = {
    id: string;
    title: string;
    content: any;
};

const dailyPrayer: PrayerType[] = [
    { 
      id: 'grace-after-meals', 
      title: 'Grace After Meals', 
      content: GraceAfterMeals 
    },
    { 
      id: 'grace-before-meals', 
      title: 'Grace Before Meals', 
      content: GraceBeforeMeals 
    },
    { 
      id: 'morning-offering', 
      title: 'Morning Offering', 
      content: MorningOffering 
    },
    { 
      id: 'sleep-prayer', 
      title: 'Prayer Before Sleep', 
      content: SleepPrayer 
    }
];

export default function DailyPrayersScreen() {
  const { prayer: paramPrayer } = useLocalSearchParams();
  const { language } = useLanguage();
  const { theme, getFontSize } = useTheme();
  const styles = createPrayerStyles(theme);

  const [selectedPrayer, setSelectedPrayer] = useState(
    paramPrayer || dailyPrayer[0].id
  );

  const currentPrayer = dailyPrayer.find((p) => p.id === selectedPrayer);

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
              {typeof section.title === 'string' ? section.title : section.title[lang]}
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
    <ScrollView style={{ flex: 1, backgroundColor: theme.background, padding: 20 }} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Prayer Selector */}
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select Prayer:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedPrayer}
            onValueChange={setSelectedPrayer}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {dailyPrayer.map((prayer) => (
              <Picker.Item key={prayer.id} label={prayer.title} value={prayer.id} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Selected Prayer Content */}
      {currentPrayer && (
        <>
          <Text style={styles.prayerTitle}>{currentPrayer.title}</Text>
          <View style={styles.prayerContent}>
            {renderContent(currentPrayer.content, language || 'en')}
          </View>
        </>
      )}
    </ScrollView>
  );
}