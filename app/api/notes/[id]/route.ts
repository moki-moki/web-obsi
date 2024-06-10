import prisma from '@/services/prisma-client';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const note = await prisma.note.findUnique({
      where: { id },
    });

    if (!note) return NextResponse.json({ error: 'Note not found' }, { status: 404 });

    return NextResponse.json(note, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching note' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { title, markdown } = await request.json();

  try {
    const note = await prisma.note.update({
      where: { id },
      data: { title, markdown },
    });
    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json({ error: 'Error Updating the note' }, { status: 500 });
  }
}
