import { NextResponse } from 'next/server';
import prisma from '@/services/prisma-client';

export async function GET() {
  try {
    const folders = await prisma.folder.findMany({
      include: {
        notes: true,
      },
    });
    return NextResponse.json(folders);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching folders' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const newFolder = await prisma.folder.create({
      data: {
        title: '(No title)',
        type: 'folder',
        notes: {
          create: [],
        },
      },
    });
    return NextResponse.json(newFolder);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating folder' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  if (!id) return NextResponse.json({ error: 'Folder ID is required' }, { status: 400 });

  try {
    const deletedNote = await prisma.folder.delete({
      where: { id },
    });
    return NextResponse.json(deletedNote);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete folder' }, { status: 500 });
  }
}
