import { Montserrat } from 'next/font/google';
import './globals.css';

import Sidebar from '../components/sidebar/sidebar';
import { ModalProvider } from './context/modal-context';
import ContextMenuProvider from './context/context-menu';
import SidebarConextProvider from './context/sidebar-conext';

import Modal from '@/components/modal/modal';
import Toaster from '@/components/ui/toaster';
import { SWRProvider } from '@/provider/swr-provider';
import SectionWrapper from '@/components/ui/section-wrapper';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
                <SectionWrapper>{children}</SectionWrapper>
              </SidebarConextProvider>
            </ContextMenuProvider>
          </ModalProvider>
        </body>
      </SWRProvider>
    </html>
  );
}
