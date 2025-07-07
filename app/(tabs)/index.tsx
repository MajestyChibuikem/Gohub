// app/(tabs)/index.tsx
import { Link } from 'expo-router';
import { View, Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import { getCurrentPrayerPeriod } from '../../utils/prayerTimes';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '../../components/ThemedText';
import {ThemedView} from '../../components/ThemedView';

export default function HomeScreen() {
  const { theme, getFontSize } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    dateText: {
      textAlign: 'center',
      marginBottom: 15,
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
    <ThemedView style={{backgroundColor: theme.background}}>
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
          <ThemedText type="title" style={{ textAlign: 'center', marginBottom: 15 }}>
            A Compilation of Prayers and Songs
          </ThemedText>
          
          <ThemedText type="caption" style={{ textAlign: 'center', marginBottom: 5 }}>
            for
          </ThemedText>
          
          <ThemedText style={{
            fontSize: getFontSize(20),
            fontWeight: '600',
            textAlign: 'center',
            color: theme.accent,
            marginBottom: 25,
          }}>
            Godfrey Okoye University
          </ThemedText>

          <ThemedText type="caption" style={{ textAlign: 'center', marginBottom: 8 }}>
            Compilers/Editors:
          </ThemedText>
          
          <ThemedText style={{ 
            fontSize: getFontSize(15),
            textAlign: 'center',
            marginBottom: 3,
          }}>
            Sr. Mary Gloria Njoku DDL
          </ThemedText>
          
          <ThemedText style={{ 
            fontSize: getFontSize(15),
            textAlign: 'center',
            marginBottom: 3,
          }}>
            Rev. Fr. Prof. Christian Anieke
          </ThemedText>
        </View>

        {/* Today's Date */}
        <ThemedText type="caption" style={styles.dateText}>
          {currentDate}
        </ThemedText>

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
                <ThemedText style={{
                  fontSize: getFontSize(18),
                  fontWeight: '500',
                  flex: 1,
                }}>
                  Today's Prayer
                </ThemedText>
                
                <ThemedText type="caption" style={{ marginTop: 5 }}>
                  <ThemedText style={styles.prayerTypeHighlight}>
                    {currentDay}
                  </ThemedText> • {currentPeriod}
                </ThemedText>
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
              <ThemedText style={styles.navButtonText}>All Prayers</ThemedText>
            </Pressable>
          </Link>
          <Link href="/hymns" asChild>
            <Pressable style={styles.navButton}>
              <Ionicons name="musical-notes-outline" size={20} color={theme.text} />
              <ThemedText style={styles.navButtonText}>Hymns</ThemedText>
            </Pressable>
          </Link>
          <Link href="/settings" asChild>
            <Pressable style={styles.navButton}>
              <Ionicons name="settings-outline" size={20} color={theme.text} />
              <ThemedText style={styles.navButtonText}>Settings</ThemedText>
            </Pressable>
          </Link>
        </View>

        <ThemedText type="caption" style={{ 
          textAlign: 'center', 
          marginTop: 40, 
          marginBottom: 20,
          fontSize: getFontSize(12)
        }}>
          © {new Date().getFullYear()} Godfrey Okoye University - MAJESTY
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}