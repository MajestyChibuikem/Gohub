import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { createHymnStyles } from './hymns.style';
import { hymns } from '../../../utils/hymnIndex';

type HymnType = {
  id: string;
  title: string;
  content: any;
};

// Get Marian hymns from the hymnIndex
const marianHymns: HymnType[] = Object.entries(hymns['Marian Hymns'] || {}).map(([title, content]) => ({
  id: title.toLowerCase().replace(/\s+/g, '-'),
  title,
  content
}));

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

export default function MarianHymnsScreen() {
  const { hymn: paramHymn } = useLocalSearchParams();
  const { theme, getFontSize } = useTheme();
  const { language } = useLanguage();
  const styles = createHymnStyles(theme);

  console.log('📱 marian-hymns.tsx - Component loaded');
  console.log('🎵 Hymn param received:', paramHymn);

  const [selectedHymnId, setSelectedHymnId] = useState<string>(
    typeof paramHymn === 'string' ? paramHymn : marianHymns[0]?.id || ''
  );

  console.log('🎯 Selected hymn ID:', selectedHymnId);
  console.log('📚 Available hymns:', marianHymns.map(h => h.id));

  const selectedHymn = marianHymns.find(h => h.id === selectedHymnId);
  const sections = selectedHymn ? parseSections(selectedHymn.content) : [];

  console.log('📖 Selected hymn found:', selectedHymn ? 'Yes' : 'No');
  console.log('📄 Sections parsed:', sections.length);

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
            {marianHymns.map(h => (
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