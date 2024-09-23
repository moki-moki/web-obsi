import React, { useRef } from 'react';
import { useContextMenu } from '@/app/context/context-menu';
import { useOutsideClick } from '@/app/hooks/useOutsideClick';

interface Props {
  children: React.ReactNode;
}

const ContextMenu = ({ children }: Props) => {
  const { contextMenu: menu, onClose } = useContextMenu();
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, onClose);

  return (
    <div
      ref={ref}
      className="absolute border border-border-color p-2 bg-primary-color-accent rounded-lg min-w-44"
      style={{ top: `${menu.y}px`, left: `${menu.x}px` }}
      onClick={onClose}
    >
      <ul className="flex flex-col gap-1">{children}</ul>
    </div>
  );
};

export default ContextMenu;
