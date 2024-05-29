import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Sidebar from "./_components/sidebar/sidebar";
import SidebarConextProvider from "./context/sidebar-conext";
import ContextMenuProvider from "./context/context-menu";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <main className="flex">
          <ContextMenuProvider>
            <SidebarConextProvider>
              <Sidebar />
            </SidebarConextProvider>
          </ContextMenuProvider>
          {children}
        </main>
      </body>
    </html>
  );
}
