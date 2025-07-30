import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  description?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ 
    className, 
    label,
    description,
    error,
    size = 'md',
    checked,
    onChange,
    disabled,
    id,
    ...props 
  }, ref) => {
    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

    const sizes = {
      sm: {
        track: 'w-8 h-4',
        thumb: 'w-3 h-3',
        translate: checked ? 'translate-x-4' : 'translate-x-0.5',
      },
      md: {
        track: 'w-11 h-6',
        thumb: 'w-5 h-5',
        translate: checked ? 'translate-x-5' : 'translate-x-0.5',
      },
      lg: {
        track: 'w-14 h-7',
        thumb: 'w-6 h-6',
        translate: checked ? 'translate-x-7' : 'translate-x-0.5',
      },
    };

    const handleClick = () => {
      if (!disabled && onChange) {
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
              id={switchId}
              className="sr-only"
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              ref={ref}
              {...props}
            />
            
            <motion.div
              className={clsx(
                'relative inline-flex rounded-full transition-colors duration-200 focus:outline-none cursor-pointer',
                sizes[size].track,
                checked 
                  ? 'bg-white' 
                  : 'bg-zinc-700',
                disabled && 'opacity-50 cursor-not-allowed',
                className
              )}
              whileHover={!disabled ? { scale: 1.02 } : {}}
              whileTap={!disabled ? { scale: 0.98 } : {}}
              onClick={handleClick}
            >
              <motion.span
                className={clsx(
                  'inline-block rounded-full shadow-lg transform transition-transform duration-200',
                  sizes[size].thumb,
                  checked ? 'bg-zinc-900' : 'bg-white'
                )}
                animate={{ 
                  x: checked ? 
                    (size === 'sm' ? 16 : size === 'md' ? 20 : 24) : 
                    2 
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.div>
          </div>
          
          {label && (
            <label 
              htmlFor={switchId}
              className={clsx(
                'ml-3 text-sm font-medium cursor-pointer select-none',
                disabled ? 'text-text-secondary' : 'text-text-primary'
              )}
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
          <p className="text-red-400 text-xs font-medium ml-14">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;