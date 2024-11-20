import { BreadcrumbsI } from '@/types/types';
import { endponints, fetcher } from '@/utils/axios';
import useSWR from 'swr';

export const getBreadcrumbs = (id: string) => {
  const { data, isLoading } = useSWR<BreadcrumbsI[], boolean>(
    `${endponints.notes}/${id}/breadcrumbs`,
    fetcher
  );

  return { data, isLoading };
};
