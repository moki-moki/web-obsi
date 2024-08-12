import React from 'react';
import Droppable from '../draggable/droppable';

interface Props {
  id: string;
  children: React.ReactNode;
}

const FolderWrapper = ({ id, children }: Props) => {
  return (
    <Droppable id={id} key={id} type="folder">
      <div className={`cursor-pointer text-gray uppercase font-bold tracking-wide rounded-xl`}>
        {children}
      </div>
    </Droppable>
  );
};

export default FolderWrapper;
