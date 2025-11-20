import api from './api';
import type { AuthRequest, AuthResponse, RegisterRequest } from '@/types/auth.types';

export const authService = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },

  async login(data: AuthRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('auth_token');
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
