import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  lines?: number;
  animation?: 'pulse' | 'wave' | 'none';
}

export default function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  lines = 1,
  animation = 'pulse',
}: SkeletonProps) {
  const baseStyles = 'bg-zinc-800 rounded';
  
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded',
  };

  const getAnimationStyles = () => {
    if (animation === 'none') return {};
    
    if (animation === 'wave') {
      return {
        background: 'linear-gradient(90deg, #27272a 25%, #3f3f46 50%, #27272a 75%)',
        backgroundSize: '200% 100%',
      };
    }
    
    return {}; // pulse handled by motion
  };

  const getAnimationProps = () => {
    if (animation === 'none') return {};
    
    if (animation === 'pulse') {
      return {
        animate: { opacity: [0.5, 1, 0.5] },
        transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const }
      };
    }
    
    if (animation === 'wave') {
      return {
        animate: { backgroundPosition: ['200% 0', '-200% 0'] },
        transition: { duration: 1.5, repeat: Infinity, ease: 'linear' as const }
      };
    }
    
    return {};
  };

  const skeletonStyles = clsx(
    baseStyles,
    variants[variant],
    className
  );

  const style = {
    width,
    height,
    ...getAnimationStyles(),
  };

  // For text variant with multiple lines
  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <motion.div
            key={index}
            className={skeletonStyles}
            style={{
              width: index === lines - 1 ? '75%' : '100%',
              ...getAnimationStyles(),
            }}
            {...getAnimationProps()}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={skeletonStyles}
      style={style}
      {...getAnimationProps()}
    />
  );
}

// Pre-built skeleton patterns
export const SkeletonCard = () => (
  <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
    <div className="flex items-center space-x-3">
      <Skeleton variant="circular" width={40} height={40} />
      <div className="space-y-2 flex-1">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
    <Skeleton variant="text" lines={3} />
    <div className="flex space-x-2">
      <Skeleton width={80} height={32} />
      <Skeleton width={80} height={32} />
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-3">
    {/* Header */}
    <div className="flex space-x-4 border-b border-border pb-2">
      <Skeleton width="25%" height={20} />
      <Skeleton width="30%" height={20} />
      <Skeleton width="20%" height={20} />
      <Skeleton width="25%" height={20} />
    </div>
    
    {/* Rows */}
    {Array.from({ length: rows }).map((_, index) => (
      <div key={index} className="flex space-x-4 items-center py-2">
        <Skeleton width="25%" height={16} />
        <Skeleton width="30%" height={16} />
        <Skeleton width="20%" height={16} />
        <Skeleton width="25%" height={16} />
      </div>
    ))}
  </div>
);

export const SkeletonList = ({ items = 5 }: { items?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: items }).map((_, index) => (
      <div key={index} className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
        <Skeleton variant="circular" width={32} height={32} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="50%" />
        </div>
        <Skeleton width={60} height={24} />
      </div>
    ))}
  </div>
);