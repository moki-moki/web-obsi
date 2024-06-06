import prisma from '@/services/prisma-client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { id: noteId, folderId } = await req.json();

  if (!folderId || !noteId)
    return NextResponse.json({ error: 'Note ID and Folder ID are required' }, { status: 400 });

  try {
    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: { folderId },
    });
    return NextResponse.json(updatedNote);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update note' }, { status: 500 });
  }
}
