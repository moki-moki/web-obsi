'use client';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';

import { DraggingItemI, FolderI } from '@/types/types';
import { useMoveNoteToFolder } from '@/api-calls/notes';
import { useContextMenu } from '@/app/context/context-menu';
import { useRemoveNoteFromFolder } from '@/api-calls/folders';
import { useSidebarContext } from '@/app/context/sidebar-conext';

import Notes from './notes';
import Folder from './folder';
import Droppable from '../draggable/droppable';
import SidebarControlls from './sidebar-controlls';
import ContextMenu from '../context-menu/context-menu';
import DragOverlayItem from '../draggable/drag-overlay-item';
import SidebarSkeleton from '../ui/skeletons/SidebarSkeleton';
import ContextMenuControlls from '../context-menu/context-menu-controlls';

function Sidebar() {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggingItem, setDraggingItem] = useState<DraggingItemI | null>(null);

  const { moveNoteToFolder } = useMoveNoteToFolder();
  const { removeNoteFromFolder } = useRemoveNoteFromFolder();

  const { notes, notesLoading, folders, foldersLoading } = useSidebarContext();
  const { clickedItem, contextMenu, getItemDataOnClick, handleContextMenu } = useContextMenu();

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!active || !over || !over.data.current || !active.data.current) return;
    const overId = over.id;
    const location = over.data.current.type;
    const { id } = active.data.current;
    if (location === 'notes') {
      removeNoteFromFolder(id);
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

    if (data) setDraggingItem(data);

    setTimeout(() => {
      setIsDragging(true);
    }, 150);
  };

  return (
    <>
      <div
        onContextMenu={handleContextMenu}
        className="w-1/4 border-r border-r-border h-screen flex flex-col max-w-72"
      >
        <SidebarControlls />
        <h2 className="px-4 my-4 text-white uppercase font-bold">Your Notes</h2>

        <DndContext onDragStart={handleDragStart} onDragEnd={onDragEnd}>
          {foldersLoading || notesLoading ? (
            <SidebarSkeleton />
          ) : (
            <>
              <ul className="px-1 flex flex-col gap-2">
                {folders.map((folder: FolderI, idx: number) => (
                  <li key={folder.id}>
                    <Folder idx={idx} folder={folder} getItemDataOnClick={getItemDataOnClick} />
                  </li>
                ))}
              </ul>

              <ul className="h-full flex-auto p-1">
                <Droppable id={uuidv4()} type="notes">
                  {notes.map((note) => (
                    <Notes note={note} key={note.id} getItemDataOnClick={getItemDataOnClick} />
                  ))}
                </Droppable>
              </ul>
              {isDragging && draggingItem ? (
                <DragOverlayItem title={draggingItem.title} type={draggingItem.type} />
              ) : null}
            </>
          )}
        </DndContext>
      </div>

      {contextMenu.show && clickedItem ? (
        <ContextMenu>
          <ContextMenuControlls itemData={clickedItem} />
        </ContextMenu>
      ) : null}
    </>
  );
}

export default Sidebar;
