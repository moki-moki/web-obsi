import NoteUi from './note-ui';
import NoteControlls from '@/components/note/note-controlls';

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <section className="max-h-14">
      <div className="p-2 relative flex items-center justify-center">
        <NoteControlls id={id} />
      </div>
      <NoteUi id={id} />
    </section>
  );
};

export default Page;
