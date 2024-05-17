import React from "react";
import { useDraggable } from "@dnd-kit/core";

interface Props {
  id: string;
  type: string;
  children: React.ReactNode;
}

export default function Draggable({ id, type, children }: Props) {
  const { attributes, listeners, transform, setNodeRef } = useDraggable({
    id: id,
    data: { children, type: type },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <li ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {children}
    </li>
  );
}
