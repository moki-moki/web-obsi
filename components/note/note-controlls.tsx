'use client';
import React from 'react';
import Link from 'next/link';
import Button from '../ui/button';
import Modal from '../modal/modal';
import { useModal } from '@/app/hooks/useModal';
import { useDeleteNote } from '@/api-calls/notes';
import { FilePenLine, Trash2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  id: string;
}

const NoteControlls = ({ id }: Props) => {
  const { showModal, openModal, closeModal } = useModal();
  const { deleteNote } = useDeleteNote();
  const router = useRouter();

  const deleteNoteHandler = async (id: string) => {
    await deleteNote(id);
    router.push('/');
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
        onClick={openModal}
        className="absolute right-8 rounded-lg text-red/60 transition-colors duration-150 ease-in bg-gray/20 p-2 hover:text-red/100"
      >
        <Trash2 size={20} />
      </Button>

      {showModal ? (
        <Modal showModal={showModal} closeModal={closeModal}>
          <Button
            type="button"
            variants="icon"
            onClick={closeModal}
            className="rounded-full p-1 absolute top-1 right-1"
          >
            <X size={20} />
          </Button>
          <p className="font-bold text-center text-nowrap">
            Are you sure you want to <span className="text-red">delete</span> this note&#x3f;
          </p>
          <Button
            size="sm"
            type="button"
            font="bolded"
            variants="ghost-outlined"
            onClick={() => deleteNoteHandler(id)}
            className="w-full mt-8 border-red text-red rounded-md hover:bg-red"
          >
            Yes
          </Button>
        </Modal>
      ) : null}
    </>
  );
};

export default NoteControlls;
