import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
    <Link
      to={`/watch/live/${id}`}
      className={cn("group block", className)}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-muted group-hover:shadow-[0_0_30px_rgba(165,128,202,0.15)] transition-all duration-300">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
        
        {/* Status Overlays */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          {isLive && (
             <span className="px-2 py-0.5 rounded-md bg-live text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                LIVE
             </span>
          )}
          <div className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold shadow-lg">
             {viewers >= 1000 ? `${(viewers / 1000).toFixed(1)}K` : viewers} viewers
          </div>
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100">
           <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center shadow-glow">
              <svg className="h-6 w-6 text-primary-foreground ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
           </div>
        </div>
      </div>

      {/* Info section */}
      <div className="flex gap-3 mt-3">
        <div className="flex-shrink-0">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="h-9 w-9 rounded-full border border-border group-hover:border-primary/50 transition-colors"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          <h3 className="font-bold text-sm text-foreground truncate group-hover:text-primary transition-colors leading-tight">
            {title}
          </h3>
          <div className="flex flex-col">
            <p className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{creator.name}</p>
            <p className="text-[11px] text-muted-foreground/60">{category}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
