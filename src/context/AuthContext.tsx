import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { authService } from '../services/api';
import { AuthContextType, AuthState, SignInFormData, SignUpFormData, User } from '../types/auth';

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  signUp: async () => {},
  signIn: async () => {},
  signOut: () => {},
  clearError: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const loadUser = async () => {
      if (state.token) {
        try {
          const userData = await authService.getCurrentUser();
          setState(prevState => ({
            ...prevState,
            user: userData,
            isAuthenticated: true,
            isLoading: false,
          }));
        } catch (error) {
          localStorage.removeItem('token');
          setState(prevState => ({
            ...prevState,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: 'Session expired. Please sign in again.',
          }));
        }
      } else {
        setState(prevState => ({
          ...prevState,
          isLoading: false,
        }));
      }
    };

    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const signUp = async (data: SignUpFormData) => {
    try {
      setState(prevState => ({ ...prevState, isLoading: true, error: null, isAuthenticated: false }));
      const response = await authService.signUp(data);
      
      localStorage.setItem('token', response.token);
      
      setState(prevState => ({
        ...prevState,
        user: response.user,
        token: response.token,
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
      
      localStorage.setItem('token', response.token);
      
      setState(prevState => ({
        ...prevState,
        user: response.user,
        token: response.token,
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

  const signOut = () => {
    localStorage.removeItem('token');
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    toast.info('Signed out successfully');
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