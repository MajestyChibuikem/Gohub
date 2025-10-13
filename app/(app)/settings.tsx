import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, FontSizeOption, fontSizeValues } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import ThemedText from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { StatusBar } from 'expo-status-bar';

export default function ProfileScreen() {
  const { theme, settings, updateSettings, getFontSize } = useTheme();
  const { user, logout, isActivated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    console.log('🔘 Logout button clicked - starting direct logout');
    
    // Use browser confirm for web compatibility
    const confirmed = window.confirm('Are you sure you want to logout?');
    
    if (confirmed) {
      console.log('✅ Logout confirmed by user');
      handleDirectLogout();
    } else {
      console.log('❌ Logout cancelled by user');
    }
  };

  const handleDirectLogout = async () => {
    try {
      console.log('🚪 Direct logout - starting logout process');
      
      // Call the logout function from AuthContext
      await logout();
      console.log('✅ Logout function completed');
      
      // Wait a moment for state to update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Try multiple navigation methods for web compatibility
      try {
        console.log('🔄 Attempting navigation to login...');
        router.push('/(auth)/login');
        console.log('✅ Navigation with router.push successful');
      } catch (navError) {
        console.warn('⚠️ router.push failed, trying router.replace:', navError);
        try {
          router.replace('/(auth)/login');
          console.log('✅ Navigation with router.replace successful');
        } catch (replaceError) {
          console.error('❌ Both navigation methods failed:', replaceError);
          // Force page reload as last resort
          window.location.href = '/';
        }
      }
    } catch (error) {
      console.error('❌ Direct logout error:', error);
    }
  };

  const ThemeModeSelector = () => {
    const options: { value: 'light' | 'dark' | 'system'; label: string; icon: string }[] = [
      { value: 'light', label: 'Light', icon: 'sunny-outline' },
      { value: 'dark', label: 'Dark', icon: 'moon-outline' },
      { value: 'system', label: 'System', icon: 'sync-outline' },
    ];

    return (
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.themeOption,
              { 
                backgroundColor: settings.themeMode === option.value ? theme.accent : theme.card,
                borderColor: theme.border,
              }
            ]}
            onPress={() => updateSettings({ themeMode: option.value })}
          >
            <Ionicons 
              name={option.icon as any} 
              size={24} 
              color={settings.themeMode === option.value ? '#ffffff' : theme.text} 
            />
            <Text 
              style={[
                styles.themeOptionText, 
                { 
                  color: settings.themeMode === option.value ? '#ffffff' : theme.text,
                  fontSize: getFontSize(14),
                }
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const FontSizeSelector = () => {
    const options: { value: FontSizeOption; label: string }[] = [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
      { value: 'x-large', label: 'Extra Large' },
    ];

    return (
      <View style={styles.fontSizeContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.fontSizeOption,
              { 
                backgroundColor: settings.fontSize === option.value ? theme.accent : theme.card,
                borderColor: theme.border,
              }
            ]}
            onPress={() => updateSettings({ fontSize: option.value })}
          >
            <Text 
              style={[
                styles.fontSizeText, 
                { 
                  color: settings.fontSize === option.value ? '#ffffff' : theme.text,
                  fontSize: fontSizeValues[option.value],
                }
              ]}
            >
              Aa
            </Text>
            <Text 
              style={[
                styles.fontSizeLabel, 
                { 
                  color: settings.fontSize === option.value ? '#ffffff' : theme.text,
                  fontSize: getFontSize(12),
                }
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const SettingSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <ThemedText style={[styles.sectionTitle, { fontSize: getFontSize(18) }]}>
        {title}
      </ThemedText>
      {children}
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 100,
    },
    header: {
      alignItems: 'center',
      marginBottom: 30,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.accent,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
    },
    avatarText: {
      color: '#fff',
      fontSize: getFontSize(24),
      fontWeight: 'bold',
    },
    userName: {
      fontSize: getFontSize(20),
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 5,
    },
    userRole: {
      fontSize: getFontSize(14),
      color: theme.textSecondary,
    },
    section: {
      marginBottom: 25,
    },
    sectionTitle: {
      fontSize: getFontSize(18),
      fontWeight: '600',
      color: theme.text,
      marginBottom: 15,
    },
    sectionSubtitle: {
      fontSize: getFontSize(16),
      color: theme.text,
      marginBottom: 8,
    },
    infoCard: {
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 10,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    infoLabel: {
      fontSize: getFontSize(14),
      color: theme.textSecondary,
      width: 120,
    },
    infoValue: {
      fontSize: getFontSize(14),
      color: theme.text,
      fontWeight: '500',
      flex: 1,
    },
    activationBanner: {
      backgroundColor: isActivated ? '#d4edda' : '#fff3cd',
      borderColor: isActivated ? '#c3e6cb' : '#ffeaa7',
      borderWidth: 1,
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    activationIcon: {
      marginRight: 12,
    },
    activationText: {
      fontSize: getFontSize(14),
      color: isActivated ? '#155724' : '#856404',
      fontWeight: '500',
      flex: 1,
    },
    logoutButton: {
      backgroundColor: '#dc3545',
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
    deviceInfo: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 15,
    },
    deviceInfoTitle: {
      fontSize: getFontSize(14),
      fontWeight: '600',
      color: theme.text,
      marginBottom: 8,
    },
    deviceInfoText: {
      fontSize: getFontSize(12),
      color: theme.textSecondary,
      lineHeight: 18,
    },
    optionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    themeOption: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
      borderRadius: 8,
      marginHorizontal: 4,
      borderWidth: 1,
    },
    themeOptionText: {
      marginTop: 8,
      fontWeight: '500',
    },
    divider: {
      height: 1,
      backgroundColor: '#e0e0e0',
      marginVertical: 16,
    },
    fontSizeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    fontSizeOption: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      borderRadius: 8,
      marginHorizontal: 4,
      borderWidth: 1,
      height: 80,
    },
    fontSizeText: {
      fontWeight: 'bold',
      marginBottom: 4,
    },
    fontSizeLabel: {
      fontWeight: '500',
    },
    aboutSection: {
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      backgroundColor: theme.card,
      marginBottom: 10,
    },
    aboutText: {
      textAlign: 'center',
      marginBottom: 4,
      color: theme.text,
    },
    versionText: {
      textAlign: 'center',
      color: theme.textSecondary,
    },
  });

  return (
    <ThemedView style={styles.container}>
      <StatusBar style={theme.background === '#ffffff' ? 'dark' : 'light'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.userRole}>Student</Text>
        </View>

        {/* Activation Status */}
        <View style={styles.activationBanner}>
          <Ionicons
            name={isActivated ? 'checkmark-circle' : 'information-circle'}
            size={24}
            color={isActivated ? '#155724' : '#856404'}
            style={styles.activationIcon}
          />
          <Text style={styles.activationText}>
            {isActivated 
              ? 'Your account is fully activated and you have access to all features.'
              : 'Your account is pending activation. Contact the administration to activate your account.'
            }
          </Text>
        </View>

        {/* Appearance Settings */}
        <SettingSection title="Appearance">
          <ThemedText style={[styles.sectionSubtitle, { fontSize: getFontSize(16) }]}>
            Theme Mode
          </ThemedText>
          <ThemeModeSelector />
          
          <View style={styles.divider} />
          
          <ThemedText style={[styles.sectionSubtitle, { fontSize: getFontSize(16) }]}>
            Font Size
          </ThemedText>
          <FontSizeSelector />
        </SettingSection>

        {/* User Information */}
        <SettingSection title="Account Information">
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Full Name:</Text>
              <Text style={styles.infoValue}>{user?.name || 'Not set'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Reg. Number:</Text>
              <Text style={styles.infoValue}>{user?.registrationNumber || 'Not set'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status:</Text>
              <Text style={styles.infoValue}>
                {isActivated ? 'Activated' : 'Pending Activation'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Last Login:</Text>
              <Text style={styles.infoValue}>
                {user?.lastLogin 
                  ? new Date(user.lastLogin).toLocaleDateString()
                  : 'Unknown'
                }
              </Text>
            </View>
          </View>
        </SettingSection>

        {/* Device Information */}
        <SettingSection title="Device Information">
          <View style={styles.deviceInfo}>
            <Text style={styles.deviceInfoTitle}>Device Binding</Text>
            <Text style={styles.deviceInfoText}>
              Your account is bound to this device. Logging in on another device will automatically log you out of this one.
            </Text>
          </View>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Device ID:</Text>
              <Text style={styles.infoValue}>
                {user?.deviceId ? user.deviceId.substring(0, 8) + '...' : 'Unknown'}
              </Text>
            </View>
          </View>
        </SettingSection>

        {/* About Section */}
        <SettingSection title="About">
          <View style={styles.aboutSection}>
            <ThemedText style={[styles.aboutText, { fontSize: getFontSize(14) }]}>
              GoHub - Godfrey's Prayer App
            </ThemedText>
            <ThemedText style={[styles.versionText, { fontSize: getFontSize(12) }]}>
              Version 1.0.0
            </ThemedText>
          </View>
          <View style={styles.aboutSection}>
            <ThemedText style={[styles.aboutText, { fontSize: getFontSize(14) }]}>
              Temnix.com
            </ThemedText>
            <ThemedText style={[styles.versionText, { fontSize: getFontSize(12) }]}>
              2025
            </ThemedText>
          </View>
        </SettingSection>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
          onPressIn={() => console.log('👆 Logout button pressed in')}
          onPressOut={() => console.log('👆 Logout button pressed out')}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
} 