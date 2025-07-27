import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { createHymnStyles } from './hymns.style';

// Import General hymns (showing first 10 as example)
import AmazingGrace from '@assets/hymns/general-hymns/Amazing-Grace.json';
import AllThingsBrightAndBeautiful from '@assets/hymns/general-hymns/All-things-Bright-and-Beautiful.json';
import AtTheLambsHighFeast from '@assets/hymns/general-hymns/AT-THE-LAMBs-HIGH-FEAST.json';
import AlleluiaSingToJesus from '@assets/hymns/general-hymns/Alleluia-sing-to-Jesus.json';
import BeStillMyFriends from '@assets/hymns/general-hymns/Be-Still-My-Friends.json';
import AtThatFirstEucharist from '@assets/hymns/general-hymns/At-that-first-eucharist.json';
import AsADeerLongsForWater from '@assets/hymns/general-hymns/As-a-deer-longs-for-water.json';
import ComeHolyGhost from '@assets/hymns/general-hymns/Come-Holy-Ghost.json';
import BlestAreThey from '@assets/hymns/general-hymns/Blest-are-they.json';
import CrownHimWithManyCrowns from '@assets/hymns/general-hymns/Crown-him-with-many-crowns.json';

type HymnType = {
  id: string;
  title: string;
  content: any;
};

const generalHymns: HymnType[] = [
  { id: 'amazing-grace', title: 'Amazing Grace', content: AmazingGrace },
  { id: 'all-things-bright-and-beautiful', title: 'All Things Bright and Beautiful', content: AllThingsBrightAndBeautiful },
  { id: 'at-the-lambs-high-feast', title: 'At the Lamb\'s High Feast', content: AtTheLambsHighFeast },
  { id: 'alleluia-sing-to-jesus', title: 'Alleluia Sing to Jesus', content: AlleluiaSingToJesus },
  { id: 'be-still-my-friends', title: 'Be Still My Friends', content: BeStillMyFriends },
  { id: 'at-that-first-eucharist', title: 'At That First Eucharist', content: AtThatFirstEucharist },
  { id: 'as-a-deer-longs-for-water', title: 'As a Deer Longs for Water', content: AsADeerLongsForWater },
  { id: 'come-holy-ghost', title: 'Come Holy Ghost', content: ComeHolyGhost },
  { id: 'blest-are-they', title: 'Blest Are They', content: BlestAreThey },
  { id: 'crown-him-with-many-crowns', title: 'Crown Him with Many Crowns', content: CrownHimWithManyCrowns },
];

type HymnSection = {
  type: string;
  content: string[];
};

const parseSections = (data: any): HymnSection[] => {
  return data.sections?.map((section: any) => ({
    type: section.type,
    content: section.content,
  })) || [];
};

export default function GeneralHymnsScreen() {
  const { hymn: paramHymn } = useLocalSearchParams();
  const { theme, getFontSize } = useTheme();
  const { language } = useLanguage();
  const styles = createHymnStyles(theme);

  const [selectedHymnId, setSelectedHymnId] = useState<string>(
    typeof paramHymn === 'string' ? paramHymn : generalHymns[0]?.id || ''
  );

  const selectedHymn = generalHymns.find(h => h.id === selectedHymnId);
  const sections = selectedHymn ? parseSections(selectedHymn.content) : [];

  const renderContent = (content: any): JSX.Element | null => {
    if (!content) return null;

    if (typeof content === 'string') {
      return (
        <Text style={[styles.hymnText, { fontSize: getFontSize(16) }]}>
          {content}
        </Text>
      );
    }

    if (Array.isArray(content)) {
      return (
        <>
          {content.map((item, i) => (
            <Text key={i} style={[styles.hymnText, { fontSize: getFontSize(16) }]}>
              {item}
            </Text>
          ))}
        </>
      );
    }

    if (content.V && content.R) {
      return (
        <View style={styles.hymnItem}>
          <Text style={[styles.hymnLeader, { fontSize: getFontSize(16) }]}>
            V: {content.V}
          </Text>
          <Text style={[styles.hymnResponse, { fontSize: getFontSize(16) }]}>
            R: {content.R}
          </Text>
        </View>
      );
    }

    if (content.sections) {
      return (
        <>
          {content.sections.map((section: any, idx: number) => (
            <View key={idx} style={styles.verseContainer}>
              {section.type && (
                <Text style={[styles.verseTitle, { fontSize: getFontSize(16) }]}>
                  {section.type}
                </Text>
              )}
              <View style={styles.nestedSection}>
                {renderContent(section.content)}
              </View>
            </View>
          ))}
        </>
      );
    }

    if (content[language] || content.en) {
      return renderContent(content[language] || content.en);
    }

    if (typeof content === 'object') {
      return (
        <>
          {Object.entries(content).map(([key, val]) => (
            <View key={key} style={styles.nestedSection}>
              {renderContent(val)}
            </View>
          ))}
        </>
      );
    }

    return (
      <Text style={[styles.hymnText, { fontSize: getFontSize(16) }]}>
        {JSON.stringify(content)}
      </Text>
    );
  };

  return (
    <ScrollView
      style={[styles.container, styles.contentContainer]}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Picker */}
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select Hymn:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedHymnId}
            onValueChange={setSelectedHymnId}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {generalHymns.map(h => (
              <Picker.Item key={h.id} label={h.title} value={h.id} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Title */}
      {selectedHymn && (
        <>
          <Text style={[styles.hymnTitle, { fontSize: getFontSize(24) }]}>
            {selectedHymn.title}
          </Text>

          {/* Sections */}
          <View style={styles.hymnContent}>
            {renderContent(selectedHymn.content)}
          </View>
        </>
      )}
    </ScrollView>
  );
} 