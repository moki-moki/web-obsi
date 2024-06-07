import useSWR from 'swr';
import axios from 'axios';
import { endponints, fetcher } from '@/utils/axios';
import { useGetNotes } from './notes';

const FOLDER_URL = endponints.folder;
const FOLDER_MOVE_URL = endponints.moveNoteFromFolder;

export const useGetFolders = () => {
  const { data, error, isLoading, mutate } = useSWR(FOLDER_URL, fetcher);

  return { data, error, isLoading, mutate };
};

export const useCreateFolder = () => {
  const { mutate } = useGetFolders();

  const createFolder = async () => {
    await axios.post(FOLDER_URL);
    mutate();
  };

  return { createFolder };
};

export const useDeleteFolder = () => {
  const { mutate } = useGetFolders();

  const deleteFolder = async (id: string) => {
    await axios.delete(FOLDER_URL, { data: { id } });
    mutate();
  };

  return { deleteFolder };
};

export const useRemoveNoteFromFolder = () => {
  const { mutate: folderMutate } = useGetFolders();
  const { mutate: noteMutate } = useGetNotes();
  const removeNoteFromFolder = async (id: string) => {
    await axios.post(FOLDER_MOVE_URL, { id });
    await folderMutate();
    await noteMutate();
  };

  return { removeNoteFromFolder };
};

export const useRenameFolderTitle = () => {
  const { mutate } = useGetFolders();

  const renameFolderTitle = async (id: string, title: string) => {
    await axios.put(FOLDER_URL, { id, title });
    await mutate();
  };

  return { renameFolderTitle };
};
