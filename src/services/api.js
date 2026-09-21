import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints report their own errors (invalid credentials, wrong current
// password, ...), so a 401/403 from them must not be treated as a dead session.
const AUTH_ENDPOINTS = ['/api/auth/login', '/api/auth/refresh', '/api/auth/forgot-password', '/api/auth/reset-password', '/api/auth/change-password'];

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || '';
    const isAuthEndpoint = AUTH_ENDPOINTS.some((path) => url.startsWith(path));
    // The admin panel restores its session from localStorage without asking the
    // backend, so an expired JWT (24h) or a revoked admin account keeps the UI
    // looking signed in while every /api/admin/** call is rejected. 401 (token
    // missing/expired) and 403 (token rejected by an older backend build) both
    // mean the stored session can no longer be used, so force a re-login
    // instead of letting mutations fail with a generic message.
    if ((status === 401 || status === 403) && !isAuthEndpoint) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      toast.warning('Your admin session is no longer valid. Please sign in again.');
      if (window.location.hash !== '#/admin/login') {
        window.location.href = '/#/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
