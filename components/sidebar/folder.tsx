import { useRef, useState } from 'react';

import File from '../ui/file';
import Input from '../ui/input';
import FolderTitle from '../folder/folder-title';
import FolderWrapper from '../folder/folder-wrapper';
import FolderControlls from '../folder/folder-controlls';

import { useRenameFolderTitle } from '@/api-calls/folders';
import { useOutsideClick } from '@/app/hooks/useOutsideClick';
import { FileI, FolderI, InputChangeEventHandler } from '@/types/types';
import { useSidebarContext } from '@/app/context/sidebar-conext';

interface Props {
  idx: number;
  level: number;
  folder: FolderI;
  openFolders: Map<string, boolean>;
  toggleFolderHandler: (id: string) => void;
  getItemDataOnClick: (e: React.SyntheticEvent, data: FolderI | FileI) => void;
}

const Folder = ({
  idx,
  folder,
  openFolders,
  level = 0,
  getItemDataOnClick,
  toggleFolderHandler,
}: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const { id, notes, title, children } = folder;

  const [renameValue, setRenameValue] = useState<string>('');
  const [showInput, setShowInput] = useState<null | number>(null);

  const { renameFolderTitle } = useRenameFolderTitle();

  const isOpen = openFolders.get(id) || false;

  const onClose = () => setShowInput(null);

  const inputRef = useOutsideClick(ref, onClose);

  const onChangeHandler: InputChangeEventHandler = (e) => {
    e.stopPropagation();
    setRenameValue(e.target.value);
  };

  const changeNameHandler = (e: React.MouseEvent<HTMLSpanElement>, idx: number, name: string) => {
    e.stopPropagation();
    setShowInput(idx);
    setRenameValue(name);
  };

  const onKeyDownHandler = (id: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      renameFolderTitle(id, renameValue);
      setShowInput(null);
    }
  };

  return (
    <FolderWrapper id={id}>
      {showInput === idx ? (
        <Input
          type="text"
          rounded="md"
          ref={inputRef}
          value={renameValue}
          onChange={onChangeHandler}
          onKeyDown={(e) => onKeyDownHandler(id, e)}
          className="px-2 py-1 mr-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple"
        />
      ) : (
        <div
          style={{ marginLeft: level * 10 }}
          onContextMenu={(e) => getItemDataOnClick(e, folder)}
          className="flex items-center justify-between p-2 rounded-full hover:bg-dark-gray-accent overflow-hidden text-ellipsis whitespace-nowrap"
          onClick={() => toggleFolderHandler(id)}
        >
          <FolderTitle isOpen={isOpen} name={title} />

          <FolderControlls idx={idx} id={id} name={title} changeNameHandler={changeNameHandler} />
        </div>
      )}
      {notes.length && isOpen ? (
        <ul className="p-2">
          {notes.map((note) => (
            <File key={note.id} note={note} level={level + 1} />
          ))}
        </ul>
      ) : null}

      {children && isOpen
        ? children.map((folder, index) => (
            <Folder
              idx={index}
              key={folder.id}
              folder={folder}
              level={level + 1}
              getItemDataOnClick={getItemDataOnClick}
              toggleFolderHandler={toggleFolderHandler}
              openFolders={openFolders}
            />
          ))
        : null}
    </FolderWrapper>
  );
};

export default Folder;
