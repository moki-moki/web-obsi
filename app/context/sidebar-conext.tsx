'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { FileI, FolderI } from '@/types/types';
import { findIndexById, findFolderIndexByInnerFiles } from '@/utils/utils';

type SidebarContextI = {
  notes: FileI[];
  folders: FolderI[];
  noteId: string | null;
  createNote: () => void;
  createFolder: () => void;
  getNoteId: (id: string) => void;
  deleteNote: (id: string) => void;
  deleteFolder: (id: string) => void;
  changeNoteName: (id: string, newName: string) => void;
  setNotes: React.Dispatch<React.SetStateAction<FileI[]>>;
  setFolders: React.Dispatch<React.SetStateAction<FolderI[]>>;
  setNoteId: React.Dispatch<React.SetStateAction<string | null>>;
};

const SidebarContext = createContext<SidebarContextI>({} as SidebarContextI);

export default function SidebarConextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [noteId, setNoteId] = useState<string | null>(null);
  // const [notes, setNotes] = useLocalStorage<FileI[]>('notes', []);
  // const [folders, setFolders] = useLocalStorage<FolderI[]>('folders', []);
  const [notes, setNotes] = useState<FileI[]>([]);
  const [folders, setFolders] = useState<FolderI[]>([]);

  const getNotes = async () => {
    try {
      const res = await fetch('/api/notes');
      if (res.ok) {
        const data = await res.json();
        setNotes(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFolders = async () => {
    try {
      const res = await fetch('/api/folders');
      if (res.ok) {
        const data = await res.json();
        setFolders(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotes();
    getFolders();
  }, []);

  const createNote = async () => {
    try {
      await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const createFolder = async () => {
    try {
      await fetch('/api/folders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  const changeNoteName = (id: string, newName: string) => {
    const updatedNotes = [...notes];
    const noteIdx = findIndexById(notes, id);

    if (noteIdx !== -1) {
      updatedNotes[noteIdx].title = newName;
      setNotes(updatedNotes);
    } else {
      const updatedFolders = [...folders];
      const folderIdx = findFolderIndexByInnerFiles(folders, id);

      if (folderIdx !== -1) {
        const noteIdx = findIndexById(updatedFolders[folderIdx].notes, id);

        if (noteIdx !== -1)
          updatedFolders[folderIdx].notes[noteIdx].title = newName;
        setFolders(updatedFolders);
      }
    }
  };

  const deleteFolder = async (id: string) => {
    try {
      await fetch('/api/folders', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ noteId: id }),
      });
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await fetch('/api/notes', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
    } catch (error) {
      console.error('Error creating folder:', error);
    }

    const folderIdx = folders.findIndex((folder) =>
      folder.notes.some((note) => note.id === id)
    );

    if (folderIdx !== -1) {
      const parentFolder = folders[folderIdx];
      const updatedNotes = parentFolder.notes.filter((note) => note.id !== id);

      if (updatedNotes.length !== parentFolder.notes.length) {
        const updatedState = [...folders];
        updatedState[folderIdx] = { ...parentFolder, notes: updatedNotes };

        setFolders(updatedState);
      }
    } else {
      setNotes((prev) => [...prev].filter((item) => item.id !== id));
    }
  };

  const getNoteId = (id: string) => setNoteId(id);

  return (
    <SidebarContext.Provider
      value={{
        notes,
        noteId,
        folders,
        setNotes,
        setNoteId,
        getNoteId,
        deleteNote,
        createNote,
        setFolders,
        createFolder,
        deleteFolder,
        changeNoteName,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarContext() {
  const context = useContext(SidebarContext);

  if (context === undefined) {
    throw new Error(
      'useSidebarContext must be used within a SidebarContextProvider'
    );
  }

  return context;
}
