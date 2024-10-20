'use client';

import { useSidebarContext } from '@/app/context/sidebar-conext';

const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  const { dimension, isSidebarOpen } = useSidebarContext();

  return (
    <section
      className="min-h-screen w-full"
      // 41 will always be the width of small sidebar
      style={{ marginLeft: `${isSidebarOpen.open ? dimension.w + 41 : 41}px` }}
      id="main-container"
    >
      {children}
    </section>
  );
};

export default SectionWrapper;
