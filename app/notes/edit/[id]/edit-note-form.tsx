import Input from '@/components/ui/input';
import { getNoteData } from '@/utils/server-api-calls';

interface Props {
  id: string;
}

const EditNoteForm = async ({ id }: Props) => {
  const data = await getNoteData(id);

  return (
    <form className="w-10/12 flex-auto">
      <label htmlFor="title" className="text-sm font-bold text-gray uppercase">
        Edit title
      </label>
      <Input name="title" rounded="md" value={data.title} />

      <label htmlFor="note" className="block mb-1 mt-5 text-sm font-bold text-gray uppercase">
        Note Info
      </label>
      <textarea
        rows={20}
        name="note"
        className="text-gray w-full rounded-md bg-dark-gray-accent border border-border outline-none focus:ring-2 focus:ring-purple"
      ></textarea>
    </form>
  );
};

export default EditNoteForm;
