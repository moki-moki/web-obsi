import { NextResponse } from 'next/server';
import prisma from '@/services/prisma-client';

export async function GET() {
  try {
    const fetchFolders = async (folderId: string | null = null) => {
      const folders = await prisma.folder.findMany({
        where: {
          parentId: folderId,
        },
        include: {
          notes: true,
          children: true,
        },
      });

      for (const folder of folders) {
        folder.children = await fetchFolders(folder.id);
      }

      return folders;
    };
    const folders = await fetchFolders(null);
    return NextResponse.json(folders);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching folders' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { parentId } = await req.json();
    const newFolder = await prisma.folder.create({
      data: {
        title: '(No title)',
        type: 'folder',
        parentId: parentId ? parentId : null,
        notes: {
          create: [],
        },
      },
      include: {
        notes: true,
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

export async function PUT(request: Request) {
  const { id, title } = await request.json();

  if (!id || !title) return NextResponse.json({ error: 'Title and is required' }, { status: 400 });

  try {
    const updateFolderTitle = await prisma.folder.update({
      where: { id },
      data: { title },
    });
    return NextResponse.json(updateFolderTitle);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Error updating post' }, { status: 500 });
  }
}
