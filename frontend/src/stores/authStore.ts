import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { env } from '../config/env';
import { apiClient } from '../services/api';
import type { User, AuthState } from '../types';

interface AuthStore extends AuthState {
  permissions: string[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateToken: (token: string) => void;
  setUser: (user: User) => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
      permissions: [],

      login: async (email: string, password: string) => {
        try {
          const response = await apiClient.post('/auth/login', {
            email,
            password,
          });

          const responseData = (response as any).data;
          const { access_token, refresh_token } = responseData;

          if (!access_token) {
            throw new Error('No access token received');
          }

          localStorage.setItem(env.AUTH_TOKEN_KEY, access_token);
          if (refresh_token) {
            localStorage.setItem(env.AUTH_REFRESH_KEY, refresh_token);
          }

          apiClient.updateToken(access_token);

          // Obtener información del usuario
          const userResponse = await apiClient.get('/users/me');
          const user = (userResponse as any).data;

          // En Directus, los permisos se manejan automáticamente por el backend
          // a través de las policies del rol, no necesitamos un endpoint separado
          set({
            user,
            token: access_token,
            role: user.role as 'admin' | 'collaborator' | 'client',
            permissions: [], // Las permissions las maneja Directus automáticamente
            isAuthenticated: true,
          });
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem(env.AUTH_TOKEN_KEY);
        localStorage.removeItem(env.AUTH_REFRESH_KEY);
        
        apiClient.updateToken('');
        
        set({
          user: null,
          token: null,
          role: null,
          permissions: [],
          isAuthenticated: false,
        });
      },

      updateToken: (token: string) => {
        localStorage.setItem(env.AUTH_TOKEN_KEY, token);
        apiClient.updateToken(token);
        set({ token, isAuthenticated: !!token });
      },

      setUser: (user: User) => {
        set({
          user,
          role: user.role as 'admin' | 'collaborator' | 'client',
        });
      },

      initialize: () => {
        const token = localStorage.getItem(env.AUTH_TOKEN_KEY);
        if (token) {
          apiClient.updateToken(token);
          set({ token, isAuthenticated: true });
        }
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        role: state.role,
        permissions: state.permissions,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);