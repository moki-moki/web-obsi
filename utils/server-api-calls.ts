import axiosInstance from './axios';
import { FileI } from '@/types/types';

export const getNoteData = async (id: string): Promise<FileI> => {
  const req = await axiosInstance.get(`${process.env.DEFAULT_URL}/notes/${id}`);
  return req.data;
};
