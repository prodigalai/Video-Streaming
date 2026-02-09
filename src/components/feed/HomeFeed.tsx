import { Sparkles, Loader2, UserPlus, CheckCircle2 } from "lucide-react";
import { PostCard } from "@/components/feed/PostCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { CreatorPostInput } from "./CreatorPostInput";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type FeedTab = "all" | "subscribed" | "for-you";

const SUGGESTED_CREATORS = [
  { id: "s1", name: "AlexFitness", username: "alex_fitness", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex", followers: "12.5K" },
  { id: "s2", name: "DJ Nova", username: "dj_nova", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nova", followers: "8.2K" },
  { id: "s3", name: "ArtByMaya", username: "art_maya", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maya", followers: "24.1K" },
  { id: "s4", name: "TechReview", username: "tech_review", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tech", followers: "5.8K" },
];

const MOCK_POSTS = [
  {
    id: "p1",
    creator: {
      id: "luna",
      name: "Luna_Live",
      username: "luna_live",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
      isVerified: true
    },
    content: {
      text: "Just finished recording a new exclusive set! 📸 Can't wait for you all to see it. #BehindTheScenes #Photoshoot",
      media: [
        { type: "image", url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=1000&fit=crop", isLocked: false }
      ]
    },
    stats: { likes: 1240, comments: 85, tips: 120 },
    timestamp: "2h ago",
    isLiked: true
  },
  {
    id: "p2",
    creator: {
      id: "gamer",
      name: "GamerPro",
      username: "gamerpro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gamer",
      isVerified: true
    },
    content: {
      text: "That winning moment! 🏆 Check out the full replay in the VIP section. #Esports #Champion",
      media: [
        { type: "video", url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=1000&fit=crop", thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=1000&fit=crop", isLocked: true }
      ]
    },
    stats: { likes: 8500, comments: 420, tips: 15 },
    timestamp: "4h ago",
    isLiked: false
  },
  {
    id: "p3",
    creator: {
      id: "maria",
      name: "ChefMaria",
      username: "chef_maria",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
      isVerified: false
    },
    content: {
      text: "Homemade pasta from scratch. Recipe is free below! 🍝 #ItalianFood #Cooking",
      media: [
        { type: "image", url: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&h=1000&fit=crop", isLocked: false }
      ]
    },
    stats: { likes: 320, comments: 45, tips: 5 },
    timestamp: "6h ago",
    isLiked: false
  }
];

export function HomeFeed() {
  const [activeTab, setActiveTab] = useState<FeedTab>("all");
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const tabs: { id: FeedTab; label: string }[] = [
    { id: "all", label: "All" },
    { id: "subscribed", label: "Subscribed" },
    { id: "for-you", label: "For You" },
  ];

  useEffect(() => {
    loadMorePosts();
  }, []);

  const loadMorePosts = () => {
      if (isLoading) return;
      setIsLoading(true);

      setTimeout(() => {
          const newPosts = [...MOCK_POSTS, ...MOCK_POSTS].map((p, i) => ({
              ...p,
              id: `${p.id}-${Date.now()}-${i}`
          }));
          
          setPosts(prev => [...prev, ...newPosts]);
          setIsLoading(false);
          
          if (posts.length > 20) setHasMore(false); 
      }, 1000);
  };

  const handleTabChange = (tabId: FeedTab) => {
    if (tabId === activeTab) return;
    setActiveTab(tabId);
    setPosts([]);
    setHasMore(true);
    setIsLoading(true);
    setTimeout(() => {
        const newPosts = [...MOCK_POSTS].map((p, i) => ({
            ...p,
            id: `${p.id}-${tabId}-${Date.now()}-${i}`
        }));
        setPosts(newPosts);
        setIsLoading(false);
    }, 800);
  };

  const FeedSkeleton = () => (
    <div className="space-y-6">
      {[1, 2].map((i) => (
        <div key={i} className="bg-[#0f0f14] border border-white/5 sm:rounded-2xl overflow-hidden p-4 space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-[1180px] mx-auto min-h-screen lg:h-[calc(100vh-64px)] flex gap-8 px-4 bg-gradient-to-r from-transparent via-transparent to-violet-950/10 lg:overflow-hidden">
       {/* Main feed column - Independent Scroll */}
       <div className="flex-1 min-w-0 max-w-[720px] lg:h-full lg:overflow-y-auto no-scrollbar py-4 sm:py-8 scroll-smooth">
         {/* Feed Header + Tabs */}
         <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 px-2">
            <h1 className="text-2xl font-black text-white flex items-center gap-3 tracking-tight">
                <Sparkles className="h-6 w-6 text-violet-500 fill-violet-500/20" />
                Latest Updates
            </h1>
            <div className="flex gap-2 bg-white/5 p-1.5 rounded-full border border-white/5 self-start sm:self-auto">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "text-xs font-black rounded-full px-5 py-2 transition-all duration-300 uppercase tracking-wider",
                      activeTab === tab.id
                        ? "bg-violet-600 text-white shadow-lg shadow-violet-500/40 scale-105"
                        : "text-muted-foreground hover:text-white hover:bg-white/10"
                    )}
                    onClick={() => handleTabChange(tab.id)}
                  >
                    {tab.label}
                  </Button>
                ))}
            </div>
         </div>

         <CreatorPostInput />

         {/* Posts */}
         <div className="flex flex-col gap-2 relative min-h-[400px]">
            {isLoading && posts.length === 0 ? (
                <FeedSkeleton />
            ) : (
                <AnimatePresence mode="popLayout">
                    {posts.map((post, index) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index % 5 * 0.1 }}
                        >
                            <PostCard post={post} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            )}
         </div>

         {/* Pagination Experience */}
         {isLoading ? (
             <div className="py-20 flex flex-col items-center justify-center gap-4 text-center">
                 <Loader2 className="h-10 w-10 text-violet-500 animate-spin" />
                 <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest animate-pulse">Curating your feed...</p>
             </div>
         ) : hasMore && posts.length > 0 ? (
             <div className="py-16 flex justify-center px-4 text-center">
                 <div className="w-full max-w-sm space-y-4">
                     <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em]">More content available</p>
                     <Button 
                       variant="outline" 
                       className="w-full rounded-full border-white/10 hover:bg-white/5 text-xs font-black uppercase tracking-widest h-14 transition-all shadow-2xl hover:border-violet-500/50 hover:text-violet-400 group"
                       onClick={loadMorePosts}
                     >
                        Load More Updates
                        <Sparkles className="h-3.5 w-3.5 ml-2 transition-transform group-hover:rotate-12" />
                     </Button>
                 </div>
             </div>
         ) : posts.length > 0 ? (
             <div className="py-20 text-center">
                 <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-6" />
                 <p className="text-muted-foreground text-xs font-black uppercase tracking-[0.4em] opacity-40">End of updates</p>
             </div>
         ) : null}
       </div>

       {/* Right: Suggestions - Increased Width & Static */}
       <aside className="hidden xl:block w-[360px] shrink-0 py-4 sm:py-8">
         <div className="space-y-4 h-full">
           {/* Primary Suggestion Card */}
           <div className="rounded-2xl bg-[#0f0f14] border border-white/10 p-6 shadow-2xl">
             <div className="flex items-center justify-between mb-6">
               <div>
                 <h2 className="text-sm font-black text-white uppercase tracking-wider">Suggestions</h2>
                 <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest mt-0.5">Creators you might like</p>
               </div>
               <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase text-violet-400 p-0 h-auto hover:bg-transparent hover:text-white transition-colors">
                 See All
               </Button>
             </div>

             <ul className="space-y-4">
               {SUGGESTED_CREATORS.map((creator) => (
                 <li key={creator.id} className="flex items-center gap-4 group cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors">
                   <div className="relative shrink-0">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="h-12 w-12 rounded-full object-cover bg-white/10 border-2 border-transparent group-hover:border-violet-500 transition-all shadow-lg"
                      />
                      <div className="absolute -right-0.5 -bottom-0.5 h-4 w-4 rounded-full bg-green-500 border-2 border-[#0f0f14] shadow-sm" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-sm font-black text-white truncate group-hover:text-violet-400 transition-colors tracking-tight">{creator.name}</p>
                     <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-60">{creator.followers} Fans</p>
                   </div>
                   <Button size="sm" className="shrink-0 h-8 text-[10px] font-black uppercase rounded-full bg-violet-600 hover:bg-violet-700 text-white px-5 transition-all active:scale-95 shadow-lg shadow-violet-500/20 border-none">
                     Sub
                   </Button>
                 </li>
               ))}
             </ul>

             <div className="mt-8 pt-6 border-t border-white/5">
                <div className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 p-4 rounded-2xl border border-violet-500/20 text-center">
                    <p className="text-[10px] font-black text-violet-300 uppercase tracking-widest mb-2">Creator Program</p>
                    <p className="text-xs text-white/80 font-medium leading-relaxed mb-4">Start earning by sharing your own exclusive content.</p>
                    <Button className="w-full bg-white text-black hover:bg-gray-100 font-black text-[10px] uppercase rounded-full h-9 tracking-widest">
                      Apply Now
                    </Button>
                </div>
             </div>
           </div>
         </div>
       </aside>
    </div>
  );
}
