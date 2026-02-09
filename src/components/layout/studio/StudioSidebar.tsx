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
  ShieldCheck,
  Sparkles,
  Zap,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const studioNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/studio/dashboard", color: "text-violet-400" },
  { icon: Film, label: "Content", path: "/studio/content", color: "text-blue-400" },
  { icon: Radio, label: "Live Streaming", path: "/studio/live", color: "text-red-400" },
  { icon: BarChart2, label: "Analytics", path: "/studio/analytics", color: "text-emerald-400" },
  { icon: DollarSign, label: "Monetization", path: "/studio/monetization", color: "text-amber-400" },
  { icon: MessageSquare, label: "Messages", path: "/studio/messages", color: "text-indigo-400" },
  { icon: Users, label: "Subscribers", path: "/studio/subscribers", color: "text-fuchsia-400" },
  { icon: Wallet, label: "Wallet & Earnings", path: "/studio/wallet", color: "text-green-400" },
  { icon: UserCircle, label: "Channel Profile", path: "/studio/profile", color: "text-violet-400" },
  { icon: ShieldCheck, label: "Verification (KYC)", path: "/studio/kyc", color: "text-cyan-400" },
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

  const NavItem = ({ icon: Icon, label, path, color }: { icon: any; label: string; path: string; color?: string }) => {
    const isActive = location.pathname === path;
    return (
      <Link
        to={path}
        className={cn(
          "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative",
          isActive 
            ? "bg-white/[0.05] text-white shadow-[0_0_20px_rgba(0,0,0,0.2)]" 
            : "text-white/40 hover:bg-white/[0.02] hover:text-white/80",
          !isOpen && "justify-center px-0"
        )}
      >
        <Icon className={cn(
          "h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
          isActive ? (color || "text-violet-400") : "text-white/20"
        )} />
        {isOpen && (
          <span className={cn(
            "text-xs font-bold truncate transition-all duration-300",
            isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"
          )}>
            {label}
          </span>
        )}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-violet-600 rounded-r-full shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
        )}
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-14 bottom-0 z-40 flex flex-col border-r border-white/10 bg-[#050508]/95 backdrop-blur-3xl transition-all duration-300 ease-in-out",
        isOpen ? "w-64 translate-x-0" : "w-20 -translate-x-full lg:translate-x-0"
      )}
    >
      {/* Branding / Header Section */}
      <div className={cn(
        "p-4 mb-3 transition-all duration-300",
        !isOpen && "flex justify-center"
      )}>
        <div className={cn(
          "flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5 relative overflow-hidden group/profile",
          !isOpen && "p-2 bg-transparent border-none"
        )}>
          <div className="relative shrink-0">
            <Avatar className={cn(
              "h-10 w-10 ring-2 ring-white/5 group-hover/profile:ring-violet-500/50 transition-all duration-500",
              !isOpen && "h-9 w-9 ring-0"
            )}>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=creator" />
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-violet-600 flex items-center justify-center border-2 border-black">
                <ShieldCheck className="h-3 w-3 text-white" />
            </div>
          </div>
          {isOpen && (
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">Creator Portal</p>
              <p className="text-xs text-white/40 font-medium mt-0.5 truncate flex items-center gap-1">
                  Verified <Star className="h-2.5 w-2.5 text-violet-400 fill-current" />
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Nav */}
      <div className="flex-1 overflow-y-auto px-3 space-y-1 pb-6 no-scrollbar">
        {studioNavItems.map((item, index) => (
          <div key={item.path}>
            <NavItem {...item} />
            {/* Divider after first 3 "Core" items */}
            {index === 2 && isOpen && (
               <div className="py-4 px-2">
                  <div className="h-px w-full bg-white/5" />
               </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="p-3 border-t border-white/5 space-y-2">
        {bottomNavItems.map((item) => (
          <NavItem key={item.path} {...item} />
        ))}
        
        <div className="px-3 py-3 text-center mt-2">
            <p className="text-[10px] font-semibold text-white/10">Fans on Chain</p>
            <p className="text-[10px] font-semibold text-white/10 mt-0.5">v2.5.0</p>
        </div>

        {/* Collapse Toggle */}
        <div className="hidden lg:flex justify-end pt-2">
           <Button 
             variant="ghost" 
             size="sm" 
             onClick={onToggle}
             className={cn(
               "w-full hover:bg-white/5 text-white/20 hover:text-white transition-colors h-10 rounded-xl",
               isOpen ? "justify-end px-3" : "justify-center"
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
  <div className="flex h-full w-full items-center justify-center bg-white/5">
    {children}
  </div>
);
