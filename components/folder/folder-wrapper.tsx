import React from 'react';
import Droppable from '../draggable/droppable';

interface Props {
  id: string;
  children: React.ReactNode;
  level: number;
}

const FolderWrapper = ({ id, level, children }: Props) => {
  return (
    <Droppable id={id} key={id} type="folder">
      <div
        className={`cursor-pointer text-text-color uppercase font-bold tracking-wide relative ${level !== 0 && 'border-l-2 border-border-color'}`}
        style={{ marginLeft: level * 10 }}
      >
        {children}
      </div>
    </Droppable>
  );
};

export default FolderWrapper;
