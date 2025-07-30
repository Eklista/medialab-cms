import { useEffect } from 'react';
import type { HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { X } from 'lucide-react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
  children,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      y: 20
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay animado */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleOverlayClick}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
          />
          
          {/* Modal animado */}
          <motion.div
            className={clsx(
              'relative bg-surface border border-border rounded-xl shadow-xl mx-4 w-full',
              sizes[size]
            )}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              duration: 0.3
            }}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <motion.div 
                className="flex items-center justify-between p-6 border-b border-border"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <div>
                  {title && (
                    <h2 
                      className="text-lg font-semibold text-text-primary"
                      style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="text-sm text-text-secondary mt-1">
                      {description}
                    </p>
                  )}
                </div>
                
                {showCloseButton && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="text-text-secondary hover:text-text-primary"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}
            
            {/* Content */}
            <motion.div 
              className="p-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

// Sub-componentes
export const ModalHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx('flex flex-col space-y-1.5 text-center sm:text-left', className)}
    {...props}
  />
);

export const ModalFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);