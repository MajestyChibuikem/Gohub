import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { useRouter } from 'expo-router';
import { allHymns, getHymnTitle, UnifiedHymn } from '../../../utils/allHymns';
import { fuzzyFilter } from '../../../utils/fuzzySearch';

export default function HymnsScreen() {
  const { theme, getFontSize } = useTheme();
  const { language } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const hymnCategories = [
    {
      id: 'christmas',
      title: 'Christmas Hymns',
      icon: '🎄',
      description: 'Hymns for the Christmas season',
      route: 'christmas-hymns'
    },
    {
      id: 'marian-hymns',
      title: 'Marian Hymns',
      icon: '👼',
      description: 'Hymns dedicated to the Blessed Virgin Mary',
      route: 'marian-hymns'
    },
    {
      id: 'common-of-the-mass',
      title: 'Common of the Mass',
      icon: '✝️',
      description: 'Hymns for different parts of the Mass',
      route: 'common-of-the-mass-hymns'
    },
    {
      id: 'communion',
      title: 'Communion Hymns',
      icon: '🍞',
      description: 'Hymns for Holy Communion',
      route: 'communion-hymns'
    },
    {
      id: 'dismissal',
      title: 'Dismissal Hymns',
      icon: '👋',
      description: 'Hymns for the end of Mass',
      route: 'dismissal-hymns'
    },
    {
      id: 'entrance-hymns',
      title: 'Entrance Hymns',
      icon: '🚪',
      description: 'Hymns for the beginning of Mass',
      route: 'entrance-hymns'
    },
    {
      id: 'lent',
      title: 'Lent Hymns',
      icon: '🕊️',
      description: 'Hymns for the Lenten season',
      route: 'lent-hymns'
    },
    {
      id: 'offertory',
      title: 'Offertory Hymns',
      icon: '🎁',
      description: 'Hymns for the offertory',
      route: 'offertory-hymns'
    },
    {
      id: 'other-hymns',
      title: 'Other Hymns',
      icon: '🎵',
      description: 'Miscellaneous hymns and devotions',
      route: 'other-hymns'
    },
    {
      id: 'general-hymns',
      title: 'General Hymns',
      icon: '🎼',
      description: 'General hymns and spiritual songs',
      route: 'general-hymns'
    },
    {
      id: 'general',
      title: 'General',
      icon: '🎶',
      description: 'General category hymns',
      route: 'general-hymns'
    },
    {
      id: 'hymns-for-the-dead',
      title: 'Hymns for the Dead',
      icon: '🕯️',
      description: 'Funeral and memorial hymns',
      route: 'hymns-for-the-dead'
    }
  ];

  // Filter hymns based on search query
  const filteredHymns = searchQuery.trim()
    ? fuzzyFilter(allHymns, searchQuery, (hymn) =>
        getHymnTitle(hymn, language)
      )
    : [];

  const handleCategoryPress = (route: string) => {
    router.push(`/(app)/hymns/${route}` as any);
  };

  const handleSearchResultPress = (hymn: UnifiedHymn) => {
    setSearchQuery('');
    const fullRoute = `/(app)/hymns/${hymn.route}`;
    router.push(fullRoute as any);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
        <Text style={[styles.title, { color: theme.text, fontSize: getFontSize(26) }]}>
          Hymnary
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary, fontSize: getFontSize(15) }]}>
          Sacred music for liturgy and devotion
        </Text>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, {
        backgroundColor: theme.surface,
        borderBottomColor: theme.border
      }]}>
        <View style={[styles.searchInputWrapper, {
          backgroundColor: theme.card,
          borderColor: theme.border
        }]}>
          <Ionicons
            name="search"
            size={18}
            color={theme.accent}
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput, {
              color: theme.text,
              fontSize: getFontSize(16)
            }]}
            placeholder="Find a hymn by title or number..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons
                name="close-circle"
                size={20}
                color={theme.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {searchQuery.trim() ? (
          // Search Results
          <>
            {filteredHymns.length > 0 ? (
              <>
                <Text style={[styles.searchResultsHeader, {
                  color: theme.textSecondary,
                  fontSize: getFontSize(13)
                }]}>
                  {filteredHymns.length} RESULTS FOUND
                </Text>
                {filteredHymns.map((hymn) => (
                  <TouchableOpacity
                    key={hymn.id}
                    style={[styles.searchResultItem, {
                      backgroundColor: theme.card,
                      borderColor: theme.border
                    }]}
                    onPress={() => handleSearchResultPress(hymn)}
                  >
                    <View style={styles.searchResultContent}>
                      <Text style={[styles.searchResultTitle, {
                        color: theme.text,
                        fontSize: getFontSize(16)
                      }]}>
                        {getHymnTitle(hymn, language)}
                      </Text>
                      <Text style={[styles.searchResultCategory, {
                        color: theme.accent,
                        fontSize: getFontSize(12)
                      }]}>
                        {hymn.category.toUpperCase()}
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={theme.textSecondary}
                    />
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <View style={styles.noResultsContainer}>
                <Ionicons
                  name="musical-notes-outline"
                  size={64}
                  color={theme.border}
                />
                <Text style={[styles.noResultsText, {
                  color: theme.text,
                  fontSize: getFontSize(18)
                }]}>
                  Hymn Not Found
                </Text>
                <Text style={[styles.noResultsHint, {
                  color: theme.textSecondary,
                  fontSize: getFontSize(14)
                }]}>
                  Try searching by the opening line or title.
                </Text>
              </View>
            )}
          </>
        ) : (
          // Regular Category Grid
          <>
            {hymnCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, { 
                    backgroundColor: theme.card, 
                    borderColor: theme.border,
                    shadowColor: theme.shadowColor 
                }]}
                onPress={() => handleCategoryPress(category.route)}
              >
                <View style={styles.categoryContent}>
                  <View style={[styles.iconContainer, { backgroundColor: theme.background }]}>
                    <Text style={styles.categoryIcon}>{category.icon}</Text>
                  </View>
                  <View style={styles.categoryText}>
                    <Text style={[styles.categoryTitle, { color: theme.text, fontSize: getFontSize(18) }]}>
                      {category.title}
                    </Text>
                    <Text numberOfLines={2} style={[styles.categoryDescription, { color: theme.textSecondary, fontSize: getFontSize(13) }]}>
                      {category.description}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward-circle" size={24} color={theme.accent} />
                </View>
              </TouchableOpacity>
            ))}

            <View style={styles.footer}>
              <View style={[styles.footerDivider, { backgroundColor: theme.border }]} />
              <Text style={[styles.footerText, { color: theme.textSecondary, fontSize: getFontSize(12) }]}>
                GOHUB HYMNS • MAJESTY DIGITAL
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  title: {
    fontWeight: '800',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 60,
  },
  categoryCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  categoryIcon: {
    fontSize: 28,
  },
  categoryText: {
    flex: 1,
  },
  categoryTitle: {
    fontWeight: '700',
    marginBottom: 4,
  },
  categoryDescription: {
    lineHeight: 18,
    opacity: 0.7,
  },
  searchResultsHeader: {
    marginTop: 5,
    marginBottom: 15,
    fontWeight: '800',
    letterSpacing: 1,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    marginBottom: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  searchResultContent: {
    flex: 1,
  },
  searchResultTitle: {
    fontWeight: '700',
    marginBottom: 4,
  },
  searchResultCategory: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  noResultsText: {
    marginTop: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  noResultsHint: {
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerDivider: {
    width: 40,
    height: 2,
    marginBottom: 15,
    borderRadius: 1,
    opacity: 0.3,
  },
  footerText: {
    fontWeight: '700',
    letterSpacing: 1.5,
  },
});
