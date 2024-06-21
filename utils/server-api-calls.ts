import axiosInstance from './axios';

export const getNoteData = async (id: string) => {
  const req = await axiosInstance.get(`${process.env.DEFAULT_URL}/notes/${id}`);
  return req.data;
};
