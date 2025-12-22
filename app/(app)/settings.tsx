import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, FontSizeOption, fontSizeValues } from '../../context/ThemeContext';
import ThemedText from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { StatusBar } from 'expo-status-bar';

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 100,
    },
    header: {
      alignItems: 'center',
      marginBottom: 30,
    },
    headerIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.accent,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
    },
    headerTitle: {
      fontSize: getFontSize(24),
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 5,
    },
    headerSubtitle: {
      fontSize: getFontSize(14),
      color: theme.textSecondary,
    },
    section: {
      marginBottom: 25,
    },
    sectionTitle: {
      fontSize: getFontSize(18),
      fontWeight: '600',
      color: theme.text,
      marginBottom: 15,
    },
    sectionSubtitle: {
      fontSize: getFontSize(16),
      color: theme.text,
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
      backgroundColor: theme.card,
      marginBottom: 10,
    },
    aboutText: {
      textAlign: 'center',
      marginBottom: 4,
      color: theme.text,
    },
    versionText: {
      textAlign: 'center',
      color: theme.textSecondary,
    },
    anthemCard: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 20,
      marginBottom: 10,
    },
    anthemTitle: {
      fontWeight: 'bold',
      color: theme.accent,
      textAlign: 'center',
      marginBottom: 20,
      letterSpacing: 0.5,
    },
    anthemVerse: {
      flexDirection: 'row',
      marginBottom: 15,
    },
    anthemNumber: {
      fontWeight: 'bold',
      color: theme.accent,
      width: 25,
      marginRight: 10,
    },
    anthemContent: {
      flex: 1,
    },
    anthemLine: {
      color: theme.text,
      marginBottom: 4,
      lineHeight: 22,
    },
    anthemRefrain: {
      backgroundColor: theme.surface,
      borderRadius: 8,
      padding: 15,
      marginBottom: 15,
    },
    refrainLabel: {
      fontWeight: 'bold',
      color: theme.accent,
      marginBottom: 8,
      fontStyle: 'italic',
    },
  });

  return (
    <ThemedView style={styles.container}>
      <StatusBar style={theme.background === '#ffffff' ? 'dark' : 'light'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Ionicons name="settings-outline" size={40} color="#fff" />
          </View>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Customize your experience</Text>
        </View>

        {/* Appearance Settings */}
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

        {/* University Anthem */}
        <SettingSection title="University Anthem">
          <View style={styles.anthemCard}>
            <Text style={[styles.anthemTitle, { fontSize: getFontSize(18) }]}>
              GODFREY OKOYE UNIVERSITY ANTHEM
            </Text>

            <View style={styles.anthemVerse}>
              <Text style={[styles.anthemNumber, { fontSize: getFontSize(16) }]}>1.</Text>
              <View style={styles.anthemContent}>
                <Text style={[styles.anthemLine, { fontSize: getFontSize(15) }]}>
                  Here stands the ivory tower!
                </Text>
                <Text style={[styles.anthemLine, { fontSize: getFontSize(15) }]}>
                  Godfrey Okoye University
                </Text>
                <Text style={[styles.anthemLine, { fontSize: getFontSize(15) }]}>
                  Whose birth has signalled
                </Text>
                <Text style={[styles.anthemLine, { fontSize: getFontSize(15) }]}>
                  Reincarnation of intellectual vitality
                </Text>
              </View>
            </View>

            <View style={styles.anthemRefrain}>
              <Text style={[styles.refrainLabel, { fontSize: getFontSize(14) }]}>Refrain:</Text>
              <Text style={[styles.anthemLine, { fontSize: getFontSize(15) }]}>
                Hail! God's own University
              </Text>
              <Text style={[styles.anthemLine, { fontSize: getFontSize(15) }]}>
                Champion of Love and Friendship
              </Text>
              <Text style={[styles.anthemLine, { fontSize: getFontSize(15) }]}>
                Rich in intercultural thinking
              </Text>
              <Text style={[styles.anthemLine, { fontSize: getFontSize(15) }]}>
                Sound in moral, religious dialogue
              </Text>
              <Text style={[styles.anthemLine, { fontSize: getFontSize(15) }]}>
                Committed to unity of knowledge
              </Text>
              <Text style={[styles.anthemLine, { fontSize: getFontSize(15) }]}>
                Asking: Where's the evidence?
              </Text>
              <Text style={[styles.anthemLine, { fontSize: getFontSize(15), fontWeight: 'bold' }]}>
                Bravo! Bravo!!
              </Text>
            </View>

            <View style={styles.anthemVerse}>
              <Text style={[styles.anthemNumber, { fontSize: getFontSize(16) }]}>2.</Text>
              <View style={styles.anthemContent}>
                <Text style={[styles.anthemLine, { fontSize: getFontSize(15) }]}>
                  Hail! GO University
                </Text>
                <Text style={[styles.anthemLine, { fontSize: getFontSize(15) }]}>
                  Footprints of a great achiever
                </Text>
                <Text style={[styles.anthemLine, { fontSize: getFontSize(15) }]}>
                  The heart of excellence
                </Text>
                <Text style={[styles.anthemLine, { fontSize: getFontSize(15) }]}>
                  Lavishly endowed in Science and Arts
                </Text>
              </View>
            </View>
          </View>
        </SettingSection>

        {/* About Section */}
        <SettingSection title="About">
          <View style={styles.aboutSection}>
            <ThemedText style={[styles.aboutText, { fontSize: getFontSize(14) }]}>
              GoHub - Godfrey's Prayer App
            </ThemedText>
            <ThemedText style={[styles.versionText, { fontSize: getFontSize(12) }]}>
              Version 1.0.0
            </ThemedText>
          </View>
          <View style={styles.aboutSection}>
            <ThemedText style={[styles.aboutText, { fontSize: getFontSize(14) }]}>
              Temnix.com
            </ThemedText>
            <ThemedText style={[styles.versionText, { fontSize: getFontSize(12) }]}>
              2025
            </ThemedText>
          </View>
        </SettingSection>
      </ScrollView>
    </ThemedView>
  );
}
