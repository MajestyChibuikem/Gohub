// app/(tabs)/home.tsx
import { Link } from 'expo-router';
import { Text, View, Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import { getCurrentPrayerPeriod } from '../../utils/prayerTimes';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const theme = useTheme();
  
  const styles = StyleSheet.create({
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
    prayerCardText: {
      fontSize: 18,
      fontWeight: '500',
      color: theme.text,
      flex: 1,
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

  const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });
  const currentPeriod = getCurrentPrayerPeriod();
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
        </View>

        {/* Preface Card */}
        <View style={styles.prefaceContainer}>
          <Text style={styles.title}>
            A Compilation of Prayers and Songs
          </Text>
          <Text style={styles.forText}>
            for
          </Text>
          <Text style={styles.universityName}>
            Godfrey Okoye University
          </Text>

          <Text style={styles.compilersHeading}>
            Compilers/Editors:
          </Text>
          <Text style={styles.compilerName}>
            Sr. Mary Gloria Njoku DDL
          </Text>
          <Text style={styles.compilerName}>
            Rev. Fr. Prof. Christian Anieke
          </Text>
        </View>

        {/* Today's Date */}
        <Text style={{ 
          textAlign: 'center', 
          color: theme.textSecondary, 
          marginBottom: 15,
          fontSize: 16 
        }}>
          {currentDate}
        </Text>

        {/* Today's Prayer Link */}
        <View style={styles.prayerCardContainer}>
          <Link
            href={{
              pathname: '/prayers/[day]',
              params: { day: currentDay, period: currentPeriod }
            }}
            asChild
          >
            <Pressable style={styles.prayerCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.prayerCardText}>
                  Today's Prayer
                </Text>
                <Text style={{ color: theme.textSecondary, marginTop: 5 }}>
                  <Text style={styles.prayerTypeHighlight}>{currentDay}</Text> • {currentPeriod}
                </Text>
              </View>
              <Ionicons name="arrow-forward-circle" size={32} color={theme.accent} />
            </Pressable>
          </Link>
        </View>

        {/* Navigation Shortcuts */}
        <View style={styles.navButtonsContainer}>
          <Link href="/prayers" asChild>
            <Pressable style={styles.navButton}>
              <Ionicons name="book-outline" size={20} color={theme.text} />
              <Text style={styles.navButtonText}>All Prayers</Text>
            </Pressable>
          </Link>
          
          <Link href="/hymns" asChild>
            <Pressable style={styles.navButton}>
              <Ionicons name="musical-notes-outline" size={20} color={theme.text} />
              <Text style={styles.navButtonText}>Hymns</Text>
            </Pressable>
          </Link>
        </View>

        {/* Additional Navigation Row */}
        <View style={[styles.navButtonsContainer, { marginTop: 10 }]}>
          <Link href="/favorites" asChild>
            <Pressable style={styles.navButton}>
              <Ionicons name="heart-outline" size={20} color={theme.text} />
              <Text style={styles.navButtonText}>Favorites</Text>
            </Pressable>
          </Link>
          
          <Link href="/settings" asChild>
            <Pressable style={styles.navButton}>
              <Ionicons name="settings-outline" size={20} color={theme.text} />
              <Text style={styles.navButtonText}>Settings</Text>
            </Pressable>
          </Link>
        </View>

        <Text style={styles.footerText}>
          © {new Date().getFullYear()} Godfrey Okoye University - MAJESTY
        </Text>
      </ScrollView>
    </View>
  );
}