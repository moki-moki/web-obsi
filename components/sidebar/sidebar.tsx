'use client';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';

import { DraggingItemI } from '@/types/types';
import { useContextMenu } from '@/app/context/context-menu';
import { useSidebarContext } from '@/app/context/sidebar-conext';

import Notes from './notes';
import Folders from './folders';
import Droppable from '../draggable/droppable';
import SidebarControlls from './sidebar-controlls';
import ContextMenu from '../context-menu/context-menu';
import DragOverlayItem from '../draggable/drag-overlay-item';
import ContextMenuControlls from '../context-menu/context-menu-controlls';

function Sidebar() {
  const [isClient, setIsClient] = useState<boolean>(false); // Fixes Next.js hydration issue with local storage
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggingItem, setDraggingItem] = useState<DraggingItemI | null>(null);

  const { notes, noteId, folders, setFolders, setNotes, setNoteId } =
    useSidebarContext();
  const { clickedItem, contextMenu, getItemDataOnClick, handleContextMenu } =
    useContextMenu();

  const moveNoteToFolder = async (id: string, folderId: UniqueIdentifier) => {
    try {
      await fetch('/api/moveNote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          folderId,
        }),
      });
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const moveNoteFromFolder = async (id: string) => {
    try {
      await fetch('/api/removeNoteFromFolder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      });
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!active || !over || !over.data.current || !active.data.current) return;
    const overId = over.id;
    const location = over.data.current.type;
    const { id } = active.data.current;
    if (location === 'notes') {
      moveNoteFromFolder(id);
    } else {
      moveNoteToFolder(id, overId);
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
        <h2 className="px-4 mb-4 text-white uppercase font-bold">Your Notes</h2>
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
