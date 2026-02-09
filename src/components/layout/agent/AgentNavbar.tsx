import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, Menu, X, LogOut, Settings, User, Wallet, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export function AgentNavbar({ onMenuToggle, isMenuOpen }: NavbarProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-primary/20 bg-background/80 backdrop-blur-xl">
      <div className="px-4 flex h-full items-center justify-between gap-4">
        {/* Left: Branding & Menu */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="hover:bg-primary/10 rounded-lg h-9 w-9 text-muted-foreground hover:text-primary transition-colors lg:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <Link to="/agent/dashboard" className="flex items-center gap-2.5 group shrink-0">
            <div className="h-8 w-8 rounded-lg overflow-hidden flex items-center justify-center glow-primary-sm group-hover:shadow-glow transition-all duration-300">
               <img src="/logo.png" alt="Fans on Chain" className="h-full w-full object-cover" />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
               <span className="text-lg font-bold text-gradient tracking-tight leading-none">Fans on Chain</span>
               <span className="text-[10px] uppercase tracking-widest font-black text-primary/80">Agency Portal</span>
            </div>
          </Link>
          
          <div className="hidden md:block h-6 w-px bg-border/40 mx-2" />
        </div>

        {/* Center: Search (Hidden on small mobile, expandable on desktop) */}
        <div className={cn(
          "hidden sm:flex flex-1 max-w-2xl transition-all duration-300",
          isSearchFocused && "max-w-3xl"
        )}>
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors shadow-sm" />
            <Input
              type="search"
              placeholder="Search creators, messages, or payments..."
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full h-9 pl-10 pr-4 bg-[#0f0f13]/60 border border-white/10 rounded-full focus:border-primary/50 focus:ring-1 focus:ring-primary/10 transition-all duration-300 text-sm placeholder:text-muted-foreground/60"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 rounded-lg h-9 w-9 group">
            <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary ring-2 ring-background" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative hover:bg-primary/10 rounded-full p-0.5 ml-1">
                <Avatar className="h-8 w-8 ring-1 ring-border group-hover:ring-primary/50 transition-all duration-300">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=agent" />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">AG</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 glass-strong rounded-xl border-white/10 p-1 mt-1">
              <div className="px-3 py-3 mb-1 bg-white/5 rounded-t-lg">
                <p className="font-bold text-sm leading-none">Agency Administrator</p>
                <p className="text-xs text-muted-foreground mt-1.5 truncate">admin@fansonchain.com</p>
              </div>
              <DropdownMenuSeparator className="bg-white/5" />
              
              <DropdownMenuItem onClick={() => navigate("/agent/dashboard")} className="rounded-lg gap-3 py-2.5 focus:bg-primary/10 cursor-pointer">
                <LayoutDashboard className="h-4 w-4 text-primary" />
                <span className="font-medium">Main Dashboard</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => navigate("/agent/settings")} className="rounded-lg gap-3 py-2.5 focus:bg-primary/10 cursor-pointer">
                <Settings className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Agency Settings</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => navigate("/agent/earnings")} className="rounded-lg gap-3 py-2.5 focus:bg-primary/10 cursor-pointer">
                <Wallet className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Payroll & Earnings</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-white/5" />
              
              <DropdownMenuItem 
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="text-destructive rounded-lg gap-3 py-2.5 focus:bg-destructive/10 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span className="font-medium">Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
