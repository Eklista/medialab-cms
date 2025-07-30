// Tipos básicos para roles
export type Role = 'admin' | 'collaborator' | 'client';

// Mapeo de roles en español
export const ROLE_LABELS = {
  admin: 'Administrador',
  collaborator: 'Colaborador', 
  client: 'Cliente',
} as const;

// Colores por rol para UI
export const ROLE_COLORS = {
  admin: 'bg-red-500/10 text-red-400 border-red-500/20',
  collaborator: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  client: 'bg-green-500/10 text-green-400 border-green-500/20',
} as const;

// Hook simple para usar en componentes
export function useRole() {
  // Este hook podría extenderse para obtener permisos del backend
  return {
    ROLE_LABELS,
    ROLE_COLORS,
  };
}