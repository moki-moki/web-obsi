import prisma from '@/services/prisma-client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { id } = await request.json();
  console.log(id);
  if (!id)
    return NextResponse.json({ error: 'Note id is required' }, { status: 400 });

  try {
    const updatedNote = await prisma.note.update({
      where: { id },
      data: { folderId: null },
    });
    return NextResponse.json(updatedNote);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to remove note from folder' },
      { status: 500 }
    );
  }
}
