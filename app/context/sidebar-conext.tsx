"use client";
import { createContext, useContext } from "react";

import { FileI, FolderI } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";

type SidebarContextI = {
  notes: FileI[];
  folders: FolderI[];
  createNote: () => void;
  createFolder: () => void;
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

  const createNote = () => {
    const newNote = {
      id: uuidv4(),
      name: "(No title)",
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

  const deleteFolder = (id: string) => {
    setFolders((prev) => [...prev].filter((item) => item.id !== id));
  };

  return (
    <SidebarContext.Provider
      value={{
        notes,
        folders,
        setFolders,
        setNotes,
        createNote,
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
