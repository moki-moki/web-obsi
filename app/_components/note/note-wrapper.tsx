import Draggable from '../Draggable/draggable-link';
import { DraggableI } from '@/app/types/types';

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
