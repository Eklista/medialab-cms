import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  error?: string;
  hint?: string;
  placeholder?: string;
  options: SelectOption[];
  fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className, 
    label, 
    error, 
    hint, 
    placeholder,
    options,
    fullWidth = true,
    id,
    ...props 
  }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    
    const selectStyles = clsx(
      'bg-zinc-800 border text-white px-3 py-2.5 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background appearance-none cursor-pointer',
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
            htmlFor={selectId}
            className="block text-text-primary font-medium text-sm"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <select
            id={selectId}
            className={selectStyles}
            ref={ref}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
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

Select.displayName = 'Select';

export default Select;