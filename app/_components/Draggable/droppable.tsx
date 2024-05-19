import { useDroppable } from "@dnd-kit/core";

interface Props {
  id: string;
  children: React.ReactNode;
}

export default function Droppable({ id, children }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  const style = isOver ? "bg-gray/20" : "";

  return (
    <li ref={setNodeRef} className={`${style} rounded-full`}>
      {children}
    </li>
  );
}
