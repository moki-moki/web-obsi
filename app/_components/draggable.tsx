import React from "react";
import { useDraggable } from "@dnd-kit/core";

interface Props {
  children: React.ReactNode;
  id: string;
}

export default function Draggable({ id, children }: Props) {
  const { attributes, listeners, transform, setNodeRef } = useDraggable({
    id: id,
    data: { title: children },
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
