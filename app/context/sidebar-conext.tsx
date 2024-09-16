'use client';
import React, { createContext, useContext, useState } from 'react';

import { useGetFolders } from '@/api-calls/folders';
import { useGetNotes } from '@/api-calls/notes';
import { FileI, FolderI } from '@/types/types';
import { useLocalStorage } from '../hooks/useLocalStorage';

type SidebarContextI = {
  notes: FileI[];
  folders: FolderI[];
  noteId: string | null;
  dimension: { w: number };
  notesLoading: boolean;
  isSidebarOpen: { width: number; open: boolean };
  foldersLoading: boolean;
  notesError: undefined | boolean;
  foldersError: undefined | boolean;
  stopResize: () => void;
  toggleSidebar: () => void;
  getNoteId: (id: string) => void;
  resizeFrame: (e: React.MouseEvent) => void;
  startResize: (e: React.MouseEvent) => void;
  setNoteId: React.Dispatch<React.SetStateAction<string | null>>;
};
const sidebarData = {
  width: 300,
  open: true,
};

const maxWidthGuard = window.innerWidth / 2;
const minWidthGuard = 100;
const SidebarContext = createContext<SidebarContextI>({} as SidebarContextI);

export default function SidebarConextProvider({ children }: { children: React.ReactNode }) {
  const [noteId, setNoteId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorage('isSidebarOpen', sidebarData);
  const [dimension, setDimension] = useState({ w: isSidebarOpen.width });
  const [isSidebarDragging, setIsSidebarDragging] = useState({
    active: false,
    x: 0,
  });

  const { data: notes, error: notesError, isLoading: notesLoading } = useGetNotes();
  const { data: folders, error: foldersError, isLoading: foldersLoading } = useGetFolders();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      const newState = { ...prev };
      newState.open = !newState.open;
      return newState;
    });
  };

  const getNoteId = (id: string) => setNoteId(id);

  const startResize = (e: React.MouseEvent) => setIsSidebarDragging({ active: true, x: e.clientX });

  const resizeFrame = (e: React.MouseEvent) => {
    const { active, x } = isSidebarDragging;
    const toNum = Number(x);
    if (active) {
      const xDiff = Math.abs(toNum - e.clientX);
      const newW = toNum > e.clientX ? dimension.w - xDiff : dimension.w + xDiff;
      if (newW >= maxWidthGuard || newW <= minWidthGuard) return;

      setIsSidebarDragging({ ...isSidebarDragging, x: e.clientX });

      // It takes localstorage time to update, it can't be done real time, that is why we have double variable with width.
      setDimension({ w: newW });
      setIsSidebarOpen((prev) => {
        const newState = { ...prev };

        newState.width = newW;
        return newState;
      });
    }
  };

  const stopResize = () => setIsSidebarDragging({ ...isSidebarDragging, active: false });

  return (
    <SidebarContext.Provider
      value={{
        notes,
        noteId,
        folders,
        dimension,
        notesError,
        notesLoading,
        foldersError,
        isSidebarOpen,
        foldersLoading,
        setNoteId,
        getNoteId,
        stopResize,
        startResize,
        resizeFrame,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarContext() {
  const context = useContext(SidebarContext);

  if (context === undefined) {
    throw new Error('useSidebarContext must be used within a SidebarContextProvider');
  }

  return context;
}
