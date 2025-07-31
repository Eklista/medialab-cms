import { Menu, Bell, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../hooks';
import Button from '../../../components/ui/Button';

interface ClientNavbarProps {
  onMenuClick: () => void;
}

export default function ClientNavbar({ onMenuClick }: ClientNavbarProps) {
  const { user, logout } = useAuth();

  return (
    <motion.nav 
      className="bg-surface border-b border-border sticky top-0 z-40"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onMenuClick}
              className="lg:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <Menu className="h-6 w-6" />
            </motion.button>

            {/* Logo/Title for mobile */}
            <div className="lg:hidden ml-2">
              <h1 className="text-lg font-semibold text-text-primary">
                Portal Cliente
              </h1>
            </div>

            {/* Search bar - Hidden on mobile */}
            <div className="hidden lg:block ml-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Buscar podcasts..."
                  className="w-64 bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-white/30 outline-none transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <Bell className="h-5 w-5" />
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </motion.button>

            {/* User menu */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-text-primary">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-xs text-text-secondary">Cliente</p>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Avatar */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="h-8 w-8 bg-zinc-700 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <User className="h-4 w-4 text-text-secondary" />
                </motion.div>

                {/* Logout button - Desktop */}
                <div className="hidden lg:block">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="text-text-secondary hover:text-red-400"
                  >
                    Salir
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}