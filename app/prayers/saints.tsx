import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

// Import JSON files
import Catena from '@assets/prayers/SaintsAndDevotions/Catena.json';
import PrayerOfSaintFrancis from '@assets/prayers/SaintsAndDevotions/PrayerOfSaintFrancis.json';
import StPatricksPrayer from '@assets/prayers/SaintsAndDevotions/StPatricksPrayer.json';
import PrayerToTheHolySpirit from '@assets/prayers/SaintsAndDevotions/PrayerToTheHolySpirit.json';

type PrayerType = {
  id: string;
  title: Record<string, string>;
  content: any;
};

const saintsPrayers: PrayerType[] = [
  { id: 'catena', title: { en: 'Catena' }, content: Catena },
  { id: 'prayer-of-saint-francis', title: { en: 'Prayer of Saint Francis' }, content: PrayerOfSaintFrancis },
  { id: 'st-patricks-prayer', title: { en: "St Patrick's Prayer" }, content: StPatricksPrayer },
  { id: 'prayer-to-the-holy-spirit', title: { en: 'Prayer to the Holy Spirit' }, content: PrayerToTheHolySpirit },
];

export default function SaintsPrayersScreen() {
  const { prayer: paramPrayer } = useLocalSearchParams();
  const { theme, getFontSize } = useTheme();
  const { language } = useLanguage();

  const [selectedPrayerId, setSelectedPrayerId] = useState<string>(
    typeof paramPrayer === 'string' ? paramPrayer : saintsPrayers[0].id
  );

  const selectedPrayer = saintsPrayers.find(p => p.id === selectedPrayerId);

  const renderContent = (content: any, lang: string = language || 'en'): JSX.Element | null => {
    if (!content) return null;

    if (typeof content === 'string') {
      return (
        <Text style={{ color: theme.text, fontSize: getFontSize(16), marginVertical: 5 }}>
          {content}
        </Text>
      );
    }

    if (Array.isArray(content)) {
      return (
        <>
          {content.map((item, i) => (
            <View key={i}>{renderContent(item, lang)}</View>
          ))}
        </>
      );
    }

    if (content.V && content.R) {
      return (
        <View style={{ marginBottom: 15 }}>
          <Text style={{ fontWeight: 'bold', color: theme.accent, fontSize: getFontSize(16) }}>
            V: {content.V}
          </Text>
          <Text style={{ fontStyle: 'italic', color: theme.textSecondary, fontSize: getFontSize(16), marginTop: 5 }}>
            R: {content.R}
          </Text>
        </View>
      );
    }

    if (content.sections) {
      return (
        <>
          {content.sections.map((section: any, idx: number) => (
            <View key={idx} style={{ marginBottom: 30 }}>
              {section.title && (
                <Text style={{ fontWeight: 'bold', fontSize: getFontSize(18), marginBottom: 10, color: theme.accent }}>
                  {typeof section.title === 'string' ? section.title : section.title[lang] || section.title.en}
                </Text>
              )}
              <View style={{ marginLeft: 10 }}>
                {renderContent(section.content, lang)}
              </View>
            </View>
          ))}
        </>
      );
    }

    if (content[lang] || content.en) {
      return renderContent(content[lang] || content.en, lang);
    }

    if (typeof content === 'object') {
      return (
        <>
          {Object.entries(content).map(([key, val]) => (
            <View key={key} style={{ marginLeft: 15, marginVertical: 5 }}>
              {renderContent(val, lang)}
            </View>
          ))}
        </>
      );
    }

    return (
      <Text style={{ color: theme.text, fontSize: getFontSize(16) }}>
        {JSON.stringify(content)}
      </Text>
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background, padding: 20 }} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Prayer Selector */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: getFontSize(16), marginBottom: 5, color: theme.text }}>
          Select Prayer:
        </Text>
        <View style={{ borderRadius: 8, overflow: 'hidden', backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border }}>
          <Picker
            selectedValue={selectedPrayerId}
            onValueChange={setSelectedPrayerId}
            style={{ color: theme.text }}
            dropdownIconColor={theme.text}
            itemStyle={{ fontSize: getFontSize(16) }}
          >
            {saintsPrayers.map(p => (
              <Picker.Item key={p.id} label={p.title[language] || p.title.en} value={p.id} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Selected Prayer Content */}
      {selectedPrayer && (
        <>
          <Text style={{ fontSize: getFontSize(24), fontWeight: 'bold', marginBottom: 20, color: theme.text }}>
            {selectedPrayer.title[language] || selectedPrayer.title.en}
          </Text>
          <View style={{ marginBottom: 30 }}>
            {renderContent(selectedPrayer.content)}
          </View>
        </>
      )}
    </ScrollView>
  );
}
