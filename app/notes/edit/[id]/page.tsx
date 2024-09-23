import NoteEditForm from '@/components/note-edit/note-edit-form';

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <section className="w-full flex justify-center items-center flex-col relative">
      <h2 className="mx-auto my-3 text-color-text text-2xl font-bold uppercase">Edit Note</h2>
      <NoteEditForm id={id} />
    </section>
  );
};

export default Page;
