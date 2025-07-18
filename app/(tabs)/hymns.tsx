import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, ScrollView } from 'react-native';
import { getHymnTitles, getHymn, HymnContent } from '../../utils/hymnIndex';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const HYMN_CATEGORIES = [
  "All Hymns",
  "Christmas",
  "Marian Hymns",
  "Common of the Mass",
  "Communion",
  "Dismissal",
  "Entrance Hymns",
  "Lent",
  "Offertory",
  "Other Hymns"
];

export default function HymnsScreen() {
  const { theme, getFontSize } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All Hymns');
  const [showLyrics, setShowLyrics] = useState(false);
  const [selectedHymn, setSelectedHymn] = useState<{ title: string; category: string } | null>(null);

  const allHymns = getHymnTitles();
  const filteredHymns = selectedCategory === "All Hymns" 
    ? allHymns 
    : allHymns.filter(hymn => hymn.category === selectedCategory);

  const renderHymnItem = ({ item }: { item: { title: string; category: string } }) => {
    const isSelected = selectedHymn?.title === item.title;
    return (
      <Pressable
        style={[styles.hymnItem, isSelected && styles.hymnItemSelected]}
        onPress={() => {
          setSelectedHymn(item);
          setShowLyrics(true);
        }}
      >
        <Text style={[styles.hymnTitle, { color: theme.text }]}>{item.title}</Text>
        <Text style={[styles.hymnCategory, { color: theme.textSecondary }]}>{item.category}</Text>
      </Pressable>
    );
  };

  const renderLyrics = () => {
    if (!selectedHymn) return null;
    const hymnData = getHymn(selectedHymn.category, selectedHymn.title);
    if (!hymnData) return null;

    return (
      <View style={[styles.lyricsContainer, { backgroundColor: theme.background }]}>
        <View style={[styles.header, { backgroundColor: theme.background, borderBottomColor: theme.border }]}>
          <Pressable style={styles.backButton} onPress={() => setShowLyrics(false)}>
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </Pressable>
          <Text style={[styles.lyricsTitle, { color: theme.text }]}>
            {typeof hymnData.title === 'string' ? hymnData.title : hymnData.title.en}
          </Text>
        </View>
        <ScrollView style={styles.lyricsScrollView} contentContainerStyle={styles.lyricsContent}>
          {hymnData.sections?.map((section, index) => (
            <View key={index}>
              {section.title && (
                <Text style={[styles.sectionTitle, { color: theme.accent }]}>
                  {typeof section.title === 'string' ? section.title : section.title.en}
                </Text>
              )}
              {Array.isArray(section.content) ? (
                section.content.map((line, lineIndex) => (
                  <Text 
                    key={lineIndex} 
                    style={[
                      section.type === 'chorus' ? styles.chorus : styles.verse,
                      { color: theme.text }
                    ]}
                  >
                    {line}
                  </Text>
                ))
              ) : (
                Object.entries(section.content).map(([lang, lines]) => (
                  <View key={lang}>
                    {lines.map((line, lineIndex) => (
                      <Text 
                        key={lineIndex} 
                        style={[
                          section.type === 'chorus' ? styles.chorus : styles.verse,
                          { color: theme.text }
                        ]}
                      >
                        {line}
                      </Text>
                    ))}
                  </View>
                ))
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      padding: 20,
    },
    headerContainer: {
      marginBottom: 20,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 20,
    },
    categoryScrollView: {
      marginTop: 15,
    },
    categoryScrollContent: {
      paddingBottom: 15,
    },
    categoryChip: {
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 10,
    },
    categoryChipText: {
      fontWeight: '500',
    },
    hymnItem: {
      padding: 15,
      borderRadius: 8,
      marginBottom: 8,
      backgroundColor: 'rgba(0,0,0,0.05)',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    hymnItemSelected: {
      backgroundColor: 'rgba(0,0,0,0.1)',
      borderLeftWidth: 4,
      borderLeftColor: '#007AFF',
    },
    hymnTitle: {
      fontSize: 16,
      flex: 1,
    },
    hymnCategory: {
      fontSize: 12,
    },
    lyricsContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
    },
    backButton: {
      padding: 8,
      marginRight: 8,
    },
    lyricsTitle: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    lyricsScrollView: {
      flex: 1,
    },
    lyricsContent: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 20,
    },
    verse: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 10,
    },
    chorus: {
      fontSize: 16,
      fontStyle: 'italic',
      marginBottom: 20,
      paddingLeft: 15,
      borderLeftWidth: 2,
      borderLeftColor: '#007AFF',
    },
    emptyStateText: {
      textAlign: 'center',
      marginTop: 10,
    },
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={theme.background === '#ffffff' ? 'dark' : 'light'} />
      <FlatList
        data={filteredHymns}
        keyExtractor={(item) => item.title}
        renderItem={renderHymnItem}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={[styles.headerText, { color: theme.text }]}>Hymn Book</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Browse and search through the collection of hymns</Text>

            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.categoryScrollView}
              contentContainerStyle={styles.categoryScrollContent}
            >
              {HYMN_CATEGORIES.map((category) => (
                <Pressable
                  key={category}
                  style={[
                    styles.categoryChip,
                    { backgroundColor: theme.card },
                    selectedCategory === category && { backgroundColor: theme.accent }
                  ]}
                  onPress={() => {
                    setSelectedCategory(category);
                    setSelectedHymn(null);
                    setShowLyrics(false);
                  }}
                >
                  <Text style={[
                    styles.categoryChipText,
                    { color: theme.text },
                    selectedCategory === category && { color: '#fff' }
                  ]}>
                    {category}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        }
        ListEmptyComponent={
          <Text style={[styles.emptyStateText, { color: theme.textSecondary }]}>
            No hymns found in this category
          </Text>
        }
        contentContainerStyle={styles.scrollContent}
      />
      {showLyrics && renderLyrics()}
    </View>
  );
}
