import { useState } from "react";
import { TopNavbar } from "./TopNavbar";
import { BottomNavbar } from "./BottomNavbar";
import { DesktopSidebar } from "./DesktopSidebar";
import { Footer } from "./Footer";
import { SupportChat } from "../shared/SupportChat";
import { FloatingProfile } from "../shared/FloatingProfile";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-background relative">
      {/* Cosmos ambient background orbs */}
      <div className="cosmos-ambient" />
      
      <TopNavbar
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isMenuOpen={isSidebarOpen}
      />
      
      <div className="flex flex-1 overflow-hidden relative z-10">
        <DesktopSidebar isOpen={isSidebarOpen} />
        
        <main
          className={cn(
            "flex-1 overflow-y-auto w-full transition-all duration-300 relative flex flex-col scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40",
          )}
        >
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </main>
      </div>

      <BottomNavbar />
      <FloatingProfile />
      <SupportChat />
    </div>
  );
}
