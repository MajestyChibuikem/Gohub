import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Theme } from '../../context/ThemeContext';

export const createHomeStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  prefaceContainer: {
    marginBottom: 40,
    backgroundColor: theme.surface,
    borderRadius: 15,
    padding: 25,
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.text,
    marginBottom: 15,
  },
  forText: {
    fontSize: 16,
    textAlign: 'center',
    color: theme.textSecondary,
    marginBottom: 5,
  },
  universityName: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: theme.accent,
    marginBottom: 25,
  },
  compilersHeading: {
    fontSize: 14,
    textAlign: 'center',
    color: theme.textSecondary,
    marginBottom: 8,
  },
  compilerName: {
    fontSize: 15,
    textAlign: 'center',
    color: theme.text,
    marginBottom: 3,
  },
  dateText: {
    textAlign: 'center', 
    color: theme.textSecondary, 
    marginBottom: 15,
    fontSize: 16 
  },
  prayerCardContainer: {
    marginTop: 20,
  },
  prayerCard: {
    backgroundColor: theme.card,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 5,
    borderLeftColor: theme.accent,
  },
  prayerCardContent: {
    flex: 1,
  },
  prayerCardText: {
    fontSize: 18,
    fontWeight: '500',
    color: theme.text,
  },
  prayerCardSubtext: {
    color: theme.textSecondary, 
    marginTop: 5,
  },
  prayerTypeHighlight: {
    fontWeight: 'bold',
    color: theme.accent,
  },
  navButtonsContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryNavButtonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    flex: 1,
    backgroundColor: theme.subtle,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeNavButton: {
    backgroundColor: theme.highlight,
  },
  navButtonText: {
    color: theme.text,
    fontWeight: '500',
    marginLeft: 8,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    color: theme.textSecondary,
    fontSize: 12,
  }
});

export default function HomeStyle() {
  return <View />;
}