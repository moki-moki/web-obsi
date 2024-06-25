import { endponints, fetcher } from '@/utils/axios';
import useSWR from 'swr';

const FOLDER_URL = endponints.notes;

export const useGetNote = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(`${FOLDER_URL}/${id}`, fetcher);

  return { data, error, isLoading, mutate };
};
