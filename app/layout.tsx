'use client';
import { Montserrat } from 'next/font/google';
import './globals.css';

import Sidebar from '../components/sidebar/sidebar';
import { ModalProvider } from './context/modal-context';
import ContextMenuProvider from './context/context-menu';
import SidebarConextProvider, { useSidebarContext } from './context/sidebar-conext';

import Modal from '@/components/modal/modal';
import Toaster from '@/components/ui/toaster';
import { SWRProvider } from '@/provider/swr-provider';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { sidebarWidth } = useSidebarContext();

  return (
    <html lang="en">
      <SWRProvider>
        <body className={montserrat.className}>
          <Toaster />
          <ModalProvider>
            <ContextMenuProvider>
              <SidebarConextProvider>
                <Sidebar />
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
