'use client';
import { createContext, useContext, useState } from 'react';
import { INITIAL_CONTEXT_MENU } from '../data/initial-state';
import { ContextMenuI, FileI, FolderI } from '../types/types';

type ContextMenuT = {
  clickedItem: FolderI | FileI | null;
  contextMenu: ContextMenuI;
  onClose: () => void;
  setContextMenu: React.Dispatch<React.SetStateAction<ContextMenuI>>;
  getItemDataOnClick: (e: React.SyntheticEvent, data: FolderI | FileI) => void;
  handleContextMenu: (
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => void;
};

const DEFAULT_CONTEXT_VALUE = {
  contextMenu: INITIAL_CONTEXT_MENU,
  onClose: () => {},
  handleContextMenu: (
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    type: string
  ) => {},
};

const MenuContext = createContext<ContextMenuT>(
  DEFAULT_CONTEXT_VALUE as ContextMenuT
);

export default function ContextMenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [contextMenu, setContextMenu] = useState(INITIAL_CONTEXT_MENU);
  const [clickedItem, setClickedItem] = useState<FolderI | FileI | null>(null);

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    const { pageX, pageY } = e;
    setContextMenu({ show: true, x: pageX, y: pageY });
  };

  const onClose = () => {
    setContextMenu(INITIAL_CONTEXT_MENU);
    setClickedItem(null);
  };

  const getItemDataOnClick = (
    e: React.SyntheticEvent,
    data: FolderI | FileI
  ) => {
    e.preventDefault();
    setClickedItem(data);
  };

  return (
    <MenuContext.Provider
      value={{
        clickedItem,
        contextMenu,
        onClose,
        setContextMenu,
        handleContextMenu,
        getItemDataOnClick,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useContextMenu() {
  const context = useContext(MenuContext);

  if (context === undefined) {
    throw new Error(
      'useContextMenu must be used within a SidebarContextProvider'
    );
  }

  return context;
}
