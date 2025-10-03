import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Application from 'expo-application';
import { router } from 'expo-router';

export interface User {
  id: string;
  name: string;
  registrationNumber: string;
  isActivated: boolean;
  deviceId: string;
  lastLogin: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isActivated: boolean;
  deviceId: string | null;
}

interface AuthContextType extends AuthState {
  login: (name: string, registrationNumber: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (name: string, registrationNumber: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  checkActivation: () => Promise<void>;
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
    isLoading: true,
    isAuthenticated: false,
    isActivated: false,
    deviceId: null,
  });

  // Get device ID
  const getDeviceId = async (): Promise<string> => {
    try {
      const deviceId = await Application.getAndroidId() || Application.applicationId || 'unknown-device';
      return deviceId;
    } catch (error) {
      console.error('Error getting device ID:', error);
      return 'unknown-device';
    }
  };

  // Load stored authentication data and device ID on app start
  useEffect(() => {
    (async () => {
      try {
        const deviceId = await getDeviceId();
        const [token, userData] = await Promise.all([
          AsyncStorage.getItem('auth_token'),
          AsyncStorage.getItem('user_data'),
        ]);
        
        if (token && userData) {
          const user = JSON.parse(userData);
          
          // Check if device ID matches
          if (user.deviceId === deviceId) {
            setAuthState({
              user,
              token,
              isLoading: false,
              isAuthenticated: true,
              isActivated: user.isActivated,
              deviceId,
            });
          } else {
            // Device mismatch - log out user
            await logout();
          }
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false, deviceId }));
        }
      } catch (error) {
        console.error('Error loading auth data:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    })();
  }, []);

  // Login function
  const login = async (name: string, registrationNumber: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const deviceId = await getDeviceId();
      
      // TODO: Replace with real API call
      // Example:
      // const response = await fetch('https://your-api.com/login', { ... })
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check for dummy activated user
      const isActivatedUser = registrationNumber.trim() === 'ABC/1233';
      
      // Simulate server response
      const mockUser: User = {
        id: '1',
        name,
        registrationNumber,
        isActivated: isActivatedUser, // ABC/1233 is activated
        deviceId,
        lastLogin: new Date().toISOString(),
      };
      const mockToken = 'mock_token_' + Date.now();
      
      await Promise.all([
        AsyncStorage.setItem('auth_token', mockToken),
        AsyncStorage.setItem('user_data', JSON.stringify(mockUser)),
      ]);
      
      setAuthState({
        user: mockUser,
        token: mockToken,
        isLoading: false,
        isAuthenticated: true,
        isActivated: mockUser.isActivated,
        deviceId,
      });
      
      return { success: true, message: 'Login successful' };
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  // Register function
  const register = async (name: string, registrationNumber: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const deviceId = await getDeviceId();
      
      // TODO: Replace with real API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check for dummy activated user
      const isActivatedUser = registrationNumber.trim() === 'ABC/1233';
      
      // Simulate server response
      const mockUser: User = {
        id: '1',
        name,
        registrationNumber,
        isActivated: isActivatedUser, // ABC/1233 is activated
        deviceId,
        lastLogin: new Date().toISOString(),
      };
      const mockToken = 'mock_token_' + Date.now();
      
      await Promise.all([
        AsyncStorage.setItem('auth_token', mockToken),
        AsyncStorage.setItem('user_data', JSON.stringify(mockUser)),
      ]);
      
      setAuthState({
        user: mockUser,
        token: mockToken,
        isLoading: false,
        isAuthenticated: true,
        isActivated: mockUser.isActivated,
        deviceId,
      });
      
      return { success: true, message: 'Registration successful. Your account is pending activation.' };
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      console.log('🔄 Starting logout process...');
      
      // Set loading state to force navigation update
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      await Promise.all([
        AsyncStorage.removeItem('auth_token'),
        AsyncStorage.removeItem('user_data'),
      ]);
      
      console.log('🗑️ Cleared storage data');
      
      // Force immediate state update
      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        isActivated: false,
        deviceId: null,
      });
      
      console.log('✅ Logout completed successfully');
      
    } catch (error) {
      console.error('❌ Error during logout:', error);
      // Even if there's an error, clear the state
      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        isActivated: false,
        deviceId: null,
      });
    }
  };

  // Check activation status (call server)
  const checkActivation = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      // TODO: Replace with real API call to check activation
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Simulate server response
      const isActivated = true; // Set based on server response
      setAuthState(prev => ({ ...prev, isLoading: false, isActivated }));
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    checkActivation,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 