import { endponints, fetcher } from '@/utils/axios';
import axios from 'axios';
import useSWR from 'swr';

const URL = endponints.folder;

export const useGetFolders = () => {
  const { data, error, isLoading, mutate } = useSWR(URL, fetcher);

  return { data, error, isLoading, mutate };
};

export const useCreateFolder = () => {
  const { mutate } = useGetFolders();

  const createFolder = async () => {
    await axios.post(URL);
    mutate();
  };

  return { createFolder };
};

export const useDeleteFolder = () => {
  const { mutate } = useGetFolders();

  const deleteFolder = async (id: string) => {
    console.log(id);
    const req = await axios.delete(URL, { data: { id } });
    console.log(req);
    mutate();
  };

  return { deleteFolder };
};
