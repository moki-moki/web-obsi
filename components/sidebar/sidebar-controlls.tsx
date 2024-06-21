import Button from '../ui/button';
import Popover from '../popover/popover';
import { useCreateNote } from '@/api-calls/notes';
import { useCreateFolder } from '@/api-calls/folders';
import { FilePlus2, FolderPlus } from 'lucide-react';

const SidebarControlls = () => {
  const { createNote } = useCreateNote();
  const { createFolder } = useCreateFolder();

  return (
    <div className="p-0.5 border-b border-border text-end flex items-center justify-end">
      <Popover text="Add Note" font="bolded">
        <Button type="button" variants="icon" className="p-1.5 mx-0" onClick={createNote}>
          <FilePlus2 size={20} />
        </Button>
      </Popover>
      <Popover text="Add Folder" font="bolded">
        <Button type="button" variants="icon" className="p-1.5 mx-0" onClick={createFolder}>
          <FolderPlus size={20} />
        </Button>
      </Popover>
    </div>
  );
};

export default SidebarControlls;
