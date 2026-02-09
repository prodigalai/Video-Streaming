import { Link } from "react-router-dom";
import { Eye, Users, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface StreamCardProps {
  id: string;
  title: string;
  thumbnail: string;
  creator: {
    name: string;
    avatar: string;
  };
  viewers: number;
  category: string;
  isLive?: boolean;
  className?: string;
}

export function StreamCard({
  id,
  title,
  thumbnail,
  creator,
  viewers,
  category,
  isLive = true,
  className,
}: StreamCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={cn("group relative", className)}
    >
      <Link
        to={`/watch/live/${id}`}
        className="block"
      >
        {/* Thumbnail Container */}
        <div className="relative aspect-video rounded-[1.5rem] overflow-hidden bg-[#0a0a0f] border border-white/5 transition-all duration-500 group-hover:border-violet-500/30 group-hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          
          {/* Status Overlays */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isLive && (
               <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-600/90 backdrop-blur-md shadow-xl">
                  <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-white text-[9px] font-black uppercase tracking-[0.2em]">
                     LIVE
                  </span>
               </div>
            )}
            <div className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-[0.2em] shadow-xl border border-white/5 flex items-center gap-1.5">
               <Users className="h-3 w-3 text-violet-400" />
               {viewers >= 1000 ? `${(viewers / 1000).toFixed(1)}K` : viewers}
            </div>
          </div>

          {/* Hover Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
             <div className="h-14 w-14 rounded-2xl bg-violet-600/90 backdrop-blur-md flex items-center justify-center shadow-2xl shadow-violet-500/50 border border-white/20">
                <svg className="h-6 w-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
             </div>
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
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-violet-600 flex items-center justify-center border-2 border-[#050508]">
                    <ShieldCheck className="h-2 w-2 text-white" />
                </div>
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
              <p className="text-[10px] font-black text-violet-500/60 uppercase tracking-[0.2em]">{category}</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
