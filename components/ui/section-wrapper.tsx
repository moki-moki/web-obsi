'use client';

const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen w-full" id="main-container">
      {children}
    </main>
  );
};

export default SectionWrapper;
