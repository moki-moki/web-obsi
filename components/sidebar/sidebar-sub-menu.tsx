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
      {openMenu && children ? children : null}
    </div>
  );
};

export default SidebarSubMenu;
