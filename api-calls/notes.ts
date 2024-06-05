import { endponints, fetcher } from '@/utils/axios';
import axios from 'axios';
import useSWR from 'swr';

const URL = endponints.notes;

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
  const { mutate } = useGetNotes();

  const deleteNote = async (id: string) => {
    await axios.delete(URL, { data: { id } });
    mutate();
  };

  return { deleteNote };
};
