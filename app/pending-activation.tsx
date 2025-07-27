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
          <Text style={styles.title}>Account Pending Activation</Text>
          <Text style={styles.subtitle}>
            Your account has been created successfully, but it needs to be activated by an administrator.
          </Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userInfoLabel}>Account Information</Text>
          <Text style={styles.userInfoText}>Name: {user?.name}</Text>
          <Text style={styles.userInfoText}>Registration: {user?.registrationNumber}</Text>
          <Text style={styles.userInfoText}>Status: Pending Activation</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>What happens next?</Text>
          <Text style={styles.cardText}>
            • Your account will be reviewed by the administration{'\n'}
            • You'll receive notification once your account is activated{'\n'}
            • Once activated, you'll have access to all app features{'\n'}
            • This process typically takes 24-48 hours
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Need help?</Text>
          <Text style={styles.cardText}>
            If you have any questions about your account activation, please contact the administration or your institution's IT department.
          </Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={styles.testInfo}>
          <Text style={styles.testInfoTitle}>Test Account</Text>
          <Text style={styles.testInfoText}>
            For testing purposes, you can use:{'\n'}
            Registration Number: ABC/1233{'\n'}
            This account is pre-activated and will give you full access.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
} 