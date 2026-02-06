import { Link } from "react-router-dom";
import { X, Maximize2, Volume2, VolumeX, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMiniPlayer } from "@/contexts/MiniPlayerContext";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function MiniPlayer() {
  const { miniPlayer, closeMiniPlayer } = useMiniPlayer();
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!miniPlayer.isActive || !miniPlayer.streamId) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-50 transition-all duration-500",
        "animate-slide-up"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-80 rounded-2xl overflow-hidden glass-card shadow-2xl border border-primary/20">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-primary opacity-20 blur-xl -z-10" />
        
        {/* Video thumbnail */}
        <div className="relative aspect-video bg-black">
          <img
            src={miniPlayer.streamThumbnail}
            alt={miniPlayer.streamTitle}
            className="w-full h-full object-cover"
          />
          
          {/* Live indicator */}
          <div className="absolute top-2 left-2 live-badge text-xs px-2 py-0.5">
            LIVE
          </div>
          
          {/* Viewers */}
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5">
            <Eye className="h-3 w-3 text-primary" />
            <span className="text-xs text-white font-medium">
              {(miniPlayer.viewers / 1000).toFixed(1)}K
            </span>
          </div>
          
          {/* Controls overlay */}
          <div
            className={cn(
              "absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <Button
              size="icon"
              variant="ghost"
              className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Link to={`/watch/live/${miniPlayer.streamId}`}>
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white"
                onClick={closeMiniPlayer}
              >
                <Maximize2 className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          {/* Close button */}
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              "absolute top-2 right-2 h-6 w-6 rounded-full bg-black/60 hover:bg-black/80 text-white transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}
            onClick={closeMiniPlayer}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        
        {/* Stream info */}
        <div className="p-3 bg-card/80">
          <div className="flex items-center gap-2">
            <img
              src={miniPlayer.creatorAvatar}
              alt={miniPlayer.creatorName}
              className="h-8 w-8 rounded-full ring-2 ring-primary/30"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{miniPlayer.streamTitle}</p>
              <p className="text-xs text-muted-foreground">{miniPlayer.creatorName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
