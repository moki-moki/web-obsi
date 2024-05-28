"use client";
import { createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { FileI, FolderI } from "../types/types";
import { useLocalStorage } from "../hooks/useLocalStorage";

type SidebarContextI = {
  notes: FileI[];
  folders: FolderI[];
  createNote: () => void;
  createFolder: () => void;
  deleteFolder: (id: string) => void;
  setNotes: React.Dispatch<React.SetStateAction<FileI[]>>;
  setFolders: React.Dispatch<React.SetStateAction<FolderI[]>>;
  deleteNoteInsideFolder: (parentId: string, id: string) => void;
};

const SidebarContext = createContext<SidebarContextI>({} as SidebarContextI);

export default function SidebarConextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

  const deleteFolder = (id: string) =>
    setFolders((prev) => [...prev].filter((item) => item.id !== id));

  const deleteNoteInsideFolder = (parentId: string, id: string) => {
    const folderIndex = folders.findIndex((folder) => folder.id === parentId);

    if (folderIndex !== -1) {
      const parentFolder = folders[folderIndex];
      const updatedNotes = parentFolder.files.filter((note) => note.id !== id);

      if (updatedNotes.length !== parentFolder.files.length) {
        const updatedState = [...folders];
        updatedState[folderIndex] = { ...parentFolder, files: updatedNotes };

        setFolders(updatedState);
      }
    }
  };

  return (
    <SidebarContext.Provider
      value={{
        notes,
        folders,
        setNotes,
        setFolders,
        createNote,
        createFolder,
        deleteFolder,
        deleteNoteInsideFolder,
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
