import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { DraggableI } from "@/app/types/types";
import Link from "next/link";

export default function Draggable({ id, title, type, children }: DraggableI) {
  const { attributes, listeners, transform, setNodeRef } = useDraggable({
    id: id,
    data: { children, type, title, id },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Link
      href={`/folders/${id}`}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      {children}
    </Link>
  );
}
