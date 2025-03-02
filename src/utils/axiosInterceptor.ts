import axios, { AxiosInstance } from 'axios';

// Create a function to setup axios interceptors for token refresh
export const setupAxiosInterceptors = (api: AxiosInstance, refreshTokenFn: () => Promise<any>) => {
  // Response interceptor for handling 401 errors and refreshing tokens
  api.interceptors.response.use(
    (response) => response, // Return successful responses as-is
    async (error) => {
      const originalRequest = error.config;
      
      // If the error is 401 (Unauthorized) and we haven't tried to refresh the token yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          // Try to refresh the token using the provided function
          await refreshTokenFn();
          
          // Retry the original request with the new token (which will be in cookies)
          return api(originalRequest);
        } catch (refreshError) {
          // If refresh token fails, redirect to login
          window.location.href = '/signin';
          return Promise.reject(refreshError);
        }
      }
      
      // For other errors, just reject the promise
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors; 