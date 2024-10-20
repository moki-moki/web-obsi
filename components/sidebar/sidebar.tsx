'use client';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import dynamic from 'next/dynamic';

import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';

import { DraggingItemI, FolderI } from '@/types/types';

import { useMoveNote } from '@/api-calls/notes';
import { useContextMenu } from '@/app/context/context-menu';
import { useSidebarContext } from '@/app/context/sidebar-conext';

import Notes from './notes';
import Folder from './folder';
import Droppable from '../draggable/droppable';
import SidebarControlls from './sidebar-controlls';
import ContextMenu from '../context-menu/context-menu';
import SidebarSkeleton from '../ui/skeletons/SidebarSkeleton';
import SidebarGeneralControlls from './sidebar-general-controlls';
import ContextMenuControlls from '../context-menu/context-menu-controlls';

const DragOverlayItem = dynamic(() => import('../draggable/drag-overlay-item'), { ssr: false });

function Sidebar() {
  const [openFolders, setOpenFolders] = useState(new Map());
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggingItem, setDraggingItem] = useState<DraggingItemI | null>(null);

  const { moveNoteHandler } = useMoveNote();
  const { clickedItem, contextMenu, getItemDataOnClick, handleContextMenu } = useContextMenu();
  const {
    notes,
    notesLoading,
    folders,
    foldersLoading,
    isSidebarOpen,
    dimension,
    startResize,
    stopResize,
    resizeFrame,
  } = useSidebarContext();

  const { open } = isSidebarOpen;

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!active || !over || !over.data.current || !active.data.current) return;
    const overId = over.id;
    const location = over.data.current.type;
    const { id } = active.data.current;

    if (location === 'notes') moveNoteHandler(id);
    else moveNoteHandler(id, overId);

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

  const toggleFolderHandler = (id: string) => {
    setOpenFolders((prev) => {
      const newState = new Map(prev);
      if (newState.get(id)) newState.delete(id);
      else newState.set(id, true);
      return newState;
    });
  };

  return (
    <>
      <div
        className="flex bg-primary-color fixed left-0 top-0 h-full"
        style={{ width: `${open ? 'auto' : `41px`}` }}
        onMouseUp={stopResize}
        onMouseMove={resizeFrame}
      >
        <SidebarGeneralControlls />
        <div
          className="overflow-hidden"
          onContextMenu={handleContextMenu}
          style={{
            width: `${`${dimension.w}px`}`,
            transform: `${open ? 'translateX(0)' : 'translateX(-100%)'}`,
          }}
        >
          <div
            className="absolute right-0 top-0 bg-border-color h-full w-0.5 z-10 cursor-ew-resize transition-all duration-200 ease-in hover:w-1"
            onMouseDown={startResize}
          ></div>
          <SidebarControlls />
          <h2 className="px-4 my-4 text-text-color uppercase font-bold">Your Notes</h2>

          <DndContext onDragStart={handleDragStart} onDragEnd={onDragEnd}>
            {foldersLoading || notesLoading ? (
              <SidebarSkeleton />
            ) : (
              <>
                <ul className="px-1 flex flex-col gap-2">
                  {folders?.map((folder: FolderI, idx: number) => (
                    <li key={folder.id}>
                      <Folder
                        level={0}
                        idx={idx}
                        folder={folder}
                        openFolders={openFolders}
                        getItemDataOnClick={getItemDataOnClick}
                        toggleFolderHandler={toggleFolderHandler}
                      />
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
