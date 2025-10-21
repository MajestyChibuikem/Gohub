import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import { useLanguage } from '../../../context/LanguageContext';
import { useRouter } from 'expo-router';
import { allHymns, getHymnTitle, UnifiedHymn } from '../../../utils/allHymns';
import { fuzzyFilter } from '../../../utils/fuzzySearch';

export default function HymnsScreen() {
  const { theme, getFontSize } = useTheme();
  const { isAuthenticated, isActivated } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Route guard - redirect if not authenticated or not activated
  useEffect(() => {
    if (!isAuthenticated) {
      console.log('🔒 HymnsScreen: User not authenticated, redirecting to login');
      router.replace('/(auth)/login');
    } else if (!isActivated) {
      console.log('⏳ HymnsScreen: User not activated, redirecting to pending activation');
      router.replace('/pending-activation');
    }
  }, [isAuthenticated, isActivated, router]);

  // Show nothing while redirecting
  if (!isAuthenticated || !isActivated) {
    return null;
  }

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

  console.log('🎵 HymnsScreen - Component loaded');
  console.log('📱 Available hymn categories:', hymnCategories.length);
  console.log('🎯 Categories:', hymnCategories.map(c => ({ id: c.id, route: c.route })));

  // Filter hymns based on search query
  const filteredHymns = searchQuery.trim()
    ? fuzzyFilter(allHymns, searchQuery, (hymn) =>
        getHymnTitle(hymn, language)
      )
    : [];

  const handleCategoryPress = (route: string) => {
    console.log('🎯 handleCategoryPress called with route:', route);
    console.log('🚀 Attempting to navigate to:', `/(app)/hymns/${route}`);
    router.push(`/(app)/hymns/${route}` as any);
  };

  // Handle navigation from search results
  const handleSearchResultPress = (hymn: UnifiedHymn) => {
    // Clear search when navigating
    setSearchQuery('');
    // Navigate to the hymn's route - add /(app)/hymns/ prefix
    const fullRoute = `/(app)/hymns/${hymn.route}`;
    router.push(fullRoute as any);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <Text style={[styles.title, { color: theme.text, fontSize: getFontSize(24) }]}>
          Hymns
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary, fontSize: getFontSize(16) }]}>
          Sacred music and spiritual songs
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
            size={20}
            color={theme.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput, {
              color: theme.text,
              fontSize: getFontSize(16)
            }]}
            placeholder="Search all hymns..."
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

      {/* Search Results or Regular Content */}
      {searchQuery.trim() ? (
        // Show search results
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {filteredHymns.length > 0 ? (
            <>
              <Text style={[styles.searchResultsHeader, {
                color: theme.textSecondary,
                fontSize: getFontSize(14)
              }]}>
                {filteredHymns.length} {filteredHymns.length === 1 ? 'hymn' : 'hymns'} found
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
                      color: theme.textSecondary,
                      fontSize: getFontSize(12)
                    }]}>
                      {hymn.category}
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
                name="search-outline"
                size={48}
                color={theme.textSecondary}
              />
              <Text style={[styles.noResultsText, {
                color: theme.textSecondary,
                fontSize: getFontSize(16)
              }]}>
                No hymns found for "{searchQuery}"
              </Text>
              <Text style={[styles.noResultsHint, {
                color: theme.textSecondary,
                fontSize: getFontSize(14)
              }]}>
                Try a different search term
              </Text>
            </View>
          )}
        </ScrollView>
      ) : (
        // Show regular categorized view
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {hymnCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={() => handleCategoryPress(category.route)}
            >
              <View style={styles.categoryContent}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <View style={styles.categoryText}>
                  <Text style={[styles.categoryTitle, { color: theme.text, fontSize: getFontSize(18) }]}>
                    {category.title}
                  </Text>
                  <Text style={[styles.categoryDescription, { color: theme.textSecondary, fontSize: getFontSize(14) }]}>
                    {category.description}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color={theme.accent} />
              </View>
            </TouchableOpacity>
          ))}

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.textSecondary, fontSize: getFontSize(14) }]}>
              GoHub Hymns - MAJESTY
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  categoryCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  categoryText: {
    flex: 1,
  },
  categoryTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryDescription: {
    lineHeight: 20,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontWeight: '500',
  },
  // Search styles
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontStyle: 'italic',
  },
  searchResultsHeader: {
    marginTop: 8,
    marginBottom: 12,
    fontWeight: '600',
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  searchResultContent: {
    flex: 1,
  },
  searchResultTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  searchResultCategory: {
    fontWeight: '400',
    opacity: 0.7,
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  noResultsText: {
    marginTop: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  noResultsHint: {
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.7,
  },
}); 