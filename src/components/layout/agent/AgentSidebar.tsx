import { Link, useLocation } from "react-router-dom";
import { 
  CreditCard, 
  Settings, 
  User, 
  MessageSquare, 
  LayoutDashboard,
  Users,
  Star,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UpgradePlanModal } from "@/components/agent/modals/UpgradePlanModal";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/agent/dashboard" },
  { icon: Users, label: "Talent Roster", path: "/agent/roster" },
  { icon: MessageSquare, label: "Agency Inbox", path: "/agent/inbox" },
  { icon: CreditCard, label: "Financials", path: "/agent/earnings" },
  { icon: Settings, label: "Settings", path: "/agent/settings" },
];

export function AgentSidebar({ isOpen, onClose }: SidebarProps) {
  const { pathname } = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] border-r border-primary/20 bg-background/95 backdrop-blur-xl transition-all duration-300 ease-in-out lg:translate-x-0 w-64",
        !isOpen && "-translate-x-full"
      )}
    >
      <div className="h-full px-4 py-6 flex flex-col">
        <div className="mb-8 px-2 flex items-center justify-between">
            <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                Navigation
            </h2>
            <div className="h-1 flex-1 bg-primary/10 ml-4 rounded-full" />
        </div>

        <ul className="space-y-1.5 flex-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                    isActive 
                      ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_rgba(168,85,247,0.2)]" 
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                  onClick={onClose}
                >
                  <Icon className={cn(
                    "w-5 h-5 transition-transform duration-300 group-hover:scale-110 shrink-0", 
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )} />
                  <span className="font-semibold text-sm tracking-tight">{item.label}</span>
                  
                  {item.label === "Agency Inbox" && (
                      <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-black text-primary-foreground shadow-glow-sm">
                        3
                      </span>
                  )}

                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full shadow-glow" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Upgrade Plan Card */}
        <div className="mt-auto pt-6 pt-4">
            <div className="bg-[#0f0f13]/80 border border-primary/20 rounded-2xl p-5 relative overflow-hidden group">
                {/* Decorative glow */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/20 rounded-full blur-[40px] group-hover:bg-primary/30 transition-all duration-500" />
                
                <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-sm">
                        <Zap className="h-5 w-5 text-white animate-pulse" />
                    </div>
                    <div>
                        <p className="text-sm font-black text-white">Agency Pro</p>
                        <p className="text-[10px] text-muted-foreground font-medium">Standard Plan</p>
                    </div>
                </div>
                
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed relative z-10">
                    You're managing 8/10 creators. Upgrade to unlock unlimited roster size.
                </p>
                
                <UpgradePlanModal>
                    <Button size="sm" className="w-full font-bold bg-primary hover:shadow-glow transition-all py-5">
                      Scale Agency
                    </Button>
                </UpgradePlanModal>
            </div>
        </div>
      </div>
    </aside>
  );
}
