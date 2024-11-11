import { BreadcrumbsI } from '@/types/types';
import { fetcher } from '@/utils/axios';
import useSWR from 'swr';

export const getBreadcrumbs = (id: string) => {
  const { data, isLoading } = useSWR<BreadcrumbsI[], boolean>(
    `${process.env.NEXT_PUBLIC_URL}/notes/${id}/breadcrumbs`,
    fetcher
  );

  return { data, isLoading };
};
