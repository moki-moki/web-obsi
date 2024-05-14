import { useDroppable } from "@dnd-kit/core";

interface Props {
  id: string;
  children: React.ReactNode;
}

export default function Droppable({ id, children }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  const style = {
    backgroundColor: isOver ? "lightblue" : "",
  };

  return (
    <li ref={setNodeRef} style={style}>
      {children}
    </li>
  );
}
