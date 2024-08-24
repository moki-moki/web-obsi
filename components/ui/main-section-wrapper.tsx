'use client';
import { useSidebarContext } from '@/app/context/sidebar-conext';
import React from 'react';

const MainSectionWrapper = ({ children }: { children: React.ReactNode }) => {
  const { stopResize, resizeFrame } = useSidebarContext();

  return (
    <main className="flex" onMouseUp={stopResize} onMouseMove={resizeFrame}>
      {children}
    </main>
  );
};

export default MainSectionWrapper;
