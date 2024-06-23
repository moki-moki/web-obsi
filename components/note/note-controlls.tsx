'use client';
import React from 'react';
import Link from 'next/link';
import Button from '../ui/button';
import { useRouter } from 'next/navigation';
import { useDeleteNote } from '@/api-calls/notes';
import { FilePenLine, Trash2 } from 'lucide-react';
import { useModal } from '@/app/context/modal-context';
import useCurrentPathId from '@/app/hooks/useCurrentPathId';
import Popover from '../popover/popover';

interface Props {
  id: string;
}

const NoteControlls = ({ id }: Props) => {
  const { push } = useRouter();
  const { deleteNote } = useDeleteNote();
  const { setModalContent, openModal, closeModal } = useModal();

  const pathId = useCurrentPathId();

  const deleteNoteHandler = async () => {
    await deleteNote(id);
    closeModal();

    if (pathId === id) push('/');
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
    <div className="absolute right-8 top-2 flex items-center">
      <Popover text="Edit note" font="bolded">
        <Link
          href={`/notes/edit/${id}`}
          className="block rounded-lg text-gray transition-colors duration-150 ease-in bg-gray/20 p-2 hover:text-white"
        >
          <FilePenLine size={20} />
        </Link>
      </Popover>
      <Popover text="Delete note" font="bolded">
        <Button
          type="button"
          variants="icon"
          onClick={showModal}
          className="rounded-lg text-red/60 transition-colors duration-150 ease-in bg-gray/20 p-2 hover:text-red/100"
        >
          <Trash2 size={20} />
        </Button>
      </Popover>
    </div>
  );
};

export default NoteControlls;
