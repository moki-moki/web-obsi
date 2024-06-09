'use client';
import { fetcher } from '@/utils/axios';
import { SWRConfig } from 'swr';
export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};
