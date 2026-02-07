import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TopNavbar } from "./TopNavbar";
import { BottomNavbar } from "./BottomNavbar";
import { DesktopSidebar } from "./DesktopSidebar";
import { Footer } from "./Footer";
import { SupportChat } from "../shared/SupportChat";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  // Handle responsive sidebar initial state and route changes
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 1024);
    };

    // Set initial state
    handleResize();

    // Close on mobile when route changes
    if (window.innerWidth <= 1024) {
      setIsSidebarOpen(false);
    }
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen lg:h-screen w-full lg:overflow-hidden bg-background relative">
      {/* Cosmos ambient background orbs */}
      <div className="cosmos-ambient" />
      
      <TopNavbar
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isMenuOpen={isSidebarOpen}
      />
      
      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* Mobile Drawer Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <DesktopSidebar isOpen={isSidebarOpen} />
        
        <main
          className={cn(
            "flex-1 overflow-y-auto w-full transition-all duration-300 relative flex flex-col scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40 pb-20 lg:pb-0",
          )}
        >
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </main>
      </div>

      <BottomNavbar />
      <SupportChat />
    </div>
  );
}
