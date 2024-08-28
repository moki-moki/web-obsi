const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="min-h-screen w-full" id="main-container">
      {children}
    </section>
  );
};

export default SectionWrapper;
