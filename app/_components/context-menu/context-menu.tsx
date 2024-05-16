import React, { useRef } from "react";
import { MenuI } from "@/app/types/types";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import { FolderPlus, NotebookPen, Trash2 } from "lucide-react";

interface Props {
  x: number;
  y: number;
  children: React.ReactNode;
  onClose: () => void;
}

export const MENU: MenuI[] = [
  {
    name: "New Folder",
    icon: <FolderPlus />,
  },
  {
    name: "New Note",
    icon: <NotebookPen />,
  },
];

const ContextMenu = ({ x, y, onClose, children }: Props) => {
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
