import path from 'path';
import fs from 'fs';

export const getMarkdownContent = (filePath: string) => {
  const fullPath = path.join(process.cwd(), '/public/docs', filePath);
  return fs.readFileSync(fullPath, 'utf-8');
};
