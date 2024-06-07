import clsx from 'clsx';
import { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FolderI } from '../types/types';
import { UniqueIdentifier } from '@dnd-kit/core';

interface UniqueId {
  id: string;
}

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const findFolderIndexByInnerFiles = (outerArray: FolderI[], id: UniqueIdentifier) =>
  outerArray.findIndex((outerObj) => outerObj.files.some((innerObj) => innerObj.id === id));

export const findIndexById = <T extends UniqueId>(array: T[], id: UniqueIdentifier) =>
  array.findIndex((item) => item.id === id);

export const findNoteIdx = (folders: FolderI[], id: UniqueIdentifier) => {
  const folderIdx = folders.findIndex((folder) => folder.files.some((note) => note.id === id));

  const noteIdx = findIndexById(folders[folderIdx].files, id);
  return noteIdx;
};
