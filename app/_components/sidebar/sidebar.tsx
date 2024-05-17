"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import SidebarControlls from "./sidebar-controlls";

import Note from "../ui/note";
import Folder from "../ui/folder";
import Draggable from "../draggable";
import Droppable from "../droppable";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { FileI, FolderI, InputChangeEventHandler } from "@/app/types/types";
import { FOLDER_STATE, INITIAL_CONTEXT_MENU } from "@/app/data/initial-state";
import ContextMenu from "../context-menu/context-menu";
import { FilePlus, FolderPlus } from "lucide-react";
import DragOverlayItem from "../drag-overlay-item";

interface DraggingItemI {
  title: string;
  type: string;
}

export default function Sidebar() {
  const [isClient, setIsClient] = useState<boolean>(false); // Fixes Next.js hydration issue with local storage
  const [renameValue, setRenameValue] = useState<string>("");
  const [draggingItem, setDraggingItem] = useState<DraggingItemI | null>(null);
  const [showInput, setShowInput] = useState<null | number>(null);
  const [notes, setNotes] = useLocalStorage<FileI[]>("notes", []);
  const [contextMenu, setContextMenu] = useState(INITIAL_CONTEXT_MENU);
  const [folders, setFolders] = useLocalStorage<FolderI[]>("folders", []);
  const [rotatedIcons, setRotatedIcons] = useState(
    Array(FOLDER_STATE.length).fill(false)
  );

  const createFolder = () => {
    const newFolder = {
      id: uuidv4(),
      name: "(No Title)",
      type: "folder",
      files: [],
    };
    setFolders((prev) => [...prev, newFolder]);
  };

  const createFile = () => {
    const newNote: FileI = {
      id: uuidv4(),
      name: "(No title)",
      type: "note",
    };
    setNotes((prev) => [...prev, newNote]);
  };

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

  const onClose = () => setContextMenu(INITIAL_CONTEXT_MENU);

  const onDragEnd = (e: DragEndEvent) => {
    const item = e.active.data.current?.children;
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
    setIsDragging(false);
  };

  const iconHandler = (e: React.MouseEvent, idx: number) => {
    if ((e.target as HTMLElement).tagName === "INPUT") return;
    setRotatedIcons((prevState) => {
      const newState = [...prevState];
      newState[idx] = !newState[idx];
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

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDragStart = (e: DragStartEvent) => {
    const data = {
      title: e.active.data.current?.children.props.name,
      type: e.active.data.current?.type,
    };
    if (data) {
      setDraggingItem(data);
    }
    setIsDragging(true);
  };

  // This Fixes Next.js hydration issue with local storage. TODO: find better approach
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={onDragEnd}>
      <div
        onContextMenu={handleContextMenu}
        className="w-1/4 border-r border-r-border h-screen"
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
                    rotateIcon={rotatedIcons}
                    renameValue={renameValue}
                    iconHandler={iconHandler}
                    deleteFolder={deleteFolder}
                    onChangeHandler={onChangeHandler}
                    onKeyDownHandler={onKeyDownHandler}
                    changeNameHandler={changeNameHandler}
                  />
                </Droppable>
              ))}
              {notes.map((el) => (
                <Draggable id={el.id} type={el.type} key={el.id}>
                  <Note name={el.name} />
                </Draggable>
              ))}
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>

      <DragOverlay>
        {isDragging && draggingItem ? (
          <DragOverlayItem
            title={draggingItem.title}
            type={draggingItem.type}
          />
        ) : null}
      </DragOverlay>

      {contextMenu.show ? (
        <ContextMenu x={contextMenu.x} y={contextMenu.y} onClose={onClose}>
          <li
            onClick={createFolder}
            className="folder flex justify-between items-center cursor-pointer text-gray px-2 py-1 rounded-full text-xs font-bold uppercase hover:bg-gray/20"
          >
            New Folder
            <span className="ml-2 text-base">
              <FolderPlus />
            </span>
          </li>
          <li
            onClick={createFile}
            className="folder flex justify-between items-center cursor-pointer text-gray px-2 py-1 rounded-full text-xs font-bold uppercase hover:bg-gray/20"
          >
            New File
            <span className="ml-2 text-base">
              <FilePlus />
            </span>
          </li>
        </ContextMenu>
      ) : null}
    </DndContext>
  );
}
