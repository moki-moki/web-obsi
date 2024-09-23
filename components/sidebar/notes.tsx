import { useRef, useState } from 'react';

import Input from '../ui/input';
import Note from '../note/note';
import Draggable from '../draggable/draggable-link';

import { useOutsideClick } from '@/app/hooks/useOutsideClick';
import { useSidebarContext } from '@/app/context/sidebar-conext';
import { FileI, FolderI, InputChangeEventHandler } from '@/types/types';
import { useRenameNote } from '@/api-calls/notes';

interface Props {
  note: FileI;
  getItemDataOnClick: (e: React.SyntheticEvent, data: FolderI | FileI) => void;
}

const Notes = ({ note, getItemDataOnClick }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const { id, title, type, folderId } = note;
  const [renameValue, setRenameValue] = useState<string>(title);

  const { renameNoteTitle } = useRenameNote();

  const { noteId, setNoteId } = useSidebarContext();

  const onChangeHandler: InputChangeEventHandler = (e) => setRenameValue(e.target.value);

  const onClose = () => {
    setRenameValue(renameValue);
    setNoteId(null);
  };

  const listRef = useOutsideClick(ref, onClose);

  const onKeyDownHandler = (e: React.KeyboardEvent, folderId: string | null) => {
    if (e.key === 'Enter') {
      onClose();

      renameNoteTitle(id, renameValue, folderId);
    }
  };

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
            onKeyDown={(e) => onKeyDownHandler(e, folderId)}
            className="px-2 py-1 mr-2 text-sm focus:outline-none"
          />
        </li>
      ) : (
        <li
          className="rounded-full p-1 my-0.5 hover:bg-secondary-color/30"
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
