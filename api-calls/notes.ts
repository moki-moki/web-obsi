import useSWR from 'swr';
import axios from 'axios';
import { useGetFolders } from './folders';
import { UniqueIdentifier } from '@dnd-kit/core';
import { endponints, fetcher } from '@/utils/axios';

const URL = endponints.notes;
const MOVE_NOTE_URL = endponints.moveNotetoFolder;

export const useGetNotes = () => {
  const { data, error, isLoading, mutate } = useSWR(URL, fetcher);

  return { data, error, isLoading, mutate };
};

export const useCreateNote = () => {
  const { mutate } = useGetNotes();

  const createNote = async () => {
    await axios.post(URL);
    mutate();
  };

  return { createNote };
};

export const useDeleteNote = () => {
  const { mutate: mutateNote } = useGetNotes();
  const { mutate: mutateFolders } = useGetFolders();

  const deleteNote = async (id: string, type: 'note' | 'folder') => {
    await axios.delete(URL, { data: { id } });
    mutateNote();
    mutateFolders();
  };

  return { deleteNote };
};

export const useMoveNoteToFolder = () => {
  const { mutate: mutateNote } = useGetNotes();
  const { mutate: mutateFolders } = useGetFolders();

  const moveNoteToFolder = async (id: string, folderId: UniqueIdentifier) => {
    await axios.post(MOVE_NOTE_URL, { id, folderId });
    await mutateNote();
    await mutateFolders();
  };

  return { moveNoteToFolder };
};

export const useRenameNote = () => {
  const { mutate } = useGetNotes();

  const renameNoteTitle = async (id: string, title: string) => {
    await axios.put(URL, { id, title });
    mutate();
  };

  return { renameNoteTitle };
};
