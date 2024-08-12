import { useRef, useState } from 'react';

import File from '../ui/file';
import FolderTitle from '../folder/folder-title';
import FolderWrapper from '../folder/folder-wrapper';
import FolderControlls from '../folder/folder-controlls';

import { FOLDER_STATE } from '@/app/data/initial-state';
import { useRenameFolderTitle } from '@/api-calls/folders';
import { useOutsideClick } from '@/app/hooks/useOutsideClick';
import { FileI, FolderI, InputChangeEventHandler } from '@/types/types';
import Input from '../ui/input';

interface Props {
  idx: number;
  level: number;
  folder: FolderI;
  getItemDataOnClick: (e: React.SyntheticEvent, data: FolderI | FileI) => void;
}

const Folder = ({ idx, folder, level = 0, getItemDataOnClick }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  const [renameValue, setRenameValue] = useState<string>('');
  const [showInput, setShowInput] = useState<null | number>(null);
  const [rotatedIcons, setRotatedIcons] = useState(Array(FOLDER_STATE.length).fill(false));

  const { renameFolderTitle } = useRenameFolderTitle();

  const { id, notes, title, children } = folder;

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

  const iconHandler = (e: React.MouseEvent, idx: number) => {
    if ((e.target as HTMLElement).tagName === 'INPUT') return;
    setRotatedIcons((prevState) => {
      const newState = [...prevState];
      newState[idx] = !newState[idx];
      return newState;
    });
  };

  return (
    <FolderWrapper id={id}>
      <div
        style={{ marginLeft: level * 20 }}
        onContextMenu={(e) => getItemDataOnClick(e, folder)}
        className="flex items-center justify-between p-2 rounded-full hover:bg-dark-gray-accent overflow-hidden text-ellipsis whitespace-nowrap"
      >
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
          <FolderTitle idx={idx} name={title} rotateIcon={rotatedIcons} iconHandler={iconHandler} />
        )}
        <FolderControlls idx={idx} id={id} name={title} changeNameHandler={changeNameHandler} />
      </div>
      {notes.length && rotatedIcons[idx] ? (
        <ul className="p-2">
          {notes.map((note) => (
            <File key={note.id} note={note} />
          ))}
        </ul>
      ) : null}

      {children.length && rotatedIcons[idx]
        ? children.map((folder, index) => (
            <li key={folder.id}>
              <Folder
                idx={index}
                folder={folder}
                getItemDataOnClick={getItemDataOnClick}
                level={level + 1}
              />
            </li>
          ))
        : null}
    </FolderWrapper>
  );
};

export default Folder;
