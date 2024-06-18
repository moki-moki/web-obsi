import { HTMLAttributes, forwardRef, useRef, useState } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils/utils';
import { createPortal } from 'react-dom';

interface Props extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof popoverVarians> {
  text: string;
  children: React.ReactNode;
}

const popoverVarians = cva(
  'rounded-lg my-1 flex items-center justify-center text-xs text-nowrap py-2 px-4 absolute',
  {
    variants: {
      variants: {
        default: 'bg-dark-gray-accent text-white',
        warning: 'bg-red text-white',
        'ghost-outlined': 'text-white border border-border bg-dark-gray-accent',
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

const Popover = forwardRef<HTMLDivElement, Props>(
  ({ variants, font, className, text, children }, ref) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [position, setPosition] = useState({
      top: 0,
      left: 0,
    });
    const containerRef = useRef<HTMLDivElement>(null);

    const showPopover = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
      }
      setVisible(true);
    };
    const hidePopover = () => setVisible(false);

    return (
      <div
        ref={containerRef}
        onMouseEnter={showPopover}
        onMouseLeave={hidePopover}
        className="relative inline-flex"
      >
        {children}
        {visible
          ? createPortal(
              <div
                style={{ top: position.top, left: position.left }}
                className={cn(popoverVarians({ variants, font, className }))}
              >
                {text}
              </div>,
              document.body
            )
          : null}
      </div>
    );
  }
);

Popover.displayName = 'Popover';

export default Popover;
