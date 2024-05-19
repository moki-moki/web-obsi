import Draggable from "../Draggable/draggable";

interface Props {
  id: string;
  type: string;
  children: React.ReactNode;
}

const FileWrapper = ({ id, type, children }: Props) => {
  return (
    <Draggable id={id} type={type}>
      <div className="flex flex-col gap-2 p-2">
        <span className="block w-full h-0.5 bg-gray rounded-full"></span>
        {children}
      </div>
    </Draggable>
  );
};

export default FileWrapper;
