import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { createHymnStyles } from './hymns.style';

// Import Lent hymns
import WhenISurveyTheWondrousCross from '@assets/hymns/Lent/When-i-survey-the-wondrous-cross.json';
import WhenISeeTheBlood from '@assets/hymns/Lent/When-i-see-the-Blood.json';
import VictimaePashchali from '@assets/hymns/Lent/Victimae-pashchali.json';
import WelunaAnyaNeneJesu from '@assets/hymns/Lent/Weluna-anya-nene-jesu.json';
import TheOldRuggedCross from '@assets/hymns/Lent/The-old-Rugged-Cross.json';
import TheLordsCallingToday from '@assets/hymns/Lent/The-lords-calling-today.json';
import OComeAndMournWithMeAWhile from '@assets/hymns/Lent/O-come-and-mourn-with-me-a-while.json';
import ThatManOfCalvary from '@assets/hymns/Lent/That-man-of-Calvary.json';
import MyLordHeDied from '@assets/hymns/Lent/My-Lord-he-died.json';
import MySpiritLongsForThee from '@assets/hymns/Lent/My-spirit-longs-for-thee.json';
import OChinekeGbaghara from '@assets/hymns/Lent/O-chineke-Gbaghara.json';
import KaPilateJuru from '@assets/hymns/Lent/Ka-Pilate-juru.json';
import JoyfulJoyfulWeAdoreYou from '@assets/hymns/Lent/Joyful-joyful-We-adore-you.json';
import BlessedLamb from '@assets/hymns/Lent/Blessed-lamb.json';
import ChristArose from '@assets/hymns/Lent/Christ-arose.json';
import HymnOfJoy from '@assets/hymns/Lent/Hynm-of-joy.json';

type HymnType = {
  id: string;
  title: string;
  content: any;
};

const lentHymns: HymnType[] = [
  { id: 'when-i-survey-the-wondrous-cross', title: 'When I Survey the Wondrous Cross', content: WhenISurveyTheWondrousCross },
  { id: 'when-i-see-the-blood', title: 'When I See the Blood', content: WhenISeeTheBlood },
  { id: 'victimae-pashchali', title: 'Victimae Pashchali', content: VictimaePashchali },
  { id: 'weluna-anya-nene-jesu', title: 'Weluna Anya Nene Jesu', content: WelunaAnyaNeneJesu },
  { id: 'the-old-rugged-cross', title: 'The Old Rugged Cross', content: TheOldRuggedCross },
  { id: 'the-lords-calling-today', title: "The Lord's Calling Today", content: TheLordsCallingToday },
  { id: 'o-come-and-mourn-with-me-a-while', title: 'O Come and Mourn with Me a While', content: OComeAndMournWithMeAWhile },
  { id: 'that-man-of-calvary', title: 'That Man of Calvary', content: ThatManOfCalvary },
  { id: 'my-lord-he-died', title: 'My Lord He Died', content: MyLordHeDied },
  { id: 'my-spirit-longs-for-thee', title: 'My Spirit Longs for Thee', content: MySpiritLongsForThee },
  { id: 'o-chineke-gbaghara', title: 'O Chineke Gbaghara', content: OChinekeGbaghara },
  { id: 'ka-pilate-juru', title: 'Ka Pilate Juru', content: KaPilateJuru },
  { id: 'joyful-joyful-we-adore-you', title: 'Joyful Joyful We Adore You', content: JoyfulJoyfulWeAdoreYou },
  { id: 'blessed-lamb', title: 'Blessed Lamb', content: BlessedLamb },
  { id: 'christ-arose', title: 'Christ Arose', content: ChristArose },
  { id: 'hymn-of-joy', title: 'Hymn of Joy', content: HymnOfJoy },
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

export default function LentHymnsScreen() {
  console.log('🎵 LentHymnsScreen - Component loaded');
  console.log('📱 Available lent hymns:', lentHymns.length);
  
  const { hymn: paramHymn } = useLocalSearchParams();
  const { theme, getFontSize } = useTheme();
  const { language } = useLanguage();
  const styles = createHymnStyles(theme);

  const [selectedHymnId, setSelectedHymnId] = useState<string>(
    typeof paramHymn === 'string' ? paramHymn : lentHymns[0]?.id || ''
  );

  const selectedHymn = lentHymns.find(h => h.id === selectedHymnId);
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
            {lentHymns.map(h => (
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