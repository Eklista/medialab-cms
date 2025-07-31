import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Mic, 
  FolderOpen,
  FileText
} from 'lucide-react';

const bottomNavItems = [
  {
    name: 'Inicio',
    href: '/client/portal',
    icon: LayoutDashboard,
  },
  {
    name: 'Podcasts',
    href: '/client/podcasts',
    icon: Mic,
  },
  {
    name: 'Proyectos',
    href: '/client/proyectos',
    icon: FolderOpen,
  },
  {
    name: 'Solicitudes',
    href: '/client/solicitudes',
    icon: FileText,
  },
];

export default function ClientBottomBar() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
    >
      <div className="bg-surface border-t border-border backdrop-blur-sm">
        <nav className="flex items-center justify-around py-2">
          {bottomNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-text-secondary hover:text-text-primary'
                }`
              }
            >
              {({ isActive }) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center space-y-1"
                >
                  <div className={`p-2 rounded-lg transition-all duration-200 ${
                    isActive ? 'bg-white' : 'hover:bg-zinc-800'
                  }`}>
                    <item.icon 
                      className={`h-5 w-5 ${
                        isActive ? 'text-zinc-900' : ''
                      }`} 
                    />
                  </div>
                  <span className={`text-xs font-medium ${
                    isActive ? 'text-white' : ''
                  }`}>
                    {item.name}
                  </span>
                </motion.div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </motion.div>
  );
}