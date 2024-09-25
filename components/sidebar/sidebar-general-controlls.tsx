'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Button from '../ui/button';
import dynamic from 'next/dynamic';
import { ArrowLeftToLine, CircleHelp, Home, Settings } from 'lucide-react';
import { useSidebarContext } from '@/app/context/sidebar-conext';
import SidebarMenu from './sidebar-menu';
import SidebarSubMenu from './sidebar-sub-menu';
import { useThemeContext } from '@/app/context/theme-context';

const Popover = dynamic(() => import('../popover/popover'), { ssr: true });

const SidebarGeneralControlls = () => {
  const ref = useRef<HTMLUListElement>(null);
  const { toggleSidebar } = useSidebarContext();
  const { switchTheme } = useThemeContext();

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
      <SidebarMenu label={<Settings className="text-text-color" />}>
        <SidebarSubMenu label={'Themes'}>
          <div
            className={`flex flex-col gap-1 absolute right-0 top-0 px-1 py-2 -translate-y-full translate-x-full border border-border-color rounded-lg text-text-color bg-primary-color`}
          >
            <div
              onClick={() => switchTheme('dracula')}
              className="uppercase font-bold text-xs cursor-pointer"
            >
              Dracula
            </div>
          </div>
        </SidebarSubMenu>
      </SidebarMenu>
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
