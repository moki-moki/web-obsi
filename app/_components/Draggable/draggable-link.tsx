import React from 'react';
import Link from 'next/link';
import { useDraggable } from '@dnd-kit/core';
import { DraggableI } from '@/app/types/types';

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
      style={style}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      href={`/pages/notes/${id}`}
    >
      {children}
    </Link>
  );
}
