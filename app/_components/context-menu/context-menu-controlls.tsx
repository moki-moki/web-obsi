import { FileI, FolderI } from '@/app/types/types';
import { useSidebarContext } from '@/app/context/sidebar-conext';
import { SquarePen, Trash2 } from 'lucide-react';

interface Props {
  itemData: FileI | FolderI | null;
}

const ContextMenuControlls = ({ itemData }: Props) => {
  const { deleteFolder, deleteNote, getNoteId } = useSidebarContext();
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
          <li
            onClick={() => deleteNote(id)}
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
