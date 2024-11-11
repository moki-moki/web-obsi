import prisma from '@/services/prisma-client';
import { NextResponse } from 'next/server';

const getFolderPath = async (id: string): Promise<{ id: string; title: string }[]> => {
  const folder = await prisma.folder.findUnique({
    where: { id },
    include: { parent: true },
  });
  if (!folder) return [];

  const parentPath = folder.parentId ? await getFolderPath(folder.parentId) : [];
  return [...parentPath, { id: folder.id, title: folder.title }];
};

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Invalid note ID' }, { status: 400 });
  }

  const note = await prisma.note.findUnique({
    where: { id },
    include: { folder: true },
  });
  if (!note || !note.folderId) return NextResponse.json([], { status: 200 });

  const breadcrumbs = await getFolderPath(note.folderId);
  return NextResponse.json(breadcrumbs, { status: 200 });
}
