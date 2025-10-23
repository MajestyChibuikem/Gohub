/**
 * API Configuration and Helper Functions
 * Handles all backend API calls for authentication
 */

// API Base URL - Change this for production
// For local development: http://localhost:3001/api
// For production: https://your-backend.railway.app/api
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3001/api'  // Development (use your computer's IP for physical devices)
  : 'https://gohub-production.up.railway.app/api'; // Production

/**
 * API Response Types
 */
export interface CheckRegistrationResponse {
  allowed: boolean;
  name?: string;
  isActivated?: boolean;
  registrationNumber?: string;
  isPasswordRequired?: boolean;
  needsOnboarding?: boolean;
  message?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  sessionId?: string;
  needsOnboarding?: boolean;
  requiresPassword?: boolean;
  user?: {
    id: string;
    name: string;
    registrationNumber: string;
    isActivated: boolean;
    isPasswordRequired?: boolean;
    deviceId: string;
    lastLogin: string;
  };
}

export interface ValidateSessionResponse {
  isValid: boolean;
  reason?: string;
  user?: {
    id: string;
    name: string;
    registrationNumber: string;
    isActivated: boolean;
    lastLogin: string;
  };
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface SetPasswordResponse {
  success: boolean;
  message: string;
  errors?: string[];
  user?: {
    id: string;
    name: string;
    registrationNumber: string;
    isPasswordRequired: boolean;
  };
}

/**
 * API Helper Functions
 */
export const api = {
  /**
   * Check if registration number is allowed
   */
  checkRegistration: async (registrationNumber: string): Promise<CheckRegistrationResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/check-registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ registrationNumber }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ API Error (checkRegistration):', error);
      return {
        allowed: false,
        message: 'Network error. Please check your connection.',
      };
    }
  },

  /**
   * Login with registration number and optional password
   */
  login: async (registrationNumber: string, deviceId: string, password?: string): Promise<LoginResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ registrationNumber, deviceId, password }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ API Error (login):', error);
      return {
        success: false,
        message: 'Network error. Please check your connection.',
      };
    }
  },

  /**
   * Validate current session
   */
  validateSession: async (token: string, sessionId: string): Promise<ValidateSessionResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/validate-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, sessionId }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ API Error (validateSession):', error);
      return {
        isValid: false,
        reason: 'network_error',
      };
    }
  },

  /**
   * Logout current session
   */
  logout: async (token: string, sessionId: string): Promise<LogoutResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, sessionId }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ API Error (logout):', error);
      return {
        success: false,
        message: 'Network error during logout.',
      };
    }
  },

  /**
   * Set password for first-time onboarding
   */
  setPassword: async (
    registrationNumber: string,
    password: string,
    confirmPassword: string,
    token?: string | null,
    sessionId?: string | null
  ): Promise<SetPasswordResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/set-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationNumber,
          password,
          confirmPassword,
          token,
          sessionId,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ API Error (setPassword):', error);
      return {
        success: false,
        message: 'Network error. Please check your connection.',
      };
    }
  },
};

/**
 * Helper to get API base URL (useful for debugging)
 */
export const getApiBaseUrl = () => API_BASE_URL;

