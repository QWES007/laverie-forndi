
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow ${isMobile ? 'px-4 py-3' : 'px-6 py-4'}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
