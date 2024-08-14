'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Button from '../ui/button';
import Popover from '../popover/popover';
import { ArrowLeftToLine, CircleHelp, Home } from 'lucide-react';
import { useSidebarContext } from '@/app/context/sidebar-conext';

const SidebarGeneralControlls = () => {
  const ref = useRef<HTMLUListElement>(null);
  const { toggleSidebar } = useSidebarContext();

  return (
    <ul
      ref={ref}
      className="text p-0.5 border-r border-border flex flex-col items-center bg-dark-gray z-10"
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
            className="text-gray bg-dark-gray rounded-full p-1.5 transition-colors ease-in hover:bg-gray/20 hover:text-white"
          >
            <Home size={20} />
          </Link>
        </Popover>
      </li>

      <li className="mt-auto">
        <Popover text="Docs" font="bolded">
          <Link
            href="/docs/markdown"
            className="text-gray bg-dark-gray rounded-full p-1.5 transition-colors ease-in hover:bg-gray/20 hover:text-white"
          >
            <CircleHelp />
          </Link>
        </Popover>
      </li>
    </ul>
  );
};

export default SidebarGeneralControlls;
