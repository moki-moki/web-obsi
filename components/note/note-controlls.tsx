'use client';
import React from 'react';
import Link from 'next/link';
import Button from '../ui/button';
import { useDeleteNote } from '@/api-calls/notes';
import { FilePenLine, Trash2 } from 'lucide-react';
import { useModal } from '@/app/context/modal-context';

interface Props {
  id: string;
}

const NoteControlls = ({ id }: Props) => {
  const { deleteNote } = useDeleteNote();
  const { setModalContent, openModal, closeModal } = useModal();

  const deleteNoteHandler = () => {
    deleteNote(id);
    closeModal();
  };

  const showModal = () => {
    setModalContent(
      <>
        <p className="font-bold text-center text-nowrap">
          Are you sure you want to <span className="text-red">delete</span> this note&#x3f;
        </p>
        <Button
          size="sm"
          type="button"
          font="bolded"
          variants="warning-outlined"
          onClick={deleteNoteHandler}
          className="w-full mt-8 rounded-md"
        >
          Yes
        </Button>
      </>
    );
    openModal();
  };

  return (
    <>
      <Link
        href={`/notes/edit/${id}`}
        className="block absolute right-20 rounded-lg text-gray transition-colors duration-150 ease-in bg-gray/20 p-2 hover:text-white"
      >
        <FilePenLine size={20} />
      </Link>
      <Button
        type="button"
        variants="icon"
        onClick={showModal}
        className="absolute right-8 rounded-lg text-red/60 transition-colors duration-150 ease-in bg-gray/20 p-2 hover:text-red/100"
      >
        <Trash2 size={20} />
      </Button>
    </>
  );
};

export default NoteControlls;
