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
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const { theme, getFontSize } = useTheme();
  const router = useRouter();

  const handleRegister = async () => {
    if (!name.trim() || !registrationNumber.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    // Validate registration number format
    const regNumberRegex = /^[A-Z]{3}\/\d{4}$/;
    if (!regNumberRegex.test(registrationNumber.trim())) {
      Alert.alert('Error', 'Registration number must be in format ABC/1234');
      return;
    }

    setIsLoading(true);
    try {
      const result = await register(name.trim(), registrationNumber.trim(), password);
      if (result.success) {
        Alert.alert('Success', result.message);
        // Navigation will be handled by the root layout
      } else {
        Alert.alert('Registration Failed', result.message);
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
    registerButton: {
      backgroundColor: theme.accent,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginBottom: 20,
    },
    registerButtonText: {
      color: '#fff',
      fontSize: getFontSize(18),
      fontWeight: '600',
    },
    loginLink: {
      alignItems: 'center',
    },
    loginText: {
      fontSize: getFontSize(16),
      color: theme.textSecondary,
    },
    loginLinkText: {
      color: theme.accent,
      fontWeight: '600',
    },
    testCredentials: {
      backgroundColor: theme.card,
      padding: 15,
      borderRadius: 12,
      marginTop: 20,
    },
    testCredentialsTitle: {
      fontSize: getFontSize(14),
      fontWeight: '600',
      color: theme.text,
      marginBottom: 8,
    },
    testCredentialsText: {
      fontSize: getFontSize(12),
      color: theme.textSecondary,
      lineHeight: 18,
    },
  });

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              placeholderTextColor={theme.textSecondary}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Registration Number</Text>
            <TextInput
              style={styles.input}
              value={registrationNumber}
              onChangeText={setRegistrationNumber}
              placeholder="ABC/1234"
              placeholderTextColor={theme.textSecondary}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor={theme.textSecondary}
              secureTextEntry
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              placeholderTextColor={theme.textSecondary}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.registerButtonText}>Create Account</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.loginLink}>
          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Link href="/(auth)/login" asChild>
              <Text style={styles.loginLinkText}>Sign In</Text>
            </Link>
          </Text>
        </View>

        <View style={styles.testCredentials}>
          <Text style={styles.testCredentialsTitle}>Test Account</Text>
          <Text style={styles.testCredentialsText}>
            For testing purposes, you can register with:{'\n'}
            Registration Number: ABC/1233{'\n'}
            This will create an activated account
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
} 