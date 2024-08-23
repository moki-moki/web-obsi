import Input from './input';
import { useRef, useState } from 'react';

import FileWrapper from '../note/note-wrapper';

import { FileI, InputChangeEventHandler } from '@/types/types';
import { useContextMenu } from '@/app/context/context-menu';
import { useOutsideClick } from '@/app/hooks/useOutsideClick';
import { useSidebarContext } from '@/app/context/sidebar-conext';
import { useRenameNote } from '@/api-calls/notes';

interface Props {
  note: FileI;
  level: number;
}

const File = ({ note, level = 0 }: Props) => {
  const { id, title, type, folderId } = note;
  const ref = useRef<HTMLInputElement>(null);
  const [renameValue, setRenameValue] = useState<string>(title);

  const { getItemDataOnClick } = useContextMenu();
  const { noteId, setNoteId } = useSidebarContext();

  const { renameNoteTitle } = useRenameNote();

  const onChangeHandler: InputChangeEventHandler = (e) => setRenameValue(e.target.value);

  const onClose = () => {
    setNoteId(null);
    setRenameValue(renameValue);
  };

  const onKeyDownHandler = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string,
    folderId: string | null
  ) => {
    if (e.key === 'Enter') {
      renameNoteTitle(id, renameValue, folderId);
      setNoteId(null);
    }
  };

  const listRef = useOutsideClick(ref, onClose);

  return (
    <>
      {noteId === id ? (
        <li key={note.id}>
          <Input
            autoFocus
            type="text"
            rounded="md"
            ref={listRef}
            value={renameValue}
            onChange={onChangeHandler}
            onKeyDown={(e) => onKeyDownHandler(e, id, folderId)}
            className="px-2 py-0.5 text-sm focus:outline-none"
          />
        </li>
      ) : (
        <li onContextMenu={(e) => getItemDataOnClick(e, note)} style={{ marginLeft: level * 15 }}>
          <FileWrapper id={id} type={type} title={title}>
            <div className="p-1.5 text-xs rounded-full hover:bg-dark-gray">
              {title.length > 20 ? `${title.substring(0, 30)}...` : title}
            </div>
          </FileWrapper>
        </li>
      )}
    </>
  );
};

export default File;
