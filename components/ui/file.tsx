import Input from './input';
import { useRef, useState } from 'react';

import FileWrapper from '../note/note-wrapper';

import { FileI, InputChangeEventHandler } from '@/types/types';
import { useContextMenu } from '@/app/context/context-menu';
import { useOutsideClick } from '@/app/hooks/useOutsideClick';
import { useSidebarContext } from '@/app/context/sidebar-conext';

interface Props {
  note: FileI;
}

const File = ({ note }: Props) => {
  const { id, title, type } = note;
  const ref = useRef<HTMLInputElement>(null);
  const [renameValue, setRenameValue] = useState<string>(title);

  const { getItemDataOnClick } = useContextMenu();
  const { noteId, setNoteId, changeNoteName } = useSidebarContext();

  const onChangeHandler: InputChangeEventHandler = (e) =>
    setRenameValue(e.target.value);

  const onClose = () => {
    setNoteId(null);
    changeNoteName(id, renameValue);
    setRenameValue(renameValue);
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
            className="px-2 py-0.5 text-sm focus:outline-none"
          />
        </li>
      ) : (
        <li onContextMenu={(e) => getItemDataOnClick(e, note)}>
          <FileWrapper id={id} type={type} title={title}>
            <div className="p-1.5 text-xs rounded-full hover:bg-dark-gray">
              {title}
            </div>
          </FileWrapper>
        </li>
      )}
    </>
  );
};

export default File;
