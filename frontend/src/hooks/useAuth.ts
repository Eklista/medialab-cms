import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

export function useAuth() {
  const store = useAuthStore();
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
  } = store;

  useEffect(() => {
    initialize();
  }, [initialize]);

  const loginWithCredentials = async (email: string, password: string) => {
    try {
      // Llamar al store login que maneja toda la lógica
      await loginStore(email, password);
      
      // Obtener el estado actualizado inmediatamente
      const currentState = useAuthStore.getState();
      console.log('State after login:', currentState);
      
      return { 
        success: true, 
        role: currentState.role,
        isAuthenticated: currentState.isAuthenticated 
      };
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

  // Debug helper
  const getDebugInfo = () => ({
    user,
    token: token ? '***' + token.slice(-10) : null,
    role,
    permissions,
    isAuthenticated,
    storeState: store
  });

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
    
    // Debug
    getDebugInfo,
  };
}