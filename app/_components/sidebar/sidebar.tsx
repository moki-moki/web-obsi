"use client";
import { useState } from "react";
import ContextMenu from "../ui/context-menu";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { InputChangeEventHandler } from "@/app/types/types";
import { FOLDER_STATE, INITIAL_CONTEXT_MENU } from "@/app/data/initial-state";

export default function Sidebar() {
  const [showInput, setShowInput] = useState<null | number>(null);
  const [contextMenu, setContextMenu] = useState(INITIAL_CONTEXT_MENU);
  const [rotatedIcons, setRotatedIcons] = useState(
    Array(FOLDER_STATE.length).fill(false)
  );
  const [renameValue, setRenameValue] = useState<string>("");

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const { pageX, pageY } = e;
    setContextMenu({ show: true, x: pageX, y: pageY });
  };

  const onClose = () => setContextMenu(INITIAL_CONTEXT_MENU);

  const iconHandler = (idx: number) => {
    setRotatedIcons((prevState) => {
      const newState = [...prevState];
      newState[idx] = !newState[idx];
      return newState;
    });
  };

  const onChangeHandler: InputChangeEventHandler = (e) => {
    setRenameValue(e.target.value);
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setShowInput(null);
    }
  };

  console.log(renameValue);

  const changeNameHandler = (
    e: React.MouseEvent<HTMLSpanElement>,
    idx: number,
    name: string
  ) => {
    e.stopPropagation();

    setShowInput(idx);
    setRenameValue(name);
  };

  return (
    <>
      <div
        className="w-1/5 border-r border-r-border h-screen"
        onContextMenu={handleContextMenu}
      >
        <div className="p-2 border-b border-border">
          <button
            type="button"
            className="text-white border border-border rounded-full px-2 py-1 hover:bg-dark-gray-accent"
          >
            +
          </button>
        </div>
        <h2 className="px-4 my-4 text-white uppercase font-bold">Your Notes</h2>
        <ul className="px-2 flex flex-col gap-3">
          {FOLDER_STATE.map((el, idx) => (
            <li
              key={idx}
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
                  <input
                    type="text"
                    value={renameValue}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    className="bg-gray/20 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
                  />
                ) : (
                  <span>{el.name}</span>
                )}
              </div>
              <span
                onClick={(e) => changeNameHandler(e, idx, el.name)}
                className="text-base"
              >
                <FiEdit />
              </span>
            </li>
          ))}
        </ul>
      </div>
      {contextMenu.show ? (
        <ContextMenu x={contextMenu.x} y={contextMenu.y} onClose={onClose} />
      ) : null}
    </>
  );
}
