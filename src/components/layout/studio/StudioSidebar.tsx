import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Film,
  Radio,
  BarChart2,
  DollarSign,
  MessageSquare,
  Users,
  Wallet,
  Settings,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const studioNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/studio/dashboard" },
  { icon: Film, label: "Content", path: "/studio/content" },
  { icon: Radio, label: "Live Streaming", path: "/studio/live" },
  { icon: BarChart2, label: "Analytics", path: "/studio/analytics" },
  { icon: DollarSign, label: "Monetization", path: "/studio/monetization" },
  { icon: MessageSquare, label: "Comments", path: "/studio/comments" },
  { icon: Users, label: "Subscribers", path: "/studio/subscribers" },
  { icon: Wallet, label: "Wallet (Credits)", path: "/studio/wallet" },
  { icon: ShieldCheck, label: "Verification (KYC)", path: "/studio/kyc" },
];

const bottomNavItems = [
  { icon: Settings, label: "Settings", path: "/studio/settings" },
];

interface StudioSidebarProps {
  isOpen: boolean;
  onToggle?: () => void;
}

export function StudioSidebar({ isOpen, onToggle }: StudioSidebarProps) {
  const location = useLocation();

  const NavItem = ({ icon: Icon, label, path }: { icon: any; label: string; path: string }) => {
    const isActive = location.pathname === path;
    return (
      <Link
        to={path}
        className={cn(
          "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 group relative",
          isActive 
            ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_rgba(168,85,247,0.2)]" 
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
          !isOpen && "justify-center px-0"
        )}
      >
        <Icon className={cn(
          "h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
          isActive ? "text-primary" : "text-muted-foreground"
        )} />
        {isOpen && (
          <span className={cn(
            "font-medium truncate transition-all duration-300",
            isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"
          )}>
            {label}
          </span>
        )}
        {isActive && isOpen && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full shadow-glow" />
        )}
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-14 bottom-0 z-40 flex flex-col border-r border-primary/20 bg-background/95 backdrop-blur-xl transition-all duration-300 ease-in-out",
        isOpen ? "w-64 translate-x-0" : "w-16 -translate-x-full lg:translate-x-0"
      )}
    >
      {/* Profile Section */}
      <div className={cn(
        "p-4 transition-all duration-300",
        !isOpen && "flex justify-center"
      )}>
        <div className={cn(
          "flex flex-col items-center gap-3 p-4 rounded-xl glass-card",
          !isOpen && "p-1 bg-transparent border-none shadow-none"
        )}>
          <div className="relative group cursor-pointer">
            <Avatar className={cn(
              "h-16 w-16 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-500",
              !isOpen && "h-8 w-8"
            )}>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=creator" />
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            {isOpen && (
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <UserCircle className="h-6 w-6 text-white" />
              </div>
            )}
          </div>
          {isOpen && (
            <div className="text-center">
              <p className="font-bold text-gradient">Creator Studio</p>
              <p className="text-xs text-muted-foreground mt-1 lowercase">@creator_pro</p>
            </div>
          )}
        </div>
      </div>

      <div className="px-5 mb-4">
        <div className="h-px w-full bg-border/40" />
      </div>

      {/* Main Nav */}
      <div className="flex-1 overflow-y-auto px-3 space-y-1 pb-4">
        {studioNavItems.map((item, index) => (
          <div key={item.path}>
            <NavItem {...item} />
            {/* Divider after first 3 "Core" items */}
            {index === 2 && isOpen && (
               <div className="py-4 px-2">
                  <div className="h-px w-full bg-border/30" />
               </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="p-3 border-t border-border/50 space-y-1">
        {bottomNavItems.map((item) => (
          <NavItem key={item.path} {...item} />
        ))}
        
        {/* Collapse Toggle */}
        <div className="hidden lg:flex justify-end pt-2">
           <Button 
             variant="ghost" 
             size="sm" 
             onClick={onToggle}
             className={cn(
               "w-full hover:bg-primary/10 hover:text-primary transition-colors",
               isOpen ? "justify-end px-2" : "justify-center"
             )}
           >
             {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
           </Button>
        </div>
      </div>
    </aside>
  );
}

const Avatar = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("relative overflow-hidden rounded-full", className)}>
    {children}
  </div>
);

const AvatarImage = ({ src }: { src: string }) => (
  <img src={src} className="h-full w-full object-cover" />
);

const AvatarFallback = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-full w-full items-center justify-center bg-muted">
    {children}
  </div>
);
