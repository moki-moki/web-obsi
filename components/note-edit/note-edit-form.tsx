'use client';

import { FormEvent } from 'react';

import { toast } from 'react-toastify';
import { notFound } from 'next/navigation';

import Input from '../ui/input';
import Button from '../ui/button';

import { useGetNote } from '@/api-calls/note';
import { updateNote, useGetNotes } from '@/api-calls/notes';

const NoteEditForm = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useGetNote(id);
  const { mutate } = useGetNotes();

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = new FormData(e.currentTarget);
      await updateNote(id, data);
      await mutate();
    } catch (error) {
      toast.error('Something went wrong submitting a note!');
    }
  };

  if (isLoading) return null;
  if (error) notFound();

  return (
    <form className="w-10/12 flex-auto" onSubmit={onSubmitHandler}>
      <label htmlFor="title" className="text-sm font-bold text-gray uppercase">
        Edit title
      </label>
      <Input name="title" rounded="md" defaultValue={data.title} required={true} />

      <label htmlFor="note" className="block mb-1 mt-5 text-sm font-bold text-gray uppercase">
        Note Info
      </label>
      <textarea
        rows={20}
        name="note"
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
