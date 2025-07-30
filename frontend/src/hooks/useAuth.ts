import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { apiClient } from '../services/api';

export function useAuth() {
  const {
    user,
    token,
    role,
    permissions,
    isAuthenticated,
    login: loginStore,
    logout,
    updateToken,
    setUser,
    initialize,
  } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const loginWithCredentials = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });

      if ((response as any).data) {
        // Llamar al store login que maneja toda la lógica
        await loginStore(email, password);
        
        return { success: true };
      } else {
        return {
          success: false,
          error: 'Credenciales inválidas',
        };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      let errorMessage = 'Error al iniciar sesión';
      
      if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Error de conexión al servidor';
      } else if (error.response?.status === 401) {
        errorMessage = 'Credenciales incorrectas';
      } else if (error.response?.status === 429) {
        errorMessage = 'Demasiados intentos. Intenta más tarde';
      } else if (!navigator.onLine) {
        errorMessage = 'Sin conexión a internet';
      }
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  // Helpers de rol
  const isAdmin = role === 'admin';
  const isCollaborator = role === 'collaborator';
  const isClient = role === 'client';

  // Helper para verificar permisos dinámicos
  const hasPermission = (permission: string) => {
    return permissions.includes(permission);
  };

  return {
    // Estado
    user,
    token,
    role,
    permissions,
    isAuthenticated,
    
    // Helpers de rol
    isAdmin,
    isCollaborator,
    isClient,
    
    // Helper de permisos
    hasPermission,
    
    // Acciones
    login: loginWithCredentials,
    logout,
    updateToken,
    setUser,
  };
}