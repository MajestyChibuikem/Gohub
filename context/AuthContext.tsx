import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Application from 'expo-application';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { api } from '../utils/api';

export interface User {
  id: string;
  name: string;
  registrationNumber: string;
  isActivated: boolean;
  isPasswordRequired?: boolean;
  deviceId: string;
  lastLogin: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  sessionId: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isActivated: boolean;
  needsOnboarding: boolean;
  deviceId: string | null;
}

interface AuthContextType extends AuthState {
  login: (registrationNumber: string, password?: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  checkActivation: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    sessionId: null,
    isLoading: true,
    isAuthenticated: false,
    isActivated: false,
    needsOnboarding: false,
    deviceId: null,
  });

  // Get device ID
  const getDeviceId = async (): Promise<string> => {
    try {
      if (typeof window !== 'undefined') {
        // Use AsyncStorage instead of localStorage for web
        let deviceId = await AsyncStorage.getItem('gohub_device_id');
        if (!deviceId) {
          deviceId = 'web_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
          await AsyncStorage.setItem('gohub_device_id', deviceId);
        }
        return deviceId;
      } else {
        const deviceId = await Application.getAndroidId() || Application.applicationId || 'unknown-device';
        return deviceId;
      }
    } catch (error) {
      console.error('Error getting device ID:', error);
      return 'unknown-device';
    }
  };

  // Load stored authentication data and device ID on app start
  useEffect(() => {
    (async () => {
      try {
        console.log('🔄 AuthContext: Starting auth initialization...');
        const deviceId = await getDeviceId();
        console.log('📱 AuthContext: Device ID:', deviceId);
        
        const [token, userData, sessionId] = await Promise.all([
          AsyncStorage.getItem('auth_token'),
          AsyncStorage.getItem('user_data'),
          AsyncStorage.getItem('session_id'),
        ]);
        
        console.log('🔑 AuthContext: Token exists:', !!token);
        console.log('🔑 AuthContext: Session ID exists:', !!sessionId);
        console.log('👤 AuthContext: User data exists:', !!userData);
        
        if (token && userData && sessionId) {
          const user = JSON.parse(userData);
          console.log('👤 AuthContext: Parsed user:', user);
          console.log('🔍 AuthContext: Device ID match:', user.deviceId === deviceId);
          
          // Check if device ID matches
          if (user.deviceId === deviceId) {
            console.log('✅ AuthContext: Device ID matches, validating session with backend...');
            
            // Validate session with backend
            const validation = await api.validateSession(token, sessionId);
            
            if (validation.isValid) {
              console.log('✅ AuthContext: Session valid, setting authenticated state');
              setAuthState({
                user,
                token,
                sessionId,
                isLoading: false,
                isAuthenticated: true,
                isActivated: user.isActivated,
                needsOnboarding: user.isActivated && !user.isPasswordRequired,
                deviceId,
              });
            } else {
              console.log('❌ AuthContext: Session invalid, logging out. Reason:', validation.reason);
              await logoutRef.current();
            }
          } else {
            // Device mismatch - log out user
            console.log('❌ AuthContext: Device ID mismatch, logging out');
            await logoutRef.current();
          }
        } else {
          console.log('🔓 AuthContext: No stored auth data, setting unauthenticated state');
          setAuthState(prev => ({ ...prev, isLoading: false, deviceId }));
        }
      } catch (error) {
        console.error('❌ AuthContext: Error loading auth data:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    })();
  }, []);

  // Login function - Registration number with optional password
  const login = async (registrationNumber: string, password?: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const deviceId = await getDeviceId();

      console.log('🔄 AuthContext: Starting login for:', registrationNumber);

      // Step 1: Check if registration number is allowed
      const checkResponse = await api.checkRegistration(registrationNumber);

      if (!checkResponse.allowed) {
        console.log('❌ AuthContext: Registration not allowed');
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return {
          success: false,
          message: checkResponse.message || 'Registration number not authorized. Contact administration.'
        };
      }

      console.log('✅ AuthContext: Registration check passed');

      // Step 2: Perform login
      const loginResponse = await api.login(registrationNumber, deviceId, password);
      
      if (!loginResponse.success || !loginResponse.user || !loginResponse.token || !loginResponse.sessionId) {
        console.log('❌ AuthContext: Login failed');
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return { 
          success: false, 
          message: loginResponse.message || 'Login failed. Please try again.' 
        };
      }
      
      console.log('✅ AuthContext: Login successful, storing session data');
      
      // Step 3: Store session data
      await Promise.all([
        AsyncStorage.setItem('auth_token', loginResponse.token),
        AsyncStorage.setItem('session_id', loginResponse.sessionId),
        AsyncStorage.setItem('user_data', JSON.stringify(loginResponse.user)),
      ]);
      
      // Step 4: Update state
      // Note: We use isActivated field for navigation, but it's controlled by isAllowed from backend
      // If backend returns isActivated=false, user sees "pending activation" screen
      setAuthState({
        user: loginResponse.user,
        token: loginResponse.token,
        sessionId: loginResponse.sessionId,
        isLoading: false,
        isAuthenticated: true,
        isActivated: loginResponse.user.isActivated, // Backend controls this via isAllowed/isActivated
        needsOnboarding: loginResponse.needsOnboarding || false,
        deviceId,
      });
      
      console.log('✅ AuthContext: Login complete');
      return { success: true, message: 'Login successful' };
      
    } catch (error) {
      console.error('❌ AuthContext: Login error:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { 
        success: false, 
        message: 'Login failed. Please check your connection and try again.' 
      };
    }
  };

  // Note: Registration is handled by admin panel, not by users

  // Logout function
  const logout = async () => {
    try {
      console.log('🔄 AuthContext: Starting logout process...');
      
      // Set loading state to force navigation update
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // Get current token and session ID
      const [token, sessionId] = await Promise.all([
        AsyncStorage.getItem('auth_token'),
        AsyncStorage.getItem('session_id'),
      ]);
      
      // Call backend logout API if we have credentials
      if (token && sessionId) {
        console.log('📡 AuthContext: Calling backend logout API');
        await api.logout(token, sessionId);
      }
      
      // Clear all stored data
      await Promise.all([
        AsyncStorage.removeItem('auth_token'),
        AsyncStorage.removeItem('session_id'),
        AsyncStorage.removeItem('user_data'),
      ]);
      
      console.log('🗑️ AuthContext: Cleared storage data');
      
      // Force immediate state update
      setAuthState({
        user: null,
        token: null,
        sessionId: null,
        isLoading: false,
        isAuthenticated: false,
        isActivated: false,
        needsOnboarding: false,
        deviceId: null,
      });

      console.log('✅ AuthContext: Logout completed successfully');

    } catch (error) {
      console.error('❌ AuthContext: Error during logout:', error);
      // Even if there's an error, clear the state
      setAuthState({
        user: null,
        token: null,
        sessionId: null,
        isLoading: false,
        isAuthenticated: false,
        isActivated: false,
        needsOnboarding: false,
        deviceId: null,
      });
    }
  };

  // Create a stable logout function reference to prevent infinite loops
  const logoutRef = React.useRef(logout);
  logoutRef.current = logout;

  // Session validation polling - checks every 30 seconds if user is still logged in
  useEffect(() => {
    if (!authState.isAuthenticated || !authState.token || !authState.sessionId) {
      return; // Don't poll if not authenticated
    }

    console.log('🔄 AuthContext: Starting session validation polling');

    // Check session immediately on mount
    const validateCurrentSession = async () => {
      try {
        const validation = await api.validateSession(authState.token!, authState.sessionId!);
        
        if (!validation.isValid) {
          console.log('❌ AuthContext: Session invalid during polling. Reason:', validation.reason);
          
          // Show appropriate message based on reason
          let message = 'Your session has expired. Please log in again.';
          if (validation.reason === 'session_invalidated_by_new_login') {
            message = 'You have been logged out because you logged in on another device.';
          } else if (validation.reason === 'account_disabled') {
            message = 'Your account has been disabled. Please contact administration.';
          }
          
          Alert.alert(
            'Session Expired',
            message,
            [{ text: 'OK', onPress: () => logout() }]
          );
        }
      } catch (error) {
        console.error('❌ AuthContext: Session validation polling error:', error);
        // Don't logout on network errors, just log it
      }
    };

    // Validate immediately
    validateCurrentSession();

    // Then validate every 60 seconds (60,000 milliseconds)
    const interval = setInterval(validateCurrentSession, 60000);

    return () => {
      console.log('🛑 AuthContext: Stopping session validation polling');
      clearInterval(interval);
    };
  }, [authState.isAuthenticated, authState.token, authState.sessionId]);

  // Check activation status (refresh user data from validation)
  const checkActivation = async () => {
    if (!authState.token || !authState.sessionId) {
      return;
    }

    try {
      const validation = await api.validateSession(authState.token, authState.sessionId);
      if (validation.isValid && validation.user) {
        setAuthState(prev => ({
          ...prev,
          isActivated: validation.user!.isActivated,
          user: prev.user ? { ...prev.user, isActivated: validation.user!.isActivated } : prev.user
        }));
      }
    } catch (error) {
      console.error('❌ AuthContext: Error checking activation:', error);
    }
  };

  // Refresh user data (useful after password setup)
  const refreshUser = async () => {
    if (!authState.token || !authState.sessionId) {
      return;
    }

    try {
      console.log('🔄 AuthContext: Refreshing user data...');
      const validation = await api.validateSession(authState.token, authState.sessionId);
      if (validation.isValid && validation.user) {
        const userData = await AsyncStorage.getItem('user_data');
        if (userData) {
          const updatedUser = JSON.parse(userData);
          setAuthState(prev => ({
            ...prev,
            user: updatedUser,
            isActivated: updatedUser.isActivated,
            needsOnboarding: updatedUser.isActivated && !updatedUser.isPasswordRequired,
          }));
          console.log('✅ AuthContext: User data refreshed');
        }
      }
    } catch (error) {
      console.error('❌ AuthContext: Error refreshing user:', error);
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    checkActivation,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 