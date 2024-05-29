import Draggable from "../Draggable/draggable-link";
import ContextMenu from "../context-menu/context-menu";
import { FileWrapperI } from "@/app/types/types";
import { useContextMenu } from "@/app/context/context-menu";
import { useSidebarContext } from "@/app/context/sidebar-conext";
import { Trash2 } from "lucide-react";

const FileWrapper = ({ id, title, type, parentId, children }: FileWrapperI) => {
  const { contextMenu: contextM, handleContextMenu } = useContextMenu();
  const { deleteNoteInsideFolder } = useSidebarContext();

  return (
    <>
      <Draggable id={id} type={type} title={title}>
        <div onContextMenu={(e) => handleContextMenu(e, "file")}>
          {children}
        </div>
      </Draggable>

      {contextM.show && contextM.type === "file" ? (
        <ContextMenu>
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
