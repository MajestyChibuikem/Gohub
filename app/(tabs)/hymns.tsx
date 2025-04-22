import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { getHymnTitles, getHymn, HymnContent } from '../../utils/hymnIndex';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const HYMN_CATEGORIES = [
  "All Hymns",
  "Christmas",
  "Common_of_the_Mass",
  "Communion",
  "Dismissal",
  "Entrance",
  "Lent",
  "Marian_Hymns",
  "Offertory",
  "Other_Hymns",
  "General_Hymns",
  "Hymns_for_the_Dead"
];

export default function HymnsScreen() {
  const { theme, getFontSize } = useTheme();
  const allHymns = getHymnTitles();
  const [selectedCategory, setSelectedCategory] = useState("All Hymns");
  const [selectedHymn, setSelectedHymn] = useState(allHymns[0]);
  const [showLyrics, setShowLyrics] = useState(true);

  const filteredHymns = selectedCategory === "All Hymns" 
    ? allHymns 
    : allHymns.filter(hymn => hymn.category === selectedCategory);

  const hymnData: HymnContent | undefined = getHymn(selectedHymn.category, selectedHymn.title);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      padding: 20,
    },
    headerText: {
      fontSize: getFontSize(24),
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 5,
    },
    subtitle: {
      fontSize: getFontSize(16),
      color: theme.textSecondary,
      marginBottom: 20,
    },
    categoryChip: {
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 10,
      backgroundColor: theme.card,
    },
    categoryChipSelected: {
      backgroundColor: theme.accent,
    },
    categoryChipText: {
      color: theme.text,
      fontWeight: '500',
    },
    categoryChipTextSelected: {
      color: '#fff',
    },
    hymnItem: {
      padding: 15,
      borderRadius: 8,
      marginBottom: 8,
      backgroundColor: theme.subtle,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    hymnItemSelected: {
      backgroundColor: theme.highlight,
      borderLeftWidth: 4,
      borderLeftColor: theme.accent,
    },
    hymnTitle: {
      fontSize: getFontSize(16),
      color: theme.text,
      flex: 1,
    },
    hymnCategory: {
      fontSize: getFontSize(12),
      color: theme.textSecondary,
    },
    lyricsTitle: {
      fontSize: getFontSize(22),
      fontWeight: 'bold',
      color: theme.text,
    },
    verse: {
      fontSize: getFontSize(16),
      lineHeight: 24,
      color: theme.text,
      marginBottom: 20,
    },
    chorus: {
      fontSize: getFontSize(16),
      fontStyle: 'italic',
      color: theme.text,
      marginBottom: 20,
      paddingLeft: 15,
      borderLeftWidth: 2,
      borderLeftColor: theme.accent,
    },
    emptyStateText: {
      color: theme.textSecondary,
      textAlign: 'center',
      marginTop: 10,
    },
  });

  const formatVerse = (verse: string, index: number) => {
    if (/^(Chorus:|CHORUS:|Refrain:)/.test(verse)) {
      return <Text key={index} style={styles.chorus}>{verse}</Text>;
    }
    return <Text key={index} style={styles.verse}>{verse}</Text>;
  };

  const renderHymnItem = ({ item }: { item: { title: string; category: string } }) => (
    <Pressable 
      style={[styles.hymnItem, selectedHymn.title === item.title && styles.hymnItemSelected]}
      onPress={() => {
        setSelectedHymn(item);
        setShowLyrics(true);
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.hymnTitle}>{item.title.replace(/-/g, ' ')}</Text>
        <Text style={styles.hymnCategory}>{item.category.replace(/_/g, ' ')}</Text>
      </View>
      <Ionicons 
        name={selectedHymn.title === item.title ? "musical-notes" : "chevron-forward"} 
        size={20} 
        color={selectedHymn.title === item.title ? theme.accent : theme.textSecondary} 
      />
    </Pressable>
  );

  const formatCategoryName = (category: string) => category === "All Hymns" ? category : category.replace(/_/g, ' ');

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredHymns}
        keyExtractor={(item) => item.title}
        renderItem={renderHymnItem}
        ListHeaderComponent={
          <>
            <Text style={styles.headerText}>Hymn Book</Text>
            <Text style={styles.subtitle}>Browse and search through the collection of hymns</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {HYMN_CATEGORIES.map((category) => (
                <Pressable
                  key={category}
                  style={[styles.categoryChip, selectedCategory === category && styles.categoryChipSelected]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={[styles.categoryChipText, selectedCategory === category && styles.categoryChipTextSelected]}>
                    {formatCategoryName(category)}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
      </>
  }
  contentContainerStyle={styles.scrollContent}
/>

    </View>
  );
}
