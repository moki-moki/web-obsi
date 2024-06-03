import prisma from '../prisma-client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const notes = await prisma.note.findMany();

    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching notes' },
      { status: 500 }
    );
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
    console.log(newNote);
    return NextResponse.json(newNote);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating notes' },
      { status: 500 }
    );
  }
}
