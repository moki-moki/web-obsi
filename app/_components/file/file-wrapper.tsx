import { DraggableI } from "@/app/types/types";
import Draggable from "../Draggable/draggable";

const FileWrapper = ({ id, title, type, children }: DraggableI) => {
  return (
    <Draggable id={id} type={type} title={title}>
      {children}
    </Draggable>
  );
};

export default FileWrapper;
