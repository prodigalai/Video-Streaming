import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Wallet, Bell, Menu, X, Users, Library, Settings, LogOut, LayoutDashboard, Sparkles, Gift, Globe, ChevronRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface TopNavbarProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

export function TopNavbar({ onMenuToggle, isMenuOpen }: TopNavbarProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileSearchVisible(false);
    }
  };

  return (
    <header className="h-14 w-full shrink-0 z-50 sticky top-0 border-b border-primary/20 bg-background/80 backdrop-blur-xl overflow-hidden">
      <div className="px-3 sm:px-4 flex h-full items-center gap-2 sm:gap-4">
        {/* Left: Logo & Menu */}
        {!isMobileSearchVisible && (
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10 rounded-lg h-9 w-9 text-muted-foreground hover:text-primary transition-colors shrink-0"
              onClick={onMenuToggle}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg overflow-hidden flex items-center justify-center glow-primary-sm group-hover:shadow-glow transition-all duration-300">
                <img src="/logo.png" alt="Fans on Chain Limited" className="h-full w-full object-cover" />
              </div>
              <span className="hidden sm:block text-base sm:text-lg font-black text-gradient tracking-tight">
                Fans on Chain Limited
              </span>
            </Link>
            <div className="hidden md:block h-6 w-px bg-border/40 mx-2" />
          </div>
        )}

        {/* Center: Search */}
        <div className={cn(
          "flex-1 items-center gap-2",
          isMobileSearchVisible ? "flex" : "hidden sm:flex"
        )}>
          {isMobileSearchVisible && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileSearchVisible(false)}
              className="shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
          <form
            onSubmit={handleSearch}
            className={cn(
              "flex-1 transition-all duration-300 w-full",
              isSearchFocused ? "max-w-lg" : "max-w-md"
            )}
          >
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="search"
                placeholder="Search streams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full h-9 pl-9 pr-4 bg-[#0f0f13]/60 border border-white/20 rounded-lg focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm placeholder:text-muted-foreground/60"
              />
            </div>
          </form>
        </div>

        {/* Right: Actions */}
        <div className={cn(
          "items-center gap-1 sm:gap-1.5 ml-auto",
          isMobileSearchVisible ? "hidden" : "flex"
        )}>
          {/* Mobile Search Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="sm:hidden hover:bg-primary/10 rounded-lg h-9 w-9"
            onClick={() => setIsMobileSearchVisible(true)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Auth Actions */}
          {isAuthenticated ? (
            <>
              {/* Wallet */}
              <Link to="/wallet">
                <Button variant="ghost" className="hidden xs:flex items-center gap-2 hover:bg-primary/10 rounded-lg h-9 px-2 sm:px-3 text-sm shrink-0">
                  <Wallet className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-gradient">{user?.credits || 0}</span>
                </Button>
              </Link>

              {/* DMs */}
              <Link to="/messages">
                <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 rounded-lg h-9 w-9">
                  <Mail className="h-4 w-4" />
                </Button>
              </Link>

              {/* Notifications */}
              <Link to="/notifications">
                <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 rounded-lg h-9 w-9">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-live ring-2 ring-background animate-pulse" />
                </Button>
              </Link>

              {/* Profile */}
              <div className="flex items-center ml-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 rounded-lg border border-white/20 h-9 w-9">
                      <Avatar className="h-7 w-7 ring-2 ring-border hover:ring-primary/50 transition-all duration-300">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 glass-strong rounded-2xl border-white/5 p-0 mt-2 shadow-2xl bg-[#0f0f13]/95 text-white">
                    {/* User Header */}
                    <div className="flex flex-col items-center justify-center p-6 pb-4 bg-white/5 border-b border-white/5">
                      <Avatar className="h-16 w-16 mb-3 ring-4 ring-white/10 shadow-xl">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="text-xl font-bold bg-primary/20 text-primary">{user?.name?.[0] || 'U'}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-lg mb-1">{user?.name}</h3>
                      <Link to="/profile" className="w-full">
                        <Button className="w-full mt-3 bg-white/10 hover:bg-white/20 text-white border-none h-10 font-medium tracking-wide">
                          View your channel
                        </Button>
                      </Link>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2 space-y-1">
                      {user?.role === 'creator' && (
                        <DropdownMenuItem asChild className="rounded-lg focus:bg-white/10 cursor-pointer h-12">
                          <Link to="/studio/dashboard" className="flex items-center gap-4 px-3">
                            <LayoutDashboard className="h-5 w-5 text-gray-400" />
                            <span className="font-medium text-[15px]">Creator dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuItem asChild className="rounded-lg focus:bg-white/10 cursor-pointer h-12">
                        <Link to="/subscriptions" className="flex items-center gap-4 px-3">
                          <Sparkles className="h-5 w-5 text-gray-400" />
                          <span className="font-medium text-[15px]">Subscriptions</span>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild className="rounded-lg focus:bg-white/10 cursor-pointer h-12">
                        <Link to="/rewards" className="flex items-center gap-4 px-3">
                          <Gift className="h-5 w-5 text-gray-400" />
                          <span className="font-medium text-[15px]">Drops & rewards</span>
                        </Link>
                      </DropdownMenuItem>

                      <div className="h-px bg-white/10 my-1 mx-2" />
                      
                      <DropdownMenuItem asChild className="rounded-lg focus:bg-white/10 cursor-pointer h-12">
                        <Link to="/settings" className="flex items-center gap-4 px-3">
                          <Settings className="h-5 w-5 text-gray-400" />
                          <span className="font-medium text-[15px]">Settings</span>
                        </Link>
                      </DropdownMenuItem>

                      <div className="h-px bg-white/10 my-1 mx-2" />

                      <DropdownMenuItem 
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                        className="rounded-lg focus:bg-white/10 cursor-pointer h-12 flex items-center gap-4 px-3 text-red-400 focus:text-red-400"
                      >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium text-[15px]">Log out</span>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/auth/login">
                <Button variant="ghost" className="h-9 px-4 font-bold text-sm rounded-lg hover:bg-white/5 transition-colors">
                  Log In
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button className="h-9 px-4 font-bold text-sm rounded-lg bg-primary text-black hover:shadow-glow transition-all">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
