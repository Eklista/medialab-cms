import { forwardRef } from 'react';
import type { LabelHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optional?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ 
    className, 
    children,
    required = false,
    optional = false,
    size = 'md',
    ...props 
  }, ref) => {
    const sizes = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    const labelStyles = clsx(
      'block font-medium text-text-primary mb-2',
      sizes[size],
      className
    );

    return (
      <label
        className={labelStyles}
        ref={ref}
        {...props}
      >
        {children}
        {required && (
          <span className="text-red-400 ml-1">*</span>
        )}
        {optional && (
          <span className="text-text-secondary text-xs font-normal ml-1">(opcional)</span>
        )}
      </label>
    );
  }
);

Label.displayName = 'Label';

export default Label;