import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'expo-router';

export default function HymnsScreen() {
  const { theme, getFontSize } = useTheme();
  const { isAuthenticated, isActivated } = useAuth();
  const router = useRouter();

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

  const handleCategoryPress = (route: string) => {
    console.log('🎯 handleCategoryPress called with route:', route);
    console.log('🚀 Attempting to navigate to:', `/(app)/hymns/${route}`);
    router.push(`/(app)/hymns/${route}` as any);
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
}); 