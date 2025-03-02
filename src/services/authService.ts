import { SignUpFormData } from "../types/auth";
import { SignInFormData } from "../types/auth";
import axiosInstance from "./axiosInstance";

export const authService = {
    signUp: async (data: SignUpFormData) => {
      const response = await axiosInstance.post('/auth/register', data);
      return response.data;
    },
    
    signIn: async (data: SignInFormData) => {
      const response = await axiosInstance.post('/auth/login', data);
      return response.data;
    },
    
    getCurrentUser: async () => {
      const response = await axiosInstance.get('/auth/me');
      return response.data;
    },
  
    signOut: async () => {
      const response = await axiosInstance.delete('/auth/logout');
      return response.data;
    },
};