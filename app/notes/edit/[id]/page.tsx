import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { getNoteData, submitNoteData } from '@/utils/server-api-calls';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { redirect } from 'next/navigation';

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const data = await getNoteData(id);

  const onSubmitHandler = async (formData: FormData) => {
    'use server';
    await submitNoteData(formData, id);
    redirect(`/notes/${id}`);
  };

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
      <form className="w-10/12 flex-auto" action={onSubmitHandler}>
        <label htmlFor="title" className="text-sm font-bold text-gray uppercase">
          Edit title
        </label>
        <Input name="title" rounded="md" defaultValue={data.title} required={true} />

        <label htmlFor="note" className="block mb-1 mt-5 text-sm font-bold text-gray uppercase">
          Note Info
        </label>
        <textarea
          rows={20}
          name="note"
          defaultValue={data.markdown ? data.markdown : ''}
          className="text-gray p-2 w-full rounded-md bg-dark-gray-accent border border-border outline-none focus:ring-2 focus:ring-purple"
        ></textarea>
        <Button
          size="md"
          type="submit"
          font="bolded"
          variants="outlined"
          className="mt-5 w-full text-gray rounded-md uppercase hover:text-white hover:bg-gray/20 hover:border-purple"
        >
          Submit
        </Button>
      </form>
    </section>
  );
};

export default Page;
