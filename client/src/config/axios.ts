import axios, { AxiosRequestConfig } from 'axios';

export const API_URL = 'http://localhost:4000/api';
export const ACCESS_POST_CREATE = 201;
export const ACCESS_REQUEST = 200;
export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});
$api.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = config.headers ?? {};
  config.headers.Authorization = `Bearer ${localStorage.getItem('authToken')}`;
  return config;
});
$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status == 401 && error.config && error.config._isRetry != true) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
        localStorage.setItem('authToken', response.data);
        return $api.request(originalRequest);
      } catch (e) {
        console.log('User not autorized');
      }
    }
    throw error;
  }
);
export const headers = {
  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZmEwOTZjYy1iOGMwLTQ3NWMtOGFkZS1jNTY3ODUzZDdkZTUiLCJlbWFpbCI6InBhdmVsLnBvZ3VsYWlsb0BnbWFpbC5jb20iLCJuYW1lIjoiYm9iIiwiaWF0IjoxNjczMTk2NDYwLCJleHAiOjE2NzMyODI4NjB9.BQBKTeAKpJqJiTnBQhLSjdvAqrBwoSAQh830TCA-T0Y`,
};
