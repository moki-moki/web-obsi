import React, { useRef } from "react";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";

interface Props {
  x: number;
  y: number;
  children: React.ReactNode;
  onClose: () => void;
}

const ContextMenu = ({ x, y, children, onClose }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, onClose);

  return (
    <div
      ref={ref}
      className="absolute border border-border py-5 px-3 bg-dark-gray-accent rounded-lg min-w-44"
      style={{ top: `${y}px`, left: `${x}px` }}
      onClick={onClose}
    >
      <ul className="flex flex-col gap-1">{children}</ul>
    </div>
  );
};

export default ContextMenu;
