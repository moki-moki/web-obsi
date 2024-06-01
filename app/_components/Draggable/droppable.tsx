import { useDroppable } from '@dnd-kit/core';

interface Props {
  id: string;
  type: string;
  children: React.ReactNode;
}

export default function Droppable({ id, type, children }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: {
      type,
    },
  });

  const style = isOver ? 'bg-gray/20' : '';

  return (
    <div ref={setNodeRef} className={`${style} rounded-xl h-full`}>
      {children}
    </div>
  );
}
