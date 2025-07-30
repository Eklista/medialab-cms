import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    label, 
    error, 
    hint, 
    fullWidth = true,
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    const inputStyles = clsx(
      'bg-zinc-800 border text-white placeholder-zinc-400 px-3 py-2.5 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
      error 
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
        : 'border-zinc-700 focus:border-white/30 focus:ring-white/20',
      fullWidth ? 'w-full' : '',
      className
    );

    return (
      <div className={clsx('space-y-2', fullWidth && 'w-full')}>
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-text-primary font-medium text-sm"
          >
            {label}
          </label>
        )}
        
        <input
          id={inputId}
          className={inputStyles}
          ref={ref}
          {...props}
        />
        
        {error && (
          <p className="text-red-400 text-xs font-medium">
            {error}
          </p>
        )}
        
        {hint && !error && (
          <p className="text-text-secondary text-xs">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;