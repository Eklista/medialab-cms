import { useState, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextValue {
  toast: (toast: Omit<Toast, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (newToast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: Toast = {
      id,
      duration: 5000,
      ...newToast,
    };

    setToasts((prev) => [...prev, toast]);

    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        dismiss(id);
      }, toast.duration);
    }
  };

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return createPortal(
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastComponent
            key={toast.id}
            toast={toast}
            onDismiss={() => onDismiss(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
}

interface ToastComponentProps {
  toast: Toast;
  onDismiss: () => void;
}

function ToastComponent({ toast, onDismiss }: ToastComponentProps) {
  const variants = {
    success: {
      container: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
      icon: CheckCircle,
    },
    error: {
      container: 'bg-red-500/10 border-red-500/20 text-red-400',
      icon: AlertCircle,
    },
    warning: {
      container: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
      icon: AlertTriangle,
    },
    info: {
      container: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
      icon: Info,
    },
  };

  const { container, icon: Icon } = variants[toast.variant || 'info'];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.5 }}
      transition={{ duration: 0.2 }}
      className={clsx(
        'relative rounded-lg border p-4 shadow-lg backdrop-blur-sm min-w-[300px] max-w-[420px]',
        container
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        
        <div className="ml-3 flex-1">
          {toast.title && (
            <h3 
              className="text-sm font-semibold mb-1"
              style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
            >
              {toast.title}
            </h3>
          )}
          
          {toast.description && (
            <p className="text-sm opacity-90">
              {toast.description}
            </p>
          )}
          
          {toast.action && (
            <div className="mt-3">
              <button
                className="text-sm font-medium hover:opacity-80 transition-opacity"
                onClick={toast.action.onClick}
              >
                {toast.action.label}
              </button>
            </div>
          )}
        </div>
        
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
      </div>
    </motion.div>
  );
}