import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import type { Role } from '../../utils/permissions';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: Role[];
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export default function RoleGuard({ 
  children, 
  allowedRoles, 
  redirectTo = '/dashboard', 
  fallback 
}: RoleGuardProps) {
  const { role, isAuthenticated } = useAuth();

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // Si no tiene el rol permitido
  if (role && !allowedRoles.includes(role)) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}

// Componente simple para acceso denegado
export function AccessDenied({ 
  message = "No tienes permisos para acceder a esta sección",
  allowedRoles 
}: { 
  message?: string;
  allowedRoles?: string[];
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h1 className="text-xl font-semibold text-text-primary mb-2">
          Acceso Denegado
        </h1>
        
        <p className="text-text-secondary mb-4">
          {message}
        </p>
        
        {allowedRoles && (
          <p className="text-xs text-text-secondary">
            Roles permitidos: {allowedRoles.join(', ')}
          </p>
        )}
        
        <button 
          onClick={() => window.history.back()}
          className="mt-4 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
        >
          Volver
        </button>
      </div>
    </div>
  );
}