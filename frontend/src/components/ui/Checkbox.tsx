import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { clsx } from 'clsx';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    className, 
    label,
    description,
    error,
    checked,
    onChange,
    id,
    ...props 
  }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    const handleClick = () => {
      const input = document.getElementById(checkboxId) as HTMLInputElement;
      if (input && onChange) {
        const event = {
          target: { checked: !checked },
          currentTarget: { checked: !checked },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    return (
      <div className="space-y-2">
        <div className="flex items-start">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id={checkboxId}
              className="sr-only"
              checked={checked}
              onChange={onChange}
              ref={ref}
              {...props}
            />
            
            <motion.div
              className={clsx(
                'w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-colors duration-200',
                checked 
                  ? 'bg-white border-white text-zinc-900' 
                  : 'border-zinc-700 hover:border-zinc-600',
                error && 'border-red-500',
                className
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
            >
              {checked && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <Check className="w-3 h-3" />
                </motion.div>
              )}
            </motion.div>
          </div>
          
          {label && (
            <label 
              htmlFor={checkboxId}
              className="ml-3 text-sm font-medium text-text-primary cursor-pointer select-none"
              onClick={handleClick}
            >
              {label}
              {description && (
                <p className="text-xs text-text-secondary mt-1 font-normal">
                  {description}
                </p>
              )}
            </label>
          )}
        </div>
        
        {error && (
          <p className="text-red-400 text-xs font-medium ml-7">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;