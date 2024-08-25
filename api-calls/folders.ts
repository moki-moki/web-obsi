import useSWR from 'swr';
import axiosInstance from '@/utils/axios';
import { endponints, fetcher } from '@/utils/axios';
import { toast } from 'react-toastify';
import { UniqueIdentifier } from '@dnd-kit/core';

const FOLDER_URL = endponints.folder;

export const useGetFolders = () => {
  const { data, error, isLoading, mutate } = useSWR(FOLDER_URL, fetcher);

  return { data, error, isLoading, mutate };
};

export const useCreateFolder = () => {
  const { mutate } = useGetFolders();

  const createFolder = async (id?: UniqueIdentifier) => {
    try {
      const req = await axiosInstance.post(FOLDER_URL, { parentId: id });
      await mutate();
      req.status === 200 && toast.success('Folder was created!');
    } catch (error) {
      console.log(error);
      toast.error('Error creating folder');
    }
  };

  return { createFolder };
};

export const useDeleteFolder = () => {
  const { mutate } = useGetFolders();

  const deleteFolder = async (id: string) => {
    try {
      await axiosInstance.delete(FOLDER_URL, { data: { id } });
      await mutate();
      toast.success('Folder was Deleted!');
    } catch (error) {
      toast.error('Error deleting a folder!');
    }
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
