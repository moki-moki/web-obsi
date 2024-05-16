import React, { useRef } from "react";
import { MenuI } from "@/app/types/types";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import { FolderPlus, NotebookPen, Trash2 } from "lucide-react";

interface Props {
  x: number;
  y: number;
  children: React.ReactNode;
  onClose: () => void;
  // createFolder: () => void;
  // createFile: () => void;
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

// const ContextMenu = ({ x, y, onClose, createFolder, createFile }: Props) => {
const ContextMenu = ({ x, y, onClose, children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  // const menuControlls = [createFolder, createFile];

  useOutsideClick(ref, onClose);

  return (
    <div
      ref={ref}
      className="absolute border border-border py-5 px-3 bg-dark-gray-accent rounded-lg min-w-44"
      style={{ top: `${y}px`, left: `${x}px` }}
      onClick={onClose}
    >
      <ul className="flex flex-col gap-1">
        {/* {MENU.map((el, idx) => (
          <li
            key={idx}
            onClick={menuControlls[idx]}
            className="folder flex justify-between items-center cursor-pointer text-gray px-2 py-1 rounded-full text-xs font-bold uppercase hover:bg-gray/20"
          >
            {el.name}
            <span className="ml-2 text-base">{el.icon}</span>
          </li>
        ))}
        <div className="w-full bg-gray h-0.5" />
        <li className="flex items-center justify-between cursor-pointer text-red px-2 py-1 rounded-full text-xs uppercase font-bold tracking-wide hover:bg-red/20">
          Delete
          <span className="ml-2">
            <Trash2 />
          </span>
        </li> */}
        {children}
      </ul>
    </div>
  );
};

export default ContextMenu;
