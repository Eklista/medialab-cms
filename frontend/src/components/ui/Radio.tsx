import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  label?: string;
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  hint?: string;
  orientation?: 'horizontal' | 'vertical';
}

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

// Componente Radio individual
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ 
    className, 
    label,
    description,
    checked,
    onChange,
    id,
    ...props 
  }, ref) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

    const handleClick = () => {
      if (onChange) {
        const event = {
          target: { checked: !checked },
          currentTarget: { checked: !checked },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    return (
      <div className="flex items-start">
        <div className="relative flex items-center">
          <input
            type="radio"
            id={radioId}
            className="sr-only"
            checked={checked}
            onChange={onChange}
            ref={ref}
            {...props}
          />
          
          <motion.div
            className={clsx(
              'w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors duration-200',
              checked 
                ? 'border-white bg-white' 
                : 'border-zinc-700 hover:border-zinc-600',
              className
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
          >
            {checked && (
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-zinc-900"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.1 }}
              />
            )}
          </motion.div>
        </div>
        
        {label && (
          <label 
            htmlFor={radioId}
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
    );
  }
);

Radio.displayName = 'Radio';

// Componente RadioGroup
const RadioGroup = ({ 
  label, 
  name, 
  options, 
  value, 
  onChange, 
  error, 
  hint,
  orientation = 'vertical' 
}: RadioGroupProps) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-text-primary font-medium text-sm">
          {label}
        </label>
      )}
      
      <div className={clsx(
        'gap-4',
        orientation === 'horizontal' ? 'flex flex-wrap' : 'space-y-3'
      )}>
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange?.(option.value)}
            label={option.label}
            description={option.description}
            disabled={option.disabled}
          />
        ))}
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
};

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;