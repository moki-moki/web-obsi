'use client';

import useSWR from 'swr';
import { fetcher } from '@/utils/axios';
import ReactMarkdown from 'react-markdown';
import Loader from '@/components/loader/loader';

const NoteUi = ({ id }: { id: string }) => {
  const { data, isLoading } = useSWR(`/api/notes/${id}`, fetcher);

  if (isLoading) return <Loader />;

  return (
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
  );
};

export default NoteUi;
