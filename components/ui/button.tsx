import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/utils';
import { VariantProps, cva } from 'class-variance-authority';

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof btnVarians> {
  type: 'submit' | 'button';
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const btnVarians = cva(
  'inline-flex items-center justify-center text-white transition-colors ease-in ',
  {
    variants: {
      variants: {
        default: 'bg-dark-gray hover:bg-gray/20 hover:border-white',
        outlined:
          'border border-border bg-dark-gray-accent bg-none hover:bg-white hover:text-black hover:border-white',
        'ghost-outlined':
          'text-white border border-border bg-none hover:bg-border hover:text-white',
        icon: 'text-white mx-1 border-none font-none bg-gray/50 hover:bg-gray',
      },
      size: {
        default: 'py-2 px-4',
        sm: 'py-1.5 px-2.5',
        md: 'py-4 px-6',
        lg: 'py-6 px-8',
        none: 'py-0 px-0',
      },
      font: {
        default: 'font-normal',
        bolded: 'font-bold',
      },
    },
    defaultVariants: {
      font: 'default',
      variants: 'default',
    },
  }
);

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ type, children, className, size, variants, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        type={type}
        onClick={onClick}
        className={cn(btnVarians({ variants, size, className }))}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
