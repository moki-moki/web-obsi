'use client';
import React, { createContext, RefObject, useContext, useEffect, useRef, useState } from 'react';

import { FileI, FolderI } from '@/types/types';
import { useGetNotes } from '@/api-calls/notes';
import { useGetFolders } from '@/api-calls/folders';

type SidebarContextI = {
  notes: FileI[];
  folders: FolderI[];
  noteId: string | null;
  notesLoading: boolean;
  isSidebarOpen: boolean;
  foldersLoading: boolean;
  notesError: undefined | boolean;
  sidebarWidth: number | undefined;
  foldersError: undefined | boolean;
  sidebarRef: RefObject<HTMLDivElement>;
  toggleSidebar: () => void;
  getNoteId: (id: string) => void;
  setNoteId: React.Dispatch<React.SetStateAction<string | null>>;
};

const SidebarContext = createContext<SidebarContextI>({} as SidebarContextI);

export default function SidebarConextProvider({ children }: { children: React.ReactNode }) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [noteId, setNoteId] = useState<string | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState<number>();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const { data: notes, error: notesError, isLoading: notesLoading } = useGetNotes();
  const { data: folders, error: foldersError, isLoading: foldersLoading } = useGetFolders();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const getNoteId = (id: string) => setNoteId(id);

  useEffect(() => {
    if (sidebarRef.current) setSidebarWidth(sidebarRef.current.offsetWidth);
  }, [isSidebarOpen]);

  return (
    <SidebarContext.Provider
      value={{
        notes,
        noteId,
        folders,
        sidebarRef,
        notesError,
        notesLoading,
        foldersError,
        sidebarWidth,
        isSidebarOpen,
        foldersLoading,
        setNoteId,
        getNoteId,
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
