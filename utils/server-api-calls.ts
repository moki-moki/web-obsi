import { FileI } from '@/types/types';
import axios from 'axios';

export const getNoteData = async (id: string): Promise<FileI> => {
  const res = await axios.get(`${process.env.DEFAULT_URL}/notes/${id}`);
  return await res.data;
};
