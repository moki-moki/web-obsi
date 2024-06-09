import EditNoteForm from './edit-note-form';

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <section className="w-full flex justify-center items-center flex-col">
      <h2 className="mt-5 text-gray text-2xl font-bold uppercase">Edit Note</h2>
      <EditNoteForm id={id} />
    </section>
  );
};

export default Page;
