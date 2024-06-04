import { useRef, useState } from 'react';

import Input from '../ui/input';
import Note from '../note/note';
import Draggable from '../draggable/draggable-link';

import { useOutsideClick } from '@/app/hooks/useOutsideClick';
import { useSidebarContext } from '@/app/context/sidebar-conext';
import { FileI, FolderI, InputChangeEventHandler } from '@/types/types';

interface Props {
  note: FileI;
  noteId: string | null;
  setNoteId: React.Dispatch<React.SetStateAction<string | null>>;
  getItemDataOnClick: (e: React.SyntheticEvent, data: FolderI | FileI) => void;
}

const Notes = ({ note, noteId, setNoteId, getItemDataOnClick }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const { changeNoteName } = useSidebarContext();
  const { id, title, type } = note;
  const [renameValue, setRenameValue] = useState<string>(title);

  const onChangeHandler: InputChangeEventHandler = (e) =>
    setRenameValue(e.target.value);

  const onClose = () => {
    setNoteId(null);
    changeNoteName(id, renameValue);
    setRenameValue(renameValue);
  };

  const onKeyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onClose();
  };

  const listRef = useOutsideClick(ref, onClose);

  return (
    <>
      {noteId === id ? (
        <li>
          <Input
            autoFocus
            type="text"
            rounded="md"
            ref={listRef}
            value={renameValue}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            className="px-2 py-1 mr-2 text-sm focus:outline-none"
          />
        </li>
      ) : (
        <li
          className="rounded-full p-1 my-0.5 hover:bg-dark-gray-accent"
          onContextMenu={(e) => getItemDataOnClick(e, note)}
        >
          <Draggable id={id} type={type} title={title}>
            <Note title={title} />
          </Draggable>
        </li>
      )}
    </>
  );
};

export default Notes;
