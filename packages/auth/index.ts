import { api } from '../api/client';

export const auth = {
  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('voicify_token');
    }
    return null;
  },
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('voicify_token', token);
    }
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('voicify_token');
      window.location.href = '/login';
    }
  },
  isAuthenticated: () => {
    return !!auth.getToken();
  }
};
