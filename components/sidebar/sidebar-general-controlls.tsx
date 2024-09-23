'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Button from '../ui/button';
import dynamic from 'next/dynamic';
import { ArrowLeftToLine, CircleHelp, Home, Settings } from 'lucide-react';
import { useSidebarContext } from '@/app/context/sidebar-conext';
import SidebarItem from './sidebar-item';
import SidebarSubMenu from './sidebar-sub-menu';

const Popover = dynamic(() => import('../popover/popover'), { ssr: true });

const menuItem = [
  { label: 'Solarized' },
  { label: 'Dracula' },
  { label: 'More', subMenu: [{ label: 'Custom' }] },
];

const SidebarGeneralControlls = () => {
  const ref = useRef<HTMLUListElement>(null);
  const { toggleSidebar } = useSidebarContext();

  return (
    <ul
      ref={ref}
      className="text p-0.5 border-r border-border-color flex flex-col items-center bg-primary-color z-10"
    >
      <li onClick={toggleSidebar}>
        <Popover text="Collapse Menu" font="bolded">
          <Button type="button" className="p-1.5" variants="icon">
            <ArrowLeftToLine size={20} />
          </Button>
        </Popover>
      </li>
      <li>
        <Popover text="Home page" font="bolded">
          <Link
            href="/"
            className="text-text-color bg-primary-color rounded-full p-1.5 transition-colors ease-in hover:bg-primary-color/20 hover:text-accent-color"
          >
            <Home size={20} />
          </Link>
        </Popover>
      </li>
      <SidebarItem label={<Settings className="text-text-color" />}>
        {menuItem.map((el) => (
          <SidebarSubMenu label={el.label} subMenu={el.subMenu} />
        ))}
      </SidebarItem>
      <li>
        <Popover text="Docs" font="bolded">
          <Link
            href="/docs/markdown"
            className="text-text-color bg-primary-color rounded-full p-1.5 transition-colors ease-in hover:bg-primary-color/20 hover:text-accent-color"
          >
            <CircleHelp />
          </Link>
        </Popover>
      </li>
    </ul>
  );
};

export default SidebarGeneralControlls;
