import React, { useRef } from "react";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import { MenuI } from "@/app/types/types";
import { FolderPlus, NotebookPen } from "lucide-react";

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
      className="absolute border border-border py-5 px-3 bg-dark-gray-accent rounded-lg"
      style={{ top: `${y}px`, left: `${x}px` }}
      onClick={onClose}
    >
      <ul className="flex flex-col gap-1">
        {MENU.map((el, idx) => (
          <li
            key={idx}
            onClick={menuControlls[idx]}
            className="flex items-center cursor-pointer text-gray p-2 rounded-full text-xs uppercase font-bold tracking-wide hover:bg-white"
          >
            <span className="mr-2 text-base">{el.icon}</span>
            {el.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
