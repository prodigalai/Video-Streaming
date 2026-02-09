import { useState } from "react";
import { Link } from "react-router-dom";
import { Library, Play, Bookmark, Clock, Trash2, Box, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoCard } from "@/components/cards/VideoCard";
import { StreamCard } from "@/components/cards/StreamCard";
import { MainLayout } from "@/components/layout/MainLayout";
import { EmptyState } from "@/components/shared/EmptyState";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock data
const unlockedVideos = [
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
    id: "v3",
    title: "Complete Guitar Tutorial for Beginners",
    thumbnail: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&h=338&fit=crop",
    creator: { name: "MusicMike", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike" },
    duration: "45:10",
    views: 28000,
  },
];

const savedStreams = [
  {
    id: "saved-1",
    title: "Late Night Vibes - Replay",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=338&fit=crop",
    creator: { name: "Luna_Live", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna" },
    viewers: 12500,
    category: "Just Chatting",
    isLive: false,
  },
  {
    id: "saved-2",
    title: "Gaming Marathon - Day 2 Replay",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=338&fit=crop",
    creator: { name: "GamerPro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gamer" },
    viewers: 8432,
    category: "Gaming",
    isLive: false,
  },
];

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState("unlocked");

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#050508] relative overflow-hidden pb-20">
        
        {/* Ambient background decoration */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-600/[0.04] to-transparent -z-10 pointer-events-none" />
        
        <div className="container py-12 px-4 sm:px-6 space-y-12">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-3">
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                      <Library className="h-5 w-5 text-white" />
                  </div>
                  <h1 className="text-4xl font-black text-white uppercase tracking-tight">Signal Vault</h1>
               </div>
               <p className="text-sm font-medium text-white/40 italic">Centralized storage for your unlocked content and saved transmissions.</p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-12">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
               <TabsList className="bg-white/5 p-1 rounded-2xl h-12">
                  <TabsTrigger value="unlocked" className="rounded-xl px-8 data-[state=active]:bg-violet-600 data-[state=active]:text-white font-black text-[10px] uppercase tracking-widest">
                     <Play className="h-3.5 w-3.5 mr-2" />
                     UNLOCKED
                  </TabsTrigger>
                  <TabsTrigger value="saved" className="rounded-xl px-8 data-[state=active]:bg-violet-600 data-[state=active]:text-white font-black text-[10px] uppercase tracking-widest">
                     <Bookmark className="h-3.5 w-3.5 mr-2" />
                     BOOKMARKED
                  </TabsTrigger>
               </TabsList>
            </div>

            <AnimatePresence mode="wait">
               <TabsContent value="unlocked" className="mt-0 focus-visible:outline-none">
                  {unlockedVideos.length > 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                      {unlockedVideos.map((video) => (
                        <VideoCard key={video.id} {...video} />
                      ))}
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-center space-y-8">
                        <div className="h-24 w-24 rounded-[2rem] bg-white/[0.02] border border-dashed border-white/10 flex items-center justify-center">
                           <Box className="h-10 w-10 text-white/5" />
                        </div>
                        <div className="space-y-2">
                           <h3 className="text-2xl font-black text-white uppercase tracking-tight">Vault Empty</h3>
                           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">You haven't unlocked any secure content nodes yet.</p>
                        </div>
                        <Button className="h-12 px-8 bg-violet-600 hover:bg-violet-700 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-violet-500/20 border-none">
                           DISCOVER CONTENT
                        </Button>
                    </div>
                  )}
               </TabsContent>

               <TabsContent value="saved" className="mt-0 focus-visible:outline-none">
                  {savedStreams.length > 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                      {savedStreams.map((stream) => (
                        <div key={stream.id} className="relative group">
                          <StreamCard {...stream} />
                          <div className="absolute top-4 right-4 z-20">
                             <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/80 hover:border-red-500"
                             >
                                <Trash2 className="h-4 w-4" />
                             </Button>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-center space-y-8">
                        <div className="h-24 w-24 rounded-[2rem] bg-white/[0.02] border border-dashed border-white/10 flex items-center justify-center">
                           <Bookmark className="h-10 w-10 text-white/5" />
                        </div>
                        <div className="space-y-2">
                           <h3 className="text-2xl font-black text-white uppercase tracking-tight">Bookmarks Empty</h3>
                           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">No transmissions have been flagged for later viewing.</p>
                        </div>
                    </div>
                  )}
               </TabsContent>
            </AnimatePresence>
          </Tabs>

          <div className="text-center pt-20">
             <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/[0.02] border border-white/5 opacity-30">
                <Shield className="h-3.5 w-3.5 text-violet-400" />
                <span className="text-[9px] font-black uppercase tracking-[0.5em]">Vault Integrity: SECURE / 2026</span>
             </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
