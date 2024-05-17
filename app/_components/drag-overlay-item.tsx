import { File, Folder } from "lucide-react";

interface Props {
  title: string;
  type: string;
}

const DragOverlayItem = ({ title, type }: Props) => {
  return (
    <div className="bg-black rounded-xl p-1.5 text-sm flex gap-2 items-center cursor-grab">
      <div className="text-white">
        {type === "note" ? <File size={15} /> : <Folder size={15} />}
      </div>
      <div className="text-white font-bold">{title}</div>
    </div>
  );
};

export default DragOverlayItem;
