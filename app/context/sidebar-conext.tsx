"use client";
import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FileI, FolderI } from "../types/types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { findFolderIndexByInnerFiles, findIndexById } from "../utils/utils";

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
  const [notes, setNotes] = useLocalStorage<FileI[]>("notes", []);
  const [folders, setFolders] = useLocalStorage<FolderI[]>("folders", []);

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

  const changeNoteName = (id: string, newName: string) => {
    const updatedNotes = [...notes];
    const noteIdx = findIndexById(notes, id);

    if (noteIdx !== -1) {
      updatedNotes[noteIdx].name = newName;
      setNotes(updatedNotes);
    } else {
      const updatedFolders = [...folders];
      const folderIdx = findFolderIndexByInnerFiles(folders, id);

      if (folderIdx !== -1) {
        const noteIdx = findIndexById(updatedFolders[folderIdx].files, id);

        if (noteIdx !== -1)
          updatedFolders[folderIdx].files[noteIdx].name = newName;
        setFolders(updatedFolders);
      }
    }
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
      "useSidebarContext must be used within a SidebarContextProvider"
    );
  }

  return context;
}
