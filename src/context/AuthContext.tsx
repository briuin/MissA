import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService, { AuthUser } from '../services/auth.service';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  clearError: () => void;
  needsConfirmation: boolean;
  signUpEmail: string | null;
  confirmSignUp: (code: string) => Promise<void>;
  resendConfirmation: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState<string | null>(null);

  // Initialize authentication state
  useEffect(() => {
    const initAuth = () => {
      try {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Authentication initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await authService.signUp(email, password);
      setNeedsConfirmation(true);
      setSignUpEmail(email);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An error occurred during signup';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const confirmSignUp = async (code: string) => {
    if (!signUpEmail) throw new Error('No email to confirm');
    setLoading(true);
    setError(null);
    try {
      await authService.confirmSignUp(signUpEmail, code);
      setNeedsConfirmation(false);
      setSignUpEmail(null);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Confirmation failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resendConfirmation = async () => {
    if (!signUpEmail) throw new Error('No email to resend confirmation');
    setLoading(true);
    setError(null);
    try {
      await authService.resendConfirmation(signUpEmail);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Resend failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      await authService.forgotPassword(email);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Forgot password failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.signIn(email, password);
      authService.storeTokens(response);
      
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Invalid email or password';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    authService.clearTokens();
    setUser(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    clearError,
    needsConfirmation,
    signUpEmail,
    confirmSignUp,
    resendConfirmation,
    forgotPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
