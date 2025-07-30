import { motion } from 'framer-motion';
import Card from '../../../components/ui/Card';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 
            className="text-3xl font-bold text-white mb-2"
            style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
          >
            Medialab CRM
          </h1>
          <p className="text-text-secondary text-sm">
            Universidad Galileo
          </p>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 
                className="text-xl font-semibold text-text-primary mb-2"
                style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
              >
                {title}
              </h2>
              {subtitle && (
                <p className="text-text-secondary text-sm">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {children}
            </motion.div>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-6"
        >
          <p className="text-text-secondary text-xs">
            Sistema de gestión de medios audiovisuales
          </p>
        </motion.div>
      </div>
    </div>
  );
}