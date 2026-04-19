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
    padding: 24, // Increased from 20 for better breathing room
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 35, // Increased for better separation
  },
  logo: {
    width: 130, // Slightly larger for better branding visibility
    height: 130,
    resizeMode: 'contain',
  },
  prefaceContainer: {
    marginBottom: 40,
    backgroundColor: theme.surface,
    borderRadius: 20, // Softer corners for a modern feel
    padding: 28, // More internal space
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 10 }, // Deeper shadow for premium look
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)', // Subtle border to define the card
  },
  title: {
    fontSize: 26, // Larger and bolder for clear hierarchy
    fontWeight: '800', 
    textAlign: 'center',
    color: theme.text,
    marginBottom: 15,
    letterSpacing: -0.5,
  },
  forText: {
    fontSize: 14, // Slightly smaller but uppercase for professional labeling
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textAlign: 'center',
    color: theme.textSecondary,
    marginBottom: 5,
    fontWeight: '600',
  },
  universityName: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: theme.accent,
    marginBottom: 30, // More space before the compilers section
  },
  compilersHeading: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
    color: theme.textSecondary,
    marginBottom: 10,
    opacity: 0.8,
  },
  compilerName: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: theme.text,
    marginBottom: 4,
  },
  dateText: {
    textAlign: 'center', 
    color: theme.textSecondary, 
    marginBottom: 20,
    fontSize: 15,
    fontStyle: 'italic',
    opacity: 0.7,
  },
  prayerCardContainer: {
    marginTop: 25,
  },
  prayerCard: {
    backgroundColor: theme.card,
    borderRadius: 18,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    borderLeftWidth: 6, // Thicker accent bar
    borderLeftColor: theme.accent,
  },
  prayerCardContent: {
    flex: 1,
  },
  prayerCardText: {
    fontSize: 20, // Larger for better readability
    fontWeight: '700',
    color: theme.text,
  },
  prayerCardSubtext: {
    fontSize: 14,
    color: theme.textSecondary, 
    marginTop: 8,
    lineHeight: 20,
  },
  prayerTypeHighlight: {
    fontWeight: '800',
    color: theme.accent,
  },
  navButtonsContainer: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryNavButtonsContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    flex: 1,
    backgroundColor: theme.subtle,
    paddingVertical: 18, // Taller buttons for a more premium mobile feel
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  activeNavButton: {
    backgroundColor: theme.highlight,
    borderColor: theme.accent,
    borderWidth: 1.5,
  },
  navButtonText: {
    color: theme.text,
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 10,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 30,
    color: theme.textSecondary,
    fontSize: 13,
    letterSpacing: 0.5,
    opacity: 0.6,
  }
});

export default function HomeStyle() {
  return <View />;
}
