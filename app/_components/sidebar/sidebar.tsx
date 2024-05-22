"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";

import { FilePlus, FolderPlus } from "lucide-react";

import Note from "../ui/note";
import Folders from "./folders";
import SidebarControlls from "./sidebar-controlls";
import ContextMenu from "../context-menu/context-menu";

import { DraggingItemI, FileI } from "@/app/types/types";
import { INITIAL_CONTEXT_MENU } from "@/app/data/initial-state";
import { useSidebarContext } from "@/app/context/sidebar-conext";

import Droppable from "../Draggable/droppable";
import Draggable from "../Draggable/draggable";
import DragOverlayItem from "../Draggable/drag-overlay-item";

function Sidebar() {
  const [isClient, setIsClient] = useState<boolean>(false); // Fixes Next.js hydration issue with local storage
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [contextMenu, setContextMenu] = useState(INITIAL_CONTEXT_MENU);
  const [draggingItem, setDraggingItem] = useState<DraggingItemI | null>(null);
  const {
    notes,
    folders,
    setFolders,
    setNotes,
    createNote,
    createFolder,
    deleteFolder,
  } = useSidebarContext();

  const onClose = () => setContextMenu(INITIAL_CONTEXT_MENU);

  const onDragNote = (over: UniqueIdentifier, item: FileI) => {
    const noteIdx = folders.findIndex((note) =>
      note.files.findIndex((item) => item.id === over)
    );
    setFolders((prev) => {
      prev.map((child) => {
        child.files.splice(noteIdx, 1);
        return child;
      });
      return [...prev];
    });
    setNotes((prev) => [...prev, item]);
  };

  const onDragEnd = (e: DragEndEvent) => {
    console.log(e);
    if (!e.active || !e.over || !e.over.data.current || !e.active.data.current)
      return;
    const active = e.active.id;
    const over = e.over.id;
    const location = e.over.data.current.type;
    const { id, type, title } = e.active.data.current;
    const dataTransfer = {
      id,
      type,
      name: title,
    };
    if (location === "notes") {
      onDragNote(over, dataTransfer);
    } else {
      const noteIdx: number = notes.findIndex((note) => note.id === active);
      const idxTransferFolder: number = folders.findIndex(
        (folder) => folder.id === over
      );
      const folderId = folders[idxTransferFolder].id;
      // Checkes if we drag in same file
      if (folderId === active) return;
      const prevfolders = [...folders];
      const noteToTransfer = notes[noteIdx];
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
    }
  };

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const { pageX, pageY } = e;
    setContextMenu({ show: true, x: pageX, y: pageY });
  };

  const handleDragStart = (e: DragStartEvent) => {
    const data = {
      title: e.active.data.current?.title,
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
    <>
      <div
        onContextMenu={handleContextMenu}
        className="w-1/4 border-r border-r-border h-screen flex flex-col"
      >
        <SidebarControlls createFolder={createFolder} createNote={createNote} />
        <h2 className="px-4 my-4 text-white uppercase font-bold">Your Notes</h2>
        {isClient ? (
          <>
            <DndContext onDragStart={handleDragStart} onDragEnd={onDragEnd}>
              <Folders
                folders={folders}
                setFolders={setFolders}
                deleteFolder={deleteFolder}
              />
              {isDragging && draggingItem ? (
                <DragOverlayItem
                  title={draggingItem.title}
                  type={draggingItem.type}
                />
              ) : null}
              <ul className="h-full flex-auto">
                <Droppable id={uuidv4()} type="notes">
                  {notes.map((el) => (
                    <li key={el.id}>
                      <Draggable id={el.id} title={el.name} type={el.type}>
                        <Note name={el.name} />
                      </Draggable>
                    </li>
                  ))}
                </Droppable>
              </ul>
            </DndContext>
          </>
        ) : (
          <></>
        )}
      </div>

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
            onClick={createNote}
            className="folder flex justify-between items-center cursor-pointer text-gray px-2 py-1 rounded-full text-xs font-bold uppercase hover:bg-gray/20"
          >
            New File
            <span className="ml-2 text-base">
              <FilePlus />
            </span>
          </li>
        </ContextMenu>
      ) : null}
    </>
  );
}

export default Sidebar;
