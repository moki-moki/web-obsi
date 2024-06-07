const SidebarSkeleton = () => {
  const lines = new Array(5).fill(false);
  return (
    <>
      {lines.map(() => (
        <div className="animate-pulse bg-gray/40 w-11/12 my-3 mx-auto h-5 rounded-full"></div>
      ))}
    </>
  );
};

export default SidebarSkeleton;
