import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LayoutDashboard, Film, Radio, BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";
import { StudioNavbar } from "./StudioNavbar";
import { StudioSidebar } from "./StudioSidebar";
import { Footer } from "../Footer";
import { cn } from "@/lib/utils";

interface StudioLayoutProps {
  children: React.ReactNode;
}

export function StudioLayout({ children }: StudioLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const { pathname } = useLocation();

  // Close mobile sidebar on route change
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [pathname]);

  const StudioBottomNav = () => (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 h-16 glass-card border-t border-border/50 px-6 flex items-center justify-between">
      {[
        { icon: LayoutDashboard, label: "Creator", path: "/studio/dashboard" },
        { icon: Film, label: "Content", path: "/studio/content" },
        { icon: Radio, label: "Live", path: "/studio/live" },
        { icon: BarChart2, label: "Analytics", path: "/studio/analytics" },
      ].map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link 
            key={item.path} 
            to={item.path} 
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Cosmos ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] opacity-30 animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[100px] opacity-20" />
        {/* Cosmos grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>
      
      <StudioNavbar
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isMenuOpen={isSidebarOpen}
      />
      
      {/* Mobile Drawer Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <StudioSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <main
        className={cn(
          "pt-12 pb-20 lg:pb-8 transition-all duration-300 min-h-screen relative z-10 flex flex-col",
          isSidebarOpen ? "lg:pl-64" : "lg:pl-20"
        )}
      >
        <div className="flex-1 container p-6 md:p-8 lg:p-10 animate-fade-in">
          {children}
        </div>
        <Footer />
      </main>

      <StudioBottomNav />
    </div>
  );
}
