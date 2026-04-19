import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  Pressable, 
  Dimensions 
} from 'react-native';
import { Link } from 'expo-router';
import { getCurrentPrayerPeriod } from '../../utils/prayerTimes';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '../../components/ThemedText';

const { width } = Dimensions.get('window');

/**
 * HOME SCREEN - GOHUB SYSTEM
 * Designed for Tech Nxxt Infrastructure
 */
export default function HomeScreen() {
  const { theme, getFontSize } = useTheme();

  /**
   * FULL TACTICAL STYLESHEET
   * No shorthand - explicit property definitions for high-density UI
   */
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      paddingHorizontal: 16,
      paddingVertical: 24,
    },
    // Branding Section
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 35,
      marginTop: 10,
    },
    logo: {
      width: 125,
      height: 125,
      resizeMode: 'contain',
    },
    // Institutional Preface Card
    prefaceContainer: {
      marginBottom: 40,
      backgroundColor: theme.card,
      borderRadius: 18,
      padding: 25,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: theme.shadowColor,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 10,
      elevation: 5,
    },
    prefaceTitle: {
      textAlign: 'center',
      marginBottom: 12,
      fontWeight: '800',
    },
    prefaceDivider: {
      height: 1,
      backgroundColor: theme.border,
      width: '50%',
      alignSelf: 'center',
      marginVertical: 20,
    },
    universityName: {
      fontSize: getFontSize(22),
      fontWeight: '900',
      textAlign: 'center',
      color: theme.accent,
      letterSpacing: -0.5,
    },
    compilerLabel: {
      textAlign: 'center',
      marginBottom: 10,
      textTransform: 'uppercase',
      letterSpacing: 1,
      opacity: 0.6,
    },
    compilerName: {
      fontSize: getFontSize(16),
      textAlign: 'center',
      fontWeight: '700',
      color: theme.text,
      marginBottom: 4,
    },
    // Welcome Call-to-Action
    welcomeBanner: {
      marginBottom: 30,
      backgroundColor: theme.accent,
      borderRadius: 16,
      padding: 22,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: theme.shadowColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    welcomeIconBox: {
      width: 45,
      height: 45,
      borderRadius: 12,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    welcomeTextWrapper: {
      marginLeft: 18,
      flex: 1,
    },
    welcomeHeader: {
      color: '#FFFFFF',
      fontSize: getFontSize(19),
      fontWeight: '900',
      marginBottom: 2,
    },
    welcomeSubtext: {
      color: '#FFFFFF',
      fontSize: getFontSize(13),
      opacity: 0.85,
      fontWeight: '500',
    },
    // Daily Content Interactive Card
    dailyPrayerSection: {
      marginTop: 25,
      marginBottom: 10,
    },
    sectionLabel: {
      marginBottom: 12,
      marginLeft: 4,
      fontWeight: '800',
      color: theme.textSecondary,
    },
    dailyCard: {
      backgroundColor: theme.card,
      borderRadius: 16,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: theme.shadowColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
      overflow: 'hidden',
    },
    verticalAccent: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 6,
      backgroundColor: theme.accent,
    },
    dayHighlight: {
      fontWeight: '900',
      color: theme.accent,
      textTransform: 'uppercase',
    },
    // Navigation Action Grid
    actionGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 25,
      gap: 14,
    },
    actionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      borderRadius: 14,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: theme.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 3,
    },
    actionLabel: {
      marginLeft: 12,
      fontSize: getFontSize(15),
      fontWeight: '700',
      color: theme.text,
    },
    // Meta / Info
    dateDisplay: {
      textAlign: 'center',
      marginBottom: 20,
      fontWeight: '700',
      color: theme.textSecondary,
      letterSpacing: 0.5,
    },
    legalFooter: {
      textAlign: 'center',
      marginTop: 60,
      marginBottom: 40,
      fontSize: getFontSize(11),
      fontWeight: '600',
      opacity: 0.4,
      textTransform: 'uppercase',
      letterSpacing: 2,
    },
  });

  const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });
  const currentPeriod = getCurrentPrayerPeriod();
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      bounces={true}
    >
      {/* 1. BRANDING ASSET */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>

      {/* 2. UNIVERSITY PREFACE CARD */}
      <View style={styles.prefaceContainer}>
        <ThemedText type="label" style={{ textAlign: 'center', color: theme.accent, marginBottom: 8 }}>
          GoHub Official Portal
        </ThemedText>
        
        <ThemedText type="title" style={styles.prefaceTitle}>
          A Compilation of Prayers and Songs
        </ThemedText>
        
        <ThemedText type="caption" style={{ textAlign: 'center' }}>
          developed for the community of
        </ThemedText>
        
        <Text style={styles.universityName}>
          Godfrey Okoye University
        </Text>

        <View style={styles.prefaceDivider} />

        <View>
          <ThemedText type="caption" style={styles.compilerLabel}>
            Academic Compilers
          </ThemedText>
          <Text style={styles.compilerName}>Sr. Mary Gloria Njoku DDL</Text>
          <Text style={styles.compilerName}>Rev. Fr. Prof. Christian Anieke</Text>
        </View>
      </View>

      {/* 3. CORE INTERACTION BANNER */}
      <View style={styles.welcomeBanner}>
        <View style={styles.welcomeIconBox}>
          <Ionicons name="notifications" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.welcomeTextWrapper}>
          <Text style={styles.welcomeHeader}>Welcome to GoHub</Text>
          <Text style={styles.welcomeSubtext}>Liturgical & Prayer Companion</Text>
        </View>
      </View>

      {/* 4. CHRONOLOGY DISPLAY */}
      <Text style={[styles.dateDisplay, { color: theme.textSecondary }]}>
        {currentDate}
      </Text>

      {/* 5. DYNAMIC PRAYER ACCESS */}
      <View style={styles.dailyPrayerSection}>
        <ThemedText type="label" style={styles.sectionLabel}>
          Scheduled Session
        </ThemedText>
        
        <Link
          href={{
            pathname: '/prayers/[day]',
            params: { day: currentDay, period: currentPeriod }
          }}
          asChild
        >
          <Pressable style={styles.dailyCard}>
            <View style={styles.verticalAccent} />
            <View style={{ flex: 1, paddingLeft: 12 }}>
              <ThemedText type="subtitle" style={{ fontWeight: '900' }}>
                Today's Prayer
              </ThemedText>

              <ThemedText type="caption" style={{ marginTop: 6 }}>
                <Text style={styles.dayHighlight}>{currentDay}</Text>
                <Text> • {currentPeriod} Session</Text>
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={22} color={theme.accent} />
          </Pressable>
        </Link>
      </View>

      {/* 6. PRIMARY NAVIGATION GRID */}
      <View style={styles.actionGrid}>
        <Link href="/prayers" asChild>
          <Pressable style={styles.actionButton}>
            <Ionicons name="journal" size={20} color={theme.accent} />
            <Text style={styles.actionLabel}>Archive</Text>
          </Pressable>
        </Link>
        
        <Link href="/hymns" asChild>
          <Pressable style={styles.actionButton}>
            <Ionicons name="musical-notes" size={20} color={theme.accent} />
            <Text style={styles.actionLabel}>Hymnal</Text>
          </Pressable>
        </Link>
      </View>

      {/* 7. SYSTEM FOOTER */}
      <Text style={[styles.legalFooter, { color: theme.text }]}>
        © {new Date().getFullYear()} GOU • Tech Nxxt MAJESTY v3
      </Text>
    </ScrollView>
  );
}
