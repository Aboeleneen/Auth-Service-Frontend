import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000,
  withCredentials: true, // Allow cookies to be sent and received across domains
};

const axiosInstance: AxiosInstance = axios.create(config);

const refreshToken = async () => {
  try {
    const response = await fetch(`${config.baseURL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
};

let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
   
    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshing) {
      originalRequest._retry = true;
      isRefreshing = true;
      
      try {
        await refreshToken();
        
        isRefreshing = false;
        
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        
        return Promise.reject(refreshError);
      }
    }
        return Promise.reject(error);
  }
);

export default axiosInstance;
