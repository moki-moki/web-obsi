'use client';
import React, { createContext, useContext, useState } from 'react';

import { FileI, FolderI } from '@/types/types';
import { useGetNotes } from '@/api-calls/notes';
import { useGetFolders } from '@/api-calls/folders';
import { useLocalStorage } from '../hooks/useLocalStorage';

type SidebarContextI = {
  notes: FileI[];
  folders: FolderI[];
  noteId: string | null;
  dimension: { w: number };
  notesLoading: boolean;
  isSidebarOpen: boolean;
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

const SidebarContext = createContext<SidebarContextI>({} as SidebarContextI);

export default function SidebarConextProvider({ children }: { children: React.ReactNode }) {
  const [dimension, setDimension] = useState({ w: 500 });
  const [noteId, setNoteId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorage('isSidebarOpen', true);
  const [drag, setDrag] = useState({
    active: false,
    x: '',
  });

  const { data: notes, error: notesError, isLoading: notesLoading } = useGetNotes();
  const { data: folders, error: foldersError, isLoading: foldersLoading } = useGetFolders();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const getNoteId = (id: string) => setNoteId(id);

  const startResize = (e: React.MouseEvent) => {
    setDrag({ active: true, x: e.clientX.toString() });
  };

  const resizeFrame = (e: React.MouseEvent) => {
    const { active, x } = drag;
    const toNum = Number(x);
    if (active) {
      const xDiff = Math.abs(toNum - e.clientX);
      const newW = toNum > e.clientX ? dimension.w - xDiff : dimension.w + xDiff;

      setDrag({ ...drag, x: e.clientX.toString() });
      setDimension({ w: newW });
    }
  };

  const stopResize = () => {
    setDrag({ ...drag, active: false });
  };

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
