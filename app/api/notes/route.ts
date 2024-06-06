import { NextResponse } from 'next/server';
import prisma from '@/services/prisma-client';

export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      where: { folderId: null },
    });

    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching notes' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const newNote = await prisma.note.create({
      data: {
        title: '(No title)',
        type: 'note',
        folderId: null,
      },
    });

    return NextResponse.json(newNote);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating notes' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  if (!id) return NextResponse.json({ error: 'Note ID is required' }, { status: 400 });

  try {
    const deletedNote = await prisma.note.delete({
      where: { id },
    });
    return NextResponse.json(deletedNote);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { id, title } = await request.json();

  if (!id || !title) return NextResponse.json({ error: 'Title and is required' }, { status: 400 });

  try {
    const updateFolderTitle = await prisma.note.update({
      where: { id },
      data: { title },
    });
    return NextResponse.json(updateFolderTitle);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Error updating post' }, { status: 500 });
  }
}
