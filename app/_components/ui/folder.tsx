import { MouseEvent, useState } from "react";
import Input from "./input";
import {
  ChevronRight,
  FolderPlus,
  NotebookPen,
  SquarePen,
  Trash2,
} from "lucide-react";
import { FileI, InputChangeEventHandler, MenuI } from "@/app/types/types";
import { FOLDER_STATE, INITIAL_CONTEXT_MENU } from "@/app/data/initial-state";
import ContextMenu from "../context-menu/context-menu";

interface Props {
  id: string;
  idx: number;
  name: string;
  files?: FileI[];
  rotateIcon: boolean[];
  renameValue: string;
  showInput: null | number;
  children: React.ReactNode;
  createFile: () => void;
  iconHandler: (e: MouseEvent, idx: number) => void;
  createFolder: (idx: number) => void;
  onChangeHandler: InputChangeEventHandler;
  changeNameHandler: (
    e: React.MouseEvent<HTMLSpanElement>,
    idx: number,
    name: string
  ) => void;
  onKeyDownHandler: (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => void;
  deleteFolder: (id: string) => void;
}

export const MENU: MenuI[] = [
  {
    name: "New Folder",
    icon: <FolderPlus />,
  },
  {
    name: "New Note",
    icon: <NotebookPen />,
  },
];

const Folder = ({
  id,
  idx,
  name,
  files,
  children,
  showInput,
  rotateIcon,
  renameValue,
  createFile,
  iconHandler,
  createFolder,
  deleteFolder,
  onChangeHandler,
  onKeyDownHandler,
  changeNameHandler,
}: Props) => {
  const [contextMenu, setContextMenu] = useState(INITIAL_CONTEXT_MENU);
  // const [rotatedIcons, setRotatedIcons] = useState(
  //   Array(FOLDER_STATE.length).fill(false)
  // );

  // const iconHandler = (e: MouseEvent, idx: number) => {
  //   if ((e.target as HTMLElement).tagName === "INPUT") return;
  //   setRotatedIcons((prevState) => {
  //     const newState = [...prevState];
  //     newState[idx] = !newState[idx];
  //     return newState;
  //   });
  // };

  const onClose = () => setContextMenu(INITIAL_CONTEXT_MENU);

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const { pageX, pageY } = e;
    setContextMenu({ show: true, x: pageX, y: pageY });
  };

  return (
    <div
      className={`cursor-pointer text-gray uppercase font-bold tracking-wide rounded-xl ${
        showInput === idx && "bg-gray/20"
      } ${rotateIcon[idx] && "bg-dark-gray-accent"}`}
      onClick={(e) => iconHandler(e, idx)}
      onContextMenu={handleContextMenu}
    >
      <div className="flex items-center justify-between p-2 rounded-full hover:bg-dark-gray-accent">
        <div className="flex items-center">
          <span className="mr-2 text-sm">
            <ChevronRight
              size={20}
              style={{
                transform: rotateIcon[idx] ? "rotate(90deg)" : "none",
              }}
            />
          </span>
          {showInput === idx ? (
            <Input
              type="text"
              value={renameValue}
              onChange={onChangeHandler}
              onKeyDown={(e) => onKeyDownHandler(e, idx)}
              rounded="md"
              className="px-2 py-1 mr-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple"
            />
          ) : (
            <span className="text-sm font-bold">{name}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span
            onClick={(e) => changeNameHandler(e, idx, name)}
            className="text-sm transition-colors duration-200 hover:text-white"
          >
            <SquarePen size={20} />
          </span>
          <span
            onClick={() => deleteFolder(id)}
            className="text-sm transition-colors duration-200 hover:text-white"
          >
            <Trash2 size={20} />
          </span>
        </div>
      </div>
      {/* {files?.length && rotatedIcons[idx] ? (
        <div className="flex flex-col gap-2 p-2">
          <span className="block w-full h-0.5 bg-gray rounded-full"></span>
          {files?.map((el) => (
            <h3
              key={el.id}
              className="pl-8 p-0.5 text-xs rounded-full hover:bg-dark-gray"
            >
              {el.name}
            </h3>
          ))}
        </div>
      ) : null} */}

      {children}

      {contextMenu.show ? (
        <ContextMenu x={contextMenu.x} y={contextMenu.y} onClose={onClose}>
          <li></li>
          <li
            onClick={() => createFolder(idx)}
            className="folder flex justify-between items-center cursor-pointer text-gray px-2 py-1 rounded-full text-xs font-bold uppercase hover:bg-gray/20"
          >
            New Folder
            <span className="ml-2 text-base">
              <FolderPlus />
            </span>
          </li>
        </ContextMenu>
      ) : null}
    </div>
  );
};

export default Folder;
