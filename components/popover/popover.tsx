import { HTMLAttributes, forwardRef, useState } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils/utils';

interface Props extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof popoverVarians> {
  text: string;
  children: React.ReactNode;
}

const popoverVarians = cva('rounded-lg flex items-center justify-center text-xs relative', {
  variants: {
    variants: {
      default: 'bg-gray text-white',
      warning: 'bg-red text-white',
      'ghost-outlined': 'text-white border border-border bg-none',
    },
    size: {
      default: 'py-2 px-4',
      sm: 'py-1.5 px-2.5',
      md: 'py-4 px-6',
      lg: 'py-6 px-8',
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
});

const Popover = forwardRef<HTMLDivElement, Props>(
  ({ variants, size, font, className, text, children }, ref) => {
    const [visible, setVisible] = useState<boolean>(false);

    const showPopover = () => setVisible(true);
    const hidePopover = () => setVisible(false);

    return (
      <div ref={ref} onMouseEnter={showPopover} onMouseLeave={hidePopover} className="relative">
        {children}
        {visible ? (
          <div className={cn(popoverVarians({ variants, size, font, className }))}>{text}</div>
        ) : null}
      </div>
    );
  }
);

Popover.displayName = 'Popover';

export default Popover;
