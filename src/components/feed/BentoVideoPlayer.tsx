import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  thumbnail?: string;
  className?: string;
}

export function BentoVideoPlayer({ src, thumbnail, className }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className={cn("relative w-full h-full group cursor-pointer overflow-hidden", className)} onClick={togglePlay}>
      <video
        ref={videoRef}
        src={src}
        poster={thumbnail}
        className="w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
      />
      
      {/* Overlay controls */}
      <div className={cn(
        "absolute inset-0 bg-black/20 transition-opacity duration-300 flex items-center justify-center",
        isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
      )}>
        <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl transition-transform active:scale-90">
          {isPlaying ? (
            <Pause className="h-8 w-8 text-white fill-current" />
          ) : (
            <Play className="h-8 w-8 text-white fill-current ml-1" />
          )}
        </div>
      </div>

      {/* Mute toggle bottom right */}
      <div className="absolute bottom-4 right-4 z-20">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 hover:bg-black/60"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
      </div>

      {/* Progress bar (Visual only) */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div 
          className="h-full bg-violet-600 transition-all duration-300" 
          style={{ width: isPlaying ? '100%' : '0%', transitionDuration: isPlaying ? '10s' : '0s' }} 
        />
      </div>
    </div>
  );
}
