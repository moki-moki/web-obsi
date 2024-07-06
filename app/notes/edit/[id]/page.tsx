import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import NoteEditForm from '@/components/note-edit/note-edit-form';

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <section className="w-full flex justify-center items-center flex-col relative">
      <Link
        href={`/notes/${id}`}
        className="my-3 border border-border rounded-md p-2 text-gray absolute left-16 top-0 flex items-center justify-center transition-colors hover:bg-dark-gray-accent hover:text-white"
      >
        <ChevronLeft size={20} />
        Go Back
      </Link>

      <h2 className="mx-auto my-3 text-gray text-2xl font-bold uppercase">Edit Note</h2>
      <NoteEditForm id={id} />
    </section>
  );
};

export default Page;
