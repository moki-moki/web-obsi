import { cn } from '@/utils/utils';
import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export const inputVariants = cva(
  'bg-primary-color outline-none text-text-color w-full p-2 border border-border-color focus:ring-2 focus:ring-color-info',
  {
    variants: {
      variants: {
        default: 'bg-primary-color',
      },
      rounded: {
        sm: 'rounded',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variants: 'default',
    },
  }
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, className, rounded, variants, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ variants, rounded, className }))}
        type={type}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
