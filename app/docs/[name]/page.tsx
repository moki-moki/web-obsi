import MarkdownRenderer from '@/components/markdown-renderer/markdown-renderer';
import { getMarkdownContent } from '@/lib/markdown';

interface DocumentationPageProps {
  params: {
    name: string;
  };
}

export const generateStaticParams = () => {
  return [{ name: 'markdown' }];
};

const DocsPage = ({ params }: DocumentationPageProps) => {
  const content = getMarkdownContent(`${params!.name}.md`);

  return (
    <div>
      {/* <ReactMarkdown>{content}</ReactMarkdown> */}
      <MarkdownRenderer content={content} />
    </div>
  );
};

export default DocsPage;
