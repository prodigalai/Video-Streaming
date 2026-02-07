import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Users, Minimize2, Gift, Sparkles, Maximize, Shrink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { StreamCard } from "@/components/cards/StreamCard";
import { useMiniPlayer } from "@/contexts/MiniPlayerContext";
import { RecommendedChannels } from "@/components/live/RecommendedChannels";
import { LiveChat } from "@/components/live/LiveChat";
import { StreamInfo } from "@/components/live/StreamInfo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { DesktopSidebar } from "@/components/layout/DesktopSidebar";
import { BottomNavbar } from "@/components/layout/BottomNavbar";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data
const streamData = {
  id: "featured-1",
  title: "Building towards something bigger! Only good vibes!! 💜💚💜",
  creator: {
    id: "luna",
    name: "Luna Live",
    username: "luna_live",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
    followers: 9600,
    bio: "Hey, I'm Luna! 💜 Official Partner bringing you variety streams full of good vibes and great energy. I love interacting with chat, so come hang out and be part of the community!",
    isVerified: true,
    socialLinks: [
      { platform: "twitter", handle: "@LunaLive" },
      { platform: "youtube", handle: "@LunaLiveYT" },
      { platform: "discord", handle: "LunaLive" },
      { platform: "tiktok", handle: "lunalive" },
    ],
  },
  viewers: 122,
  category: "Just Chatting",
  tags: ["English", "gaming", "chill", "irl", "vibes"],
  thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=675&fit=crop",
};

const tipAmounts = [10, 25, 50, 100, 250, 500];

const suggestedStreams = [
  {
    id: "2",
    title: "Cooking Italian Pasta from Scratch",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=338&fit=crop",
    creator: { name: "ChefMaria", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria" },
    viewers: 3201,
    category: "Cooking",
  },
  {
    id: "3",
    title: "Music Production Live Session",
    thumbnail: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=600&h=338&fit=crop",
    creator: { name: "BeatMaster", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=beat" },
    viewers: 5678,
    category: "Music",
  },
];

export default function LiveWatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openMiniPlayer, closeMiniPlayer, miniPlayer } = useMiniPlayer();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTipModalOpen, setIsTipModalOpen] = useState(false);

  // Close mini-player when entering this page
  useEffect(() => {
    if (miniPlayer.isActive && miniPlayer.streamId === id) {
      closeMiniPlayer();
    }
  }, [id, miniPlayer.isActive, miniPlayer.streamId, closeMiniPlayer]);

  const handleMinimize = () => {
    openMiniPlayer({
      streamId: streamData.id,
      streamTitle: streamData.title,
      streamThumbnail: streamData.thumbnail,
      creatorName: streamData.creator.name,
      creatorAvatar: streamData.creator.avatar,
      viewers: streamData.viewers,
    });
    navigate(-1);
  };

  return (
    <div className="h-screen flex flex-col bg-[#05020d] relative text-white overflow-hidden">
      {/* Cosmos ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,hsla(267,70%,15%,0.3),transparent_70%)]" />
      </div>
      
      {/* Top Navbar */}
      <TopNavbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} isMenuOpen={isSidebarOpen} />

      {/* Main Layout with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Drawer Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Desktop Sidebar - Hidden in theater mode */}
        {!isTheaterMode && (
           <DesktopSidebar isOpen={isSidebarOpen} />
        )}

        {/* Content Area */}
        <div className="flex-1 flex flex-col md:flex-row min-w-0 relative z-10 transition-all duration-500">
          
          {/* Main Player Section */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <ScrollArea className="flex-1">
               <div className={cn(
                  "transition-all duration-500",
                  isTheaterMode ? "w-full pb-20 md:pb-0" : "container p-4 lg:p-6 pb-20 md:pb-6"
               )}>
                  {/* Video Player Container */}
                  <div className={cn(
                     "relative bg-black group transition-all duration-500 shadow-2xl overflow-hidden",
                     isTheaterMode ? "w-full aspect-[21/9]" : "aspect-video rounded-3xl border border-white/5"
                  )}>
                     <img
                        src={streamData.thumbnail}
                        alt={streamData.title}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                     />
                     
                     {/* Video HUD Overlays */}
                     <div className="absolute top-6 left-6 flex items-center gap-3">
                        <div className="bg-live px-3 py-1 rounded-full shadow-glow-live animate-in zoom-in">
                           <span className="text-[10px] font-black italic tracking-tighter">LIVE</span>
                        </div>
                        <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                           <Users className="h-3 w-3 text-primary" />
                           <span className="text-xs font-black">{streamData.viewers.toLocaleString()}</span>
                        </div>
                     </div>
                     
                     {/* Action HUD */}
                     <div className="absolute top-6 right-6 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Tooltip>
                           <TooltipTrigger asChild>
                              <Button
                                 variant="ghost"
                                 size="icon"
                                 className="h-10 w-10 rounded-xl bg-black/60 hover:bg-primary text-white border border-white/10"
                                 onClick={() => setIsTheaterMode(!isTheaterMode)}
                              >
                                 {isTheaterMode ? <Shrink className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                              </Button>
                           </TooltipTrigger>
                           <TooltipContent side="bottom">Theater Mode</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                           <TooltipTrigger asChild>
                              <Button
                                 variant="ghost"
                                 size="icon"
                                 className="h-10 w-10 rounded-xl bg-black/60 hover:bg-primary text-white border border-white/10"
                                 onClick={handleMinimize}
                              >
                                 <Minimize2 className="h-5 w-5" />
                              </Button>
                           </TooltipTrigger>
                           <TooltipContent side="bottom">Mini Player</TooltipContent>
                        </Tooltip>
                     </div>

                     {/* Progress Mock */}
                     <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                        <div className="h-full bg-primary w-full shadow-glow-primary" />
                     </div>
                  </div>

                  {/* Info Section Below Player */}
                  <div className="mt-8">
                     <StreamInfo
                        creator={streamData.creator}
                        title={streamData.title}
                        category={streamData.category}
                        tags={streamData.tags}
                        viewers={streamData.viewers}
                        isFollowing={isFollowing}
                        isSubscribed={isSubscribed}
                        onFollowToggle={() => setIsFollowing(!isFollowing)}
                        onSubscribeToggle={() => setIsSubscribed(!isSubscribed)}
                        followerGoal={{ current: 9624, target: 10000 }}
                     />
                  </div>

                  {/* Recommended Section */}
                  <div className="mt-12 mb-20">
                     <div className="flex items-center justify-between mb-8 border-l-4 border-primary pl-4">
                        <h3 className="text-xl font-black uppercase tracking-widest">More Streams For You</h3>
                        <Button variant="ghost" className="text-primary font-black text-xs">VIEW ALL</Button>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {suggestedStreams.map((stream) => (
                           <StreamCard key={stream.id} {...stream} />
                        ))}
                     </div>
                  </div>
               </div>
            </ScrollArea>
          </div>

          {/* Chat Panel - Fixed on Desktop */}
          <div className="hidden md:flex flex-col border-l border-primary/20 bg-background/95 backdrop-blur-xl w-80 lg:w-96 shadow-2xl relative z-20">
             <LiveChat onSendTip={() => setIsTipModalOpen(true)} />
          </div>
        </div>
      </div>

      {/* Mobile Experience Enhancements */}
      <BottomNavbar />

      {/* Mobile Quick Cast Buttons */}
      <div className="fixed bottom-24 right-6 flex flex-col gap-4 md:hidden z-50">
         <Dialog>
            <DialogTrigger asChild>
               <Button size="icon" className="h-14 w-14 rounded-2xl bg-primary text-black shadow-glow-primary animate-in slide-in-from-right">
                  <span className="font-black text-[10px] uppercase">CHAT</span>
               </Button>
            </DialogTrigger>
            <DialogContent className="h-[80vh] p-0 max-w-lg border-primary/20 bg-background/90 backdrop-blur-2xl rounded-t-3xl border-b-none overflow-hidden">
               <div className="h-full flex flex-col">
                  <div className="p-4 border-b border-white/5 flex items-center justify-between">
                     <span className="font-black text-sm uppercase tracking-widest text-primary">Live Chat</span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                     <LiveChat onSendTip={() => setIsTipModalOpen(true)} showBorder={false} />
                  </div>
               </div>
            </DialogContent>
         </Dialog>
      </div>

      {/* Send Tip Modal */}
      <Dialog open={isTipModalOpen} onOpenChange={setIsTipModalOpen}>
         <DialogHeader>
            <DialogTitle className="sr-only">Support {streamData.creator.name}</DialogTitle>
         </DialogHeader>
         <DialogContent className="bg-background/95 backdrop-blur-2xl border-primary/20 rounded-3xl p-8 max-w-sm">
           <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <Gift className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-widest">Support {streamData.creator.name}</h2>
              <p className="text-sm text-muted-foreground font-medium">Your contribution helps keep the stream running!</p>
              
              <div className="grid grid-cols-3 gap-3 my-8">
                 {tipAmounts.map(amount => (
                    <Button key={amount} variant="outline" className="h-16 rounded-2xl border-white/10 hover:border-primary hover:bg-primary/10 transition-all group">
                       <span className="text-lg font-black group-hover:text-primary">{amount}</span>
                    </Button>
                 ))}
              </div>
              
              <Button className="w-full h-12 rounded-xl bg-primary text-black font-black uppercase tracking-widest hover:shadow-glow-primary">
                 SEND GIFT
              </Button>
           </div>
         </DialogContent>
      </Dialog>
    </div>
  );
}
