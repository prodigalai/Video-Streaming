import { useState } from "react";
import { 
  EyeOff, 
  Coins, 
  Play, 
  RefreshCw, 
  Edit, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  TrendingUp,
  Heart,
  MessageCircle,
  Share2,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const REELS_DATA = [
  {
    id: "reel-1",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=1200",
    isLocked: false,
    creator: { name: "Luna", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna" },
  },
  {
    id: "reel-2",
    thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=1200",
    isLocked: true,
    price: 50,
    creator: { name: "Beat", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=beat" },
  },
  {
    id: "reel-3",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=1200",
    isLocked: false,
    creator: { name: "Gamer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gamer" },
  },
  {
    id: "reel-4",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=1200",
    isLocked: true,
    price: 75,
    creator: { name: "Chef", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria" },
  },
  {
    id: "reel-5",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=1200",
    isLocked: true,
    price: 100,
    creator: { name: "Luna", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna" },
  }
];

const SUGGESTIONS = [
    { name: "Austin", handle: "Austin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=austin", isVerified: true, isLive: true },
    { name: "ashlee_lo...", handle: "ashlee_lo", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ashlee", isVerified: true },
    { name: "ProjektMe...", handle: "ProjektMe", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=projekt", isVerified: true },
    { name: "mila", handle: "zebragirl", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mila", isVerified: true },
];

export function MadeForYou() {
  const [activeTab, setActiveTab] = useState('for-you');
  const [unlockedReels, setUnlockedReels] = useState<string[]>([]);

  const handleUnlock = (id: string, price: number) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 800)),
      {
        loading: 'Processing credit transfer...',
        success: () => {
          setUnlockedReels(prev => [...prev, id]);
          return `Video unlocked for ${price} credits! Enjoy ✨`;
        },
        error: 'Insufficient credits',
      }
    );
  };

  return (
    <div className="grid lg:grid-cols-[1fr,340px] gap-8">
      {/* Left Column Feed */}
      <div className="space-y-6">
        {/* Filter Tabs */}
        <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'subscribed', label: 'Subscribed' },
              { id: 'for-you', label: 'For You' }
            ].map(tab => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "rounded-full px-6 transition-all duration-300",
                  activeTab === tab.id 
                    ? "bg-primary text-white shadow-glow" 
                    : "bg-white/5 text-muted-foreground hover:bg-white/10"
                )}
              >
                {tab.label}
              </Button>
            ))}
            <Button variant="ghost" size="icon" className="rounded-full bg-white/5 h-10 w-10 text-primary">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-white/5 h-10 w-10 text-primary">
              <Edit className="h-4 w-4" />
            </Button>
        </div>

        {/* Made For You Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">
               Made For <span className="text-gradient">You</span>
            </h2>
            <Button variant="ghost" className="text-muted-foreground hover:text-white">
               <TrendingUp className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 snap-x">
             {REELS_DATA.map((reel) => {
               const isReelUnlocked = unlockedReels.includes(reel.id);
               const needsUnlock = reel.isLocked && !isReelUnlocked;

               return (
                 <div 
                   key={reel.id} 
                   className="relative flex-shrink-0 w-44 md:w-52 aspect-[9/16] rounded-2xl overflow-hidden group snap-start border border-white/5"
                 >
                    <img 
                      src={reel.thumbnail} 
                      className={cn(
                        "w-full h-full object-cover transition-all duration-700 group-hover:scale-110",
                        needsUnlock && "blur-xl saturate-50 contrast-75"
                      )} 
                    />
                    
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                    {/* Locked View */}
                    {needsUnlock ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center space-y-3">
                         <div className="h-14 w-14 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                            <EyeOff className="h-6 w-6 text-primary" />
                         </div>
                         <Button 
                           onClick={() => handleUnlock(reel.id, reel.price!)}
                           className="bg-primary/90 hover:bg-primary text-white rounded-full h-11 px-6 shadow-glow font-bold text-xs"
                         >
                            <Coins className="h-3 w-3 mr-2" />
                            UNLOCK FOR {reel.price}
                         </Button>
                      </div>
                    ) : (
                      <>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                              <Play className="h-6 w-6 text-white fill-current ml-1" />
                           </div>
                        </div>
                        {/* Stats/Info at Bottom */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                               <Avatar className="h-6 w-6 border border-white/20">
                                  <AvatarImage src={reel.creator.avatar} />
                                  <AvatarFallback>{reel.creator.name[0]}</AvatarFallback>
                               </Avatar>
                               <span className="text-[10px] font-bold text-white uppercase tracking-widest">{reel.creator.name}</span>
                            </div>
                        </div>
                      </>
                    )}

                    {/* Side Action Buttons (only visible on non-locked) */}
                    {!needsUnlock && (
                       <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="flex flex-col items-center gap-1 group/act">
                             <div className="h-8 w-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-red-500 transition-colors">
                                <Heart className="h-4 w-4 text-white" />
                             </div>
                             <span className="text-[8px] font-bold text-white">4.2K</span>
                          </button>
                          <button className="flex flex-col items-center gap-1 group/act">
                             <div className="h-8 w-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-blue-500 transition-colors">
                                <MessageCircle className="h-4 w-4 text-white" />
                             </div>
                             <span className="text-[8px] font-bold text-white">128</span>
                          </button>
                       </div>
                    )}
                 </div>
               );
             })}
          </div>
        </div>
      </div>

   
       
           
    </div>
  );
}

const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);
