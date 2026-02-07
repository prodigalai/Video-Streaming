import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function FloatingProfile() {
  return (
    <div className="fixed bottom-24 right-6 z-[90] lg:hidden">
      <Link to="/profile">
        <button className="h-16 w-16 rounded-full bg-[#0f0f13] border border-white/10 flex items-center justify-center shadow-2xl transition-all duration-500 active:scale-90 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Avatar className="h-14 w-14 ring-2 ring-primary/50 group-hover:ring-primary transition-all duration-300">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
            <AvatarFallback className="bg-primary/20 text-primary font-bold">U</AvatarFallback>
          </Avatar>
        </button>
      </Link>
    </div>
  );
}
