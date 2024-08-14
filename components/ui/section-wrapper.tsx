'use client';

import { useSidebarContext } from '@/app/context/sidebar-conext';

const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  const { sidebarWidth } = useSidebarContext();

  return (
    <main className="min-h-screen" id="main-container" style={{ marginLeft: `${sidebarWidth}px` }}>
      {children}
    </main>
  );
};

export default SectionWrapper;
