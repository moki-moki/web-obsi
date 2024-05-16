import { MouseEvent, useState } from "react";
import Input from "./input";
import { ChevronRight, SquarePen, Trash2 } from "lucide-react";
import { FileI, InputChangeEventHandler, MenuI } from "@/app/types/types";
import { FOLDER_STATE } from "@/app/data/initial-state";

interface Props {
  id: string;
  idx: number;
  name: string;
  files?: FileI[];
  renameValue: string;
  showInput: null | number;
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
    name: "Delete Folder",
    icon: <Trash2 />,
  },
];

const Folder = ({
  id,
  idx,
  name,
  files,
  showInput,
  renameValue,
  deleteFolder,
  onChangeHandler,
  onKeyDownHandler,
  changeNameHandler,
}: Props) => {
  const [rotatedIcons, setRotatedIcons] = useState(
    Array(FOLDER_STATE.length).fill(false)
  );

  const iconHandler = (e: MouseEvent, idx: number) => {
    if ((e.target as HTMLElement).tagName === "INPUT") return;
    setRotatedIcons((prevState) => {
      const newState = [...prevState];
      newState[idx] = !newState[idx];
      return newState;
    });
  };

  return (
    <div
      className={`cursor-pointer text-gray uppercase font-bold tracking-wide rounded-xl ${
        showInput === idx && "bg-gray/20"
      } ${rotatedIcons[idx] && "bg-dark-gray-accent"}`}
      onClick={(e) => iconHandler(e, idx)}
    >
      <div className="flex items-center justify-between p-2 rounded-full hover:bg-dark-gray-accent">
        <div className="flex items-center">
          <span className="mr-2 text-sm">
            <ChevronRight
              size={20}
              style={{
                transform: rotatedIcons[idx] ? "rotate(90deg)" : "none",
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
      {files?.length && rotatedIcons[idx] ? (
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
      ) : null}
    </div>
  );
};

export default Folder;
