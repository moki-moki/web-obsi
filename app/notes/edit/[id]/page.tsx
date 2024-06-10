import EditNoteForm from './edit-note-form';
import { getNoteData } from '@/utils/server-api-calls';

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { title, markdown } = await getNoteData(id);

  return (
    <section className="w-full flex justify-center items-center flex-col">
      <h2 className="mt-5 text-gray text-2xl font-bold uppercase">Edit Note</h2>
      <EditNoteForm id={id} markdown={markdown} title={title} />
    </section>
  );
};

export default Page;
