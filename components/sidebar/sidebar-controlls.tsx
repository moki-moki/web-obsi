import Button from '../ui/button';
import { useCreateFolder } from '@/api-calls/folders';
import { useCreateNote } from '@/api-calls/notes';
import { FilePlus2, FolderPlus } from 'lucide-react';

const SidebarControlls = () => {
  const { createNote } = useCreateNote();
  const { createFolder } = useCreateFolder();

  return (
    <div className="p-2 border-b border-border text-end">
      <Button type="button" className="rounded-full p-1.5 text-gray mx-2" onClick={createNote}>
        <FilePlus2 size={20} />
      </Button>
      <Button type="button" className="rounded-full p-1.5 text-gray" onClick={createFolder}>
        <FolderPlus size={20} />
      </Button>
    </div>
  );
};

export default SidebarControlls;
