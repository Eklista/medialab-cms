import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export default function Loading({ 
  size = 'md', 
  variant = 'spinner',
  text,
  fullScreen = false,
  className 
}: LoadingProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const Spinner = () => (
    <motion.div
      className={clsx(
        'border-2 border-zinc-600 border-t-white rounded-full',
        sizes[size]
      )}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );

  const Dots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={clsx(
            'bg-white rounded-full',
            size === 'sm' ? 'w-1.5 h-1.5' : 
            size === 'md' ? 'w-2 h-2' :
            size === 'lg' ? 'w-2.5 h-2.5' : 'w-3 h-3'
          )}
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );

  const Pulse = () => (
    <motion.div
      className={clsx(
        'bg-white rounded-full',
        sizes[size]
      )}
      animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  );

  const LoadingComponent = () => {
    switch (variant) {
      case 'dots':
        return <Dots />;
      case 'pulse':
        return <Pulse />;
      default:
        return <Spinner />;
    }
  };

  const content = (
    <div className={clsx(
      'flex flex-col items-center justify-center space-y-3',
      className
    )}>
      <LoadingComponent />
      {text && (
        <motion.p 
          className="text-text-secondary text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}