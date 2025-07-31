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

// Mapeo completo de UUIDs de roles de Directus a nombres legibles
const DIRECTUS_ROLE_MAPPING: Record<string, 'admin' | 'collaborator' | 'client'> = {
  '7597297e-2a1e-4386-a15d-a9b43f56e55b': 'admin',
  '53f55517d-5cad-482e-98b8-67eee0559912': 'client',
  'd708b4c4-7f64-457d-b9c8-4b266a453626': 'collaborator',
};

function mapDirectusRole(directusRole: string): 'admin' | 'collaborator' | 'client' {
  const mappedRole = DIRECTUS_ROLE_MAPPING[directusRole];
  if (mappedRole) {
    return mappedRole;
  }
  
  // Si no encontramos el mapeo, log del UUID para facilitar la configuración
  console.warn(`Role UUID ${directusRole} not mapped. Available mappings:`, DIRECTUS_ROLE_MAPPING);
  console.warn('Defaulting to "client". Please add this UUID to DIRECTUS_ROLE_MAPPING.');
  return 'client';
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
          const userData = (userResponse as any).data;

          if (import.meta.env.DEV) {
            console.log('User data received:', userData);
            console.log('Raw role from Directus:', userData.role);
          }

          // Mapear el UUID del rol a un nombre legible
          const mappedRole = mapDirectusRole(userData.role);
          
          if (import.meta.env.DEV) {
            console.log('Mapped role:', mappedRole);
          }

          const authState = {
            user: userData,
            token: access_token,
            role: mappedRole,
            permissions: [],
            isAuthenticated: true,
          };

          set(authState);
          
          if (import.meta.env.DEV) {
            console.log('Auth state updated:', authState);
          }
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
        const mappedRole = mapDirectusRole(user.role);
        set({
          user,
          role: mappedRole,
        });
      },

      initialize: () => {
        const token = localStorage.getItem(env.AUTH_TOKEN_KEY);
        const storedState = localStorage.getItem('auth-store');
        
        if (token && storedState) {
          try {
            const parsedState = JSON.parse(storedState);
            if (parsedState.state?.user && parsedState.state?.role) {
              apiClient.updateToken(token);
              
              // Re-mapear el rol en caso de que haya cambiado el mapeo
              const mappedRole = typeof parsedState.state.role === 'string' && 
                                parsedState.state.role.includes('-') 
                                ? mapDirectusRole(parsedState.state.role)
                                : parsedState.state.role;

              const initState = {
                token, 
                isAuthenticated: true,
                user: parsedState.state.user,
                role: mappedRole,
                permissions: parsedState.state.permissions || []
              };

              set(initState);
              
              if (import.meta.env.DEV) {
                console.log('Auth state initialized from storage:', initState);
              }
            }
          } catch (error) {
            console.error('Error parsing stored auth state:', error);
            localStorage.removeItem(env.AUTH_TOKEN_KEY);
            localStorage.removeItem(env.AUTH_REFRESH_KEY);
            localStorage.removeItem('auth-store');
          }
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