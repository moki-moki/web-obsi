'use client';

import { Montserrat } from 'next/font/google';
import './globals.css';

import { useEffect, useRef, useState } from 'react';

import Sidebar from '../components/sidebar/sidebar';
import { ModalProvider } from './context/modal-context';
import ContextMenuProvider from './context/context-menu';
import SidebarConextProvider from './context/sidebar-conext';

import Modal from '@/components/modal/modal';
import Toaster from '@/components/ui/toaster';
import { SWRProvider } from '@/provider/swr-provider';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarWidth, setSidebarWidth] = useState<number>();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    if (sidebarRef.current) setSidebarWidth(sidebarRef.current.offsetWidth);
  }, [isSidebarOpen]);

  return (
    <html lang="en">
      <SWRProvider>
        <body className={montserrat.className}>
          <Toaster />
          <ModalProvider>
            <ContextMenuProvider>
              <SidebarConextProvider>
                <div
                  className={`${isSidebarOpen ? 'w-1/5' : 'w-11'} flex fixed left-0 bg-dark-gray`}
                  ref={sidebarRef}
                >
                  <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
                </div>
                <Modal />
              </SidebarConextProvider>
            </ContextMenuProvider>
            <main
              className="min-h-screen"
              id="main-container"
              style={{ marginLeft: `${sidebarWidth}px` }}
            >
              {children}
            </main>
          </ModalProvider>
        </body>
      </SWRProvider>
    </html>
  );
}
