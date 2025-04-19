// app/(tabs)/hymns.tsx

import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getHymnTitles, getHymn, HymnContent } from '../../utils/hymnIndex';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

// Define available hymn categories
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
  const theme = useTheme();
  const allHymns = getHymnTitles();
  const [selectedCategory, setSelectedCategory] = useState("All Hymns");
  const [selectedHymn, setSelectedHymn] = useState(allHymns[0]);
  const [showLyrics, setShowLyrics] = useState(true);

  // Filter hymns by selected category
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
    header: {
      marginBottom: 20,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 16,
      color: theme.textSecondary,
      marginBottom: 20,
    },
    categorySelector: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    categoryScrollView: {
      paddingBottom: 10,
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
      color: '#ffffff',
    },
    hymnsContainer: {
      marginBottom: 20,
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 15,
      shadowColor: theme.shadowColor,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    hymnListHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      marginBottom: 10,
    },
    hymnListTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
    },
    hymnCount: {
      fontSize: 14,
      color: theme.textSecondary,
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
      fontSize: 16,
      color: theme.text,
      flex: 1,
    },
    hymnCategory: {
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 4,
    },
    lyricsContainer: {
      marginTop: 20,
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 20,
      shadowColor: theme.shadowColor,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    lyricsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      paddingBottom: 15,
    },
    lyricsTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.text,
      flex: 1,
    },
    lyricsCategory: {
      fontSize: 14,
      color: theme.accent,
      fontWeight: '600',
      marginTop: 5,
    },
    verse: {
      fontSize: 16,
      lineHeight: 24,
      color: theme.text,
      marginBottom: 20,
    },
    chorus: {
      fontSize: 16,
      fontStyle: 'italic',
      color: theme.text,
      marginBottom: 20,
      paddingLeft: 15,
      borderLeftWidth: 2,
      borderLeftColor: theme.accent,
    },
    toggleButton: {
      padding: 10,
    },
    emptyState: {
      padding: 20,
      alignItems: 'center',
    },
    emptyStateText: {
      color: theme.textSecondary,
      textAlign: 'center',
      marginTop: 10,
    },
    footerText: {
      fontSize: 12,
      color: theme.textSecondary,
      textAlign: 'center',
      marginVertical: 10,
    },
  });

  // Format verse text with proper styling
  const formatVerse = (verse: string, index: number) => {
    if (verse.startsWith('Chorus:') || verse.startsWith('CHORUS:') || verse.startsWith('Refrain:')) {
      return (
        <Text key={index} style={styles.chorus}>
          {verse}
        </Text>
      );
    }
    return (
      <Text key={index} style={styles.verse}>
        {verse}
      </Text>
    );
  };

  const renderHymnItem = ({ item }: { item: { title: string; category: string } }) => (
    <Pressable 
      style={[
        styles.hymnItem, 
        selectedHymn.title === item.title ? styles.hymnItemSelected : null
      ]}
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

  // Format category name for display
  const formatCategoryName = (category: string) => {
    if (category === "All Hymns") return category;
    return category.replace(/_/g, ' ');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Hymn Book</Text>
          <Text style={styles.subtitle}>Browse and search through the collection of hymns</Text>
        </View>

        {/* Category selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollView}
        >
          {HYMN_CATEGORIES.map((category) => (
            <Pressable
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category ? styles.categoryChipSelected : null
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text 
                style={[
                  styles.categoryChipText,
                  selectedCategory === category ? styles.categoryChipTextSelected : null
                ]}
              >
                {formatCategoryName(category)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Hymn list */}
        <View style={styles.hymnsContainer}>
          <View style={styles.hymnListHeader}>
            <Text style={styles.hymnListTitle}>
              {selectedCategory === "All Hymns" ? "All Hymns" : formatCategoryName(selectedCategory)}
            </Text>
            <Text style={styles.hymnCount}>{filteredHymns.length} hymns</Text>
          </View>

          {filteredHymns.length > 0 ? (
            <FlatList
              data={filteredHymns}
              renderItem={renderHymnItem}
              keyExtractor={item => `${item.category}-${item.title}`}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="musical-note-outline" size={40} color={theme.textSecondary} />
              <Text style={styles.emptyStateText}>No hymns available in this category</Text>
            </View>
          )}
        </View>

        {/* Hymn lyrics section */}
        {hymnData && showLyrics && (
          <View style={styles.lyricsContainer}>
            <View style={styles.lyricsHeader}>
              <View>
                <Text style={styles.lyricsTitle}>
                  {hymnData.title.replace(/-/g, ' ')}
                </Text>
                <Text style={styles.lyricsCategory}>
                  {selectedHymn.category.replace(/_/g, ' ')}
                </Text>
              </View>
              <Pressable 
                style={styles.toggleButton}
                onPress={() => setShowLyrics(!showLyrics)}
              >
                <Ionicons name="chevron-up" size={24} color={theme.textSecondary} />
              </Pressable>
            </View>

            {hymnData.content?.verses?.map((verse, index) => formatVerse(verse, index))}
            
            {(!hymnData.content?.verses || hymnData.content.verses.length === 0) && (
              <Text style={styles.emptyStateText}>No lyrics available for this hymn</Text>
            )}
          </View>
          
        )}
        
      </ScrollView>
      <Text style={styles.footerText}>
          © {new Date().getFullYear()} Godfrey Okoye University - MAJESTY
        </Text>
    </View>
  );
}