import Link from 'next/link';
import { FilePenLine, Trash2 } from 'lucide-react';
import { getNoteData } from '@/utils/server-api-calls';

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const data = await getNoteData(id);

  return (
    <div className="w-full max-h-14">
      <div className="p-2 relative">
        <h1 className="text-sm absolute left-1/2 transform -translate-x-1/2 text-gray uppercase mx-auto font-bold p-2">
          {data.title}
        </h1>
        <Link
          href={`/notes/edit/${id}`}
          className="absolute right-12 rounded-full text-gray transition-colors duration-150 ease-in hover:text-white"
        >
          <FilePenLine size={20} />
        </Link>
        <Link
          href={`/notes/edit/${id}`}
          className="absolute right-4 rounded-full text-red/60 transition-colors duration-150 ease-in hover:text-red/100"
        >
          <Trash2 size={20} />
        </Link>
      </div>
      <div className="mt-20 mb-5">
        <h2 className="text-4xl text-gray text-center font-bold">TItle here</h2>
      </div>
    </div>
  );
};

export default Page;
