import React, { useRef } from "react";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import { MenuI } from "@/app/types/types";
import { FolderPlus, NotebookPen, Trash2 } from "lucide-react";

interface Props {
  x: number;
  y: number;
  onClose: () => void;
  createFolder: () => void;
  createFile: () => void;
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

const ContextMenu = ({ x, y, onClose, createFolder, createFile }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const menuControlls = [createFolder, createFile];

  useOutsideClick(ref, onClose);

  return (
    <div
      ref={ref}
      className="absolute border border-border py-5 px-3 bg-dark-gray-accent rounded-lg min-w-44"
      style={{ top: `${y}px`, left: `${x}px` }}
      onClick={onClose}
    >
      <ul className="flex flex-col gap-1">
        {MENU.map((el, idx) => (
          <li
            key={idx}
            onClick={menuControlls[idx]}
            className="flex justify-between items-center cursor-pointer text-gray px-2 py-1 rounded-full text-xs uppercase font-bold tracking-wide hover:bg-gray/30"
          >
            {el.name}
            <span className="ml-2 text-base">{el.icon}</span>
          </li>
        ))}
        <div className="w-full bg-gray h-0.5" />
        <li className="flex items-center justify-between cursor-pointer text-red px-2 py-1 rounded-full text-xs uppercase font-bold tracking-wide hover:bg-red/30">
          Delete
          <span className="ml-2">
            <Trash2 />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;
