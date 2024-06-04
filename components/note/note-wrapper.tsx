import Draggable from '../draggable/draggable-link';
import { DraggableI } from '@/types/types';

const FileWrapper = ({ id, title, type, children }: DraggableI) => {
  return (
    <>
      <Draggable id={id} type={type} title={title}>
        {children}
      </Draggable>
    </>
  );
};

export default FileWrapper;
