import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { DraggableI } from "@/app/types/types";

export default function Draggable({ id, title, type, children }: DraggableI) {
  const { attributes, listeners, transform, setNodeRef } = useDraggable({
    id: id,
    data: { children, type: type, title },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {children}
    </div>
  );
}
