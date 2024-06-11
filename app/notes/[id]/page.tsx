import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Button from '@/components/ui/button';
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
          className="absolute right-20 rounded-lg text-gray transition-colors duration-150 ease-in bg-gray/20 p-2 hover:text-white"
        >
          <FilePenLine size={20} />
        </Link>
        <Button
          type="button"
          variants="icon"
          className="absolute right-8 rounded-lg text-red/60 transition-colors duration-150 ease-in bg-gray/20 p-2 hover:text-red/100"
        >
          <Trash2 size={20} />
        </Button>
      </div>
      <div className="mt-20 mb-5 prose prose-lg mx-auto">
        <h2 className="text-4xl text-gray text-center font-bold">{data.title}</h2>
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => <h1 className="text-gray" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-gray" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-gray" {...props} />,
            h4: ({ node, ...props }) => <h4 className="text-gray" {...props} />,
            h5: ({ node, ...props }) => <h5 className="text-gray" {...props} />,
            h6: ({ node, ...props }) => <h6 className="text-gray" {...props} />,
            p: ({ node, ...props }) => <p className="text-white" {...props} />,
          }}
        >
          {data.markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Page;