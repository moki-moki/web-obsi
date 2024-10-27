'use client';
import NoteControlls from '@/components/note/note-controlls';
import { notFound, useParams } from 'next/navigation';
import MarkdownRenderer from '@/components/markdown-renderer/markdown-renderer';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useGetNote, useUpdateNote } from '@/api-calls/note';
import NoteLoader from '@/components/loader/note-loader';
import { SplitDataI } from '@/types/types';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { useKeyBind } from '@/app/hooks/useKeyBind';

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetNote(id);
  const { updateNote } = useUpdateNote(id);
  const [isSplit, setIsSplit] = useState<boolean>(false);
  const [splitData, setSplitData] = useState<SplitDataI>({
    folderId: null,
    id: '',
    markdown: '',
    title: '',
    type: '',
  });

  const toggleSplitWindow = () => setIsSplit((prev) => !prev);

  useEffect(() => {
    if (data) {
      setSplitData(data);
    }
  }, [data]);

  useKeyBind('e', toggleSplitWindow);

  if (isLoading) return <NoteLoader />;

  if (error) notFound();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setSplitData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateNote(splitData);
  };

  return (
    <div className="h-full">
      <div className="p-2 flex items-center justify-end">
        <NoteControlls id={id} toggleSplitWindow={toggleSplitWindow} />
      </div>
      {isSplit ? (
        <div className="flex justify-center gap-2 m-3 h-full">
          <div className="mt-20 mb-5 break-all flex-1">
            <h2 className="text-4xl text-text-color text-center font-bold">{splitData.title}</h2>
            <MarkdownRenderer>{splitData.markdown}</MarkdownRenderer>
          </div>
          <div className="w-1 h-auto rounded-full bg-border-color"></div>
          <form className="flex-1 flex flex-col gap-2" onSubmit={onSubmitHandler}>
            <Input
              name="title"
              rounded="md"
              defaultValue={splitData.title}
              required={true}
              onChange={onChangeHandler}
              className="outline-none focus:ring-0"
            />
            <textarea
              name="markdown"
              defaultValue={splitData.markdown}
              onChange={onChangeHandler}
              className="h-full bg-primary-color text-text-color border border-border-color p-2 rounded-md outline-none resize-none"
            ></textarea>
            <Button type="submit" variants="ghost-outlined" font="bolded">
              SUBMIT
            </Button>
          </form>
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
