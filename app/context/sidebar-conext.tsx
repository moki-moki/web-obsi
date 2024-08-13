'use client';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

import { FileI, FolderI } from '@/types/types';
import { useGetFolders } from '@/api-calls/folders';
import { useGetNotes } from '@/api-calls/notes';

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
  toggleSidebar: () => void;
  getNoteId: (id: string) => void;
  setNoteId: React.Dispatch<React.SetStateAction<string | null>>;
};

const SidebarContext = createContext<SidebarContextI>({} as SidebarContextI);

export default function SidebarConextProvider({ children }: { children: React.ReactNode }) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [noteId, setNoteId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [sidebarWidth, setSidebarWidth] = useState<number>();
  const { data: notes, error: notesError, isLoading: notesLoading } = useGetNotes();
  const { data: folders, error: foldersError, isLoading: foldersLoading } = useGetFolders();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    if (sidebarRef.current) setSidebarWidth(sidebarRef.current.offsetWidth);
  }, [isSidebarOpen]);

  const getNoteId = (id: string) => setNoteId(id);

  console.log(sidebarWidth);

  return (
    <SidebarContext.Provider
      value={{
        notes,
        noteId,
        folders,
        notesError,
        sidebarWidth,
        notesLoading,
        foldersError,
        isSidebarOpen,
        foldersLoading,
        setNoteId,
        getNoteId,
        toggleSidebar,
      }}
    >
      <div
        ref={sidebarRef}
        className={`${isSidebarOpen ? 'w-1/5' : 'w-11'} flex fixed left-0 bg-dark-gray`}
      >
        {children}
      </div>
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
