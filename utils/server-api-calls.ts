import { revalidatePath } from 'next/cache';
import axiosInstance from './axios';
import { redirect } from 'next/navigation';

export const getNoteData = async (id: string) => {
  const req = await axiosInstance.get(`${process.env.DEFAULT_URL}/notes/${id}`);

  // revalidatePath(`${process.env.DEFAULT_URL}/notes/${id}`);
  return req.data;
};

export const submitNoteData = async (formData: FormData, id: string) => {
  await axiosInstance.put(`${process.env.DEFAULT_URL}/notes/${id}`, {
    title: formData.get('title'),
    markdown: formData.get('note'),
  });
  redirect(`/notes/${id}`);
};
