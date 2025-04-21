import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

// Import prayer data
import angelus from '@assets/prayers/traditional/angelus.json';
import orderofthemass from '@assets/prayers/traditional/OrderOfTheMass.json';
import reginacaeli from '@assets/prayers/traditional/ReginaCaeli.json';
import holyrosary from '@assets/prayers/traditional/TheHolyRosary.json';

type PrayerType = {
  id: string;
  title: string;
  content: any;
};

const traditionalPrayers: PrayerType[] = [
  { id: 'angelus', title: 'THE ANGELUS', content: angelus },
  { id: 'regina-caeli', title: 'Regina Caeli', content: reginacaeli },
  { id: 'holy-rosary', title: 'Holy Rosary', content: holyrosary },
  { id: 'order-of-the-mass', title: 'Order of the Mass', content: orderofthemass },
];

type PrayerSection = {
  type: 'opening' | 'middle' | 'closing' | 'prayer';
  title?: Record<string, string>;
  content: Record<string, string[]>;
};

const createPrayerSections = (prayer: any): PrayerSection[] => {
  const sections: PrayerSection[] = [];

  if (prayer.sections) {
    prayer.sections.forEach((section: any) => {
      sections.push({
        type: section.type,
        title: section.title,
        content: section.content,
      });
    });
  }

  return sections;
};

export default function TraditionalPrayersScreen() {
  const { prayer: paramPrayer } = useLocalSearchParams();
  const { language } = useLanguage();
  const theme = useTheme();

  const [selectedPrayer, setSelectedPrayer] = useState(
    paramPrayer || traditionalPrayers[0].id
  );

  const currentPrayer = traditionalPrayers.find((p) => p.id === selectedPrayer);

  const renderContent = (content: string[]) => {
    return content.map((text, i) => (
      <Text key={i} style={{ color: theme.text, marginVertical: 5 }}>
        {text}
      </Text>
    ));
  };

  const prayerSections = currentPrayer
    ? createPrayerSections(currentPrayer.content)
    : [];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.background,
        padding: 20,
      }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Prayer Selector */}
      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            marginBottom: 5,
            color: theme.text,
          }}
        >
          Select Prayer:
        </Text>
        <View
          style={{
            borderRadius: 8,
            overflow: 'hidden',
            backgroundColor: theme.card,
          }}
        >
          <Picker
            selectedValue={selectedPrayer}
            onValueChange={setSelectedPrayer}
            style={{ color: theme.text, backgroundColor: theme.card }}
            itemStyle={{ fontSize: 16 }}
          >
            {traditionalPrayers.map((prayer) => (
              <Picker.Item key={prayer.id} label={prayer.title} value={prayer.id} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Selected Prayer Content */}
      {currentPrayer && (
        <>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 20,
              color: theme.text,
            }}
          >
            {currentPrayer.title}
          </Text>
          {prayerSections.map((section, index) => (
            <View key={index} style={{ marginBottom: 30 }}>
              {section.title && (
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginBottom: 10,
                    color: theme.accent,
                  }}
                >
                  {section.title[language]}
                </Text>
              )}
              <View style={{ marginLeft: 10 }}>
                {renderContent(section.content[language])}
              </View>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}