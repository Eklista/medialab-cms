import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Mic, 
  FolderOpen,
  FileText, 
  Settings, 
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from '../../../hooks';

interface ClientSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/client/portal',
    icon: LayoutDashboard,
  },
  {
    name: 'Mis Podcasts',
    href: '/client/podcasts',
    icon: Mic,
  },
  {
    name: 'Mis Proyectos',
    href: '/client/proyectos',
    icon: FolderOpen,
  },
  {
    name: 'Solicitudes',
    href: '/client/solicitudes',
    icon: FileText,
  },
  {
    name: 'Configuración',
    href: '/client/configuracion',
    icon: Settings,
  },
];

export default function ClientSidebar({ isOpen, onClose }: ClientSidebarProps) {
  const { logout } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 left-0 z-50 w-64 h-full bg-surface border-r border-border lg:translate-x-0 lg:static lg:inset-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Mic className="w-4 h-4 text-zinc-900" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-text-primary">
                  Medialab
                </h1>
                <p className="text-xs text-text-secondary">Portal Cliente</p>
              </div>
            </div>
            
            {/* Close button - Mobile only */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="lg:hidden p-1 text-text-secondary hover:text-text-primary hover:bg-zinc-800 rounded"
            >
              <X className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => onClose()}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-zinc-900 shadow-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-zinc-800'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon 
                      className={`h-5 w-5 ${isActive ? 'text-zinc-900' : ''}`} 
                    />
                    <span className={isActive ? 'font-semibold' : ''}>
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={logout}
              className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium text-text-secondary hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-all duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span>Cerrar Sesión</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}