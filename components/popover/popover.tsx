import { HTMLAttributes, forwardRef, useEffect, useRef, useState } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils/utils';
import { createPortal } from 'react-dom';

interface Props extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof popoverVarians> {
  text: string;
  children: React.ReactNode;
}

const popoverVarians = cva(
  'rounded-lg my-1 flex items-center justify-center text-xs text-nowrap py-2 px-4 fixed -translate-x-2/4 z-50',
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
    const popoverRef = useRef<HTMLDivElement>(null);

    const showPopover = () => setVisible(true);
    const hidePopover = () => setVisible(false);

    useEffect(() => {
      if (visible && popoverRef.current && containerRef.current) {
        const popoverRect = popoverRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        let top = containerRect.bottom + window.scrollY;
        let left = containerRect.left + window.scrollX + containerRect.width / 2;

        // Adjust if overflow
        if (left + popoverRect.width / 2 > window.innerWidth) {
          left = window.innerWidth - popoverRect.width / 2 - 10; // 10px padding from edge
        } else if (left - popoverRect.width / 2 < 0) {
          left = popoverRect.width / 2 + 10; // 10px padding from edge
        }

        if (top + popoverRect.height > window.innerHeight) {
          top = containerRect.top + window.scrollY - popoverRect.height; // Position above the element
        }

        setPosition({ top, left });
      }
    }, [visible]);

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
                ref={popoverRef}
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
