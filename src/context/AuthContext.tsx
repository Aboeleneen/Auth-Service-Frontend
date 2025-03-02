import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { authService } from '../services/api';
import { AuthContextType, AuthState, SignInFormData, SignUpFormData, User } from '../types/auth';

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  clearError: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setState(prevState => ({
          ...prevState,
          user: userData,
          isAuthenticated: true,
          isLoading: false,
        }));
      } catch (error) {
        setState(prevState => ({
          ...prevState,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        }));
      }
    };

    loadUser();
  }, []);

  const signUp = async (data: SignUpFormData) => {
    try {
      setState(prevState => ({ ...prevState, isLoading: true, error: null, isAuthenticated: false }));
      const response = await authService.signUp(data);
      
      setState(prevState => ({
        ...prevState,
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      }));
      
      toast.success('Account created successfully!');
    } catch (error: any) {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        isAuthenticated: false,
        error: error.response?.data?.message || 'Failed to sign up. Please try again.',
      }));
      toast.error(error.response?.data?.message || 'Failed to sign up. Please try again.');
    }
  };

  const signIn = async (data: SignInFormData) => {
    try {
      setState(prevState => ({ ...prevState, isLoading: true, error: null, isAuthenticated: false }));
      const response = await authService.signIn(data);
      
      setState(prevState => ({
        ...prevState,
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      }));
      
      toast.success('Signed in successfully!');
    } catch (error: any) {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        error: error.response?.data?.message || 'Invalid credentials. Please try again.',
      }));
      toast.error(error.response?.data?.message || 'Invalid credentials. Please try again.');
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      toast.info('Signed out successfully');
    } catch (error: any) {
      toast.error('Error signing out. Please try again.');
    }
  };

  const clearError = () => {
    setState(prevState => ({ ...prevState, error: null }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        signOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 