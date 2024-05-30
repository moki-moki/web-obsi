import Input from "./input";
import FileWrapper from "../note/note-wrapper";

import { FileI } from "@/app/types/types";
import { useContextMenu } from "@/app/context/context-menu";
import { useSidebarContext } from "@/app/context/sidebar-conext";

interface Props {
  note: FileI;
}

const File = ({ note }: Props) => {
  const { id, name, type } = note;
  const { noteId } = useSidebarContext();
  const { getItemDataOnClick } = useContextMenu();
  return (
    <>
      {noteId === id ? (
        <li key={note.id}>
          <Input
            type="text"
            rounded="md"
            className="px-2 py-0.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple"
          />
        </li>
      ) : (
        <li onContextMenu={(e) => getItemDataOnClick(e, note)}>
          <FileWrapper id={id} type={type} title={name}>
            <div className="p-1.5 text-xs rounded-full hover:bg-dark-gray">
              {name}
            </div>
          </FileWrapper>
        </li>
      )}
    </>
  );
};

export default File;
