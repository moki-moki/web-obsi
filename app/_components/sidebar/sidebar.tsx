"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import SidebarControlls from "./sidebar-controlls";

import Note from "../ui/note";
import File from "../ui/file";
import Folder from "../ui/folder";
import Draggable from "../draggable";
import Droppable from "../droppable";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { FileI, FolderI, InputChangeEventHandler } from "@/app/types/types";
import { FOLDER_STATE } from "@/app/data/initial-state";

export default function Sidebar() {
  const [isClient, setIsClient] = useState<boolean>(false); // Fixes Next.js hydration issue with local storage
  const [renameValue, setRenameValue] = useState<string>("");
  const [showInput, setShowInput] = useState<null | number>(null);
  const [notes, setNotes] = useLocalStorage<FileI[]>("notes", []);
  const [folders, setFolders] = useLocalStorage<FolderI[]>("folders", []);
  const [rotatedIcons, setRotatedIcons] = useState(
    Array(FOLDER_STATE.length).fill(false)
  );

  const createFolder = (idx?: number) => {
    const newFolder = {
      id: uuidv4(),
      name: "(No Title)",
      files: [],
      folders: [],
    };
    if (typeof idx === "number") {
      setFolders((prev) => {
        const updatedGroup = [...prev[idx].folders];
        updatedGroup.push(newFolder);
        prev[idx] = {
          ...prev[idx],
          folders: updatedGroup,
        };
        return [...prev];
      });
    } else {
      setFolders((prev) => [...prev, newFolder]);
    }
  };

  const createFile = () => {
    const newNote: FileI = {
      id: uuidv4(),
      name: "(No title)",
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

  const iconHandler = (e: React.MouseEvent, idx: number) => {
    if ((e.target as HTMLElement).tagName === "INPUT") return;
    setRotatedIcons((prevState) => {
      const newState = [...prevState];
      newState[idx] = !newState[idx];
      return newState;
    });
  };

  // This Fixes Next.js hydration issue with local storage. TODO: find better approach
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="w-1/4 border-r border-r-border h-screen">
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
                    createFile={createFile}
                    iconHandler={iconHandler}
                    createFolder={createFolder}
                    deleteFolder={deleteFolder}
                    onChangeHandler={onChangeHandler}
                    onKeyDownHandler={onKeyDownHandler}
                    changeNameHandler={changeNameHandler}
                  >
                    {el.files?.length && rotatedIcons[idx] ? (
                      <div className="flex flex-col gap-2 p-2">
                        <span className="block w-full h-0.5 bg-gray rounded-full"></span>
                        {el.files?.map((el) => (
                          <File name={el.name} />
                        ))}
                      </div>
                    ) : null}
                  </Folder>
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
    </DndContext>
  );
}
