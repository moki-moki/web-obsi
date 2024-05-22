import { SquarePen, Trash2 } from "lucide-react";

interface Props {
  id: string;
  idx: number;
  name: string;
  deleteFolder: (id: string) => void;
  changeNameHandler: (
    e: React.MouseEvent<HTMLSpanElement>,
    idx: number,
    name: string
  ) => void;
}

const FolderControlls = ({
  id,
  idx,
  name,
  deleteFolder,
  changeNameHandler,
}: Props) => {
  return (
    <div className="flex items-center gap-2">
      <span
        onClick={(e) => changeNameHandler(e, idx, name)}
        className="text-sm transition-colors duration-200 hover:text-white"
      >
        <SquarePen size={20} />
      </span>
      <span
        onClick={() => deleteFolder(id)}
        className="text-sm transition-colors duration-200 hover:text-white"
      >
        <Trash2 size={20} />
      </span>
    </div>
  );
};

export default FolderControlls;
