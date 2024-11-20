import { getBreadcrumbs } from '@/api-calls/breadcrumbs';
import BreadcrumbSkeleton from '../ui/skeletons/breadcrumb-skeleton';
import { useSidebarContext } from '@/app/context/sidebar-conext';

const Breadcrumbs = ({ id }: { id: string }) => {
  const { data, isLoading } = getBreadcrumbs(id);

  const { setOpenFolders } = useSidebarContext();

  if (isLoading) return <BreadcrumbSkeleton />;

  const toggleFolderHandler = (idx: number) => {
    if (!data && data === undefined) return;
    const openFolderCopyArr = data.slice(0, idx + 1);

    // @ts-expect-error we need strings, but getting an object map constructor expects an iterable. This works, but will refactor in future
    const mapCopy = new Map<string, boolean>(data);

    openFolderCopyArr.forEach((obj) => {
      if (mapCopy.get(obj.id)) mapCopy.delete(obj.id);
      else mapCopy.set(obj.id, true);
    });

    setOpenFolders(mapCopy);
  };

  return (
    <div className="flex items-center justify-center gap-1">
      {data?.map((breadcrumb: { id: string; title: string }, idx: number) => (
        <div key={breadcrumb.id}>
          <span
            onClick={() => toggleFolderHandler(idx)}
            className="p-1 font-bold uppercase text-xs text-text-color rounded-full cursor-pointer hover:bg-secondary-color"
          >
            {breadcrumb.title}
          </span>
          <span className="text-text-color font-bold text-xs">
            {idx < data.length - 1 && ' > '}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
