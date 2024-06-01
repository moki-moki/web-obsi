import Button from '../ui/button';
import { useSidebarContext } from '@/app/context/sidebar-conext';
import { FilePlus2, FolderPlus } from 'lucide-react';

const SidebarControlls = () => {
  const { createFolder, createNote } = useSidebarContext();
  return (
    <div className="p-2 border-b border-border text-end">
      <Button
        type="button"
        variants="ghost-outlined"
        className="rounded-full p-1.5 text-gray mx-2"
        onClick={createNote}
      >
        <FilePlus2 size={20} />
      </Button>
      <Button
        type="button"
        variants="ghost-outlined"
        className="rounded-full p-1.5 text-gray"
        onClick={createFolder}
      >
        <FolderPlus size={20} />
      </Button>
    </div>
  );
};

export default SidebarControlls;
