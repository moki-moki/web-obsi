'use client';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';

import { DraggingItemI, FileI } from '@/app/types/types';
import { useContextMenu } from '@/app/context/context-menu';
import { useSidebarContext } from '@/app/context/sidebar-conext';
import { findFolderIndexByInnerFiles, findIndexById } from '@/app/utils/utils';

import Notes from './notes';
import Folders from './folders';
import Droppable from '../Draggable/droppable';
import SidebarControlls from './sidebar-controlls';
import ContextMenu from '../context-menu/context-menu';
import DragOverlayItem from '../Draggable/drag-overlay-item';
import ContextMenuControlls from '../context-menu/context-menu-controlls';

function Sidebar() {
  const [isClient, setIsClient] = useState<boolean>(false); // Fixes Next.js hydration issue with local storage
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggingItem, setDraggingItem] = useState<DraggingItemI | null>(null);

  const { notes, noteId, folders, setFolders, setNotes, setNoteId } =
    useSidebarContext();
  const { clickedItem, contextMenu, getItemDataOnClick, handleContextMenu } =
    useContextMenu();

  const dragNoteHandler = (activeId: UniqueIdentifier, item: FileI) => {
    // Checks if we drop the item in same place
    const checkDrop = notes.some((note) => note.id === activeId);
    if (checkDrop) return;

    const updatedFolders = [...folders];

    const folderTransferIdx = findFolderIndexByInnerFiles(
      updatedFolders,
      item.id
    );
    const noteIdx = findIndexById(
      updatedFolders[folderTransferIdx].files,
      activeId
    );

    updatedFolders[folderTransferIdx].files.splice(noteIdx, 1);

    setNotes((prev) => [...prev, item]);
    setFolders(updatedFolders);
  };

  const dragFolderHandler = (
    activeId: UniqueIdentifier,
    overId: UniqueIdentifier,
    item: FileI
  ) => {
    const folderTransferIdx: number = findIndexById(folders, overId);

    // Checks if we drop the item in same place
    const checkForSameDropLocation: boolean = folders[
      folderTransferIdx
    ].files.some((note) => note.id === activeId);
    if (checkForSameDropLocation) return;
    const noteIdx: number = findIndexById(notes, activeId);
    const updatedFolders = [...folders];
    const updatedNotes = [...notes];

    const sourceFolderArray = updatedFolders.find((item) =>
      item.files.find((note) => note.id === activeId)
    );

    if (sourceFolderArray) {
      const noteIdx = findIndexById(sourceFolderArray.files, activeId);

      if (noteIdx !== -1) {
        const [noteToTransfer] = sourceFolderArray.files.splice(noteIdx, 1);
        updatedFolders[folderTransferIdx].files.push(noteToTransfer);
        setFolders(updatedFolders);
      }
    } else {
      updatedNotes.splice(noteIdx, 1);
      updatedFolders[folderTransferIdx].files.push(item);

      setNotes(updatedNotes);
      setFolders(updatedFolders);
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!active || !over || !over.data.current || !active.data.current) return;
    const activeId = active.id;
    const overId = over.id;
    const location = over.data.current.type;
    const { id, type, title } = active.data.current;
    const dataTransfer = {
      id,
      type,
      name: title,
    };

    if (location === 'notes') {
      dragNoteHandler(activeId, dataTransfer);
    } else {
      dragFolderHandler(activeId, overId, dataTransfer);
    }

    setIsDragging(false);
  };

  const handleDragStart = (e: DragStartEvent) => {
    if (!e.active.data.current) return;
    const { title, type } = e.active.data.current;
    const data = {
      title,
      type,
    };

    if (data) {
      setDraggingItem(data);
    }

    setTimeout(() => {
      setIsDragging(true);
    }, 150);
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
        <SidebarControlls />
        <h2 className="px-4 my-4 text-white uppercase font-bold">Your Notes</h2>
        {isClient ? (
          <>
            <DndContext onDragStart={handleDragStart} onDragEnd={onDragEnd}>
              <Folders
                noteId={noteId}
                folders={folders}
                setFolders={setFolders}
                getItemDataOnClick={getItemDataOnClick}
              />
              <ul className="h-full flex-auto p-1">
                <Droppable id={uuidv4()} type="notes">
                  {notes.map((note) => (
                    <Notes
                      note={note}
                      key={note.id}
                      noteId={noteId}
                      setNoteId={setNoteId}
                      getItemDataOnClick={getItemDataOnClick}
                    />
                  ))}
                </Droppable>
              </ul>
              {isDragging && draggingItem ? (
                <DragOverlayItem
                  title={draggingItem.title}
                  type={draggingItem.type}
                />
              ) : null}
            </DndContext>

            {contextMenu.show && clickedItem ? (
              <ContextMenu>
                <ContextMenuControlls itemData={clickedItem} />
              </ContextMenu>
            ) : null}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Sidebar;
