import { Link } from "react-router-dom";
import { Play, Clock, Lock, Coins, Eye, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  creator: {
    name: string;
    avatar: string;
  };
  duration: string;
  views: number;
  price?: number;
  isLocked?: boolean;
  className?: string;
}

export function VideoCard({
  id,
  title,
  thumbnail,
  creator,
  duration,
  views,
  price,
  isLocked = false,
  className,
}: VideoCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={cn("group relative", className)}
    >
      <Link
        to={`/watch/video/${id}`}
        className="block"
      >
        {/* Thumbnail Container */}
        <div className="relative aspect-video rounded-[1.5rem] overflow-hidden bg-[#0a0a0f] border border-white/5 transition-all duration-500 group-hover:border-violet-500/30 group-hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]">
          <img
            src={thumbnail}
            alt={title}
            className={cn(
              "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
              isLocked ? "brightness-50 grayscale-[0.5]" : "opacity-80 group-hover:opacity-100"
            )}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          
          {/* Top Badges */}
          <div className="absolute top-3 right-3 flex gap-2">
             {price && (
                <div className={cn(
                    "px-2.5 py-1 rounded-lg backdrop-blur-md text-[9px] font-black uppercase tracking-[0.2em] shadow-xl border flex items-center gap-1.5",
                    isLocked ? "bg-fuchsia-600/20 border-fuchsia-500/30 text-fuchsia-400" : "bg-violet-600/20 border-violet-500/30 text-violet-400"
                )}>
                   <Coins className="h-3 w-3" />
                   {price}
                </div>
             )}
          </div>

          {/* Locked Overlay */}
          {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-md">
                <Lock className="h-6 w-6 text-white/40" />
              </div>
            </div>
          )}

          {/* Hover Play Button */}
          {!isLocked && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
               <div className="h-14 w-14 rounded-2xl bg-violet-600/90 backdrop-blur-md flex items-center justify-center shadow-2xl shadow-violet-500/50 border border-white/20">
                  <Play className="h-6 w-6 text-white ml-0.5" fill="currentColor" />
               </div>
            </div>
          )}

          {/* Duration info */}
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-[0.2em] border border-white/5">
             {duration}
          </div>
        </div>

        {/* Info section */}
        <div className="flex gap-4 mt-4 px-1">
          <div className="shrink-0">
             <div className="relative">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="h-10 w-10 rounded-xl object-cover border border-white/10 group-hover:border-violet-500/50 transition-all shadow-xl"
                />
             </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-[13px] text-white uppercase tracking-wider truncate group-hover:text-violet-400 transition-colors leading-tight mb-1">
              {title}
            </h3>
            <div className="flex items-center gap-2">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest truncate hover:text-white transition-colors">
                {creator.name}
              </p>
              <span className="h-1 w-1 rounded-full bg-white/10" />
              <p className="text-[10px] font-black text-white/20 uppercase tracking-widest flex items-center gap-1">
                 <Eye className="h-2.5 w-2.5" /> {views >= 1000 ? `${(views / 1000).toFixed(1)}K` : views}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
