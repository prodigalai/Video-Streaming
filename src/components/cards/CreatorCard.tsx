import { Link } from "react-router-dom";
import { Users, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface CreatorCardProps {
  id: string;
  name: string;
  username: string;
  avatar: string;
  banner?: string;
  followers: number;
  isLive?: boolean;
  isFollowing?: boolean;
  className?: string;
}

export function CreatorCard({
  id,
  name,
  username,
  avatar,
  banner,
  followers,
  isLive = false,
  isFollowing = false,
  className,
}: CreatorCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={cn("group relative bg-[#0a0a0f] border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-violet-500/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.1)]", className)}
    >
      {/* Banner */}
      <div className="relative h-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-fuchsia-600/20" />
        {banner ? (
          <img src={banner} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full bg-white/[0.02]" />
        )}
        {isLive && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-600/90 backdrop-blur-md shadow-xl border border-white/10">
            <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-white text-[9px] font-black uppercase tracking-[0.2em]">LIVE</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative px-6 pb-6 text-center">
        {/* Avatar */}
        <div className="relative -mt-10 mb-4 inline-block">
          <Link to={`/creator/${id}`}>
            <img
              src={avatar}
              alt={name}
              className={cn(
                "h-20 w-20 rounded-2xl border-4 border-[#0a0a0f] transition-all object-cover shadow-2xl group-hover:border-violet-500/30",
                isLive && "ring-2 ring-red-500"
              )}
            />
            <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-violet-600 flex items-center justify-center border-2 border-[#0a0a0f] shadow-lg">
                <ShieldCheck className="h-3 w-3 text-white" />
            </div>
          </Link>
        </div>

        {/* Info */}
        <Link to={`/creator/${id}`} className="block mb-4">
          <h3 className="font-black text-white uppercase tracking-tight group-hover:text-violet-400 transition-colors truncate">
            {name}
          </h3>
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">@{username}</p>
        </Link>

        {/* Stats */}
        <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                <Users className="h-3 w-3 text-violet-400" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">
                    {followers >= 1000 ? `${(followers / 1000).toFixed(1)}K` : followers} Supporters
                </span>
            </div>
        </div>

        {/* Action */}
        <Button
          variant={isFollowing ? "secondary" : "default"}
          size="sm"
          className={cn(
             "w-full h-11 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all",
             isFollowing 
                ? "bg-white/5 text-white/40 hover:text-white border border-white/10" 
                : "bg-violet-600 text-white hover:bg-violet-700 hover:shadow-glow-primary shadow-xl shadow-violet-500/20"
          )}
          onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
          }}
        >
          {isFollowing ? "Following" : "Follow Node"}
        </Button>
      </div>
      
      {/* Dynamic Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700">
         <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-[-25deg] group-hover:animate-shine" />
      </div>
    </motion.div>
  );
}
