import Button from "../ui/button";
import { FilePlus2, FolderPlus } from "lucide-react";

interface Props {
  createNote: () => void;
  createFolder: () => void;
}

const SidebarControlls = ({ createFolder, createNote }: Props) => {
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