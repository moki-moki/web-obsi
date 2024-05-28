import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import Droppable from "../Draggable/droppable";
import ContextMenu from "../context-menu/context-menu";
import { INITIAL_CONTEXT_MENU } from "@/app/data/initial-state";
import { useSidebarContext } from "@/app/context/sidebar-conext";

interface Props {
  id: string;
  idx: number;
  rotateIcon: boolean[];
  showInput: null | number;
  children: React.ReactNode;
  iconHandler: (e: React.MouseEvent, idx: number) => void;
}

const FolderWrapper = ({
  id,
  idx,
  children,
  showInput,
  rotateIcon,
  iconHandler,
}: Props) => {
  const [contextMenu, setContextMenu] = useState(INITIAL_CONTEXT_MENU);

  const { deleteFolder } = useSidebarContext();

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();

    const { pageX, pageY } = e;
    setContextMenu({ show: true, x: pageX, y: pageY });
  };

  const onClose = () => setContextMenu(INITIAL_CONTEXT_MENU);

  return (
    <>
      <Droppable id={id} key={id} type="folder">
        <div
          onContextMenu={handleContextMenu}
          className={`cursor-pointer text-gray uppercase font-bold tracking-wide rounded-xl ${
            showInput === idx && "bg-gray/20"
          } ${rotateIcon[idx] && "bg-dark-gray-accent"}`}
          onClick={(e) => iconHandler(e, idx)}
        >
          {children}
        </div>
      </Droppable>

      {contextMenu.show ? (
        <ContextMenu x={contextMenu.x} y={contextMenu.y} onClose={onClose}>
          <li
            onClick={() => deleteFolder(id)}
            className="folder flex items-center cursor-pointer text-red bg-red/20 px-2 py-1 rounded-lg text-xs font-bold uppercase hover:bg-red/30"
          >
            <span className="mr-2 text-base">
              <Trash2 size={20} />
            </span>
            Delete Folder
          </li>
        </ContextMenu>
      ) : null}
    </>
  );
};

export default FolderWrapper;
