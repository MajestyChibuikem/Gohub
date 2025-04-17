// app/(tabs)/hymns.tsx

import { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getHymnTitles, getHymn, HymnContent } from '../../utils/hymnIndex';

export default function HymnsScreen() {
  const hymnList = getHymnTitles();
  const [selectedHymn, setSelectedHymn] = useState(hymnList[0]);

  const hymnData: HymnContent | undefined = getHymn(selectedHymn.category, selectedHymn.title);

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Select a Hymn
      </Text>

      <Picker
        selectedValue={selectedHymn.title}
        onValueChange={(title) => {
          const category = hymnList.find(h => h.title === title)?.category!;
          setSelectedHymn({ title, category });
        }}
      >
        {hymnList.map(({ title }) => (
          <Picker.Item key={title} label={title} value={title} />
        ))}
      </Picker>

      {hymnData && (
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>
            {hymnData.title}
          </Text>
          {hymnData.content?.verses?.map((verse, index) => (
            <Text key={index} style={{ marginBottom: 10 }}>
              {verse}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
