import { useState } from "react";
import { Link } from "react-router-dom";
import { Flame, Play, Clock, TrendingUp, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StreamCard } from "@/components/cards/StreamCard";
import { VideoCard } from "@/components/cards/VideoCard";
import { MainLayout } from "@/components/layout/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// Mock data for Trending
const trendingStreams = [
  {
    id: "7",
    title: "Late Night Vibes 🌙 Chill Music & Chat",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=338&fit=crop",
    creator: { id: "luna", name: "Luna_Live", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna" },
    viewers: 12500,
    category: "Just Chatting",
  },
  {
    id: "1",
    title: "Gaming Marathon - Day 3!",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=338&fit=crop",
    creator: { id: "gamer", name: "GamerPro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gamer" },
    viewers: 8432,
    category: "Gaming",
  }
];

const trendingVideos = [
  {
    id: "v1",
    title: "How I Made $10K This Month - Full Breakdown",
    thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=338&fit=crop",
    creator: { id: "business", name: "BusinessPro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=business" },
    duration: "24:35",
    views: 125000,
    uploadedAt: "2 days ago",
  },
  {
    id: "v3",
    title: "Complete Business Strategy Guide",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=338&fit=crop",
    creator: { id: "business", name: "BusinessPro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=business" },
    duration: "45:10",
    views: 89000,
    uploadedAt: "4 days ago",
  },
  {
    id: "v4",
    title: "Marketing Secrets Revealed",
    thumbnail: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&h=338&fit=crop",
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

import { TrendingSlider } from "@/components/hero/TrendingSlider";

export default function TrendingPage() {
  const [activeTab, setActiveTab] = useState<"all" | "live" | "videos">("all");

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#05020d] text-white pb-safe">
        <div className="container py-4 lg:py-8 px-4 sm:px-6 space-y-6 lg:space-y-12">
          
          {/* NEW: Cinematic Hero Slider */}
          <TrendingSlider />

          <div className="grid lg:grid-cols-4 gap-6 lg:gap-12">
             
             {/* Main Feed */}
             <div className="lg:col-span-3 space-y-12">
                
                {/* Tabs */}
                <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 pb-6 border-b border-white/5">
                   {[
                      { id: "all", label: "Everything", icon: TrendingUp },
                      { id: "live", label: "Live Now", icon: Play },
                      { id: "videos", label: "Top Videos", icon: Clock }
                   ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                          "flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap shrink-0",
                          activeTab === tab.id 
                            ? "bg-primary text-black shadow-glow-primary" 
                            : "text-muted-foreground hover:text-white hover:bg-white/5 bg-white/5"
                        )}
                      >
                        <tab.icon className="h-3.5 w-3.5" />
                        {tab.label}
                      </button>
                   ))}
                </div>

                {/* Live Section */}
                {(activeTab === "all" || activeTab === "live") && (
                   <div className="space-y-6">
                      <div className="flex items-center justify-between">
                         <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-live animate-pulse" />
                            Live Heat
                         </h2>
                         <Link to="/live" className="text-xs font-bold text-primary hover:underline">VIEW ALL LIVE</Link>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6">
                         {trendingStreams.map(stream => (
                            <StreamCard key={stream.id} {...stream} />
                         ))}
                      </div>
                   </div>
                )}

                {/* Videos Section */}
                {(activeTab === "all" || activeTab === "videos") && (
                   <div className="space-y-6">
                      <div className="flex items-center justify-between pt-6">
                         <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                            <Trophy className="h-5 w-5 text-yellow-500" />
                            Viral Records
                         </h2>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6">
                         {trendingVideos.map(video => (
                            <VideoCard key={video.id} {...video} />
                         ))}
                      </div>
                   </div>
                )}
             </div>

             {/* Sidebar: Rising Stars */}
             <div className="space-y-8">
                <div className="p-8 rounded-[2rem] glass-card border-white/5 bg-white/[0.02] space-y-6">
                   <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                      <Star className="h-4 w-4 fill-current" />
                      Rising Stars
                   </h3>
                   <div className="space-y-6">
                      {topCreators.map((creator, i) => (
                         <Link to={`/creator/${creator.id}`} key={i} className="flex items-center justify-between group cursor-pointer transition-transform hover:translate-x-1">
                            <div className="flex items-center gap-3">
                               <div className="relative">
                                  <Avatar className="h-10 w-10 border border-white/10 group-hover:border-primary/50 transition-colors">
                                     <AvatarImage src={creator.avatar} />
                                     <AvatarFallback>{creator.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <div className="absolute -top-1 -left-1 h-5 w-5 rounded-full bg-primary text-black font-black text-[10px] flex items-center justify-center">
                                     {i + 1}
                                  </div>
                               </div>
                               <div>
                                  <p className="text-sm font-black group-hover:text-primary transition-colors">{creator.name}</p>
                                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Creator</p>
                               </div>
                            </div>
                            <Badge className="bg-green-500/10 text-green-500 border-green-500/20 font-black text-[10px]">
                               {creator.growth}
                            </Badge>
                         </Link>
                      ))}
                   </div>
                   <Button variant="outline" className="w-full h-11 border-white/10 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/5 hover:border-white/20">
                      DISCOVER MORE
                   </Button>
                </div>

                <div className="p-8 rounded-[2rem] bg-gradient-to-br from-yellow-500/20 to-transparent border border-yellow-500/10 space-y-4">
                   <h4 className="font-black text-xs uppercase tracking-widest text-yellow-500">Weekly Challenge</h4>
                   <p className="text-sm font-medium text-white/70 leading-relaxed">
                      Participate in the #CosmosVibe challenge and get a chance to be featured on the Trending Explosion!
                   </p>
                   <Button className="w-full h-10 bg-yellow-500 text-black font-black text-[10px] uppercase tracking-widest hover:bg-yellow-400">
                      JOIN CHALLENGE
                   </Button>
                </div>
             </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
