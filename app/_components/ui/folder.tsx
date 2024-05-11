import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Input from "./input";
import { FOLDER_STATE } from "@/app/data/initial-state";
import { InputChangeEventHandler } from "@/app/types/types";

interface Props {
  idx: number;
  name: string;
  showInput: null | number;
  renameValue: string;
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
}

const Folder = ({
  name,
  idx,
  showInput,
  renameValue,
  onChangeHandler,
  changeNameHandler,
  onKeyDownHandler,
}: Props) => {
  const [rotatedIcons, setRotatedIcons] = useState(
    Array(FOLDER_STATE.length).fill(false)
  );
  const iconHandler = (idx: number) => {
    setRotatedIcons((prevState) => {
      const newState = [...prevState];
      newState[idx] = !newState[idx];
      return newState;
    });
  };

  return (
    <li
      onClick={() => iconHandler(idx)}
      className={`flex items-center justify-between cursor-pointer text-gray p-2 rounded-full text-xs uppercase font-bold tracking-wide hover:bg-gray/20 ${
        showInput === idx && "bg-gray/20"
      }`}
    >
      <div className="flex items-center">
        <span className="mr-2 text-base">
          <MdOutlineKeyboardArrowRight
            className="transition-transform ease-in duration-150"
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
            className="px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple"
          />
        ) : (
          <span>{name}</span>
        )}
      </div>
      <span
        onClick={(e) => changeNameHandler(e, idx, name)}
        className="text-base"
      >
        <FiEdit />
      </span>
    </li>
  );
};

export default Folder;
