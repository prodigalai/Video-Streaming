import { useState, useEffect, useCallback } from "react";
import { 
  X, 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreVertical, 
  ChevronUp, 
  ChevronDown,
  Play,
  Volume2,
  VolumeX,
  Coins,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Creator {
  name: string;
  avatar: string;
}

interface Reel {
  id: string;
  thumbnail: string;
  isLocked: boolean;
  price?: number;
  creator: Creator;
  description?: string;
  likes?: string;
  comments?: string;
}

interface ReelsViewerProps {
  isOpen: boolean;
  onClose: () => void;
  initialReelId: string;
  reels: Reel[];
  unlockedReels: string[];
  onUnlock: (id: string, price: number) => void;
}

export function ReelsViewer({ 
  isOpen, 
  onClose, 
  initialReelId, 
  reels, 
  unlockedReels,
  onUnlock 
}: ReelsViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [likedReels, setLikedReels] = useState<string[]>([]);

  // Initialize index based on initialReelId
  useEffect(() => {
    if (isOpen) {
      const index = reels.findIndex(r => r.id === initialReelId);
      if (index !== -1) setCurrentIndex(index);
      setIsPlaying(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, initialReelId, reels]);

  const handleNext = useCallback(() => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, reels.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        handleNext();
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        handlePrev();
        break;
      case "Escape":
        onClose();
        break;
      case " ": // Space
        e.preventDefault();
        setIsPlaying(prev => !prev);
        break;
    }
  }, [isOpen, handleNext, handlePrev, onClose]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const toggleLike = (id: string) => {
    setLikedReels(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  if (!isOpen) return null;

  const activeReel = reels[currentIndex];
  const isLocked = activeReel.isLocked && !unlockedReels.includes(activeReel.id);
  const isLiked = likedReels.includes(activeReel.id);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
      >
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4 text-white z-50 hover:bg-white/10 rounded-full h-12 w-12"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        <div className="flex items-center gap-4 h-full max-h-[90vh] w-full max-w-4xl justify-center relative">
          
          {/* Navigation - Left */}
          <div className="hidden md:flex flex-col gap-4">
             <Button 
               variant="ghost" 
               size="icon" 
               className={cn("rounded-full h-12 w-12 text-white hover:bg-white/10", currentIndex === 0 && "opacity-20 cursor-not-allowed")}
               onClick={handlePrev}
               disabled={currentIndex === 0}
             >
               <ChevronUp className="h-8 w-8" />
             </Button>
          </div>

          {/* Main Reel Container */}
          <div className="relative aspect-[9/16] h-full max-h-[85vh] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 shrink-0">
             
             {/* Background / Video Mock */}
             <div className="absolute inset-0">
                <img 
                  src={activeReel.thumbnail} 
                  alt="" 
                  className={cn(
                    "w-full h-full object-cover",
                    isLocked && "blur-xl scale-110 opacity-50"
                  )} 
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
             </div>

             {/* Locked State UI */}
             {isLocked ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-300">
                    <div className="h-20 w-20 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center mb-6 shadow-2xl">
                       <EyeOff className="h-10 w-10 text-white/50" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2 tracking-tight">PREMIUM CONTENT</h3>
                    <p className="text-white/60 text-sm mb-8 font-medium">Unlock this exclusive clip to watch.</p>
                    
                    <Button 
                      size="lg" 
                      className="rounded-full bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest px-8 h-14 shadow-glow-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUnlock(activeReel.id, activeReel.price!);
                      }}
                    >
                       <Coins className="h-4 w-4 mr-2" />
                       Unlock • {activeReel.price}
                    </Button>
                </div>
             ) : (
                /* Unlocked Controls */
                <>
                  {/* Play/Pause overlay area */}
                  <div 
                    className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {!isPlaying && (
                      <div className="h-20 w-20 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                        <Play className="h-10 w-10 text-white fill-white ml-1" />
                      </div>
                    )}
                  </div>

                  {/* Top Controls */}
                  <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-20 bg-gradient-to-b from-black/60 to-transparent">
                     <div className="flex gap-2">
                       {/* Tags or top info could go here */}
                     </div>
                     <Button 
                       variant="ghost" 
                       size="icon" 
                       className="text-white/80 hover:bg-black/20 rounded-full h-10 w-10"
                       onClick={(e) => {
                         e.stopPropagation();
                         setIsMuted(!isMuted);
                       }}
                     >
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                     </Button>
                  </div>
                </>
             )}

             {/* Right Sidebar Actions */}
             <div className="absolute right-2 bottom-20 flex flex-col gap-4 z-30 items-center">
                <div className="flex flex-col items-center gap-1">
                   <Button 
                     variant="ghost" 
                     size="icon" 
                     className={cn(
                        "h-12 w-12 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white border border-white/10 transition-transform hover:scale-110",
                        isLiked && "text-red-500 bg-red-500/10 border-red-500/20"
                     )}
                     onClick={(e) => {
                       e.stopPropagation();
                       toggleLike(activeReel.id);
                     }}
                   >
                     <Heart className={cn("h-6 w-6", isLiked && "fill-current")} />
                   </Button>
                   <span className="text-white text-xs font-bold shadow-black drop-shadow-md">{activeReel.likes || "4.2K"}</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                   <Button 
                     variant="ghost" 
                     size="icon" 
                     className="h-12 w-12 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white border border-white/10 transition-transform hover:scale-110"
                     onClick={(e) => e.stopPropagation()}
                   >
                     <MessageCircle className="h-6 w-6" />
                   </Button>
                   <span className="text-white text-xs font-bold shadow-black drop-shadow-md">{activeReel.comments || "128"}</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                   <Button 
                     variant="ghost" 
                     size="icon" 
                     className="h-12 w-12 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white border border-white/10 transition-transform hover:scale-110"
                     onClick={(e) => {
                       e.stopPropagation();
                       toast.success("Link copied to clipboard!");
                     }}
                   >
                     <Share2 className="h-6 w-6" />
                   </Button>
                   <span className="text-white text-xs font-bold shadow-black drop-shadow-md">Share</span>
                </div>

                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-full text-white/80 hover:bg-black/20"
                >
                  <MoreVertical className="h-5 w-5" />
                </Button>
             </div>

             {/* Bottom Info Section */}
             <div className="absolute bottom-0 left-0 right-0 p-6 pt-24 bg-gradient-to-t from-black via-black/60 to-transparent z-20 pointer-events-none">
                <div className="pointer-events-auto">
                   <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-10 w-10 border-2 border-white/20">
                         <AvatarImage src={activeReel.creator.avatar} />
                         <AvatarFallback>{activeReel.creator.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                         <span className="text-white font-black text-sm tracking-wide flex items-center gap-1">
                           {activeReel.creator.name}
                           <span className="bg-primary text-[8px] text-black px-1 rounded-sm ml-1">PRO</span>
                         </span>
                         <span className="text-white/60 text-xs font-medium">Original Audio • 3h ago</span>
                      </div>
                      <Button size="sm" variant="outline" className="ml-2 h-7 rounded-lg bg-transparent text-white border-white/20 hover:bg-white/10 text-xs font-bold uppercase tracking-wider">
                        Follow
                      </Button>
                   </div>
                   <p className="text-white/90 text-sm line-clamp-2 md:line-clamp-none font-medium leading-relaxed drop-shadow-md">
                      {activeReel.description || "Checking out the new features! This is absolutely insane 🔥 #coding #tech #future"}
                   </p>
                </div>
             </div>

             {/* Progress Bar */}
             <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
                <motion.div 
                   className="h-full bg-primary origin-left"
                   initial={{ scaleX: 0 }}
                   animate={{ scaleX: isPlaying ? 1 : 0 }} // Mock progress
                   transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                />
             </div>
          </div>

          {/* Navigation - Right */}
          <div className="hidden md:flex flex-col gap-4">
             <Button 
               variant="ghost" 
               size="icon" 
               className={cn("rounded-full h-12 w-12 text-white hover:bg-white/10", currentIndex === reels.length - 1 && "opacity-20 cursor-not-allowed")}
               onClick={handleNext}
               disabled={currentIndex === reels.length - 1}
             >
               <ChevronDown className="h-8 w-8" />
             </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
