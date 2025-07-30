import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  description?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ 
    className, 
    variant = 'info',
    title,
    description,
    dismissible = false,
    onDismiss,
    children,
    ...props 
  }, ref) => {
    const variants = {
      info: {
        container: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
        icon: Info,
      },
      success: {
        container: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
        icon: CheckCircle,
      },
      warning: {
        container: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
        icon: AlertTriangle,
      },
      error: {
        container: 'bg-red-500/10 border-red-500/20 text-red-400',
        icon: AlertCircle,
      },
    };

    const { container, icon: Icon } = variants[variant];

    const alertStyles = clsx(
      'relative rounded-lg border p-4',
      container,
      className
    );

    return (
      <motion.div
        className={alertStyles}
        ref={ref}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        {...(props as any)}
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <Icon className="h-5 w-5" />
          </div>
          
          <div className="ml-3 flex-1">
            {title && (
              <h3 
                className="text-sm font-semibold mb-1"
                style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
              >
                {title}
              </h3>
            )}
            
            {description && (
              <p className="text-sm opacity-90">
                {description}
              </p>
            )}
            
            {children && (
              <div className="mt-2">
                {children}
              </div>
            )}
          </div>
          
          {dismissible && onDismiss && (
            <div className="ml-auto pl-3">
              <motion.button
                className="inline-flex rounded-md p-1.5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-white/20"
                onClick={onDismiss}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;