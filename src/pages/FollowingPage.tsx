import { useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { CreatorCard } from "@/components/cards/CreatorCard";
import { StreamCard } from "@/components/cards/StreamCard";
import { VideoCard } from "@/components/cards/VideoCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Radio, Film, Search, Sparkles, Filter, Signal, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock data for followed creators
const followedCreators = [
  {
    id: "luna",
    name: "Luna Live",
    username: "luna_live",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
    followers: 125000,
    isLive: true,
    category: "Music",
  },
  {
    id: "gamer",
    name: "GamerPro",
    username: "gamerpro",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gamer",
    followers: 89000,
    isLive: true,
    category: "Gaming",
  },
  {
    id: "maria",
    name: "Chef Maria",
    username: "chefmaria",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
    followers: 56000,
    isLive: false,
  },
  {
    id: "mike",
    name: "Music Mike",
    username: "musicmike",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    followers: 45000,
    isLive: false,
  },
];

const followingLive = followedCreators.filter(c => c.isLive);

const recentUploads = [
  {
    id: "v1",
    title: "How I Made $10K This Month - Full Breakdown",
    thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=338&fit=crop",
    creator: { name: "BusinessPro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=business" },
    duration: "24:35",
    views: 45000,
    price: 50,
  },
  {
    id: "v4",
    title: "My Daily Skincare Routine - All Products",
    thumbnail: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=338&fit=crop",
    creator: { name: "BeautyBella", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bella" },
    duration: "12:45",
    views: 67000,
  },
];

export default function FollowingPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCreators = followedCreators.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#050508] relative overflow-hidden pb-20">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-violet-600/[0.04] to-transparent -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-fuchsia-600/[0.04] to-transparent -z-10 pointer-events-none" />

        <div className="container py-8 sm:py-12 px-4 sm:px-6 space-y-12">
          
          {/* Enhanced Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-3">
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                      <Users className="h-5 w-5 text-white" />
                  </div>
                  <h1 className="text-4xl font-black text-white uppercase tracking-tight">Active Roster</h1>
               </div>
               <p className="text-sm font-medium text-white/40 italic">Monitoring established connections and live node transmissions.</p>
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
               <div className="relative flex-1 lg:w-80 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-violet-500 transition-colors" />
                  <Input
                    placeholder="Search connection ID..."
                    className="h-12 pl-12 bg-white/5 border-white/10 focus:border-violet-500/50 rounded-2xl text-white placeholder:text-white/20 font-bold text-xs uppercase tracking-widest"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>
               <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl border border-white/10 bg-white/5 text-white/60 hover:text-white">
                  <Filter className="h-5 w-5" />
               </Button>
            </div>
          </div>

          {/* Live Now Carousel/Grid - Ultra Premium */}
          {followingLive.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                  <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white">Live Terminals</h2>
                </div>
                <div className="h-px flex-1 mx-8 bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {followingLive.map(creator => (
                  <motion.div 
                    key={creator.id} 
                    whileHover={{ y: -5 }}
                    className="relative group p-6 rounded-[2rem] bg-violet-600/[0.03] border border-violet-500/10 hover:border-violet-500/30 transition-all duration-500 shadow-2xl overflow-hidden"
                  >
                     {/* Decorative background signal icon */}
                     <Signal className="absolute -top-4 -right-4 h-24 w-24 text-violet-500/5 group-hover:text-violet-500/10 transition-colors" />
                     
                     <div className="flex items-center gap-5 relative z-10">
                        <div className="relative shrink-0">
                           <div className="p-1 rounded-2xl bg-gradient-to-br from-red-600 to-fuchsia-600">
                              <img src={creator.avatar} alt={creator.name} className="h-14 w-14 rounded-[0.8rem] object-cover border-2 border-[#050508]" />
                           </div>
                           <div className="absolute -bottom-1 -right-1 bg-red-600 text-[8px] font-black px-1.5 py-0.5 rounded-md text-white border-2 border-[#050508] shadow-lg">LIVE</div>
                        </div>
                        <div className="min-w-0 flex-1">
                           <p className="font-black text-white uppercase tracking-tight truncate group-hover:text-violet-400 transition-colors">{creator.name}</p>
                           <p className="text-[9px] text-white/30 uppercase font-black tracking-[0.2em] mt-1">{creator.category || 'Streaming'}</p>
                        </div>
                     </div>
                     <Link to={`/watch/live/${creator.id}`} className="absolute inset-0 z-20" />
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
               <TabsList className="bg-white/5 p-1 rounded-2xl h-12">
                  <TabsTrigger value="all" className="rounded-xl px-8 data-[state=active]:bg-violet-600 data-[state=active]:text-white font-black text-[10px] uppercase tracking-widest">
                     ALL FEED
                  </TabsTrigger>
                  <TabsTrigger value="live" className="rounded-xl px-8 data-[state=active]:bg-violet-600 data-[state=active]:text-white font-black text-[10px] uppercase tracking-widest">
                     LIVE ONLY
                  </TabsTrigger>
                  <TabsTrigger value="videos" className="rounded-xl px-8 data-[state=active]:bg-violet-600 data-[state=active]:text-white font-black text-[10px] uppercase tracking-widest">
                     ARCHIVES
                  </TabsTrigger>
               </TabsList>
            </div>

            <AnimatePresence mode="wait">
               <TabsContent value="all" className="mt-0 space-y-16 focus-visible:outline-none">
                  <motion.section 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="space-y-8"
                  >
                     <div className="flex items-center gap-3">
                        <Users className="h-4 w-4 text-violet-400" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Verified Connections</h3>
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredCreators.map(creator => (
                           <CreatorCard key={creator.id} {...creator} />
                        ))}
                     </div>
                  </motion.section>

                  <motion.section 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.1 }}
                     className="space-y-8"
                  >
                     <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-fuchsia-400" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Recent Transmissions</h3>
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recentUploads.map(video => (
                           <VideoCard key={video.id} {...video} />
                        ))}
                     </div>
                  </motion.section>
               </TabsContent>

               <TabsContent value="live" className="mt-0 focus-visible:outline-none">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                     {followedCreators.filter(c => c.isLive).map(creator => (
                        <CreatorCard key={creator.id} {...creator} />
                     ))}
                  </div>
               </TabsContent>

               <TabsContent value="videos" className="mt-0 focus-visible:outline-none">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                     {recentUploads.map(video => (
                        <VideoCard key={video.id} {...video} />
                     ))}
                  </div>
               </TabsContent>
            </AnimatePresence>
          </Tabs>

          <div className="text-center pt-12">
             <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-white/[0.02] border border-white/5 opacity-30">
                <Sparkles className="h-3 w-3 text-violet-400" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em]">Synced with Central Node v1.2</span>
             </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
