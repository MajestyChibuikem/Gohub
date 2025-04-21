import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { createPrayerStyles } from './prayers.style';

// Import prayers
import afterholycommuinion from '@assets/prayers/SacramentalPrayers/AfterHolyCommunion.json';
import BeforeHolyCommunion from '@assets/prayers/SacramentalPrayers/BeforeHolyCommunion.json';
import litanyofthesacredheart from '@assets/prayers/SacramentalPrayers/litanyofthesacredheart.json';
import prayerconfession from '@assets/prayers/SacramentalPrayers/PrayerForConfession.json';
import prayerforgrace from '@assets/prayers/SacramentalPrayers/PrayerForGraceToMakeAGoodConfession.json';

type PrayerType = {
    id: string;
    title: string;
    content: any;
};

const sacrementalPrayers: PrayerType[] = [
    { 
      id: 'after-the-holy-communion', 
      title: 'AFTER HOLY COMMUNION', 
      content: afterholycommuinion 
    },
    { 
      id: 'before-holy-communion', 
      title: 'BEFORE HOLY COMMUNION', 
      content: BeforeHolyCommunion 
    },
    { 
      id: 'prayer-for-confession', 
      title: 'PRAYER FOR CONFESSION', 
      content: prayerconfession 
    },
    { 
      id: 'litany-of-the-sacred-heart', 
      title: 'LITANY OF THE SACRED HEART', 
      content: litanyofthesacredheart 
    },
    { 
      id: 'prayer-for-grace', 
      title: 'PRAYER FOR GRACE', 
      content: prayerforgrace 
    }
];

export default function SacrementalPrayersScreen() {
  const { prayer: paramPrayer } = useLocalSearchParams();
  const { language } = useLanguage();
  const theme = useTheme();
  const styles = createPrayerStyles(theme);

  const [selectedPrayer, setSelectedPrayer] = useState(
    paramPrayer || sacrementalPrayers[0].id
  );

  const currentPrayer = sacrementalPrayers.find((p) => p.id === selectedPrayer);

  const renderContent = (content: any) => {
    if (!content) return null;

    // Handle simple string
    if (typeof content === 'string') {
      return <Text style={styles.prayerText}>{content}</Text>;
    }

    // Handle array of strings
    if (Array.isArray(content)) {
      return content.map((item, i) => (
        <Text key={i} style={styles.prayerText}>
          {typeof item === 'string' ? item : renderContent(item)}
        </Text>
      ));
    }

    // Handle verse/response pairs (if present in some prayers)
    if (content.V && content.R) {
      return (
        <View style={styles.prayerItem}>
          <Text style={styles.prayerLeader}>V: {content.V}</Text>
          <Text style={styles.prayerResponse}>R: {content.R}</Text>
        </View>
      );
    }

    // Handle sections if they exist
    if (content.sections) {
      return content.sections.map((section: any, index: number) => (
        <View key={index} style={styles.section}>
          {section.title && (
            <Text style={styles.sectionTitle}>
              {typeof section.title === 'string' ? section.title : section.title[language || 'en']}
            </Text>
          )}
          {renderContent(section.content)}
        </View>
      ));
    }

    // Handle language objects if they exist
    if (content.en || content.es) {
      return renderContent(content[language || 'en'] || content.en);
    }

    // Fallback for other objects
    if (typeof content === 'object') {
      return Object.entries(content).map(([key, value]) => (
        <View key={key} style={styles.nestedSection}>
          {renderContent(value)}
        </View>
      ));
    }

    // Final fallback
    return <Text style={styles.prayerText}>{JSON.stringify(content)}</Text>;
  };

  return (
    <ScrollView style={[styles.container, styles.contentContainer]}>
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
            {sacrementalPrayers.map((prayer) => (
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
            {renderContent(currentPrayer.content)}
          </View>
        </>
      )}
    </ScrollView>
  );
}