"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { DndContext, DragEndEvent } from "@dnd-kit/core";

import Note from "../ui/note";
import Folder from "../ui/folder";
import Draggable from "../draggable";
import Droppable from "../droppable";
import ContextMenu from "../context-menu/context-menu";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { INITIAL_CONTEXT_MENU } from "@/app/data/initial-state";
import {
  FileI,
  FolderI,
  InputChangeEventHandler,
  MenuI,
} from "@/app/types/types";
import SidebarControlls from "./sidebar-controlls";
import { FolderPlus, NotebookPen } from "lucide-react";
import ContextMenuItem from "../context-menu/context-items";

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

export default function Sidebar() {
  const [isClient, setIsClient] = useState<boolean>(false); // Fixes Next.js hydration issue with local storage
  const [renameValue, setRenameValue] = useState<string>("");
  const [showInput, setShowInput] = useState<null | number>(null);
  const [folders, setFolders] = useLocalStorage<FolderI[]>("folders", []);
  const [notes, setNotes] = useLocalStorage<FileI[]>("notes", []);
  const [contextMenu, setContextMenu] = useState(INITIAL_CONTEXT_MENU);

  const createFolder = () => {
    const newFolder = {
      id: uuidv4(),
      name: "(No Title)",
      files: [],
    };
    setFolders((prev) => [...prev, newFolder]);
  };

  const createFile = () => {
    const newNote: FileI = {
      id: uuidv4(),
      name: "(No title)",
    };
    setNotes((prev) => [...prev, newNote]);
  };

  const onClose = () => setContextMenu(INITIAL_CONTEXT_MENU);

  const onChangeHandler: InputChangeEventHandler = (e) => {
    e.stopPropagation();
    setRenameValue(e.target.value);
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

  const changeNameHandler = (
    e: React.MouseEvent<HTMLSpanElement>,
    idx: number,
    name: string
  ) => {
    e.stopPropagation();

    setShowInput(idx);
    setRenameValue(name);
  };

  const deleteFolder = (id: string) => {
    setFolders((prev) => {
      const newState = [...prev].filter((item) => item.id !== id);
      return newState;
    });
  };

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const { pageX, pageY } = e;
    setContextMenu({ show: true, x: pageX, y: pageY });
  };

  const onDragEnd = (e: DragEndEvent) => {
    const item = e.active.data.current?.title;
    if (!item || !e.active || !e.over) return;
    const active = e.active.id;
    const over = e.over?.id;

    const noteIdx: number = notes.findIndex((note) => note.id === active);
    const idxTransferFolder: number = folders.findIndex(
      (folder) => folder.id === over
    );

    const noteToTransfer = notes[noteIdx];
    const prevfolders = [...folders];

    // finds the folder being dragged to and updates it
    const updatedGroup = [...prevfolders[idxTransferFolder].files];
    updatedGroup.push(noteToTransfer);
    prevfolders[idxTransferFolder] = {
      ...prevfolders[idxTransferFolder],
      files: updatedGroup,
    };

    setNotes((prev) => {
      prev.splice(noteIdx, 1);
      return [...prev];
    });
    setFolders(prevfolders);
  };

  // This Fixes Next.js hydration issue with local storage. TODO: find better approach
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div
        className="w-1/4 border-r border-r-border h-screen"
        // onContextMenu={handleContextMenu}
      >
        <SidebarControlls createFolder={createFolder} createFile={createFile} />
        <h2 className="px-4 my-4 text-white uppercase font-bold">Your Notes</h2>
        <ul className="px-2 flex flex-col">
          {isClient ? (
            <>
              {folders.map((el: FolderI, idx) => (
                <Droppable id={el.id} key={el.id}>
                  <Folder
                    idx={idx}
                    id={el.id}
                    name={el.name}
                    files={el.files}
                    showInput={showInput}
                    renameValue={renameValue}
                    deleteFolder={deleteFolder}
                    onChangeHandler={onChangeHandler}
                    onKeyDownHandler={onKeyDownHandler}
                    changeNameHandler={changeNameHandler}
                  />
                </Droppable>
              ))}
              {notes.map((el) => (
                <Draggable id={el.id} key={el.id}>
                  <Note name={el.name} />
                </Draggable>
              ))}
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>
      {contextMenu.show ? (
        <ContextMenu x={contextMenu.x} y={contextMenu.y} onClose={onClose}>
          {MENU.map((el, idx) => (
            <ContextMenuItem
              key={idx}
              idx={idx}
              name={el.name}
              icon={el.icon}
              options={[createFolder, createFile]}
            />
          ))}
        </ContextMenu>
      ) : null}
    </DndContext>
  );
}
