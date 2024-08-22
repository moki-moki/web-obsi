'use client';
import React, { createContext, RefObject, useContext, useEffect, useRef, useState } from 'react';

import { FileI, FolderI } from '@/types/types';
import { useGetNotes } from '@/api-calls/notes';
import { useGetFolders } from '@/api-calls/folders';
import { useLocalStorage } from '../hooks/useLocalStorage';

type SidebarContextI = {
  notes: FileI[];
  folders: FolderI[];
  noteId: string | null;
  notesLoading: boolean;
  isSidebarOpen: boolean;
  foldersLoading: boolean;
  notesError: undefined | boolean;
  foldersError: undefined | boolean;
  toggleSidebar: () => void;
  getNoteId: (id: string) => void;
  setNoteId: React.Dispatch<React.SetStateAction<string | null>>;
};

const SidebarContext = createContext<SidebarContextI>({} as SidebarContextI);

export default function SidebarConextProvider({ children }: { children: React.ReactNode }) {
  const [noteId, setNoteId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorage('isSidebarOpen', true);

  const { data: notes, error: notesError, isLoading: notesLoading } = useGetNotes();
  const { data: folders, error: foldersError, isLoading: foldersLoading } = useGetFolders();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const getNoteId = (id: string) => setNoteId(id);

  return (
    <SidebarContext.Provider
      value={{
        notes,
        noteId,
        folders,
        notesError,
        notesLoading,
        foldersError,
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
