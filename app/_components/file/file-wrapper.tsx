import { useState } from "react";
import Draggable from "../Draggable/draggable-link";
import { FileWrapperI } from "@/app/types/types";
import { useSidebarContext } from "@/app/context/sidebar-conext";
import { INITIAL_CONTEXT_MENU } from "@/app/data/initial-state";
import ContextMenu from "../context-menu/context-menu";
import { Trash2 } from "lucide-react";

const FileWrapper = ({ id, title, type, parentId, children }: FileWrapperI) => {
  const [contextMenu, setContextMenu] = useState(INITIAL_CONTEXT_MENU);
  const { deleteNoteInsideFolder } = useSidebarContext();

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
      <Draggable id={id} type={type} title={title}>
        <div onContextMenu={handleContextMenu}>{children}</div>
      </Draggable>

      {contextMenu.show ? (
        <ContextMenu x={contextMenu.x} y={contextMenu.y} onClose={onClose}>
          <li
            onClick={() => deleteNoteInsideFolder(parentId, id)}
            className="folder flex items-center cursor-pointer text-red bg-red/20 px-2 py-1 rounded-lg text-xs font-bold uppercase hover:bg-red/30"
          >
            <span className="mr-2 text-base">
              <Trash2 size={20} />
            </span>
            Delete File
          </li>
        </ContextMenu>
      ) : null}
    </>
  );
};

export default FileWrapper;
