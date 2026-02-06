import { Link } from "react-router-dom";
import { Play, Clock, Lock, Coins } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
    <Link
      to={`/watch/video/${id}`}
      className={cn("group block", className)}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-muted card-hover-lift">
        {/* Glow effect on hover */}
        <div className="absolute -inset-1 bg-gradient-primary opacity-0 group-hover:opacity-15 blur-xl transition-opacity duration-500 -z-10" />
        
        <img
          src={thumbnail}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
            isLocked && "brightness-50"
          )}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Play Button Overlay */}
        {!isLocked && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center glow-primary transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play className="h-7 w-7 text-primary-foreground fill-current ml-1" />
            </div>
          </div>
        )}

        {/* Locked Overlay */}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="text-center glass-card p-4 rounded-2xl">
              <Lock className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="flex items-center justify-center gap-1.5 text-primary font-bold text-lg">
                <Coins className="h-5 w-5" />
                <span>{price}</span>
              </div>
            </div>
          </div>
        )}

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 border border-white/10">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs font-medium text-white">{duration}</span>
        </div>

        {/* Price Badge (for unlocked premium content) */}
        {price && !isLocked && (
          <Badge className="absolute top-3 right-3 bg-gradient-primary text-primary-foreground border-0">
            <Coins className="h-3 w-3 mr-1" />
            {price}
          </Badge>
        )}
      </div>

      {/* Info section */}
      <div className="flex gap-3 mt-4">
        <img
          src={creator.avatar}
          alt={creator.name}
          className="h-10 w-10 rounded-full ring-2 ring-border group-hover:ring-primary/50 transition-all duration-300"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-300 leading-tight">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            {creator.name} • {views >= 1000 ? `${(views / 1000).toFixed(1)}K` : views} views
          </p>
        </div>
      </div>
    </Link>
  );
}
