import Link from 'next/link';

import Button from '../ui/button';

import { FilePen, SquarePen, Trash2 } from 'lucide-react';

import { FileI, FolderI } from '@/types/types';
import { useDeleteNote } from '@/api-calls/notes';
import { useDeleteFolder } from '@/api-calls/folders';
import { useModal } from '@/app/context/modal-context';
import { useSidebarContext } from '@/app/context/sidebar-conext';
import { useRouter } from 'next/navigation';
import useCurrentPathId from '@/app/hooks/useCurrentPathId';
import { toast } from 'react-toastify';

interface Props {
  itemData: FileI | FolderI | null;
}

const ContextMenuControlls = ({ itemData }: Props) => {
  const { push } = useRouter();
  const { deleteNote } = useDeleteNote();
  const { getNoteId } = useSidebarContext();
  const { deleteFolder } = useDeleteFolder();
  const { openModal, closeModal, setModalContent } = useModal();

  const pathId = useCurrentPathId();

  if (!itemData) return;

  const { type, id } = itemData;

  const deleteFolderHandler = () => {
    deleteFolder(id).then((res) => res === 200 && toast.error('Folder was Deleted!'));
    closeModal();
  };

  const deleteNoteHandler = () => {
    deleteNote(id).then((res) => res === 200 && toast.error('Note was Deleted!'));
    closeModal();
    if (pathId === id) push('/');
  };

  const showModal = () => {
    setModalContent(
      <>
        <p className="font-bold text-center text-nowrap">
          Are you sure you want to <span className="text-red">delete</span> this{' '}
          {type === 'folder' ? 'folder' : 'note'}&#x3f;
        </p>
        <Button
          size="sm"
          type="button"
          font="bolded"
          variants="warning-outlined"
          onClick={() => (type === 'folder' ? deleteFolderHandler() : deleteNoteHandler())}
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
      {type === 'folder' && (
        <li
          onClick={showModal}
          className="folder flex items-center cursor-pointer text-red bg-red/20 px-2 py-1 rounded-lg text-xs font-bold uppercase hover:bg-red/30"
        >
          <span className="mr-2 text-base">
            <Trash2 size={15} />
          </span>
          Delete Folder
        </li>
      )}

      {type === 'note' && (
        <>
          <li
            onClick={() => getNoteId(id)}
            className="folder flex items-center cursor-pointer text-gray px-2 py-1 rounded-lg text-xs font-bold uppercase hover:bg-gray/30"
          >
            <span className="mr-2 text-base">
              <SquarePen size={15} />
            </span>
            Rename File
          </li>
          <li className="folder flex items-center cursor-pointer text-gray px-2 py-1 rounded-lg text-xs font-bold uppercase hover:bg-gray/30">
            <span className="mr-2 text-base">
              <FilePen size={15} />
            </span>
            <Link href={`/notes/edit/${id}`}>Edit note</Link>
          </li>
          <li
            onClick={showModal}
            className="folder flex items-center cursor-pointer text-red bg-red/20 px-2 py-1 rounded-lg text-xs font-bold uppercase hover:bg-red/30"
          >
            <span className="mr-2 text-base">
              <Trash2 size={15} />
            </span>
            Delete File
          </li>
        </>
      )}
    </>
  );
};

export default ContextMenuControlls;
