import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

export const createHymnStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    padding: 20
  },
  contentContainer: {
    paddingBottom: 40
  },
  pickerContainer: {
    marginBottom: 20
  },
  pickerLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: theme.text
  },
  pickerWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: theme.card
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  picker: {
    color: theme.text,
    backgroundColor: theme.card
  },
  pickerItem: {
    fontSize: 16
  },
  hymnTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.text
  },
  hymnContent: {
    marginBottom: 30
  },
  hymnText: {
    marginVertical: 5,
    color: theme.text
  },
  hymnItem: {
    marginBottom: 15,
  },
  hymnLeader: {
    fontWeight: 'bold',
    color: theme.accent,
    marginBottom: 5,
  },
  hymnResponse: {
    fontStyle: 'italic',
    color: theme.textSecondary,
    marginTop: 5,
  },
  section: {
    marginTop: 16,
    marginBottom: 16,
    padding: 10,
    backgroundColor: theme.sectionBackground,
    borderRadius: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    color: theme.textColor,
  },
  nestedSection: {
    marginLeft: 16,
    marginBottom: 8,
  },
  verseContainer: {
    marginBottom: 20,
  },
  verseTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: theme.accent,
    marginBottom: 8,
  },
  verseText: {
    color: theme.text,
    fontSize: 16,
    lineHeight: 24,
  },
});

export default function HymnStyle() {
  return <View />;
} 