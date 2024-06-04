import { ChevronRight } from 'lucide-react';
import React from 'react';
import Input from '../ui/input';
import { InputChangeEventHandler } from '@/types/types';

interface Props {
  idx: number;
  name: string;
  renameValue: string;
  rotateIcon: boolean[];
  showInput: null | number;
  onChangeHandler: InputChangeEventHandler;
  onKeyDownHandler: (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => void;
}

const FolderTitle = ({
  idx,
  name,
  showInput,
  rotateIcon,
  renameValue,
  onKeyDownHandler,
  onChangeHandler,
}: Props) => {
  return (
    <div className="flex items-center">
      <span className="mr-2 text-sm">
        <ChevronRight
          size={20}
          style={{
            transform: rotateIcon[idx] ? 'rotate(90deg)' : 'none',
          }}
        />
      </span>
      {showInput === idx ? (
        <Input
          type="text"
          rounded="md"
          value={renameValue}
          onChange={onChangeHandler}
          onKeyDown={(e) => onKeyDownHandler(e, idx)}
          className="px-2 py-1 mr-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple"
        />
      ) : (
        <span className="text-sm font-bold">
          {name.length > 15 ? `${name.substring(0, 15)}...` : name}
        </span>
      )}
    </div>
  );
};

export default FolderTitle;
