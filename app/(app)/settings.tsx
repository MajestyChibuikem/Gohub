import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  Platform,
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, FontSizeOption, fontSizeValues } from '../../context/ThemeContext';
import ThemedText from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

/**
 * SETTINGS CONTROL INTERFACE - TECH NXXT INFRASTRUCTURE
 * OFFICIAL BUILD: MAJESTY V3 [2026]
 * TOTAL LINE EXPANSION FOR ARCHITECTURAL CLARITY
 */
export default function SettingsScreen() {
  const { theme, settings, updateSettings, getFontSize } = useTheme();

  // Explicit Update Handlers
  const handleThemeChange = (mode: 'light' | 'dark' | 'system') => {
    updateSettings({ themeMode: mode });
  };

  const handleFontSizeChange = (size: FontSizeOption) => {
    updateSettings({ fontSize: size });
  };

  return (
    <ThemedView style={styles.mainContainer}>
      <StatusBar style={theme.background === '#ffffff' ? 'dark' : 'light'} />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          
          {/* HEADER BRANDING UNIT */}
          <View style={styles.headerBrandingUnit}>
            <View style={styles.industrialIconFrame}>
              <View style={styles.iconBackdrop}>
                <Ionicons name="construct" size={34} color="#FFFFFF" />
              </View>
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={[styles.headerMainTitle, { color: theme.text }]}>
                CONTROL CENTER
              </Text>
              <Text style={styles.headerTechnicalSubtitle}>
                SYSTEM CONFIGURATION v3.0
              </Text>
            </View>
          </View>

          {/* SECTION: VISUAL ARCHITECTURE */}
          <View style={styles.configurationSection}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="color-palette-sharp" size={18} color={theme.accent} />
              <Text style={[styles.sectionTitleLabel, { color: theme.accent }]}>
                VISUAL INTERFACE MODE
              </Text>
            </View>

            <View style={styles.themeSelectorGrid}>
              {/* LIGHT MODE OPTION */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleThemeChange('light')}
                style={[
                  styles.interactiveCard,
                  {
                    backgroundColor: settings.themeMode === 'light' ? theme.accent : theme.surface,
                    borderColor: settings.themeMode === 'light' ? theme.accent : theme.border,
                  }
                ]}
              >
                <Ionicons 
                  name="sunny" 
                  size={22} 
                  color={settings.themeMode === 'light' ? '#FFFFFF' : theme.text} 
                />
                <Text style={[
                  styles.cardActionLabel,
                  { color: settings.themeMode === 'light' ? '#FFFFFF' : theme.text }
                ]}>LIGHT</Text>
              </TouchableOpacity>

              {/* DARK MODE OPTION */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleThemeChange('dark')}
                style={[
                  styles.interactiveCard,
                  {
                    backgroundColor: settings.themeMode === 'dark' ? theme.accent : theme.surface,
                    borderColor: settings.themeMode === 'dark' ? theme.accent : theme.border,
                  }
                ]}
              >
                <Ionicons 
                  name="moon" 
                  size={22} 
                  color={settings.themeMode === 'dark' ? '#FFFFFF' : theme.text} 
                />
                <Text style={[
                  styles.cardActionLabel,
                  { color: settings.themeMode === 'dark' ? '#FFFFFF' : theme.text }
                ]}>DARK</Text>
              </TouchableOpacity>

              {/* SYSTEM MODE OPTION */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleThemeChange('system')}
                style={[
                  styles.interactiveCard,
                  {
                    backgroundColor: settings.themeMode === 'system' ? theme.accent : theme.surface,
                    borderColor: settings.themeMode === 'system' ? theme.accent : theme.border,
                  }
                ]}
              >
                <Ionicons 
                  name="settings" 
                  size={22} 
                  color={settings.themeMode === 'system' ? '#FFFFFF' : theme.text} 
                />
                <Text style={[
                  styles.cardActionLabel,
                  { color: settings.themeMode === 'system' ? '#FFFFFF' : theme.text }
                ]}>SYSTEM</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* SECTION: TYPOGRAPHY ENGINE */}
          <View style={styles.configurationSection}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="text-sharp" size={18} color={theme.accent} />
              <Text style={[styles.sectionTitleLabel, { color: theme.accent }]}>
                TYPOGRAPHY SCALE
              </Text>
            </View>

            <View style={styles.fontSizeGrid}>
              {['small', 'medium', 'large', 'x-large'].map((size) => (
                <TouchableOpacity
                  key={size}
                  activeOpacity={0.8}
                  onPress={() => handleFontSizeChange(size as FontSizeOption)}
                  style={[
                    styles.sizeCard,
                    {
                      backgroundColor: settings.fontSize === size ? theme.accent : theme.surface,
                      borderColor: settings.fontSize === size ? theme.accent : theme.border,
                    }
                  ]}
                >
                  <Text style={[
                    styles.sizePreviewText,
                    { 
                      fontSize: fontSizeValues[size as FontSizeOption] * 0.7,
                      color: settings.fontSize === size ? '#FFFFFF' : theme.text 
                    }
                  ]}>Aa</Text>
                  <Text style={[
                    styles.sizeLabel,
                    { color: settings.fontSize === size ? '#FFFFFF' : theme.text }
                  ]}>
                    {size.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* SECTION: INSTITUTIONAL ANTHEM */}
          <View style={styles.configurationSection}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="school" size={18} color={theme.accent} />
              <Text style={[styles.sectionTitleLabel, { color: theme.accent }]}>
                UNIVERSITY ANTHEM
              </Text>
            </View>

            <View style={[styles.anthemContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Text style={[styles.anthemMainHeader, { color: theme.text }]}>
                GODFREY OKOYE UNIVERSITY
              </Text>

              <View style={styles.verseBlock}>
                <Text style={styles.verseIndex}>[VERSE 01]</Text>
                <Text style={[styles.verseContent, { color: theme.text, fontSize: getFontSize(14) }]}>
                  Here stands the ivory tower!{"\n"}
                  Godfrey Okoye University{"\n"}
                  Whose birth has signalled{"\n"}
                  Reincarnation of intellectual vitality
                </Text>
              </View>

              <View style={[styles.refrainBlock, { backgroundColor: theme.surface, borderLeftColor: theme.accent }]}>
                <Text style={[styles.refrainLabel, { color: theme.accent }]}>CHORUS</Text>
                <Text style={[styles.verseContent, { color: theme.text, fontSize: getFontSize(14), fontStyle: 'italic' }]}>
                  Hail! God's own University{"\n"}
                  Champion of Love and Friendship{"\n"}
                  Rich in intercultural thinking{"\n"}
                  Sound in moral, religious dialogue
                </Text>
              </View>
            </View>
          </View>

          {/* SECTION: SYSTEM METRICS */}
          <View style={styles.configurationSection}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="analytics" size={18} color={theme.accent} />
              <Text style={[styles.sectionTitleLabel, { color: theme.accent }]}>
                SYSTEM METRICS
              </Text>
            </View>

            <View style={styles.metricsWrapper}>
              <View style={[styles.metricRow, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <Text style={[styles.metricKey, { color: theme.textSecondary }]}>INFRASTRUCTURE</Text>
                <Text style={[styles.metricValue, { color: theme.accent }]}>TEMNIX.COM</Text>
              </View>

              <View style={[styles.metricRow, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <Text style={[styles.metricKey, { color: theme.textSecondary }]}>SOFTWARE VERSION</Text>
                <Text style={[styles.metricValue, { color: theme.text }]}>GOHUB 1.0.4 [STABLE]</Text>
              </View>

              <View style={[styles.metricRow, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <Text style={[styles.metricKey, { color: theme.textSecondary }]}>UI ENGINE</Text>
                <Text style={[styles.metricValue, { color: theme.text }]}>Tech Nxxt v3</Text>
              </View>
            </View>
          </View>

          {/* FINAL FOOTER SIGNATURE */}
          <View style={styles.footerBranding}>
            <Text style={[styles.copyrightText, { color: theme.text }]}>
              © 2026 GOU • TECH NXXT
            </Text>
            <Text style={[styles.majestyCredit, { color: theme.accent }]}>
              CREDIT: MAJESTY V3
            </Text>
          </View>

        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 30,
    paddingBottom: 80,
  },
  // Branding Unit
  headerBrandingUnit: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 45,
    paddingHorizontal: 4,
  },
  industrialIconFrame: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    padding: 2,
  },
  iconBackdrop: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: '#0055FF', // Tech Nxxt Signature Blue
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0055FF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  headerTextContainer: {
    marginLeft: 20,
    flex: 1,
  },
  headerMainTitle: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -1.5,
  },
  headerTechnicalSubtitle: {
    fontSize: 11,
    color: '#888',
    fontWeight: '700',
    marginTop: 2,
    letterSpacing: 1.5,
  },
  // Sections
  configurationSection: {
    marginBottom: 35,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.1)',
    paddingBottom: 8,
  },
  sectionTitleLabel: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  // Grids
  themeSelectorGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  interactiveCard: {
    flex: 1,
    height: 95,
    borderRadius: 15,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardActionLabel: {
    marginTop: 10,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  fontSizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  sizeCard: {
    width: (width - 64) / 2,
    height: 80,
    borderRadius: 15,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizePreviewText: {
    fontWeight: '900',
  },
  sizeLabel: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: '700',
  },
  // Anthem Styles
  anthemContainer: {
    borderRadius: 22,
    padding: 24,
    borderWidth: 1,
  },
  anthemMainHeader: {
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 25,
    letterSpacing: 0.5,
  },
  verseBlock: {
    marginBottom: 20,
  },
  verseIndex: {
    color: '#0055FF',
    fontSize: 10,
    fontWeight: '900',
    marginBottom: 6,
    letterSpacing: 1,
  },
  verseContent: {
    lineHeight: 24,
    fontWeight: '500',
  },
  refrainBlock: {
    padding: 18,
    borderRadius: 15,
    borderLeftWidth: 5,
  },
  refrainLabel: {
    fontSize: 11,
    fontWeight: '900',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  // Metrics
  metricsWrapper: {
    gap: 10,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
  },
  metricKey: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  metricValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  // Footer
  footerBranding: {
    marginTop: 40,
    alignItems: 'center',
    gap: 5,
  },
  copyrightText: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },
  majestyCredit: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
