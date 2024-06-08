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
