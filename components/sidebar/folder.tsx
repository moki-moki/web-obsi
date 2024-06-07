import { useRef, useState } from 'react';

import File from '../ui/file';
import FolderTitle from '../folder/folder-title';
import FolderWrapper from '../folder/folder-wrapper';
import FolderControlls from '../folder/folder-controlls';

import { FOLDER_STATE } from '@/app/data/initial-state';
import { useRenameFolderTitle } from '@/api-calls/folders';
import { useOutsideClick } from '@/app/hooks/useOutsideClick';
import { FileI, FolderI, InputChangeEventHandler } from '@/types/types';

interface Props {
  idx: number;
  folder: FolderI;
  getItemDataOnClick: (e: React.SyntheticEvent, data: FolderI | FileI) => void;
}

const Folder = ({ folder, idx, getItemDataOnClick }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  const [renameValue, setRenameValue] = useState<string>('');
  const [showInput, setShowInput] = useState<null | number>(null);
  const [rotatedIcons, setRotatedIcons] = useState(Array(FOLDER_STATE.length).fill(false));

  const { renameFolderTitle } = useRenameFolderTitle();

  const { id, notes, title } = folder;

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
    <FolderWrapper
      id={id}
      idx={idx}
      showInput={showInput}
      rotateIcon={rotatedIcons}
      iconHandler={iconHandler}
    >
      <div
        onContextMenu={(e) => getItemDataOnClick(e, folder)}
        className="flex items-center justify-between p-2 rounded-full hover:bg-dark-gray-accent"
      >
        <FolderTitle
          idx={idx}
          id={id}
          name={title}
          inputRef={inputRef}
          showInput={showInput}
          renameValue={renameValue}
          rotateIcon={rotatedIcons}
          onChangeHandler={onChangeHandler}
          onKeyDownHandler={onKeyDownHandler}
        />
        <FolderControlls idx={idx} id={id} name={title} changeNameHandler={changeNameHandler} />
      </div>
      {notes.length && rotatedIcons[idx] ? (
        <ul className="p-2">
          {notes.map((note) => (
            <File key={note.id} note={note} />
          ))}
        </ul>
      ) : null}
    </FolderWrapper>
  );
};

export default Folder;
