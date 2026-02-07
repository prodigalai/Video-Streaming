import { Link, useLocation } from "react-router-dom";
import { Home, Radio, User, Compass, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Compass, label: "Explore", path: "/explore" },
  { icon: Radio, label: "Live", path: "/live" },
  { icon: Users, label: "Following", path: "/following" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function BottomNavbar() {
  const location = useLocation();

  return (
    <nav className="w-full shrink-0 z-50 fixed bottom-0 left-0 right-0 lg:hidden border-t border-white/15 bg-black/95 backdrop-blur-xl pb-safe shadow-[0_-1px_10px_rgba(0,0,0,1)]">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-4 py-2 transition-all duration-300 relative",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {/* Active indicator glow */}
              {isActive && (
                <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-gradient-primary glow-primary-sm" />
              )}
              <div
                className={cn(
                  "relative p-2 rounded-xl transition-all duration-300",
                  isActive && "bg-primary/10"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-transform duration-300",
                  isActive && "scale-110"
                )} />
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
