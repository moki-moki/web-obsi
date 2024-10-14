import NoteControlls from '@/components/note/note-controlls';
import { notFound } from 'next/navigation';
import { getNoteData } from '@/utils/server-api-calls';
import MarkdownRenderer from '@/components/markdown-renderer/markdown-renderer';

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const data = await getNoteData(id);

  if (!data) notFound();

  return (
    <div>
      <div className="p-2 flex items-center justify-end">
        <NoteControlls id={id} />
      </div>
      <div className="mt-20 mb-5 prose prose-lg mx-auto break-all">
        <h2 className="text-4xl text-text-color text-center font-bold">{data.title}</h2>
        <MarkdownRenderer>{data.markdown}</MarkdownRenderer>
      </div>
    </div>
  );
};

export default Page;
