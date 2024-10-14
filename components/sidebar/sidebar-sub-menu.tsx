import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface MenuItemProps {
  label: string | React.ReactNode;
  subMenu?: MenuItemProps[] | undefined;
  children?: React.ReactNode;
}

const SidebarSubMenu = ({ label, children }: MenuItemProps) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const openMenuHandler = () => setOpenMenu((prev) => !prev);

  return (
    <div className="uppercase font-bold text-xs cursor-pointer">
      <div
        onClick={openMenuHandler}
        className="flex items-center justify-between px-1.5 py-0.5 rounded-full hover:bg-secondary-color/50"
      >
        <div>{label}</div>
        {children ? <ChevronRight size={14} /> : null}
      </div>

      {openMenu && children ? (
        <div
          className={`flex flex-col gap-1 absolute right-0 top-0 p-1 -translate-y-full translate-x-full border border-border-color rounded-lg text-text-color bg-primary-color`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default SidebarSubMenu;
