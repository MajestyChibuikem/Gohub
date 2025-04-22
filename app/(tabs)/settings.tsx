// app/(tabs)/settings.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme, FontSizeOption, fontSizeValues } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import ThemedText from '../../components/ThemedText';
import {ThemedView} from '../../components/ThemedView';

export default function SettingsScreen() {
  const { theme, settings, updateSettings, getFontSize } = useTheme();
  
  const ThemeModeSelector = () => {
    const options: { value: 'light' | 'dark' | 'system'; label: string; icon: string }[] = [
      { value: 'light', label: 'Light', icon: 'sunny-outline' },
      { value: 'dark', label: 'Dark', icon: 'moon-outline' },
      { value: 'system', label: 'System', icon: 'sync-outline' },
    ];

    return (
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.themeOption,
              { 
                backgroundColor: settings.themeMode === option.value ? theme.accent : theme.card,
                borderColor: theme.border,
              }
            ]}
            onPress={() => updateSettings({ themeMode: option.value })}
          >
            <Ionicons 
              name={option.icon as any} 
              size={24} 
              color={settings.themeMode === option.value ? '#ffffff' : theme.text} 
            />
            <Text 
              style={[
                styles.themeOptionText, 
                { 
                  color: settings.themeMode === option.value ? '#ffffff' : theme.text,
                  fontSize: getFontSize(14),
                }
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const FontSizeSelector = () => {
    const options: { value: FontSizeOption; label: string }[] = [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
      { value: 'x-large', label: 'Extra Large' },
    ];

    return (
      <View style={styles.fontSizeContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.fontSizeOption,
              { 
                backgroundColor: settings.fontSize === option.value ? theme.accent : theme.card,
                borderColor: theme.border,
              }
            ]}
            onPress={() => updateSettings({ fontSize: option.value })}
          >
            <Text 
              style={[
                styles.fontSizeText, 
                { 
                  color: settings.fontSize === option.value ? '#ffffff' : theme.text,
                  fontSize: fontSizeValues[option.value],
                }
              ]}
            >
              Aa
            </Text>
            <Text 
              style={[
                styles.fontSizeLabel, 
                { 
                  color: settings.fontSize === option.value ? '#ffffff' : theme.text,
                  fontSize: getFontSize(12),
                }
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const SettingSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <ThemedText style={[styles.sectionTitle, { fontSize: getFontSize(18) }]}>
        {title}
      </ThemedText>
      {children}
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <StatusBar style={theme.background === '#ffffff' ? 'dark' : 'light'} />
      <ScrollView 
        style={[styles.scrollView, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <ThemedText style={[styles.title, { fontSize: getFontSize(22) }]}>
          Settings
        </ThemedText>

        <SettingSection title="Appearance">
          <ThemedText style={[styles.sectionSubtitle, { fontSize: getFontSize(16) }]}>
            Theme Mode
          </ThemedText>
          <ThemeModeSelector />
          
          <View style={styles.divider} />
          
          <ThemedText style={[styles.sectionSubtitle, { fontSize: getFontSize(16) }]}>
            Font Size
          </ThemedText>
          <FontSizeSelector />
        </SettingSection>

        <SettingSection title="About">
          <View style={[styles.aboutSection, { backgroundColor: theme.card }]}>
            <ThemedText style={[styles.aboutText, { fontSize: getFontSize(14) }]}>
              GoHub - Godfrey's Prayer App
            </ThemedText>
            <ThemedText style={[styles.versionText, { fontSize: getFontSize(12), color: theme.textSecondary }]}>
              Version 1.0.0
            </ThemedText>
          </View>
          <View style={[styles.aboutSection, { backgroundColor: theme.card }]}>
            <ThemedText style={[styles.aboutText, { fontSize: getFontSize(14) }]}>
              MAJESTY
            </ThemedText>
            <ThemedText style={[styles.versionText, { fontSize: getFontSize(12), color: theme.textSecondary }]}>
                2025
            </ThemedText>
          </View>
        </SettingSection>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionSubtitle: {
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  themeOption: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 1,
  },
  themeOptionText: {
    marginTop: 8,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  fontSizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fontSizeOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    height: 80,
  },
  fontSizeText: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  fontSizeLabel: {
    fontWeight: '500',
  },
  aboutSection: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  aboutText: {
    textAlign: 'center',
    marginBottom: 4,
  },
  versionText: {
    textAlign: 'center',
  },
});