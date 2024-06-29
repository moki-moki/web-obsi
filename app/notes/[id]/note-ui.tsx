'use client';

import useSWR from 'swr';
import { fetcher } from '@/utils/axios';
import Loader from '@/components/loader/loader';
import MarkdownRenderer from '@/components/markdown-renderer/markdown-renderer';

const NoteUi = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useSWR(`/api/notes/${id}`, fetcher);

  if (isLoading) return <Loader />;

  if (error) throw new Error('There was a server error.');

  return (
    <div className="mt-20 mb-5 prose prose-lg mx-auto break-all">
      <h2 className="text-4xl text-gray text-center font-bold">{data.title}</h2>
      <MarkdownRenderer content={data.markdown} />
    </div>
  );
};

export default NoteUi;
