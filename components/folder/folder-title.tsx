import { ChevronRight } from 'lucide-react';
import React from 'react';

interface Props {
  idx: number;
  name: string;
  level: number;
  rotateIcon: boolean[];
  iconHandler: (e: React.MouseEvent, idx: number) => void;
}

const FolderTitle = ({ idx, name, rotateIcon, level, iconHandler }: Props) => {
  return (
    <div className="flex items-center w-full" onClick={(e) => iconHandler(e, idx)}>
      <span className="mr-2 text-sm">
        <ChevronRight
          size={20}
          style={{
            transform: rotateIcon[idx] ? 'rotate(90deg)' : 'none',
          }}
        />
      </span>

      <span className="text-sm font-bold">
        {name.length > 15 ? `${name.substring(0, 12)}...` : name}
      </span>
    </div>
  );
};

export default FolderTitle;
