import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'published' | 'draft' | 'archived' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    className, 
    variant = 'info', 
    size = 'md',
    children, 
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center rounded-full font-medium transition-colors';
    
    const variants = {
      published: 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20',
      draft: 'text-amber-400 bg-amber-500/10 border border-amber-500/20',
      archived: 'text-zinc-400 bg-zinc-500/10 border border-zinc-500/20',
      success: 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20',
      error: 'text-red-400 bg-red-500/10 border border-red-500/20',
      warning: 'text-amber-400 bg-amber-500/10 border border-amber-500/20',
      info: 'text-blue-400 bg-blue-500/10 border border-blue-500/20',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-xs',
    };

    const badgeStyles = clsx(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    );

    return (
      <span
        className={badgeStyles}
        style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;