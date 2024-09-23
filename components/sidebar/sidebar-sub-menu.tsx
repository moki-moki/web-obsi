import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface MenuItemProps {
  label: string | React.ReactNode;
  subMenu?: MenuItemProps[] | undefined;
  children?: React.ReactNode;
}

const SidebarSubMenu = ({ label, subMenu }: MenuItemProps) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const openMenuHandler = () => setOpenMenu((prev) => !prev);
  return (
    <div className="uppercase font-bold text-xs cursor-pointer">
      <div
        onClick={openMenuHandler}
        className="flex items-center justify-between px-1.5 py-0.5 rounded-full hover:bg-primary-color/20"
      >
        <div>{label}</div>
        {subMenu ? <ChevronRight size={14} /> : null}
      </div>
      {openMenu && subMenu ? (
        <div
          className={`flex flex-col gap-1 absolute right-0 top-0 px-1 py-2 -translate-y-full translate-x-full border border-border-color rounded-lg text-text-color bg-primary-color`}
        >
          {subMenu?.map((el) => <SidebarSubMenu label={el.label} subMenu={el.subMenu} />)}
        </div>
      ) : null}
    </div>
  );
};

export default SidebarSubMenu;
