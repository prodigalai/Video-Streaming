import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { VideoCard } from "@/components/cards/VideoCard";
import { StreamCard } from "@/components/cards/StreamCard";
import { Clock, Trash2, Search, Filter, Sparkles, Activity, Shield, Badge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock history data
const initialHistory = [
  {
    id: "h1",
    title: "Cooking Italian Pasta from Scratch - Replay",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=338&fit=crop",
    creator: { name: "ChefMaria", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria" },
    viewers: 3201,
    category: "Cooking",
    isLive: false,
    watchedAt: "2 hours ago",
    progress: 75,
  },
  {
    id: "h2",
    title: "Music Production Live Session - Replay",
    thumbnail: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=600&h=338&fit=crop",
    creator: { name: "BeatMaster", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=beat" },
    viewers: 5678,
    category: "Music",
    isLive: false,
    watchedAt: "Yesterday",
    progress: 100,
  },
  {
    id: "v4",
    title: "My Daily Skincare Routine - All Products",
    thumbnail: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=338&fit=crop",
    creator: { name: "BeautyBella", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bella" },
    duration: "12:45",
    views: 67000,
    watchedAt: "3 days ago",
    progress: 50,
  },
];

export default function HistoryPage() {
  const [history, setHistory] = useState(initialHistory);
  const [searchQuery, setSearchQuery] = useState("");

  const clearHistory = () => {
    setHistory([]);
  };

  const filteredHistory = history.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.creator.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#050508] relative overflow-hidden pb-20">
        
        {/* Background Atmosphere */}
        <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-blue-600/[0.04] to-transparent -z-10 pointer-events-none" />
        
        <div className="container py-12 px-4 sm:px-6 space-y-12">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-3">
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                      <Clock className="h-5 w-5 text-white" />
                  </div>
                  <h1 className="text-4xl font-black text-white uppercase tracking-tight">Transmission Logs</h1>
               </div>
               <p className="text-sm font-medium text-white/40 italic">Historical records of your node interactions and content consumption.</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
               <div className="relative flex-1 lg:w-72 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-violet-500 transition-colors" />
                  <Input
                    placeholder="Search logs..."
                    className="h-12 pl-12 bg-white/5 border-white/10 focus:border-violet-500/50 rounded-2xl text-white placeholder:text-white/20 font-bold text-xs uppercase tracking-widest"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl border border-white/10 bg-white/5 text-white/60 hover:text-white">
                        <Filter className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-[#0f0f14] border-white/10 p-2 rounded-2xl shadow-2xl">
                    <DropdownMenuItem className="text-white hover:bg-white/5 rounded-xl px-4 py-3 font-bold text-xs uppercase tracking-widest cursor-pointer">ALL RECORDS</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-white/5 rounded-xl px-4 py-3 font-bold text-xs uppercase tracking-widest cursor-pointer">VIDEOS ONLY</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-white/5 rounded-xl px-4 py-3 font-bold text-xs uppercase tracking-widest cursor-pointer">STREAMS ONLY</DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
               <Button 
                   variant="ghost" 
                   onClick={clearHistory}
                   className="h-12 px-6 border border-red-500/10 bg-red-500/5 text-red-400 hover:text-red-300 hover:bg-red-500/10 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all"
               >
                  <Trash2 className="h-4 w-4 mr-2" />
                  WIPE LOGS
               </Button>
            </div>
          </div>

          <div className="space-y-8">
             <div className="flex items-center gap-4">
                <Activity className="h-4 w-4 text-violet-500" />
                <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">Recent Activity</h2>
                <div className="h-px flex-1 mx-8 bg-gradient-to-r from-white/10 to-transparent" />
             </div>

             <AnimatePresence mode="popLayout">
                {filteredHistory.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredHistory.map((item, index) => (
                      <motion.div 
                        key={item.id} 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="space-y-4 group relative"
                      >
                        <div className="relative rounded-[2rem] overflow-hidden">
                           {item.duration ? (
                              <VideoCard id={item.id} title={item.title} thumbnail={item.thumbnail} creator={item.creator} duration={item.duration} views={item.views || 0} />
                           ) : (
                              <StreamCard id={item.id} title={item.title} thumbnail={item.thumbnail} creator={item.creator} viewers={item.viewers || 0} category={item.category || ""} isLive={false} />
                           )}
                           
                           {/* Progress Overlay - More Modern */}
                           {item.progress && item.progress < 100 && (
                              <div className="absolute bottom-4 left-4 right-4 h-1.5 bg-black/40 backdrop-blur-md rounded-full overflow-hidden border border-white/5">
                                 <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.progress}%` }}
                                    className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]" 
                                 />
                              </div>
                           )}
                        </div>

                        <div className="flex items-center justify-between px-2">
                           <div className="flex items-center gap-2">
                              <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">{item.watchedAt}</span>
                              {item.progress === 100 && <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-black text-[7px] uppercase tracking-widest px-1.5 py-0">SYNCED</Badge>}
                           </div>
                           <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity text-white/20 hover:text-red-400 hover:bg-red-400/10">
                              <Trash2 className="h-3.5 w-3.5" />
                           </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-32 text-center space-y-8">
                    <div className="h-24 w-24 rounded-[2rem] bg-white/[0.02] border border-dashed border-white/10 flex items-center justify-center">
                       <Clock className="h-10 w-10 text-white/5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight">Archive Empty</h3>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">No transmission records detected in your history bank.</p>
                    </div>
                    <Button className="h-12 px-8 bg-violet-600 hover:bg-violet-700 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-violet-500/20 border-none">
                       BACK TO TERMINAL
                    </Button>
                  </div>
                )}
             </AnimatePresence>
          </div>

          <div className="text-center pt-20">
             <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/[0.02] border border-white/5 opacity-30">
                <Shield className="h-3.5 w-3.5 text-violet-400" />
                <span className="text-[9px] font-black uppercase tracking-[0.5em]">System History Integrity Confirmed / 2026</span>
             </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
