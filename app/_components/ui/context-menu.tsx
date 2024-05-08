import React, { useRef } from "react";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import { FiFolderPlus } from "react-icons/fi";
import { PiNotePencil } from "react-icons/pi";
import { MENUI } from "@/app/types/types";
import { createFolder } from "@/app/utils/utils";

interface Props {
  x: number;
  y: number;
  onClose: () => void;
}

const MENU: MENUI[] = [
  {
    name: "New Folder",
    icon: <FiFolderPlus />,
    onClick: createFolder,
  },
  {
    name: "New Note",
    icon: <PiNotePencil />,
    onClick: createFolder,
  },
];

const ContextMenu = ({ x, y, onClose }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
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
            onClick={el.onClick}
            className="flex items-center cursor-pointer text-gray p-2 rounded-full text-xs uppercase font-bold tracking-wide hover:bg-gray/20"
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
