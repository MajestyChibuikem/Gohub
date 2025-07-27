import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { createHymnStyles } from './hymns.style';

// Import Common of the Mass hymns
import Gloria from '@assets/hymns/Common-of-the-mass/gloria.json';
import Sanctus from '@assets/hymns/Common-of-the-mass/Sanctus.json';
import AgnusDei from '@assets/hymns/Common-of-the-mass/agnus-dei-agnus-dei.json';
import PaterNoster from '@assets/hymns/Common-of-the-mass/pater-noster.json';
import LambOfGod from '@assets/hymns/Common-of-the-mass/lamb-of-God.json';
import NsoNsoNso from '@assets/hymns/Common-of-the-mass/nso-nso-nso.json';
import Credo from '@assets/hymns/Common-of-the-mass/credo.json';
import HolyHolyHoly from '@assets/hymns/Common-of-the-mass/holy-holy-holy.json';
import KaOchichiGiBia from '@assets/hymns/Common-of-the-mass/ka-ochichi-gi-bia-ka-eme-uche-gi-na-uwa.json';
import OtitoDiriChineke from '@assets/hymns/Common-of-the-mass/Otito-diri-chineke.json';
import AgnusDeiEfik from '@assets/hymns/Common-of-the-mass/agnus-dei(efik).json';
import DoYouBelieve from '@assets/hymns/Common-of-the-mass/Do-you-Believe.json';
import KyrieLordHaveMercy from '@assets/hymns/Common-of-the-mass/Kyrie-lord-have-mercy.json';
import MimoMimo from '@assets/hymns/Common-of-the-mass/Mimo-mimo-(sanctus-in-yoruba).json';
import NwaturuChineke from '@assets/hymns/Common-of-the-mass/Nwaturu-chineke.json';
import Gloria239 from '@assets/hymns/Common-of-the-mass/239-Gloria.json';
import Gloria238 from '@assets/hymns/Common-of-the-mass/238-Gloria.json';
import KyrieHausa from '@assets/hymns/Common-of-the-mass/kyrie(hausa).json';
import Kyrie from '@assets/hymns/Common-of-the-mass/kyrie.json';
import OnyenweanyiMeeEbere from '@assets/hymns/Common-of-the-mass/onyenweanyi-mee-ebere.json';
import OLambOfGod from '@assets/hymns/Common-of-the-mass/O-lamb-of-God.json';
import GloriaLingala from '@assets/hymns/Common-of-the-mass/Gloria(lingala).json';
import KyrieYoruba from '@assets/hymns/Common-of-the-mass/Kyrie(yoruba).json';

type HymnType = {
  id: string;
  title: string;
  content: any;
};

const commonMassHymns: HymnType[] = [
  { id: 'gloria', title: 'Gloria', content: Gloria },
  { id: 'sanctus', title: 'Sanctus', content: Sanctus },
  { id: 'agnus-dei', title: 'Agnus Dei', content: AgnusDei },
  { id: 'pater-noster', title: 'Pater Noster', content: PaterNoster },
  { id: 'lamb-of-god', title: 'Lamb of God', content: LambOfGod },
  { id: 'nso-nso-nso', title: 'Nso Nso Nso', content: NsoNsoNso },
  { id: 'credo', title: 'Credo', content: Credo },
  { id: 'holy-holy-holy', title: 'Holy Holy Holy', content: HolyHolyHoly },
  { id: 'ka-ochichi-gi-bia', title: 'Ka Ochichi Gi Bia', content: KaOchichiGiBia },
  { id: 'otito-diri-chineke', title: 'Otito Diri Chineke', content: OtitoDiriChineke },
  { id: 'agnus-dei-efik', title: 'Agnus Dei (Efik)', content: AgnusDeiEfik },
  { id: 'do-you-believe', title: 'Do You Believe', content: DoYouBelieve },
  { id: 'kyrie-lord-have-mercy', title: 'Kyrie Lord Have Mercy', content: KyrieLordHaveMercy },
  { id: 'mimo-mimo', title: 'Mimo Mimo', content: MimoMimo },
  { id: 'nwaturu-chineke', title: 'Nwaturu Chineke', content: NwaturuChineke },
  { id: 'gloria-239', title: 'Gloria 239', content: Gloria239 },
  { id: 'gloria-238', title: 'Gloria 238', content: Gloria238 },
  { id: 'kyrie-hausa', title: 'Kyrie (Hausa)', content: KyrieHausa },
  { id: 'kyrie', title: 'Kyrie', content: Kyrie },
  { id: 'onyenweanyi-mee-ebere', title: 'Onyenweanyi Mee Ebere', content: OnyenweanyiMeeEbere },
  { id: 'o-lamb-of-god', title: 'O Lamb of God', content: OLambOfGod },
  { id: 'gloria-lingala', title: 'Gloria (Lingala)', content: GloriaLingala },
  { id: 'kyrie-yoruba', title: 'Kyrie (Yoruba)', content: KyrieYoruba },
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

export default function CommonMassHymnsScreen() {
  const { hymn: paramHymn } = useLocalSearchParams();
  const { theme, getFontSize } = useTheme();
  const { language } = useLanguage();
  const styles = createHymnStyles(theme);

  const [selectedHymnId, setSelectedHymnId] = useState<string>(
    typeof paramHymn === 'string' ? paramHymn : commonMassHymns[0]?.id || ''
  );

  const selectedHymn = commonMassHymns.find(h => h.id === selectedHymnId);
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
            {commonMassHymns.map(h => (
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