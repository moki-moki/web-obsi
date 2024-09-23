import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/utils';
import { VariantProps, cva } from 'class-variance-authority';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof btnVarians> {
  type: 'submit' | 'button';
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const btnVarians = cva(
  'inline-flex items-center justify-center text-accent-color transition-colors ease-in',
  {
    variants: {
      variants: {
        default:
          'bg-primary-color hover:bg-primary-color/20 hover:border-white hover:text-accent-color',
        'warning-outlined':
          'border bg-none border-color-error text-color-error hover:text-accent-color hover:bg-color-error',
        outlined:
          'border border-border-color bg-primary-color bg-none hover:bg-accent-color hover:text-secondary-color hover:border-accent-color',
        'ghost-outlined':
          'text-accent-color border border-border-color bg-none hover:bg-border-color hover:text-accent-color',
        icon: 'text-text-color mx-1 border-none rounded-full font-none hover:text-accent-color hover:bg-primary-color/20',
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
      size: 'default',
    },
  }
);

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ type, children, font, className, size, variants, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        type={type}
        onClick={onClick}
        className={cn(btnVarians({ variants, size, className, font }))}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
