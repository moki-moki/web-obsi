'use client';

import { FormEvent, useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { notFound } from 'next/navigation';

import Input from '../ui/input';
import Button from '../ui/button';

import { useGetNote } from '@/api-calls/note';
import axiosInstance from '@/utils/axios';

const NoteEditForm = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useGetNote(id);
  const [formData, setFormData] = useState({ title: '', note: '' });

  useEffect(() => {
    if (data) {
      setFormData({ title: data.title, note: data.markdown });
    }
  }, [data]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const { note, title } = formData;
      await axiosInstance.put(`/api/notes/${id}`, { title, markdown: note });
      toast.success('Note was updated!');
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  if (isLoading) return null;
  if (error) notFound();

  return (
    <form className="w-10/12 flex-auto" onSubmit={onSubmitHandler}>
      <label htmlFor="title" className="text-sm font-bold text-gray uppercase">
        Edit title
      </label>
      <Input
        name="title"
        rounded="md"
        defaultValue={data.title}
        required={true}
        onChange={onChangeHandler}
      />

      <label htmlFor="note" className="block mb-1 mt-5 text-sm font-bold text-gray uppercase">
        Note Info
      </label>
      <textarea
        rows={20}
        name="note"
        onChange={onChangeHandler}
        defaultValue={data.markdown ? data.markdown : ''}
        className="text-gray p-2 w-full rounded-md bg-dark-gray-accent border border-border outline-none focus:ring-2 focus:ring-purple"
      ></textarea>
      <Button
        size="md"
        type="submit"
        font="bolded"
        variants="outlined"
        className="mt-5 w-full text-gray rounded-md uppercase hover:text-white hover:bg-gray/20 hover:border-purple"
      >
        Submit
      </Button>
    </form>
  );
};

export default NoteEditForm;
