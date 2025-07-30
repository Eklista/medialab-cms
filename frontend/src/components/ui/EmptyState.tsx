import { motion } from 'framer-motion';
import { Search, FileX, Users, Calendar, AlertCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';
import Button from './Button';

interface EmptyStateProps {
  icon?: LucideIcon | 'search' | 'file' | 'users' | 'calendar' | 'error';
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const iconMap = {
  search: Search,
  file: FileX,
  users: Users,
  calendar: Calendar,
  error: AlertCircle,
};

export default function EmptyState({
  icon = 'file',
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  let IconComponent: LucideIcon;

  if (typeof icon === 'string') {
    IconComponent = iconMap[icon];
  } else {
    IconComponent = icon;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        'flex flex-col items-center justify-center text-center py-12 px-4',
        className
      )}
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mb-6"
      >
        <IconComponent className="w-8 h-8 text-text-secondary" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-md"
      >
        <h3 
          className="text-lg font-semibold text-text-primary mb-2"
          style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
        >
          {title}
        </h3>
        
        {description && (
          <p className="text-text-secondary text-sm mb-6">
            {description}
          </p>
        )}

        {/* Action */}
        {action && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button onClick={action.onClick}>
              {action.label}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}