"use client";
import { useEffect, useState } from "react";

import Folder from "../ui/folder";
import ContextMenu from "../ui/context-menu";
import { FolderI, InputChangeEventHandler } from "@/app/types/types";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { INITIAL_CONTEXT_MENU } from "@/app/data/initial-state";

export default function Sidebar() {
  const [isClient, setIsClient] = useState<boolean>(false); // Fixes Next.js hydration issue with local storage
  const [renameValue, setRenameValue] = useState<string>("");
  const [showInput, setShowInput] = useState<null | number>(null);
  const [state, setState] = useLocalStorage<FolderI[]>("folders", []);
  const [contextMenu, setContextMenu] = useState(INITIAL_CONTEXT_MENU);

  const createFolder = () => {
    const newFolder = {
      name: "(No Title)",
    };
    setState((prev) => {
      return [...prev, newFolder];
    });
    localStorage.setItem("folders", JSON.stringify([...state, newFolder]));
  };

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const { pageX, pageY } = e;
    setContextMenu({ show: true, x: pageX, y: pageY });
  };

  const onClose = () => setContextMenu(INITIAL_CONTEXT_MENU);

  const onChangeHandler: InputChangeEventHandler = (e) => {
    setRenameValue(e.target.value);
  };

  const onKeyDownHandler = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Enter") {
      setState((prev) => {
        const newState = [...prev];
        newState[idx].name = renameValue;
        return newState;
      });
      setShowInput(null);
    }
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

  // This Fixes Next.js hydration issue with local storage. TODO: find better approach
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div
        className="w-1/4 border-r border-r-border h-screen"
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
          {isClient ? (
            state.map((el: FolderI, idx) => (
              <Folder
                name={el.name}
                idx={idx}
                key={idx}
                showInput={showInput}
                renameValue={renameValue}
                changeNameHandler={changeNameHandler}
                onChangeHandler={onChangeHandler}
                onKeyDownHandler={onKeyDownHandler}
              />
            ))
          ) : (
            <></>
          )}
        </ul>
      </div>
      {contextMenu.show ? (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={onClose}
          createFolder={createFolder}
        />
      ) : null}
    </>
  );
}
