import MarkdownRenderer from '@/components/markdown-renderer/markdown-renderer';
import { getMarkdownContent } from '@/lib/markdown';
import { notFound } from 'next/navigation';

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

  if (!content) {
    notFound();
  }

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  );
};

export default DocsPage;
