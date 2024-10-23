import { SplitDataI } from '@/types/types';
import axiosInstance, { endponints, fetcher } from '@/utils/axios';
import { toast } from 'react-toastify';
import useSWR from 'swr';

const NOTE_URL = endponints.notes;

export const useGetNote = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(`${NOTE_URL}/${id}`, fetcher);

  return { data, error, isLoading, mutate };
};

export const useUpdateNote = (id: string) => {
  const { mutate } = useGetNote(id);

  const updateNote = async (data: SplitDataI) => {
    const req = await axiosInstance.put(`${NOTE_URL}/${id}`, {
      title: data.title,
      markdown: data.markdown,
    });
    req.status === 200 && toast.success('Note was updated!');

    await mutate();
  };

  return { updateNote };
};
