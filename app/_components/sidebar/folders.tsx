import { useState } from "react";
import File from "../ui/file";
import FileWrapper from "../note/note-wrapper";
import FolderTitle from "../folder/folder-title";
import FolderWrapper from "../folder/folder-wrapper";
import FolderControlls from "../folder/folder-controlls";

import { FOLDER_STATE } from "@/app/data/initial-state";
import { FolderI, InputChangeEventHandler } from "@/app/types/types";

interface Props {
  folders: FolderI[];
  setFolders: React.Dispatch<React.SetStateAction<FolderI[]>>;
}

const Folders = ({ folders, setFolders }: Props) => {
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
      setFolders((prev: any) => {
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
      {folders.map((el: FolderI, idx: number) => (
        <FolderWrapper
          idx={idx}
          id={el.id}
          key={el.id}
          showInput={showInput}
          rotateIcon={rotatedIcons}
          iconHandler={iconHandler}
        >
          <div className="flex items-center justify-between p-2 rounded-full hover:bg-dark-gray-accent">
            <FolderTitle
              idx={idx}
              name={el.name}
              showInput={showInput}
              renameValue={renameValue}
              rotateIcon={rotatedIcons}
              onChangeHandler={onChangeHandler}
              onKeyDownHandler={onKeyDownHandler}
            />
            <FolderControlls
              idx={idx}
              id={el.id}
              name={el.name}
              changeNameHandler={changeNameHandler}
            />
          </div>
          {el.files.length && rotatedIcons[idx] ? (
            <div className="p-2">
              {el.files.map((note) => (
                <FileWrapper
                  id={note.id}
                  key={note.id}
                  parentId={el.id}
                  type={note.type}
                  title={note.name}
                >
                  <File name={note.name} key={note.id} />
                </FileWrapper>
              ))}
            </div>
          ) : null}
        </FolderWrapper>
      ))}
    </ul>
  );
};

export default Folders;
