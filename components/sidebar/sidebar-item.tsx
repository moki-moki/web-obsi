import { LiHTMLAttributes, useState } from 'react';

interface MenuItemProps extends LiHTMLAttributes<HTMLLIElement> {
  label: string | React.ReactNode;
  subMenu?: MenuItemProps[];
  children: React.ReactNode;
}

const SidebarItem = ({ label, children, ...props }: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openMenuHandler = () => setIsOpen((prev) => !prev);
  return (
    <li className="mt-auto relative flex items-center justify-between" {...props}>
      <div onClick={openMenuHandler}>{label}</div>
      <div
        className={`flex flex-col absolute right-0 top-0 -translate-y-full translate-x-full border border-border rounded-lg text-gray bg-dark-gray`}
      >
        {isOpen && children}
      </div>
    </li>
  );
};

export default SidebarItem;
