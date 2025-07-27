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

export default function LoginScreen() {
  const [name, setName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { theme, getFontSize } = useTheme();
  const router = useRouter();

  const handleLogin = async () => {
    if (!name.trim() || !registrationNumber.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
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
      const result = await login(name.trim(), registrationNumber.trim(), password);
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
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to access your account</Text>
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
            Don't have an account?{' '}
            <Link href="/(auth)/register" asChild>
              <Text style={styles.registerLinkText}>Sign Up</Text>
            </Link>
          </Text>
        </View>

        <View style={styles.testCredentials}>
          <Text style={styles.testCredentialsTitle}>Test Account</Text>
          <Text style={styles.testCredentialsText}>
            For testing purposes, you can use:{'\n'}
            Registration Number: ABC/1233{'\n'}
            Any name and password will work
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
} 