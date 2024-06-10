import { FileI, FolderI } from '@/types/types';
import { useSidebarContext } from '@/app/context/sidebar-conext';
import { FilePen, SquarePen, Trash2 } from 'lucide-react';
import { useDeleteFolder } from '@/api-calls/folders';
import { useDeleteNote } from '@/api-calls/notes';
import Link from 'next/link';

interface Props {
  itemData: FileI | FolderI | null;
}

const ContextMenuControlls = ({ itemData }: Props) => {
  const { getNoteId } = useSidebarContext();
  const { deleteFolder } = useDeleteFolder();
  const { deleteNote } = useDeleteNote();
  if (!itemData) return;

  const { type, id } = itemData;

  return (
    <>
      {type === 'folder' && (
        <li
          onClick={() => deleteFolder(id)}
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
            onClick={() => deleteNote(id, type)}
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
