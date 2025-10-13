import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

export default function PendingActivationScreen() {
  const { theme, getFontSize } = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 20,
    },
    header: {
      alignItems: 'center',
      marginBottom: 40,
    },
    icon: {
      width: 120,
      height: 120,
      marginBottom: 20,
      resizeMode: 'contain',
    },
    title: {
      fontSize: getFontSize(28),
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 10,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: getFontSize(16),
      color: theme.textSecondary,
      textAlign: 'center',
      marginBottom: 30,
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: 15,
      padding: 25,
      marginBottom: 30,
      shadowColor: theme.shadowColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    cardTitle: {
      fontSize: getFontSize(18),
      fontWeight: '600',
      color: theme.text,
      marginBottom: 15,
    },
    cardText: {
      fontSize: getFontSize(14),
      color: theme.textSecondary,
      lineHeight: 22,
      marginBottom: 10,
    },
    userInfo: {
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 20,
      marginBottom: 30,
      borderLeftWidth: 4,
      borderLeftColor: theme.accent,
    },
    userInfoText: {
      fontSize: getFontSize(16),
      color: theme.text,
      marginBottom: 5,
    },
    userInfoLabel: {
      fontSize: getFontSize(14),
      color: theme.textSecondary,
      fontWeight: '500',
    },
    logoutButton: {
      backgroundColor: theme.accent,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginTop: 20,
    },
    logoutButtonText: {
      color: '#fff',
      fontSize: getFontSize(16),
      fontWeight: '600',
    },
    testInfo: {
      backgroundColor: '#fff3cd',
      borderColor: '#ffeaa7',
      borderWidth: 1,
      borderRadius: 10,
      padding: 15,
      marginTop: 20,
    },
    testInfoTitle: {
      fontSize: getFontSize(14),
      fontWeight: '600',
      color: '#856404',
      marginBottom: 8,
    },
    testInfoText: {
      fontSize: getFontSize(12),
      color: '#856404',
      lineHeight: 18,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image source={require('../assets/images/logo.png')} style={styles.icon} />
          <Text style={styles.title}>Access Pending Approval</Text>
          <Text style={styles.subtitle}>
            Your registration number has been found, but access to the app has not been granted yet. Please contact administration.
          </Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userInfoLabel}>Your Information</Text>
          <Text style={styles.userInfoText}>Name: {user?.name}</Text>
          <Text style={styles.userInfoText}>Registration: {user?.registrationNumber}</Text>
          <Text style={styles.userInfoText}>Status: Awaiting Approval</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>What happens next?</Text>
          <Text style={styles.cardText}>
            • Your access request will be reviewed by administration{'\n'}
            • Contact your administrator to request approval{'\n'}
            • Once approved, you'll have full access to prayers and hymns{'\n'}
            • Try logging in again after approval is granted
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Need help?</Text>
          <Text style={styles.cardText}>
            Contact administration to request access approval. Provide your registration number when reaching out.
          </Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
} 