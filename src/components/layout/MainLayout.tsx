import { useState } from "react";
import { TopNavbar } from "./TopNavbar";
import { BottomNavbar } from "./BottomNavbar";
import { DesktopSidebar } from "./DesktopSidebar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Cosmos ambient background orbs */}
      <div className="cosmos-ambient" />
      
      <TopNavbar
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isMenuOpen={isSidebarOpen}
      />
      <DesktopSidebar isOpen={isSidebarOpen} />
      <main
        className={cn(
          "pt-14 pb-24 lg:pb-8 transition-all duration-300 min-h-screen relative z-10",
          isSidebarOpen ? "lg:pl-60" : "lg:pl-16"
        )}
      >
        {children}
      </main>
      <BottomNavbar />
    </div>
  );
}
