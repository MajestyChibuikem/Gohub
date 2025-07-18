import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

// Import prayers
import AfterHolyCommunion from '@assets/prayers/SacramentalPrayers/AfterHolyCommunion.json';
import BeforeHolyCommunion from '@assets/prayers/SacramentalPrayers/BeforeHolyCommunion.json';
import LitanyOfTheSacredHeart from '@assets/prayers/SacramentalPrayers/LitanyOfTheSacredHeart.json';
import PrayerForConfession from '@assets/prayers/SacramentalPrayers/PrayerForConfession.json';
import PrayerForGrace from '@assets/prayers/SacramentalPrayers/PrayerForGraceToMakeAGoodConfession.json';

type PrayerType = {
    id: string;
    title: string;
    content: any;
};

const sacramentalPrayers: PrayerType[] = [
    { 
      id: 'after-the-holy-communion', 
      title: 'AFTER HOLY COMMUNION', 
      content: AfterHolyCommunion 
    },
    { 
      id: 'before-holy-communion', 
      title: 'BEFORE HOLY COMMUNION', 
      content: BeforeHolyCommunion 
    },
    { 
      id: 'prayer-for-confession', 
      title: 'PRAYER FOR CONFESSION', 
      content: PrayerForConfession 
    },
    { 
      id: 'litany-of-the-sacred-heart', 
      title: 'LITANY OF THE SACRED HEART', 
      content: LitanyOfTheSacredHeart 
    },
    { 
      id: 'prayer-for-grace', 
      title: 'PRAYER FOR GRACE', 
      content: PrayerForGrace 
    }
];

type PrayerSection = {
  type: string;
  title?: Record<string, string>;
  content: Record<string, string[]>;
};

const parseSections = (data: any): PrayerSection[] => {
  return data.sections?.map((section: any) => ({
    type: section.type,
    title: section.title,
    content: section.content,
  })) || [];
};

export default function SacramentalPrayersScreen() {
  const { prayer: paramPrayer } = useLocalSearchParams();
  const { theme, getFontSize } = useTheme();
  const { language } = useLanguage();

  const [selectedPrayerId, setSelectedPrayerId] = useState<string>(
    typeof paramPrayer === 'string' ? paramPrayer : sacramentalPrayers[0].id
  );

  const selectedPrayer = sacramentalPrayers.find(p => p.id === selectedPrayerId);
  const sections = selectedPrayer ? parseSections(selectedPrayer.content) : [];

  const renderContent = (content: any) => {
    if (!content) return null;

    if (typeof content === 'string') {
      return (
        <Text style={{
          color: theme.text,
          marginVertical: 5,
          fontSize: getFontSize(16)
        }}>
          {content}
        </Text>
      );
    }

    if (Array.isArray(content)) {
      return content.map((item, i) => (
        <Text 
          key={i}
          style={{
            color: theme.text,
            marginVertical: 5,
            fontSize: getFontSize(16)
          }}
        >
          {typeof item === 'string' ? item : renderContent(item)}
        </Text>
      ));
    }

    if (content.V && content.R) {
      return (
        <View style={{ marginBottom: 15 }}>
          <Text style={{
            fontWeight: 'bold',
            color: theme.accent,
            fontSize: getFontSize(16)
          }}>
            V: {content.V}
          </Text>
          <Text style={{
            fontStyle: 'italic',
            color: theme.textSecondary,
            fontSize: getFontSize(16),
            marginTop: 5
          }}>
            R: {content.R}
          </Text>
        </View>
      );
    }

    if (content.sections) {
      return content.sections.map((section: any, index: number) => (
        <View key={index} style={{ marginBottom: 30 }}>
          {section.title && (
            <Text style={{
              fontWeight: 'bold',
              fontSize: getFontSize(18),
              marginBottom: 10,
              color: theme.accent
            }}>
              {typeof section.title === 'string' 
                ? section.title 
                : section.title[language || 'en']}
            </Text>
          )}
          <View style={{ marginLeft: 10 }}>
            {renderContent(section.content)}
          </View>
        </View>
      ));
    }

    if (content[language] || content.en) {
      return renderContent(content[language] || content.en);
    }

    if (typeof content === 'object') {
      return Object.entries(content).map(([key, value]) => (
        <View key={key} style={{ marginLeft: 15 }}>
          {renderContent(value)}
        </View>
      ));
    }

    return (
      <Text style={{
        color: theme.text,
        fontSize: getFontSize(16)
      }}>
        {JSON.stringify(content)}
      </Text>
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background, padding: 20 }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Prayer Selector */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{
          fontWeight: 'bold',
          fontSize: getFontSize(16),
          marginBottom: 5,
          color: theme.text
        }}>
          Select Prayer:
        </Text>
        <View style={{ 
          borderRadius: 8, 
          overflow: 'hidden', 
          backgroundColor: theme.card,
          borderWidth: 1,
          borderColor: theme.border
        }}>
          <Picker
            selectedValue={selectedPrayerId}
            onValueChange={setSelectedPrayerId}
            style={{ color: theme.text }}
            dropdownIconColor={theme.text}
            itemStyle={{ fontSize: getFontSize(16) }}
          >
            {sacramentalPrayers.map((prayer) => (
              <Picker.Item 
                key={prayer.id} 
                label={prayer.title} 
                value={prayer.id} 
              />
            ))}
          </Picker>
        </View>
      </View>

      {/* Selected Prayer Content */}
      {selectedPrayer && (
        <>
          <Text style={{
            fontSize: getFontSize(24),
            fontWeight: 'bold',
            marginBottom: 20,
            color: theme.text
          }}>
            {selectedPrayer.title}
          </Text>
          
          <View style={{ marginBottom: 30 }}>
            {renderContent(selectedPrayer.content)}
          </View>
        </>
      )}
    </ScrollView>
  );
}