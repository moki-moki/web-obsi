'use client';

import { Montserrat } from 'next/font/google';
import './globals.css';

import Sidebar from '../components/sidebar/sidebar';
import { ModalProvider } from './context/modal-context';
import ContextMenuProvider from './context/context-menu';
import SidebarConextProvider from './context/sidebar-conext';

import Modal from '@/components/modal/modal';
import { SWRProvider } from '@/provider/swr-provider';
import { useCallback, useEffect, useRef, useState } from 'react';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarWidth, setSidebarWidth] = useState<number>();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = (width: number) => {
    setIsSidebarOpen((prev) => !prev);
    if (isSidebarOpen) {
      setSidebarWidth(width);
    } else {
      setSidebarWidth(sidebarRef.current?.offsetWidth);
    }
    console.log(width);
  };

  useEffect(() => {
    if (sidebarRef.current) {
      const width = sidebarRef.current.offsetWidth;
      setSidebarWidth(width);
    }
  }, []);

  return (
    <html lang="en">
      <SWRProvider>
        <body className={montserrat.className}>
          <ModalProvider>
            <ContextMenuProvider>
              <SidebarConextProvider>
                <div className="w-1/5 flex fixed left-0 bg-dark-gray" ref={sidebarRef}>
                  <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
                </div>
                <Modal />
              </SidebarConextProvider>
            </ContextMenuProvider>
            <main style={{ marginLeft: `${sidebarWidth}px` }}>
              <div className="w-full">{children}</div>
            </main>
          </ModalProvider>
        </body>
      </SWRProvider>
    </html>
  );
}
