const SidebarSkeleton = () => {
  const lines = new Array(5).fill(false);
  return (
    <>
      {lines.map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse bg-primary-color/40 w-11/12 my-3 mx-auto h-5 rounded-full"
        ></div>
      ))}
    </>
  );
};

export default SidebarSkeleton;
