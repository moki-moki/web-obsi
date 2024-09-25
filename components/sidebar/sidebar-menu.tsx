import { LiHTMLAttributes, useState } from 'react';

interface MenuItemProps extends LiHTMLAttributes<HTMLLIElement> {
  label: string | React.ReactNode;
  subMenu?: MenuItemProps[];
  children: React.ReactNode;
}

const SidebarMenu = ({ label, children, ...props }: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openMenuHandler = () => setIsOpen((prev) => !prev);
  return (
    <li className="mt-auto relative flex items-center justify-between" {...props}>
      <div onClick={openMenuHandler} className="cursor-pointer">
        {label}
      </div>
      {isOpen && (
        <div
          className={`flex flex-col gap-1 absolute right-0 top-0 px-1 py-2 -translate-y-full translate-x-full border border-border-color rounded-lg text-text-color bg-primary-color `}
        >
          {children}
        </div>
      )}
    </li>
  );
};

export default SidebarMenu;
