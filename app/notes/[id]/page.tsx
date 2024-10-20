'use client';
import NoteControlls from '@/components/note/note-controlls';
import { notFound, useParams } from 'next/navigation';
import MarkdownRenderer from '@/components/markdown-renderer/markdown-renderer';
import { useEffect, useState } from 'react';
import { useGetNote } from '@/api-calls/note';

interface SplitDataI {
  folderId: null;
  id: string;
  markdown: string;
  title: string;
  type: string;
}

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetNote(id);
  const [isSplit, setIsSplit] = useState<boolean>(false);
  const [splitData, setSplitData] = useState<SplitDataI>({
    folderId: null,
    id: '',
    markdown: '',
    title: '',
    type: '',
  });

  useEffect(() => {
    if (data) {
      setSplitData(data);
    }
  }, [data]);

  if (isLoading)
    return (
      <div className="bg-secondary-color/20 mt-20 mb-5 mx-10 h-full">
        <div className="text-4xl text-text-color text-center font-bold animate-pulse bg-accent-color/20 w-full h-10 rounded-full mb-5"></div>
        <div className="animate-pulse bg-accent-color/20 w-full h-4/5 rounded-lg"></div>
      </div>
    );

  if (error) notFound();

  const toggleSplitWindow = () => setIsSplit((prev) => !prev);

  return (
    <div className="h-full">
      <div className="p-2 flex items-center justify-end">
        <NoteControlls id={id} toggleSplitWindow={toggleSplitWindow} />
      </div>
      {isSplit ? (
        <div className="flex justify-center gap-2 m-3 h-full">
          <div className="mt-20 mb-5 prose prose-lg break-all flex-1">
            <h2 className="text-4xl text-text-color text-center font-bold">{data.title}</h2>
            <MarkdownRenderer>{splitData.markdown}</MarkdownRenderer>
          </div>
          <div className="w-1 h-auto rounded-full bg-border-color"></div>
          <div className="flex-1">
            <h1>EDITORRR</h1>
            <textarea
              rows={20}
              defaultValue={splitData.markdown}
              onChange={(e) => setSplitData((prev) => ({ ...prev, markdown: e.target.value }))}
              className="bg-primary-color text-text-color w-full border-border-color border p-2 rounded-md outline-none"
            >
              {/* {splitData.markdown} */}
            </textarea>
          </div>
        </div>
      ) : (
        <div className="mt-20 mb-5 prose prose-lg mx-auto break-all">
          <h2 className="text-4xl text-text-color text-center font-bold">{data.title}</h2>
          <MarkdownRenderer>{data.markdown}</MarkdownRenderer>
        </div>
      )}
    </div>
  );
};

export default Page;
