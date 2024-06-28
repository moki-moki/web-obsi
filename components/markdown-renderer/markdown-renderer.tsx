import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl"
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
