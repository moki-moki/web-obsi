import useSWR from 'swr';
import { useGetNotes } from './notes';
import axiosInstance from '@/utils/axios';
import { endponints, fetcher } from '@/utils/axios';
import { toast } from 'react-toastify';

const FOLDER_URL = endponints.folder;
const FOLDER_MOVE_URL = endponints.moveNoteFromFolder;

export const useGetFolders = () => {
  const { data, error, isLoading, mutate } = useSWR(FOLDER_URL, fetcher);

  return { data, error, isLoading, mutate };
};

export const useCreateFolder = () => {
  const { mutate } = useGetFolders();

  const createFolder = async () => {
    const req = await axiosInstance.post(FOLDER_URL);
    mutate();

    req.status === 200 && toast.success('Folder was created!');
  };

  return { createFolder };
};

export const useDeleteFolder = () => {
  const { mutate } = useGetFolders();

  const deleteFolder = async (id: string) => {
    const req = await axiosInstance.delete(FOLDER_URL, { data: { id } });
    mutate();
    return req.status;
  };

  return { deleteFolder };
};

export const useRenameFolderTitle = () => {
  const { mutate } = useGetFolders();

  const renameFolderTitle = async (id: string, title: string) => {
    await axiosInstance.put(FOLDER_URL, { id, title });
    await mutate();
  };

  return { renameFolderTitle };
};
