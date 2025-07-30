import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    label, 
    error, 
    hint, 
    fullWidth = true,
    resize = 'vertical',
    rows = 4,
    id,
    ...props 
  }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    
    const resizeStyles = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };
    
    const textareaStyles = clsx(
      'bg-zinc-800 border text-white placeholder-zinc-400 px-3 py-2.5 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
      error 
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
        : 'border-zinc-700 focus:border-white/30 focus:ring-white/20',
      resizeStyles[resize],
      fullWidth ? 'w-full' : '',
      className
    );

    return (
      <div className={clsx('space-y-2', fullWidth && 'w-full')}>
        {label && (
          <label 
            htmlFor={textareaId}
            className="block text-text-primary font-medium text-sm"
          >
            {label}
          </label>
        )}
        
        <textarea
          id={textareaId}
          className={textareaStyles}
          rows={rows}
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

Textarea.displayName = 'Textarea';

export default Textarea;