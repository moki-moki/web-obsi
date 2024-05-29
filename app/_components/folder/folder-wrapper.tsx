import React from "react";
import { Trash2 } from "lucide-react";
import Droppable from "../Draggable/droppable";
import ContextMenu from "../context-menu/context-menu";
import { useSidebarContext } from "@/app/context/sidebar-conext";
import { useContextMenu } from "@/app/context/context-menu";

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
  const { contextMenu, handleContextMenu } = useContextMenu();

  const { deleteFolder } = useSidebarContext();

  return (
    <>
      <Droppable id={id} key={id} type="folder">
        <div
          onContextMenu={(e) => handleContextMenu(e, "folder")}
          className={`cursor-pointer text-gray uppercase font-bold tracking-wide rounded-xl ${
            showInput === idx && "bg-gray/20"
          } ${rotateIcon[idx] && "bg-dark-gray-accent"}`}
          onClick={(e) => iconHandler(e, idx)}
        >
          {children}
        </div>
      </Droppable>

      {contextMenu.show && contextMenu.type === "folder" ? (
        <ContextMenu>
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
