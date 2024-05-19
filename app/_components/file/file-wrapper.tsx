import { DraggableI } from "@/app/types/types";
import Draggable from "../Draggable/draggable";

const FileWrapper = ({ id, title, type, children }: DraggableI) => {
  return (
    <Draggable id={id} type={type} title={title}>
      <div className="flex flex-col gap-2 p-2">{children}</div>
    </Draggable>
  );
};

export default FileWrapper;
