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
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../utils/api';

export default function OnboardingScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { user, token, sessionId, refreshUser } = useAuth();
  const { theme, getFontSize } = useTheme();
  const router = useRouter();

  // Calculate password strength
  const calculateStrength = (pwd: string): number => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[@$!%*?&#]/.test(pwd)) strength++;
    return Math.min(strength, 4);
  };

  // Handle password change with strength calculation
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordStrength(calculateStrength(text));
  };

  // Validate password requirements
  const validatePassword = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!password || password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[@$!%*?&#]/.test(password)) {
      errors.push('Password must contain at least one special character (@$!%*?&#)');
    }

    if (password.length > 128) {
      errors.push('Password must not exceed 128 characters');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  const handleSetPassword = async () => {
    if (!password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Validate password strength
    const validation = validatePassword();
    if (!validation.isValid) {
      Alert.alert(
        'Weak Password',
        'Your password must meet the following requirements:\n\n' + validation.errors.join('\n')
      );
      return;
    }

    if (!user?.registrationNumber) {
      Alert.alert('Error', 'User information not found. Please log in again.');
      return;
    }

    setIsLoading(true);
    try {
      console.log('🔄 Onboarding: Setting password for:', user.registrationNumber);
      console.log('🔑 Onboarding: Token exists:', !!token);
      console.log('🔑 Onboarding: SessionId exists:', !!sessionId);

      const result = await api.setPassword(
        user.registrationNumber,
        password,
        confirmPassword,
        token,
        sessionId
      );

      console.log('📝 Onboarding: Set password result:', JSON.stringify(result, null, 2));

      if (result.success) {
        Alert.alert(
          'Success',
          'Password created successfully! You can now use it to log in.',
          [
            {
              text: 'Continue',
              onPress: async () => {
                // Refresh user data to update isPasswordRequired flag
                await refreshUser();
                // Navigate to main app
                router.replace('/(app)');
              },
            },
          ]
        );
      } else {
        const errorMsg = result.message || 'Failed to set password. Please try again.';
        const errors = result.errors ? '\n\n' + result.errors.join('\n') : '';
        console.error('❌ Onboarding: Password set failed:', errorMsg, errors);
        Alert.alert('Error', errorMsg + errors);
      }
    } catch (error) {
      console.error('❌ Onboarding: Set password error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      Alert.alert('Error', 'An unexpected error occurred. Please try again.\n\n' + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return '#e74c3c'; // Red
      case 2:
        return '#f39c12'; // Orange
      case 3:
        return '#3498db'; // Blue
      case 4:
        return '#27ae60'; // Green
      default:
        return theme.textSecondary;
    }
  };

  const getStrengthLabel = () => {
    const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
    return labels[passwordStrength] || 'Very Weak';
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
      width: 100,
      height: 100,
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
      marginBottom: 10,
    },
    welcomeText: {
      fontSize: getFontSize(18),
      fontWeight: '600',
      color: theme.accent,
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
    inputContainer: {
      position: 'relative',
    },
    input: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      padding: 16,
      paddingRight: 50,
      fontSize: getFontSize(16),
      color: theme.text,
    },
    eyeIcon: {
      position: 'absolute',
      right: 16,
      top: 16,
    },
    strengthMeter: {
      marginTop: 8,
      height: 6,
      backgroundColor: theme.surface,
      borderRadius: 3,
      overflow: 'hidden',
    },
    strengthFill: {
      height: '100%',
      borderRadius: 3,
    },
    strengthText: {
      marginTop: 4,
      fontSize: getFontSize(12),
      fontWeight: '500',
    },
    requirementsList: {
      marginTop: 8,
      padding: 12,
      backgroundColor: theme.surface,
      borderRadius: 8,
    },
    requirementItem: {
      fontSize: getFontSize(12),
      color: theme.textSecondary,
      marginBottom: 4,
      lineHeight: 18,
    },
    buttonContainer: {
      marginTop: 10,
    },
    createButton: {
      backgroundColor: theme.accent,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
    },
    createButtonDisabled: {
      opacity: 0.5,
    },
    createButtonText: {
      color: '#fff',
      fontSize: getFontSize(18),
      fontWeight: '600',
    },
    infoBox: {
      backgroundColor: theme.card,
      padding: 15,
      borderRadius: 12,
      marginTop: 20,
      borderLeftWidth: 4,
      borderLeftColor: theme.accent,
    },
    infoText: {
      fontSize: getFontSize(12),
      color: theme.textSecondary,
      lineHeight: 18,
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : Platform.OS === 'web' ? undefined : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Welcome to GoHub!</Text>
          <Text style={styles.subtitle}>Your account has been activated</Text>
          <Text style={styles.welcomeText}>{user?.name}</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Create Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={handlePasswordChange}
                placeholder="Enter your password"
                placeholderTextColor={theme.textSecondary}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color={theme.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {password.length > 0 && (
              <>
                <View style={styles.strengthMeter}>
                  <View
                    style={[
                      styles.strengthFill,
                      {
                        width: `${(passwordStrength / 4) * 100}%`,
                        backgroundColor: getStrengthColor(),
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.strengthText, { color: getStrengthColor() }]}>
                  {getStrengthLabel()}
                </Text>
              </>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                placeholderTextColor={theme.textSecondary}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color={theme.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.requirementsList}>
            <Text style={styles.requirementItem}>• At least 8 characters long</Text>
            <Text style={styles.requirementItem}>• Contains uppercase and lowercase letters</Text>
            <Text style={styles.requirementItem}>• Contains at least one number</Text>
            <Text style={styles.requirementItem}>
              • Contains at least one special character (@$!%*?&#)
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.createButton,
                (isLoading || password !== confirmPassword || passwordStrength < 2) &&
                  styles.createButtonDisabled,
              ]}
              onPress={handleSetPassword}
              disabled={isLoading || password !== confirmPassword || passwordStrength < 2}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.createButtonText}>Create Password</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            This is a one-time setup. After creating your password, you'll use it along with your
            registration number to log in. Keep your password secure and don't share it with anyone.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
