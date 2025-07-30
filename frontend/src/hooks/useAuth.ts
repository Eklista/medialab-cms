import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

export function useAuth() {
  const {
    user,
    token,
    role,
    isAuthenticated,
    login,
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
      await login(email, password);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const isAdmin = role === 'admin';
  const isCollaborator = role === 'collaborator';
  const isClient = role === 'client';

  return {
    // Estado
    user,
    token,
    role,
    isAuthenticated,
    
    // Helpers de rol
    isAdmin,
    isCollaborator,
    isClient,
    
    // Acciones
    login: loginWithCredentials,
    logout,
    updateToken,
    setUser,
  };
}