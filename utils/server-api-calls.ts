import axiosInstance from './axios';

export const getNoteData = async (id: string) => {
  const req = await axiosInstance.get(`${process.env.DEFAULT_URL}/notes/${id}`);

  return req.data;
};

export const submitNoteData = async (formData: FormData, id: string) => {
  await axiosInstance.put(`${process.env.DEFAULT_URL}/notes/${id}`, {
    title: formData.get('title'),
    markdown: formData.get('note'),
  });
};
