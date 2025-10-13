import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function LoginScreen() {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { theme, getFontSize } = useTheme();
  const router = useRouter();

  const handleLogin = async () => {
    if (!registrationNumber.trim()) {
      Alert.alert('Error', 'Please enter your registration number');
      return;
    }

    // Validate registration number format: GOU/U23/CSC/1292
    const regNumberRegex = /^[A-Z]+\/[A-Z]+\d+\/[A-Z]+\/\d+$/;
    if (!regNumberRegex.test(registrationNumber.trim().toUpperCase())) {
      Alert.alert('Error', 'Registration number must be in format: GOU/U23/CSC/1292');
      return;
    }

    setIsLoading(true);
    try {
      const result = await login(registrationNumber.trim().toUpperCase());
      if (result.success) {
        // Navigation will be handled by the root layout
      } else {
        Alert.alert('Login Failed', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
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
    logo: {
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
    },
    subtitle: {
      fontSize: getFontSize(16),
      color: theme.textSecondary,
      textAlign: 'center',
    },
    form: {
      marginBottom: 30,
    },
    inputGroup: {
      marginBottom: 20,
    },
    label: {
      fontSize: getFontSize(16),
      fontWeight: '600',
      color: theme.text,
      marginBottom: 8,
    },
    input: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      padding: 16,
      fontSize: getFontSize(16),
      color: theme.text,
    },
    loginButton: {
      backgroundColor: theme.accent,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginBottom: 20,
    },
    loginButtonText: {
      color: '#fff',
      fontSize: getFontSize(18),
      fontWeight: '600',
    },
    registerLink: {
      alignItems: 'center',
    },
    registerText: {
      fontSize: getFontSize(16),
      color: theme.textSecondary,
    },
    registerLinkText: {
      color: theme.accent,
      fontWeight: '600',
    },
    helpText: {
      fontSize: getFontSize(12),
      color: theme.textSecondary,
      marginTop: 4,
      fontStyle: 'italic',
    },
    infoBox: {
      backgroundColor: theme.card,
      padding: 15,
      borderRadius: 12,
      marginTop: 20,
      borderLeftWidth: 4,
      borderLeftColor: theme.accent,
    },
    infoTitle: {
      fontSize: getFontSize(14),
      fontWeight: '600',
      color: theme.text,
      marginBottom: 8,
    },
    infoText: {
      fontSize: getFontSize(12),
      color: theme.textSecondary,
      lineHeight: 20,
    },
  });

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : Platform.OS === 'web' ? undefined : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image 
            source={require('../../assets/images/logo.png')} 
            style={styles.logo}
          />
          <Text style={styles.title}>GoHub Login</Text>
          <Text style={styles.subtitle}>Enter your registration number to access prayers and hymns</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Registration Number</Text>
            <TextInput
              style={styles.input}
              value={registrationNumber}
              onChangeText={setRegistrationNumber}
              placeholder="GOU/U23/CSC/1292"
              placeholderTextColor={theme.textSecondary}
              autoCapitalize="characters"
              autoCorrect={false}
              autoFocus
            />
            <Text style={styles.helpText}>
              Format: GOU/U23/CSC/1292
            </Text>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.registerLink}>
          <Text style={styles.registerText}>
            Don't have access?{' '}
            <Link href="/(auth)/register" asChild>
              <Text style={styles.registerLinkText}>Contact Admin</Text>
            </Link>
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>ℹ️ How to Login</Text>
          <Text style={styles.infoText}>
            • Use your student registration number{'\n'}
            • Format: GOU/U##/DEPT/#### (e.g., GOU/U23/CSC/1292){'\n'}
            • No password required{'\n'}
            • Access must be granted by administration{'\n'}
            • Contact your administrator if you can't log in
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
} 