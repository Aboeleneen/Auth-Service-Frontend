import axios from 'axios';
import { SignInFormData, SignUpFormData } from '../types/auth';
import { setupAxiosInterceptors } from '../utils/axiosInterceptor';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Define the refresh token function
const refreshToken = async () => {
  const response = await api.post('/auth/refresh');
  return response.data;
};

// Setup axios interceptors for token refresh
setupAxiosInterceptors(api, refreshToken);

export const authService = {
  signUp: async (data: SignUpFormData) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  
  signIn: async (data: SignInFormData) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  signOut: async () => {
    const response = await api.delete('/auth/logout');
    return response.data;
  },

  refreshToken
};

export default api; 