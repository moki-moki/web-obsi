import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import { getNoteData } from '@/utils/server-api-calls';
import NoteControlls from '@/components/note/note-controlls';

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const data = await getNoteData(id);
  console.log(data);

  if (!data) {
    // notFound();
    return <h1>NOT FOUND</h1>;
  }

  return (
    <div className="w-full max-h-14">
      <div className="p-2 relative">
        <h1 className="text-sm absolute left-1/2 transform -translate-x-1/2 text-gray uppercase mx-auto font-bold p-2">
          {data.title}
        </h1>
        <NoteControlls id={id} />
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
