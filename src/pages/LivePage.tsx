import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, ChevronRight, Flame, Radio, Signal, Filter, Search, Shield, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { StreamCard } from "@/components/cards/StreamCard";
import { MainLayout } from "@/components/layout/MainLayout";
import { NoLiveStreams } from "@/components/shared/EmptyState";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock data
const liveStreams = [
  {
    id: "1",
    title: "Gaming Marathon - Day 3!",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop",
    creator: { name: "GamerPro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gamer" },
    viewers: 8432,
    category: "Gaming",
  },
  {
    id: "2",
    title: "Cooking Italian Pasta from Scratch",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=450&fit=crop",
    creator: { name: "ChefMaria", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria" },
    viewers: 3201,
    category: "Cooking",
  },
  {
    id: "3",
    title: "Music Production Live Session",
    thumbnail: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&h=450&fit=crop",
    creator: { name: "BeatMaster", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=beat" },
    viewers: 5678,
    category: "Music",
  },
  {
    id: "4",
    title: "Fitness & Wellness Morning Routine",
    thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=450&fit=crop",
    creator: { name: "FitJess", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jess" },
    viewers: 2890,
    category: "Fitness",
  },
  {
    id: "5",
    title: "Art Creation - Digital Painting",
    thumbnail: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=450&fit=crop",
    creator: { name: "ArtByAlex", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex" },
    viewers: 1543,
    category: "Art",
  },
  {
    id: "6",
    title: "Late Night Talk Show",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=450&fit=crop",
    creator: { name: "TalkWithTom", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tom" },
    viewers: 4321,
    category: "Talk Show",
  },
  {
    id: "7",
    title: "Late Night Vibes 🌙 Chill Music & Chat",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=450&fit=crop",
    creator: { name: "Luna_Live", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna" },
    viewers: 12500,
    category: "Just Chatting",
  },
  {
    id: "8",
    title: "Coding Live - Building a SaaS",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop",
    creator: { name: "DevDan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dan" },
    viewers: 2100,
    category: "Tech",
  },
];

const categories = [
  "All",
  "Gaming",
  "Music",
  "Cooking",
  "Fitness",
  "Art",
  "Talk Show",
  "Tech",
  "Just Chatting",
];

export default function LivePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStreams = liveStreams.filter((s) => {
    const matchesCategory = selectedCategory === "All" || s.category === selectedCategory;
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.creator.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#050508] relative overflow-hidden pb-20">
        
        {/* Atmospheric Atmosphere */}
        <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-red-600/[0.04] to-transparent -z-10 pointer-events-none" />
        <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] -z-10 animate-pulse" />

        <div className="container py-8 lg:py-12 px-4 sm:px-6 space-y-12">
          
          {/* Enhanced Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-3">
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                      <Radio className="h-5 w-5 text-white animate-pulse" />
                  </div>
                  <h1 className="text-4xl font-black text-white uppercase tracking-tight italic leading-none">
                    Transmitting <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-fuchsia-500">Live</span>
                  </h1>
               </div>
               <p className="text-sm font-medium text-white/40 italic">Global uplink active. Interfacing with real-time content protocols.</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
               <div className="relative flex-1 lg:w-80 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-red-500 transition-colors" />
                  <Input
                    placeholder="Search frequency..."
                    className="h-12 pl-12 bg-white/5 border-white/10 focus:border-red-500/50 rounded-2xl text-white placeholder:text-white/20 font-bold text-xs uppercase tracking-widest"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>
               <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl border border-white/10 bg-white/5 text-white/60 hover:text-white">
                  <Filter className="h-5 w-5" />
               </Button>
               <div className="hidden sm:flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-600/10 border border-red-500/20">
                    <Signal className="h-4 w-4 text-red-500" />
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">{liveStreams.length} ACTIVE NODES</span>
               </div>
            </div>
          </div>

          {/* Category Filter - Premium Version */}
          <div className="space-y-4">
             <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 mask-fade-edges">
                {categories.map((cat, i) => (
                    <motion.button 
                        key={cat}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                            "h-10 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border shadow-lg",
                            selectedCategory === cat 
                                ? "bg-red-600 text-white border-red-500/30 shadow-red-500/20" 
                                : "bg-white/5 text-white/40 border-white/5 hover:border-white/10 hover:text-white"
                        )}
                    >
                        {cat}
                    </motion.button>
                ))}
             </div>
          </div>

          {/* Streams Grid with AnimatePresence */}
          <AnimatePresence mode="popLayout">
            {filteredStreams.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-20">
                {filteredStreams.map((stream, index) => (
                  <motion.div
                    key={stream.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <StreamCard {...stream} />
                  </motion.div>
                ))}
              </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-40 text-center space-y-8">
                    <motion.div 
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="h-32 w-32 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center"
                    >
                        <Signal className="h-10 w-10 text-white/10" />
                    </motion.div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">Signal Interrupted</h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">No active transmissions detected on this frequency.</p>
                    </div>
                    <Button 
                        onClick={() => setSelectedCategory("All")}
                        className="h-12 px-8 bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-white/10"
                    >
                        RESET FREQUENCY
                    </Button>
                </div>
            )}
          </AnimatePresence>

          <div className="text-center pt-20">
             <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/[0.02] border border-white/5 opacity-30">
                <Shield className="h-3.5 w-3.5 text-red-500" />
                <span className="text-[9px] font-black uppercase tracking-[0.5em]">Live Network Secure Protocol / Node v2.4</span>
             </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
