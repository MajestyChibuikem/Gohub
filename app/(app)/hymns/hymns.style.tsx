import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

export const createHymnStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    padding: 20,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  pickerContainer: {
    marginBottom: 25, // Increased for cleaner separation
  },
  pickerLabel: {
    fontWeight: '800', // Heavier weight for a "labels" look
    fontSize: 14, // Slightly smaller for professional uppercase feel
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 8,
    color: theme.text,
    opacity: 0.9,
  },
  pickerWrapper: {
    borderRadius: 12, // More modern rounded corners
    overflow: 'hidden',
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)', // Subtle edge definition
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  picker: {
    color: theme.text,
    backgroundColor: theme.card,
    height: 55, // Explicit height for a more "tactical" button feel
  },
  pickerItem: {
    fontSize: 16,
  },
  hymnTitle: {
    fontSize: 28, // Larger and more majestic for hymn titles
    fontWeight: '800',
    textAlign: 'center', // Centered for academic/hymnal aesthetic
    marginBottom: 25,
    color: theme.text,
    letterSpacing: -0.5,
  },
  hymnContent: {
    marginBottom: 35,
    paddingHorizontal: 4,
  },
  hymnText: {
    marginVertical: 6,
    color: theme.text,
    fontSize: 17,
    lineHeight: 26, // Better readability for long texts
  },
  hymnItem: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.01)', // Very faint distinction
    borderRadius: 8,
  },
  hymnLeader: {
    fontWeight: '800',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: theme.accent,
    marginBottom: 6,
  },
  hymnResponse: {
    fontStyle: 'italic',
    color: theme.textSecondary,
    marginTop: 8,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: theme.accent, // Visual cue for congregational response
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
    padding: 18,
    backgroundColor: theme.sectionBackground || theme.surface,
    borderRadius: 15,
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 12,
    color: theme.textColor || theme.text,
    textTransform: 'capitalize',
  },
  nestedSection: {
    marginLeft: 20,
    marginBottom: 10,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(0,0,0,0.1)',
  },
  verseContainer: {
    marginBottom: 24,
  },
  verseTitle: {
    fontWeight: '800',
    fontSize: 15,
    color: theme.accent,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  verseText: {
    color: theme.text,
    fontSize: 17,
    lineHeight: 28, // Optimized for choral reading
    textAlign: 'left',
  },
});

export default function HymnStyle() {
  return <View />;
}
