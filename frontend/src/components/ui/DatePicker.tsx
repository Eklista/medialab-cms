import { forwardRef, useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import { Calendar } from 'lucide-react';
import { clsx } from 'clsx';

interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ 
    className, 
    label, 
    error, 
    hint, 
    fullWidth = true,
    id,
    ...props 
  }, ref) => {
    const [focused, setFocused] = useState(false);
    const dateId = id || `date-${Math.random().toString(36).substr(2, 9)}`;
    
    const inputStyles = clsx(
      'bg-zinc-800 border text-white placeholder-zinc-400 px-3 py-2.5 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background pr-10',
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
            htmlFor={dateId}
            className="block text-text-primary font-medium text-sm"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <input
            type="date"
            id={dateId}
            className={inputStyles}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            ref={ref}
            {...props}
          />
          
          <Calendar className={clsx(
            'absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none transition-colors duration-200',
            focused ? 'text-white' : 'text-zinc-400'
          )} />
        </div>
        
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

DatePicker.displayName = 'DatePicker';

export default DatePicker;