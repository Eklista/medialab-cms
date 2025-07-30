import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'default', 
    padding = 'md',
    children, 
    ...props 
  }, ref) => {
    const baseStyles = 'bg-surface rounded-xl border border-border';
    
    const variants = {
      default: 'shadow-sm',
      hover: 'shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer',
      bordered: 'border-2',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const cardStyles = clsx(
      baseStyles,
      variants[variant],
      paddings[padding],
      className
    );

    return (
      <div
        className={cardStyles}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Sub-componentes opcionales
export const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx('flex flex-col space-y-1.5 pb-6', className)}
    {...props}
  />
);

export const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={clsx('text-lg font-semibold text-text-primary', className)}
    style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
    {...props}
  />
);

export const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={clsx('text-sm text-text-secondary', className)}
    {...props}
  />
);

export const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('pt-0', className)} {...props} />
);

export const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx('flex items-center pt-6', className)}
    {...props}
  />
);

export default Card;