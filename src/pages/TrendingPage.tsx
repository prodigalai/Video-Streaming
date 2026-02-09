import { useState } from "react";
import { Link } from "react-router-dom";
import { Flame, Play, Clock, TrendingUp, Trophy, Star, ChevronRight, Zap, Signal, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StreamCard } from "@/components/cards/StreamCard";
import { VideoCard } from "@/components/cards/VideoCard";
import { MainLayout } from "@/components/layout/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingSlider } from "@/components/hero/TrendingSlider";

// Mock data for Trending
const trendingStreams = [
  {
    id: "7",
    title: "Late Night Vibes 🌙 Chill Music & Chat",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=450&fit=crop",
    creator: { id: "luna", name: "Luna_Live", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna" },
    viewers: 12500,
    category: "Just Chatting",
  },
  {
    id: "1",
    title: "Gaming Marathon - Day 3!",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop",
    creator: { id: "gamer", name: "GamerPro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gamer" },
    viewers: 8432,
    category: "Gaming",
  }
];

const trendingVideos = [
  {
    id: "v1",
    title: "How I Made $10K This Month - Full Breakdown",
    thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=450&fit=crop",
    creator: { id: "business", name: "BusinessPro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=business" },
    duration: "24:35",
    views: 125000,
    uploadedAt: "2 days ago",
  },
  {
    id: "v3",
    title: "Complete Business Strategy Guide",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    creator: { id: "business", name: "BusinessPro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=business" },
    duration: "45:10",
    views: 89000,
    uploadedAt: "4 days ago",
  },
  {
    id: "v4",
    title: "Marketing Secrets Revealed",
    thumbnail: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&h=450&fit=crop",
    creator: { id: "business", name: "BusinessPro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=business" },
    duration: "32:18",
    views: 67000,
    uploadedAt: "1 week ago",
  }
];

const topCreators = [
  { id: "luna", name: "Luna_Live", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna", growth: "+15%" },
  { id: "gamer", name: "GamerPro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gamer", growth: "+12%" },
  { id: "business", name: "BusinessPro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=business", growth: "+10%" },
  { id: "maria", name: "ChefMaria", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria", growth: "+8%" },
];

export default function TrendingPage() {
  const [activeTab, setActiveTab] = useState<"all" | "live" | "videos">("all");

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#050508] relative overflow-hidden pb-20">
        
        {/* Cinematic Backdrop */}
        <div className="absolute top-0 right-0 w-full h-[1000px] bg-gradient-to-b from-orange-600/[0.03] to-transparent -z-10 pointer-events-none" />
        <div className="absolute top-[15%] left-[-10%] w-[600px] h-[600px] bg-violet-600/[0.04] rounded-full blur-[140px] -z-10 animate-pulse" />

        <div className="container py-8 lg:py-12 px-6 sm:px-8 space-y-12">
          
          {/* Enhanced Trending Hero Component */}
          <div className="rounded-[3rem] overflow-hidden shadow-3xl border border-white/5 relative bg-[#0a0a0f]">
             <TrendingSlider />
          </div>

          <div className="grid lg:grid-cols-4 gap-12 lg:gap-16">
             
             {/* Main Feed Architecture */}
             <div className="lg:col-span-3 space-y-16">
                
                {/* Protocol Tabs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 pb-8 border-b border-white/5">
                   <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/5 w-fit">
                      {[
                         { id: "all", label: "Everything", icon: TrendingUp },
                         { id: "live", label: "Live Heat", icon: Play },
                         { id: "videos", label: "Top Nodes", icon: Clock }
                      ].map((tab) => (
                         <button
                           key={tab.id}
                           onClick={() => setActiveTab(tab.id as any)}
                           className={cn(
                             "flex items-center gap-3 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all whitespace-nowrap shrink-0",
                             activeTab === tab.id 
                               ? "bg-violet-600 text-white shadow-xl shadow-violet-500/20" 
                               : "text-white/20 hover:text-white"
                           )}
                         >
                           <tab.icon className="h-4 w-4" />
                           {tab.label}
                         </button>
                      ))}
                   </div>

                   <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5 opacity-50">
                        <Signal className="h-3.5 w-3.5 text-violet-400" />
                        <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">Monitoring Global Activity</span>
                   </div>
                </div>

                <AnimatePresence mode="wait">
                    {/* Live Section Integration */}
                    {(activeTab === "all" || activeTab === "live") && (
                    <motion.div 
                        key="live-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center">
                                    <Flame className="h-5 w-5 text-red-500" />
                                </div>
                                <h2 className="text-xl font-black uppercase tracking-[0.2em] italic text-white leading-none">Transmission <span className="text-red-500">Peak</span></h2>
                            </div>
                            <Link to="/live">
                                <Button variant="ghost" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white group">
                                    Full Grid <ChevronRight className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-10">
                            {trendingStreams.map(stream => (
                                <StreamCard key={stream.id} {...stream} />
                            ))}
                        </div>
                    </motion.div>
                    )}

                    {/* Videos Section Architecture */}
                    {(activeTab === "all" || activeTab === "videos") && (
                    <motion.div 
                        key="videos-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8 pt-6"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center">
                                    <Trophy className="h-5 w-5 text-violet-500" />
                                </div>
                                <h2 className="text-xl font-black uppercase tracking-[0.2em] italic text-white leading-none">Legendary <span className="text-violet-500">Nodes</span></h2>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-10">
                            {trendingVideos.map(video => (
                                <VideoCard key={video.id} {...video} />
                            ))}
                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>
             </div>

             {/* Sidebar Consolidation */}
             <div className="space-y-12">
                <div className="p-10 rounded-[3rem] bg-[#0a0a0f] border border-white/5 space-y-10 shadow-3xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 rounded-full blur-[60px] -mr-16 -mt-16 group-hover:bg-violet-600/10 transition-all" />
                   
                   <div className="space-y-2">
                       <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-violet-500 flex items-center gap-3">
                          <Sparkles className="h-4 w-4" />
                          Rising Nodes
                       </h3>
                       <p className="text-xs font-medium text-white/30 italic">Highest engagement velocity in the last cycle.</p>
                   </div>

                   <div className="space-y-8">
                      {topCreators.map((creator, i) => (
                         <Link to={`/creator/${creator.id}`} key={i} className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-4">
                               <div className="relative">
                                  <div className="absolute inset-0 bg-violet-600/20 blur-lg rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                  <Avatar className="h-12 w-12 rounded-2xl border-2 border-[#0a0a0f] ring-1 ring-white/10 group-hover:ring-violet-500 group-hover:scale-105 transition-all">
                                     <AvatarImage src={creator.avatar} />
                                     <AvatarFallback>{creator.name[0]}</AvatarFallback>
                                  </Avatar>
                               </div>
                               <div>
                                  <p className="text-sm font-black text-white uppercase tracking-tight group-hover:text-violet-500 transition-colors leading-none mb-1">{creator.name}</p>
                                  <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Rank #{i + 1}</p>
                               </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-black text-emerald-500">{creator.growth}</span>
                                <span className="text-[8px] font-bold text-white/10 uppercase tracking-widest">Growth</span>
                            </div>
                         </Link>
                      ))}
                   </div>
                   <Button variant="ghost" className="w-full h-14 bg-white/[0.02] border border-white/5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white hover:bg-white/5 transition-all">
                      SCAN ALL CREATORS
                   </Button>
                </div>

                {/* Challenge Transmission Card */}
                <div className="p-10 rounded-[3rem] bg-gradient-to-br from-violet-600/20 via-[#0a0a0f] to-[#0a0a0f] border border-violet-500/20 space-y-6 shadow-3xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/30 rounded-full blur-[50px] -mr-12 -mt-12" />
                   <div className="bg-violet-600/10 border border-violet-500/20 px-3 py-1 rounded-full w-fit">
                        <span className="text-[8px] font-black text-violet-400 uppercase tracking-[0.4em]">Active Terminal Challenge</span>
                   </div>
                   <div className="space-y-3">
                       <h4 className="font-black text-xl uppercase italic tracking-tighter text-white">#COSMOVIBA-SYNCH</h4>
                       <p className="text-xs font-medium text-white/50 leading-relaxed italic">
                          Synchronize your transmission with the current epoch vibes to earn legendary credits.
                       </p>
                   </div>
                   <Button className="w-full h-14 bg-violet-600 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-violet-700 rounded-2xl shadow-xl shadow-violet-500/20 transition-all border-none group">
                      INITIALIZE LINK <Zap className="h-3 w-3 ml-2 group-hover:fill-current" />
                   </Button>
                </div>
                
                <div className="text-center pt-8">
                     <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/[0.02] border border-white/5">
                        <ShieldCheck className="h-3 w-3 text-emerald-500" />
                        <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em]">Network Data Verified</span>
                     </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
