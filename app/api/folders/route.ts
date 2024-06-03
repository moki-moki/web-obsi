import prisma from '../prisma-client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const folders = await prisma.folder.findMany({
      include: {
        notes: true,
      },
    });
    return NextResponse.json(folders);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching folders' },
      { status: 500 }
    );
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
    return NextResponse.json(
      { error: 'Error creating folder' },
      { status: 500 }
    );
  }
}
