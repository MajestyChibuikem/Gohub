import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { createHymnStyles } from './hymns.style';

// Import Hymns for the Dead
import OnyeKereUwaBiko from '@assets/hymns/hymns-for-the-dead/onye-kere-uwa-biko.json';
import SleepOnBeloved from '@assets/hymns/hymns-for-the-dead/Sleep-on-Beloved.json';
import YesIShallArise from '@assets/hymns/hymns-for-the-dead/Yes-i-shall-arise.json';
import NaraNaraNaraAja from '@assets/hymns/hymns-for-the-dead/nara-nara-nara-aja.json';
import PeacePerfectPeace from '@assets/hymns/hymns-for-the-dead/Peace-pefect-peace.json';
import Requiem from '@assets/hymns/hymns-for-the-dead/Requiem.json';
import OParadiseOParadise from '@assets/hymns/hymns-for-the-dead/O-paradise-O-Paradise.json';
import OnwuEmegoIkeYa from '@assets/hymns/hymns-for-the-dead/Onwu-emego-ike-ya.json';
import ItIsWellWithMySoul from '@assets/hymns/hymns-for-the-dead/It-is-well-with-my-soul.json';
import JerusalemMyHappyHome from '@assets/hymns/hymns-for-the-dead/Jerusalem-my-happy-home.json';
import MmaduNtuKibu from '@assets/hymns/hymns-for-the-dead/Mmadu-ntu-kibu.json';
import HelpLordTheSouls from '@assets/hymns/hymns-for-the-dead/Help-Lord-The-souls.json';
import IAmTheBreadOfLife from '@assets/hymns/hymns-for-the-dead/I-am-the-Bread-of-life.json';
import IkpeNkeChukwu from '@assets/hymns/hymns-for-the-dead/Ikpe-Nke-chukwu.json';
import EnigweObodoAnyi from '@assets/hymns/hymns-for-the-dead/Enigwe-Obodo-anyi.json';
import FadeFadeEachEarthlyJoy from '@assets/hymns/hymns-for-the-dead/Fade-fade-Each-Earthly-Joy.json';
import GodBeWithYou from '@assets/hymns/hymns-for-the-dead/God-be-with-you.json';
import ChetanuMbosiOnwu from '@assets/hymns/hymns-for-the-dead/Chetanu-Mbosi-Onwu.json';
import EnigweGabuUgwo from '@assets/hymns/hymns-for-the-dead/Enigwe-Gabu-Ugwo.json';
import AsleepInJesusBlessedSleep from '@assets/hymns/hymns-for-the-dead/Asleep-in-jesus-Blessed-Sleep.json';
import ChetaMOnyenweM from '@assets/hymns/hymns-for-the-dead/Cheta-M-Onyenwe-M.json';

type HymnType = {
  id: string;
  title: string;
  content: any;
};

const hymnsForTheDead: HymnType[] = [
  { id: 'onye-kere-uwa-biko', title: 'Onye Kere Uwa Biko', content: OnyeKereUwaBiko },
  { id: 'sleep-on-beloved', title: 'Sleep on Beloved', content: SleepOnBeloved },
  { id: 'yes-i-shall-arise', title: 'Yes I Shall Arise', content: YesIShallArise },
  { id: 'nara-nara-nara-aja', title: 'Nara Nara Nara Aja', content: NaraNaraNaraAja },
  { id: 'peace-perfect-peace', title: 'Peace Perfect Peace', content: PeacePerfectPeace },
  { id: 'requiem', title: 'Requiem', content: Requiem },
  { id: 'o-paradise-o-paradise', title: 'O Paradise O Paradise', content: OParadiseOParadise },
  { id: 'onwu-emego-ike-ya', title: 'Onwu Emego Ike Ya', content: OnwuEmegoIkeYa },
  { id: 'it-is-well-with-my-soul', title: 'It Is Well with My Soul', content: ItIsWellWithMySoul },
  { id: 'jerusalem-my-happy-home', title: 'Jerusalem My Happy Home', content: JerusalemMyHappyHome },
  { id: 'mmadu-ntu-kibu', title: 'Mmadu Ntu Kibu', content: MmaduNtuKibu },
  { id: 'help-lord-the-souls', title: 'Help Lord The Souls', content: HelpLordTheSouls },
  { id: 'i-am-the-bread-of-life', title: 'I Am the Bread of Life', content: IAmTheBreadOfLife },
  { id: 'ikpe-nke-chukwu', title: 'Ikpe Nke Chukwu', content: IkpeNkeChukwu },
  { id: 'enigwe-obodo-anyi', title: 'Enigwe Obodo Anyi', content: EnigweObodoAnyi },
  { id: 'fade-fade-each-earthly-joy', title: 'Fade Fade Each Earthly Joy', content: FadeFadeEachEarthlyJoy },
  { id: 'god-be-with-you', title: 'God Be with You', content: GodBeWithYou },
  { id: 'chetanu-mbosi-onwu', title: 'Chetanu Mbosi Onwu', content: ChetanuMbosiOnwu },
  { id: 'enigwe-gabu-ugwo', title: 'Enigwe Gabu Ugwo', content: EnigweGabuUgwo },
  { id: 'asleep-in-jesus-blessed-sleep', title: 'Asleep in Jesus Blessed Sleep', content: AsleepInJesusBlessedSleep },
  { id: 'cheta-m-onyenwe-m', title: 'Cheta M Onyenwe M', content: ChetaMOnyenweM },
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

export default function HymnsForTheDeadScreen() {
  const { hymn: paramHymn } = useLocalSearchParams();
  const { theme, getFontSize } = useTheme();
  const { language } = useLanguage();
  const styles = createHymnStyles(theme);

  const [selectedHymnId, setSelectedHymnId] = useState<string>(
    typeof paramHymn === 'string' ? paramHymn : hymnsForTheDead[0]?.id || ''
  );

  const selectedHymn = hymnsForTheDead.find(h => h.id === selectedHymnId);
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
            {hymnsForTheDead.map(h => (
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