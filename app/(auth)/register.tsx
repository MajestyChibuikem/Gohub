import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

export default function RegisterScreen() {
  const { theme, getFontSize } = useTheme();
  const router = useRouter();

  const handleContactAdmin = () => {
    // You can customize this with actual admin contact details
    const adminEmail = 'admin@godfrey.edu.ng';
    Linking.openURL(`mailto:${adminEmail}?subject=GoHub Access Request`);
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
      fontSize: getFontSize(64),
      marginBottom: 20,
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
      lineHeight: 24,
    },
    infoBox: {
      backgroundColor: theme.card,
      padding: 20,
      borderRadius: 12,
      marginBottom: 20,
      borderLeftWidth: 4,
      borderLeftColor: theme.accent,
    },
    infoTitle: {
      fontSize: getFontSize(18),
      fontWeight: '600',
      color: theme.text,
      marginBottom: 12,
    },
    infoText: {
      fontSize: getFontSize(14),
      color: theme.textSecondary,
      lineHeight: 22,
      marginBottom: 8,
    },
    contactButton: {
      backgroundColor: theme.accent,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginVertical: 20,
    },
    contactButtonText: {
      color: '#fff',
      fontSize: getFontSize(18),
      fontWeight: '600',
    },
    loginLink: {
      alignItems: 'center',
      marginTop: 20,
    },
    loginText: {
      fontSize: getFontSize(16),
      color: theme.textSecondary,
    },
    loginLinkText: {
      color: theme.accent,
      fontWeight: '600',
    },
    stepsBox: {
      backgroundColor: theme.surface,
      padding: 20,
      borderRadius: 12,
      marginTop: 20,
    },
    stepItem: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    stepNumber: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: theme.accent,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    stepNumberText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: getFontSize(14),
    },
    stepContent: {
      flex: 1,
    },
    stepTitle: {
      fontSize: getFontSize(16),
      fontWeight: '600',
      color: theme.text,
      marginBottom: 4,
    },
    stepDescription: {
      fontSize: getFontSize(14),
      color: theme.textSecondary,
      lineHeight: 20,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.icon}>🔐</Text>
          <Text style={styles.title}>Registration Required</Text>
          <Text style={styles.subtitle}>
            GoHub access is managed by administration. Self-registration is not available.
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>⚠️ Important Information</Text>
          <Text style={styles.infoText}>
            • Registration is handled exclusively by administration
          </Text>
          <Text style={styles.infoText}>
            • Students cannot create their own accounts
          </Text>
          <Text style={styles.infoText}>
            • Your registration number must be approved first
          </Text>
          <Text style={styles.infoText}>
            • Contact administration to request access
          </Text>
        </View>

        <View style={styles.stepsBox}>
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Contact Administration</Text>
              <Text style={styles.stepDescription}>
                Send an email to request access to GoHub
              </Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Wait for Approval</Text>
              <Text style={styles.stepDescription}>
                Admin will add your registration number to the system
              </Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Login with Reg Number</Text>
              <Text style={styles.stepDescription}>
                Once approved, use only your registration number to login (no password needed)
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.contactButton}
          onPress={handleContactAdmin}
        >
          <Text style={styles.contactButtonText}>📧 Contact Administration</Text>
        </TouchableOpacity>

        <View style={styles.loginLink}>
          <Text style={styles.loginText}>
            Already have access?{' '}
            <Link href="/(auth)/login" asChild>
              <Text style={styles.loginLinkText}>Sign In</Text>
            </Link>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
} 