import { ChevronRight } from 'lucide-react';

interface Props {
  name: string;
  isOpen: boolean;
}

const FolderTitle = ({ name, isOpen }: Props) => {
  return (
    <div className="flex items-center overflow-hidden">
      <span className="mr-2 text-sm">
        <ChevronRight
          size={20}
          style={{
            transform: isOpen ? 'rotate(90deg)' : 'none',
          }}
        />
      </span>

      <span className="text-sm font-bold text-ellipsis overflow-hidden">{name}</span>
    </div>
  );
};

export default FolderTitle;
