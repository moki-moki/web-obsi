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
      <label htmlFor="title" className="text-sm font-bold text-text-color uppercase">
        Edit title
      </label>
      <Input name="title" rounded="md" defaultValue={data.title} required={true} />

      <label htmlFor="note" className="block mb-1 mt-5 text-sm font-bold text-text-color uppercase">
        Note Info
      </label>
      <textarea
        rows={20}
        name="note"
        defaultValue={data.markdown ? data.markdown : ''}
        className="text-text-color p-2 w-full rounded-md bg-primary-color border border-border-color outline-none focus:ring-2 focus:ring-color-info"
      ></textarea>
      <Button
        size="md"
        type="submit"
        font="bolded"
        variants="outlined"
        className="mt-5 w-full text-text-color rounded-md uppercase hover:border-color-info hover:bg-secondary-color/40"
      >
        Submit
      </Button>
    </form>
  );
};

export default NoteEditForm;
