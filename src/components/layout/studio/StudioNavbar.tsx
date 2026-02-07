import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, Menu, X, Video, Plus, HelpCircle, Radio, Mail } from "lucide-react";
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
import { ContentUploadModal } from "@/components/content/ContentUploadModal";
import { cn } from "@/lib/utils";

interface StudioNavbarProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

export function StudioNavbar({ onMenuToggle, isMenuOpen }: StudioNavbarProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <ContentUploadModal open={isUploadOpen} onOpenChange={setIsUploadOpen} />
      <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-primary/20 bg-background/80 backdrop-blur-xl">
        <div className="px-4 flex h-full items-center justify-between gap-4">
          {/* Left: Logo & Menu */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10 rounded-lg h-9 w-9 text-muted-foreground hover:text-primary transition-colors"
              onClick={onMenuToggle}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link to="/studio/dashboard" className="flex items-center gap-2.5 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center glow-primary-sm group-hover:shadow-glow transition-all duration-300">
                <Video className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-lg font-bold text-gradient tracking-tight">Studio</span>
              </div>
            </Link>
            <div className="hidden md:block h-6 w-px bg-border/40 mx-2" />
          </div>

          {/* Center: Search */}
          <div className={cn(
            "hidden md:flex flex-1 max-w-2xl transition-all duration-300",
            isSearchFocused && "max-w-3xl"
          )}>
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="search"
                placeholder="Search across your channel..."
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full h-9 pl-10 pr-4 bg-[#0f0f13]/60 border border-white/20 rounded-lg focus:border-primary/50 focus:ring-1 focus:ring-primary/10 transition-all duration-300 text-sm placeholder:text-muted-foreground/60"
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Create Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="hidden sm:flex items-center gap-2 rounded-lg bg-primary text-primary-foreground hover:shadow-glow transition-all px-4">
                  <Plus className="h-4 w-4" />
                  <span>Create</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass-strong rounded-xl border-border/50 p-1">
                <DropdownMenuItem 
                  className="rounded-lg gap-3 py-2.5 focus:bg-primary/10 transition-colors cursor-pointer"
                  onClick={() => setIsUploadOpen(true)}
                >
                  <Video className="h-4 w-4 text-primary" />
                  <span>Upload Video</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="rounded-lg gap-3 py-2.5 focus:bg-primary/10 transition-colors cursor-pointer"
                  onClick={() => navigate("/studio/live")}
                >
                  <Radio className="h-4 w-4 text-live" />
                  <span>Go Live</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Messages */}
            <Link to="/messages">
              <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-primary/10 rounded-lg">
                <Mail className="h-5 w-5" />
              </Button>
            </Link>

            {/* Help */}
            <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-primary/10 rounded-lg">
              <HelpCircle className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            <Link to="/notifications">
              <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 rounded-lg h-10 w-10">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-live ring-2 ring-background" />
              </Button>
            </Link>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 rounded-lg h-10 w-10 ml-1">
                <Avatar className="h-8 w-8 ring-2 ring-border/50 hover:ring-primary/50 transition-all duration-300">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass-strong rounded-xl border-border/50">
              <DropdownMenuItem asChild className="rounded-lg focus:bg-primary/10">
                <Link to="/profile" className="flex items-center gap-3 p-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold leading-none">Creator Studio</p>
                    <p className="text-xs text-muted-foreground mt-1">@creator_pro</p>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem asChild className="rounded-lg focus:bg-primary/10">
                <Link to="/" className="flex items-center gap-3">
                  <span>View Channel</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive rounded-lg focus:bg-destructive/10">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
    </>
  );
}
