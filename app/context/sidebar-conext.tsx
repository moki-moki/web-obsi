'use client';
import React, { createContext, useContext, useState } from 'react';

import { FileI, FolderI } from '@/types/types';
import { useGetFolders } from '@/api-calls/folders';
import { useGetNotes } from '@/api-calls/notes';

type SidebarContextI = {
  notes: FileI[];
  folders: FolderI[];
  noteId: string | null;
  notesLoading: boolean;
  foldersLoading: boolean;
  notesError: undefined | boolean;
  foldersError: undefined | boolean;
  getNoteId: (id: string) => void;
  setNoteId: React.Dispatch<React.SetStateAction<string | null>>;
};

const SidebarContext = createContext<SidebarContextI>({} as SidebarContextI);

export default function SidebarConextProvider({ children }: { children: React.ReactNode }) {
  const [noteId, setNoteId] = useState<string | null>(null);
  const { data: notes, error: notesError, isLoading: notesLoading } = useGetNotes();
  const { data: folders, error: foldersError, isLoading: foldersLoading } = useGetFolders();

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
        foldersLoading,
        setNoteId,
        getNoteId,
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
