import axios from 'axios';
import { SignInFormData, SignUpFormData } from '../types/auth';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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
};

export default api; 