'use client';
import NoteControlls from '@/components/note/note-controlls';
import { notFound, useParams } from 'next/navigation';
import MarkdownRenderer from '@/components/markdown-renderer/markdown-renderer';
import { useEffect, useState } from 'react';
import { useGetNote } from '@/api-calls/note';
import NoteLoader from '@/components/loader/note-loader';
import { SplitDataI, TextareaChangeEventHandler } from '@/types/types';

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

  const onChangeHandler: TextareaChangeEventHandler = (e) =>
    setSplitData((prev) => ({ ...prev, markdown: e.target.value }));

  if (isLoading) return <NoteLoader />;

  if (error) notFound();

  const toggleSplitWindow = () => setIsSplit((prev) => !prev);

  return (
    <div className="h-full">
      <div className="p-2 flex items-center justify-end">
        <NoteControlls id={id} toggleSplitWindow={toggleSplitWindow} />
      </div>
      {isSplit ? (
        <div className="flex justify-center gap-2 m-3 h-full">
          <div className="mt-20 mb-5 break-all flex-1">
            <h2 className="text-4xl text-text-color text-center font-bold">{data.title}</h2>
            <MarkdownRenderer>{splitData.markdown}</MarkdownRenderer>
          </div>
          <div className="w-1 h-auto rounded-full bg-border-color"></div>
          <div className="flex-1">
            <textarea
              rows={20}
              defaultValue={splitData.markdown}
              onChange={onChangeHandler}
              className="bg-primary-color text-text-color border-border-color p-2 rounded-md outline-none resize-none"
            ></textarea>
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
