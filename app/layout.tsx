import { Montserrat } from 'next/font/google';
import './globals.css';

import { ModalProvider } from './context/modal-context';
import SidebarConextProvider from './context/sidebar-conext';

import { SWRProvider } from '@/provider/swr-provider';
import SectionWrapper from '@/components/ui/section-wrapper';
import dynamic from 'next/dynamic';
import ThemeContextProvider from './context/theme-context';

const Modal = dynamic(() => import('@/components/modal/modal'), { ssr: true });
const Sidebar = dynamic(() => import('@/components/sidebar/sidebar'), { ssr: true });
const ContextMenuProvider = dynamic(() => import('./context/context-menu'), { ssr: false });
const MainSectionWrapper = dynamic(() => import('@/components/ui/main-section-wrapper'), {
  ssr: true,
});
const Toaster = dynamic(() => import('@/components/ui/toaster'));

const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <SWRProvider>
          <ThemeContextProvider>
            <Toaster />
            <ModalProvider>
              <ContextMenuProvider>
                <SidebarConextProvider>
                  <MainSectionWrapper>
                    <Sidebar />
                    <Modal />
                    <SectionWrapper>{children}</SectionWrapper>
                  </MainSectionWrapper>
                </SidebarConextProvider>
              </ContextMenuProvider>
            </ModalProvider>
          </ThemeContextProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
