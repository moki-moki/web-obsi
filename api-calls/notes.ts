import useSWR from 'swr';
import { FileI } from '@/types/types';
import { useGetFolders } from './folders';
import axiosInstance from '@/utils/axios';
import { UniqueIdentifier } from '@dnd-kit/core';
import { endponints, fetcher } from '@/utils/axios';
import { toast } from 'react-toastify';

const URL = endponints.notes;
const MOVE_NOTE_URL = endponints.moveNotetoFolder;
const MOVE_NOTE_FROM_FOLDER_URL = endponints.moveNoteFromFolder;

export const useGetNotes = () => {
  const { data, error, isLoading, mutate } = useSWR(URL, fetcher);

  return { data, error, isLoading, mutate };
};

export const useCreateNote = () => {
  const { mutate } = useGetNotes();

  const createNote = async () => {
    try {
      const req = await axiosInstance.post(URL);
      mutate();

      req.status === 200 && toast.success('Note was created!');
    } catch (error) {
      toast.error('Error creating a note');
    }
  };

  return { createNote };
};

export const useDeleteNote = () => {
  const { mutate: mutateNote } = useGetNotes();
  const { mutate: mutateFolders } = useGetFolders();

  const deleteNote = async (id: string) => {
    try {
      await axiosInstance.delete(URL, { data: { id } });
      await mutateNote();
      await mutateFolders();
      toast.success('Note was Deleted!');
    } catch (error) {
      toast.error('Error deleting note!');
    }
  };

  return { deleteNote };
};

export const useMoveNote = () => {
  const { mutate: mutateNote } = useGetNotes();
  const { mutate: mutateFolders } = useGetFolders();

  const moveNoteHandler = async (id: string, folderId?: UniqueIdentifier) => {
    if (!folderId) {
      await axiosInstance.post(MOVE_NOTE_FROM_FOLDER_URL, { id });
      await mutateFolders();
      await mutateNote();
    } else {
      await axiosInstance.post(MOVE_NOTE_URL, { id, folderId });
      await mutateNote();
      await mutateFolders();
    }
  };

  return { moveNoteHandler };
};

export const useRenameNote = () => {
  const { mutate: folderMutate } = useGetFolders();
  const { mutate: noteMutate } = useGetNotes();

  const renameNoteTitle = async (id: string, title: string, folderId: string | null) => {
    await axiosInstance.put(URL, { id, title });

    folderId ? folderMutate() : noteMutate();
  };

  return { renameNoteTitle };
};

export const getNoteData = async (id: string): Promise<FileI> => {
  const { mutate: noteMutate } = useGetNotes();
  const req = await axiosInstance.get(`${URL}/${id}`);
  noteMutate();
  return await req.data;
};

export const updateNote = async (id: string, data: FormData) => {
  const title = data.get('title');
  const markdown = data.get('note');
  try {
    const req = await axiosInstance.put(`${URL}/${id}`, { title, markdown });

    req.status === 200 && toast.success('Note was updated!');
  } catch (error) {
    toast.error('Something went wrong submitting a note!');
    console.log(error);
  }
};

export const findNoteBeingDeleted = async (id: string): Promise<string | null> => {
  const req = await axiosInstance.get(`${URL}/${id}`);

  if (req.status === 200) return req.data.id;
  else return null;
};
