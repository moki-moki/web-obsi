"use client";
import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FileI, FolderI } from "../types/types";
import { useLocalStorage } from "../hooks/useLocalStorage";

type SidebarContextI = {
  notes: FileI[];
  folders: FolderI[];
  noteId: string | null;
  createNote: () => void;
  createFolder: () => void;
  getNoteId: (id: string) => void;
  deleteNote: (id: string) => void;
  deleteFolder: (id: string) => void;
  setNotes: React.Dispatch<React.SetStateAction<FileI[]>>;
  setFolders: React.Dispatch<React.SetStateAction<FolderI[]>>;
};

const SidebarContext = createContext<SidebarContextI>({} as SidebarContextI);

export default function SidebarConextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notes, setNotes] = useLocalStorage<FileI[]>("notes", []);
  const [folders, setFolders] = useLocalStorage<FolderI[]>("folders", []);
  const [noteId, setNoteId] = useState<string | null>(null);

  const createNote = () => {
    const newNote = {
      id: uuidv4(),
      name: `(No title)`,
      type: "note",
    };
    setNotes((prev) => [...prev, newNote]);
  };

  const createFolder = () => {
    const newFolder: FolderI = {
      id: uuidv4(),
      name: "(No title)",
      type: "folder",
      files: [],
    };
    setFolders((prev) => [...prev, newFolder]);
  };

  const deleteFolder = (id: string) =>
    setFolders((prev) => [...prev].filter((item) => item.id !== id));

  const deleteNote = (id: string) => {
    const folderIdx = folders.findIndex((folder) =>
      folder.files.some((note) => note.id === id)
    );

    if (folderIdx !== -1) {
      const parentFolder = folders[folderIdx];
      const updatedNotes = parentFolder.files.filter((note) => note.id !== id);

      if (updatedNotes.length !== parentFolder.files.length) {
        const updatedState = [...folders];
        updatedState[folderIdx] = { ...parentFolder, files: updatedNotes };

        setFolders(updatedState);
      }
    } else {
      setNotes((prev) => [...prev].filter((item) => item.id !== id));
    }
  };

  const getNoteId = (id: string) => {
    setNoteId(id);
  };

  return (
    <SidebarContext.Provider
      value={{
        notes,
        noteId,
        folders,
        setNotes,
        getNoteId,
        deleteNote,
        createNote,
        setFolders,
        createFolder,
        deleteFolder,
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
      "useSidebarContext must be used within a SidebarContextProvider"
    );
  }

  return context;
}
