import Note from "../ui/note";
import Draggable from "../Draggable/draggable-link";

import { FileI, FolderI } from "@/app/types/types";
import Input from "../ui/input";

interface Props {
  note: FileI;
  noteId: string | null;
  getItemDataOnClick: (e: React.SyntheticEvent, data: FolderI | FileI) => void;
}

const Notes = ({ note, noteId, getItemDataOnClick }: Props) => {
  const { id, name, type } = note;

  return (
    <>
      {noteId === id ? (
        <li>
          <Input
            type="text"
            rounded="md"
            className="px-2 py-1 mr-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple"
          />
        </li>
      ) : (
        <li
          className="rounded-full p-1 my-0.5 hover:bg-dark-gray-accent"
          onContextMenu={(e) => getItemDataOnClick(e, note)}
        >
          <Draggable id={id} type={type} title={name}>
            <Note name={name} />
          </Draggable>
        </li>
      )}
    </>
  );
};

export default Notes;
