import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Radio,
  Wallet,
  User,
  Heart,
  Bell,
  Settings,
  Library,
  TrendingUp,
  Compass,
  Users,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Compass, label: "Explore", path: "/explore" },
  { icon: Users, label: "Following", path: "/following" },
  { icon: TrendingUp, label: "Trending", path: "/trending" },
  { icon: Radio, label: "Live", path: "/live" },
];

const libraryItems = [
  { icon: Library, label: "Library", path: "/library" },
  { icon: Clock, label: "History", path: "/history" },
  { icon: Heart, label: "Subscriptions", path: "/subscriptions" },
  { icon: Wallet, label: "Wallet", path: "/wallet" },
];

const settingsItems = [
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface DesktopSidebarProps {
  isOpen: boolean;
}

export function DesktopSidebar({ isOpen }: DesktopSidebarProps) {
  const location = useLocation();

  const NavItem = ({ icon: Icon, label, path }: { icon: any; label: string; path: string }) => {
    const isActive = location.pathname === path;
    return (
      <Link
        to={path}
        className={cn(
          "nav-item group",
          isActive && "active",
          !isOpen && "justify-center px-0"
        )}
      >
        <Icon className={cn(
          "nav-icon h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
          isActive ? "text-primary" : "text-muted-foreground"
        )} />
        {isOpen && (
          <span className={cn(
            "font-medium truncate transition-colors duration-300",
            isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
          )}>
            {label}
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        "fixed lg:relative flex flex-col border-r border-primary/20 bg-background/95 backdrop-blur-xl transition-all duration-300 ease-in-out z-50 lg:z-20 h-full",
        isOpen 
          ? "w-64 translate-x-0" 
          : "w-16 -translate-x-full lg:translate-x-0"
      )}
    >
      <div className={cn(
        "flex-1 overflow-y-auto p-3 space-y-4",
        !isOpen && "px-2"
      )}>
        {/* Main Nav */}
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </div>

        <div className="px-2">
          <div className="h-px w-full bg-border/40" />
        </div>

        {/* Library */}
        <div className="space-y-1">
          {isOpen && (
            <p className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3">
              Library
            </p>
          )}
          {libraryItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </div>

        <div className="px-2">
          <div className="h-px w-full bg-border/40" />
        </div>

        {/* For You / Following */}
        <div className="space-y-1">
          {isOpen && (
            <p className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3">
              Following
            </p>
          )}
          <div className="space-y-1">
            {[
              { name: "Luna_Live", status: "Live", viewers: "2.4K", category: "Music" },
              { name: "GamerPro", status: "Live", viewers: "15.2K", category: "Gaming" },
              { name: "ChillVibes", status: "Offline", viewers: "", category: "" },
            ].map((creator) => (
              <Link
                key={creator.name}
                to={`/creator/${creator.name.toLowerCase()}`}
                className={cn(
                  "flex items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-300 group px-3 py-2",
                  !isOpen ? "justify-center px-0" : "justify-between"
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-gradient-primary ring-2 ring-transparent group-hover:ring-primary/40 transition-all duration-300" />
                    {creator.status === "Live" && (
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-live ring-2 ring-background border border-background" />
                    )}
                  </div>
                  {isOpen && (
                    <div className="min-w-0 flex flex-col">
                      <span className="font-bold text-sm truncate group-hover:text-primary transition-colors duration-300">
                        {creator.name}
                      </span>
                      {creator.status === "Live" && (
                        <span className="text-[10px] text-muted-foreground truncate italic">
                          {creator.category}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {isOpen && creator.status === "Live" && (
                  <div className="flex items-center gap-1.5 ml-2">
                    <div className="h-1 w-1 rounded-full bg-live animate-pulse" />
                    <span className="text-[10px] font-bold text-foreground/80">{creator.viewers}</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="px-2">
          <div className="h-px w-full bg-border/40" />
        </div>

        {/* Recommended */}
        <div className="space-y-1">
          {isOpen && (
            <p className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3">
              Recommended
            </p>
          )}
          <div className="space-y-1">
            {[
              { name: "razo97", viewers: "335", category: "CS 2" },
              { name: "Malek_04", viewers: "160", category: "Chatting" },
              { name: "funnyhoodvidz", viewers: "465", category: "Slots" },
            ].map((rec) => (
              <Link
                key={rec.name}
                to={`/creator/${rec.name.toLowerCase()}`}
                className={cn(
                  "flex items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-300 group px-3 py-2",
                  !isOpen ? "justify-center px-0" : "justify-between"
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-8 w-8 rounded-full bg-muted/50 border border-border/50 group-hover:border-primary/50 transition-all" />
                  {isOpen && (
                    <div className="min-w-0 flex flex-col">
                      <span className="font-bold text-sm truncate">{rec.name}</span>
                      <span className="text-[10px] text-muted-foreground truncate">{rec.category}</span>
                    </div>
                  )}
                </div>
                {isOpen && (
                  <div className="flex items-center gap-1.5 ml-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-live" />
                    <span className="text-[10px] font-bold">{rec.viewers}</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Settings */}
      <div className="p-3 border-t border-border/50 space-y-1">
        {settingsItems.map((item) => (
          <NavItem key={item.path} {...item} />
        ))}
      </div>
    </aside>
  );
}
