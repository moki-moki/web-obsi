import Link from 'next/link';

import Button from '../ui/button';

import { FilePen, FolderPlus, SquarePen, Trash2 } from 'lucide-react';

import { FileI, FolderI } from '@/types/types';
import { useDeleteNote } from '@/api-calls/notes';
import { useCreateFolder, useDeleteFolder } from '@/api-calls/folders';
import { useModal } from '@/app/context/modal-context';
import { useSidebarContext } from '@/app/context/sidebar-conext';
import { useRouter } from 'next/navigation';
import useCurrentPathId from '@/app/hooks/useCurrentPathId';

interface Props {
  itemData: FileI | FolderI | null;
}

const ContextMenuControlls = ({ itemData }: Props) => {
  const { push } = useRouter();
  const { deleteNote } = useDeleteNote();
  const { getNoteId } = useSidebarContext();
  const { deleteFolder } = useDeleteFolder();
  const { createFolder } = useCreateFolder();
  const { openModal, closeModal, setModalContent } = useModal();

  const pathId = useCurrentPathId();

  if (!itemData) return;

  const { type, id } = itemData;

  const deleteFolderHandler = async () => {
    await deleteFolder(id);
    closeModal();
  };

  const deleteNoteHandler = async () => {
    await deleteNote(id);
    closeModal();
    if (pathId === id) push('/');
  };

  const showModal = () => {
    setModalContent(
      <>
        <p className="font-bold text-center text-nowrap text-text-color">
          Are you sure you want to <span className="text-color-error">delete</span> this{' '}
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
        <>
          <li
            onClick={showModal}
            className="folder flex items-center cursor-pointer text-color-error bg-red/20 px-2 py-1 rounded-lg text-xs font-bold uppercase hover:bg-red/30"
          >
            <span className="mr-2 text-base">
              <Trash2 size={15} />
            </span>
            Delete Folder
          </li>
          <li
            onClick={() => createFolder(id)}
            className="folder flex items-center cursor-pointer text-text-color px-2 py-1 rounded-lg text-xs font-bold uppercase hover:bg-primary-color/30"
          >
            <span className="mr-2 text-base">
              <FolderPlus size={15} />
            </span>
            Create Folder
          </li>
        </>
      )}

      {type === 'note' && (
        <>
          <li
            onClick={() => getNoteId(id)}
            className="folder flex items-center cursor-pointer text-text-color px-2 py-1 rounded-lg text-xs font-bold uppercase hover:bg-primary-color/30"
          >
            <span className="mr-2 text-base">
              <SquarePen size={15} />
            </span>
            Rename File
          </li>
          <li className="folder flex items-center cursor-pointer text-text-color px-2 py-1 rounded-lg text-xs font-bold uppercase hover:bg-primary-color/30">
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
