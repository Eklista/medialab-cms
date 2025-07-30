import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import { useAuth } from './hooks/useAuth';

// Modules
import CMSRoutes from './modules/cms/routes';
import AuthRoutes from './modules/auth/routes';

// Role-based route redirection
function DashboardRedirect() {
  const { role, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirigir según el rol del usuario
  switch (role) {
    case 'admin':
      return <Navigate to="/admin/dashboard" replace />;
    case 'collaborator':
      return <Navigate to="/collaborator/dashboard" replace />;
    case 'client':
      return <Navigate to="/client/portal" replace />;
    default:
      return <Navigate to="/auth/login" replace />;
  }
}

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  
  return <>{children}</>;
}

// Public Route Component (redirect if authenticated)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <DashboardRedirect />;
  }
  
  return <>{children}</>;
}

// Role check components
function AdminCheck({ children }: { children: React.ReactNode }) {
  const { role } = useAuth();
  if (role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

function CollaboratorCheck({ children }: { children: React.ReactNode }) {
  const { role } = useAuth();
  if (role !== 'admin' && role !== 'collaborator') {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

function ClientCheck({ children }: { children: React.ReactNode }) {
  const { role } = useAuth();
  if (role !== 'client') {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes (Auth) */}
          <Route 
            path="/auth/*" 
            element={
              <PublicRoute>
                <AuthRoutes />
              </PublicRoute>
            } 
          />
          
          {/* CMS Routes (Public) */}
          <Route path="/cms/*" element={<CMSRoutes />} />
          
          {/* Dashboard redirect */}
          <Route path="/dashboard" element={<DashboardRedirect />} />

          {/* ADMIN MODULE */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminCheck>
                  <div className="min-h-screen bg-background">
                    <div className="p-8">
                      <h1 className="text-white text-2xl mb-4">Admin Dashboard</h1>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-surface p-6 rounded-lg border border-border">
                          <h2 className="text-lg font-semibold text-white mb-2">Gestión de Usuarios</h2>
                          <p className="text-text-secondary text-sm">Administrar roles y permisos</p>
                        </div>
                        <div className="bg-surface p-6 rounded-lg border border-border">
                          <h2 className="text-lg font-semibold text-white mb-2">Todas las Solicitudes</h2>
                          <p className="text-text-secondary text-sm">Ver y gestionar todas las solicitudes</p>
                        </div>
                        <div className="bg-surface p-6 rounded-lg border border-border">
                          <h2 className="text-lg font-semibold text-white mb-2">Analytics</h2>
                          <p className="text-text-secondary text-sm">Reportes y estadísticas</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AdminCheck>
              </ProtectedRoute>
            } 
          />

          {/* COLLABORATOR MODULE */}
          <Route 
            path="/collaborator/dashboard" 
            element={
              <ProtectedRoute>
                <CollaboratorCheck>
                  <div className="min-h-screen bg-background">
                    <div className="p-8">
                      <h1 className="text-white text-2xl mb-4">Collaborator Dashboard</h1>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-surface p-6 rounded-lg border border-border">
                          <h2 className="text-lg font-semibold text-white mb-2">Mis Tareas</h2>
                          <p className="text-text-secondary text-sm">Tareas asignadas y entregas</p>
                        </div>
                        <div className="bg-surface p-6 rounded-lg border border-border">
                          <h2 className="text-lg font-semibold text-white mb-2">Mis Proyectos</h2>
                          <p className="text-text-secondary text-sm">Proyectos en los que participo</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CollaboratorCheck>
              </ProtectedRoute>
            } 
          />

          {/* CLIENT MODULE */}
          <Route 
            path="/client/portal" 
            element={
              <ProtectedRoute>
                <ClientCheck>
                  <div className="min-h-screen bg-background">
                    <div className="p-8">
                      <h1 className="text-white text-2xl mb-4">Client Portal</h1>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-surface p-6 rounded-lg border border-border">
                          <h2 className="text-lg font-semibold text-white mb-2">Nueva Solicitud</h2>
                          <p className="text-text-secondary text-sm">Crear solicitud de servicio</p>
                          <button className="mt-4 bg-white text-zinc-900 px-4 py-2 rounded-lg font-medium">
                            Crear Solicitud
                          </button>
                        </div>
                        <div className="bg-surface p-6 rounded-lg border border-border">
                          <h2 className="text-lg font-semibold text-white mb-2">Mis Solicitudes</h2>
                          <p className="text-text-secondary text-sm">Ver estado de mis solicitudes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ClientCheck>
              </ProtectedRoute>
            } 
          />
          
          {/* Root Redirects */}
          <Route 
            path="/" 
            element={<Navigate to="/cms" replace />} 
          />
          
          {/* Fallback */}
          <Route 
            path="*" 
            element={
              <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-white text-4xl font-bold mb-4">404</h1>
                  <p className="text-text-secondary">Página no encontrada</p>
                </div>
              </div>
            } 
          />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;