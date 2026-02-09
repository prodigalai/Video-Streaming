import { useState, useEffect, useRef } from "react";
import { AgentSidebar } from "./AgentSidebar";
import { AgentNavbar } from "./AgentNavbar";
import { Footer } from "../Footer";
import { cn } from "@/lib/utils";
import { useScrollToTop } from "@/hooks/useScrollToTop";

interface AgentLayoutProps {
  children: React.ReactNode;
}

export function AgentLayout({ children }: AgentLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const mainContentRef = useRef<HTMLDivElement>(null);
  
  useScrollToTop(mainContentRef);

  // Responsive sidebar handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col pt-16">
      <AgentNavbar 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        isMenuOpen={isSidebarOpen} 
      />
      
      <div className="flex flex-1 relative">
          <AgentSidebar isOpen={isSidebarOpen} onClose={() => window.innerWidth < 1024 && setIsSidebarOpen(false)} />
          
          <main 
            ref={mainContentRef}
            className={cn(
              "flex-1 p-4 md:p-6 lg:p-8 xl:p-12 overflow-y-auto transition-all duration-300 min-h-[calc(100vh-4rem)] flex flex-col",
              isSidebarOpen ? "lg:ml-64" : ""
          )}>
               <div className="flex-1 w-full max-w-[1920px] mx-auto space-y-6 animate-fade-in">
                   {children}
               </div>
               <div className="-mx-4 md:-mx-6 lg:-mx-8 xl:-mx-12 mt-12">
                   <Footer />
               </div>
          </main>
      </div>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
      )}
    </div>
  );
}
