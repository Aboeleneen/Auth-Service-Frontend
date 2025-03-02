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

// Define the refresh token function using native fetch to avoid axios interceptors completely
const refreshToken = async () => {
  try {
    // Use fetch instead of axios to completely bypass the axios interceptors
    const response = await fetch(`${config.baseURL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include', // Include cookies
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

// Simple flag to prevent multiple refresh attempts
let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Only attempt to refresh the token if:
    // 1. The error is a 401 Unauthorized
    // 2. We haven't already tried to refresh for this request
    // 3. We're not already in the process of refreshing
    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshing) {
      originalRequest._retry = true;
      isRefreshing = true;
      
      try {
        // Attempt to refresh the token using fetch (not axios)
        await refreshToken();
        
        // Reset the refreshing flag
        isRefreshing = false;
        
        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Reset the refreshing flag
        isRefreshing = false;
        
        return Promise.reject(refreshError);
      }
    }
    
    // For other errors, just reject the promise
    return Promise.reject(error);
  }
);

export default axiosInstance;
