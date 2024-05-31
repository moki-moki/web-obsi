import { useState } from "react";
import File from "../ui/file";
import FolderTitle from "../folder/folder-title";
import FolderWrapper from "../folder/folder-wrapper";
import FolderControlls from "../folder/folder-controlls";

import { FOLDER_STATE } from "@/app/data/initial-state";
import { FileI, FolderI, InputChangeEventHandler } from "@/app/types/types";

interface Props {
  folders: FolderI[];
  noteId: string | null;
  setFolders: React.Dispatch<React.SetStateAction<FolderI[]>>;
  getItemDataOnClick: (e: React.SyntheticEvent, data: FolderI | FileI) => void;
}

const Folders = ({ folders, setFolders, getItemDataOnClick }: Props) => {
  const [renameValue, setRenameValue] = useState<string>("");
  const [showInput, setShowInput] = useState<null | number>(null);
  const [rotatedIcons, setRotatedIcons] = useState(
    Array(FOLDER_STATE.length).fill(false)
  );

  const onChangeHandler: InputChangeEventHandler = (e) => {
    e.stopPropagation();
    setRenameValue(e.target.value);
  };

  const changeNameHandler = (
    e: React.MouseEvent<HTMLSpanElement>,
    idx: number,
    name: string
  ) => {
    e.stopPropagation();

    setShowInput(idx);
    setRenameValue(name);
  };

  const onKeyDownHandler = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Enter") {
      setFolders((prev) => {
        const newfolders = [...prev];
        newfolders[idx].name = renameValue;
        return newfolders;
      });
      setShowInput(null);
    }
  };

  const iconHandler = (e: React.MouseEvent, idx: number) => {
    if ((e.target as HTMLElement).tagName === "INPUT") return;
    setRotatedIcons((prevState) => {
      const newState = [...prevState];
      newState[idx] = !newState[idx];
      return newState;
    });
  };

  return (
    <ul className="px-1 flex flex-col gap-2">
      {folders.map((folder: FolderI, idx: number) => (
        <li key={folder.id}>
          <FolderWrapper
            idx={idx}
            id={folder.id}
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
                name={folder.name}
                showInput={showInput}
                renameValue={renameValue}
                rotateIcon={rotatedIcons}
                onChangeHandler={onChangeHandler}
                onKeyDownHandler={onKeyDownHandler}
              />
              <FolderControlls
                idx={idx}
                id={folder.id}
                name={folder.name}
                changeNameHandler={changeNameHandler}
              />
            </div>
            {folder.files.length && rotatedIcons[idx] ? (
              <ul className="p-2">
                {folder.files.map((note) => (
                  <File key={note.id} note={note} />
                ))}
              </ul>
            ) : null}
          </FolderWrapper>
        </li>
      ))}
    </ul>
  );
};

export default Folders;
