import Link from 'next/link';
import Button from '../ui/button';
import { useCreateFolder } from '@/api-calls/folders';
import { useCreateNote } from '@/api-calls/notes';
import { FilePlus2, FolderPlus, Home } from 'lucide-react';
import Popover from '../popover/popover';

const SidebarControlls = () => {
  const { createNote } = useCreateNote();
  const { createFolder } = useCreateFolder();

  return (
    <div className="p-2 border-b border-border text-end flex items-center justify-between">
      <Popover text="Home page" font="bolded">
        <Link
          href="/"
          className="text-gray bg-dark-gray rounded-full p-1.5 transition-colors ease-in hover:bg-gray/20 hover:text-white"
        >
          <Home size={20} />
        </Link>
      </Popover>
      <div>
        <Popover text="Add Note" font="bolded">
          <Button type="button" className="rounded-full p-1.5 text-gray mx-2" onClick={createNote}>
            <FilePlus2 size={20} />
          </Button>
        </Popover>
        <Popover text="Add Folder" font="bolded">
          <Button type="button" className="rounded-full p-1.5 text-gray" onClick={createFolder}>
            <FolderPlus size={20} />
          </Button>
        </Popover>
      </div>
    </div>
  );
};

export default SidebarControlls;
