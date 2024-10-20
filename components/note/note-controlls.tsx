'use client';
import Link from 'next/link';
import Button from '../ui/button';
import { useRouter } from 'next/navigation';
import { useDeleteNote } from '@/api-calls/notes';
import { FilePenLine, Trash2, SquareSplitHorizontal } from 'lucide-react';
import { useModal } from '@/app/context/modal-context';
import useCurrentPathId from '@/app/hooks/useCurrentPathId';
import dynamic from 'next/dynamic';

const Popover = dynamic(() => import('../popover/popover'), { ssr: true });

interface Props {
  id: string;
  toggleSplitWindow: () => void;
}

const NoteControlls = ({ id, toggleSplitWindow }: Props) => {
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
        <p className="font-bold text-center text-nowrap text-text-color">
          Are you sure you want to <span className="text-color-error">delete</span> this note&#x3f;
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
    <div className="flex items-center">
      <Popover text="split-screen" font="bolded">
        <Button
          type="button"
          variants="icon"
          className="rounded-lg p-2"
          onClick={toggleSplitWindow}
        >
          <SquareSplitHorizontal size={20} />
        </Button>
      </Popover>
      <Popover text="Edit note" font="bolded">
        <Link
          href={`/notes/edit/${id}`}
          className="block rounded-lg text-text-color transition-colors duration-150 ease-in bg-primary-color/20 p-2 hover:text-accent-color"
        >
          <FilePenLine size={20} />
        </Link>
      </Popover>
      <Popover text="Delete note" font="bolded">
        <Button
          type="button"
          variants="icon"
          onClick={showModal}
          className="rounded-lg text-color-error/60 transition-colors duration-150 ease-in bg-primary-color/20 p-2 hover:bg-color-error/20 hover:text-color-error"
        >
          <Trash2 size={20} />
        </Button>
      </Popover>
    </div>
  );
};

export default NoteControlls;
