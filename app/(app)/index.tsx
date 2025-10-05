import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { getCurrentPrayerPeriod } from '../../utils/prayerTimes';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useAuth } from '../../context/AuthContext';

export default function RestrictedHomeScreen() {
  const { theme, getFontSize } = useTheme();
  const { user, isActivated } = useAuth();

  const styles = StyleSheet.create({
    scrollContent: {
      paddingHorizontal: 16,
      paddingVertical: 20,
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
    welcomeContainer: {
      marginBottom: 30,
      backgroundColor: theme.accent,
      borderRadius: 15,
      padding: 20,
      alignItems: 'center',
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
    activationNotice: {
      backgroundColor: '#fff3cd',
      borderColor: '#ffeaa7',
      borderWidth: 1,
      borderRadius: 10,
      padding: 15,
      marginBottom: 20,
      alignItems: 'center',
    },
    activationText: {
      color: '#856404',
      textAlign: 'center',
      fontSize: getFontSize(14),
      fontWeight: '500',
    },
    dateText: {
      textAlign: 'center',
      marginBottom: 15,
    },
    navButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
      marginBottom: 20,
    },
    navButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      backgroundColor: theme.card,
      shadowColor: theme.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    navButtonText: {
      marginLeft: 10,
      fontSize: getFontSize(14),
      fontWeight: '500',
      color: theme.text,
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
    <ThemedView style={{backgroundColor: theme.background}}>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
      >
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

        {/* Welcome Message */}
        <View style={styles.welcomeContainer}>
          <ThemedText style={{ 
            color: '#fff', 
            fontSize: getFontSize(18), 
            fontWeight: 'bold',
            marginBottom: 5,
          }}>
            Welcome back, {user?.name}!
          </ThemedText>
          <ThemedText style={{ 
            color: '#fff', 
            fontSize: getFontSize(14),
            opacity: 0.9,
          }}>
            Your account is {isActivated ? 'fully activated' : 'pending activation'}
          </ThemedText>
        </View>

        {/* Activation Notice */}
        {!isActivated && (
          <View style={styles.activationNotice}>
            <Ionicons name="information-circle-outline" size={24} color="#856404" />
            <ThemedText style={styles.activationText}>
              Your account is pending activation. Contact the administration to activate your account and access all features.
            </ThemedText>
          </View>
        )}

        {/* Today's Date */}
        <ThemedText type="caption" style={styles.dateText}>
          {currentDate}
        </ThemedText>

        {/* Today's Prayer Link - Only show if activated */}
        {isActivated && (
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
        )}

        {/* Navigation Shortcuts - Only show if activated */}
        {isActivated && (
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
          </View>
        )}

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