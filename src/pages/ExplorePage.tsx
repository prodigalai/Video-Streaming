import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { StreamCard } from "@/components/cards/StreamCard";
import { VideoCard } from "@/components/cards/VideoCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Compass, TrendingUp, Sparkles, Trophy, Music, Ghost, Gamepad2, Mic2, Search, Filter, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Gaming", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop", count: 234, tags: ["FPS", "Shooter"] },
  { name: "Music", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop", count: 156, tags: ["Live", "DJ"] },
  { name: "Fitness", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop", count: 89, tags: ["Health", "Yoga"] },
  { name: "Cooking", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop", count: 67, tags: ["Food", "ASMR"] },
  { name: "Art", image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop", count: 123, tags: ["Creative", "Design"] },
  { name: "Talk Shows", image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop", count: 45, tags: ["Podcast", "News"] },
  { name: "Sports", image: "https://images.unsplash.com/photo-1461896642383-02947113e64b?w=400&h=300&fit=crop", count: 32, tags: ["Live", "Football"] },
  { name: "Crypto", image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=300&fit=crop", count: 78, tags: ["Web3", "Bitcoin"] },
];

const tags = ["English", "Competitive", "Casual", "No Commentary", "High MMR", "Newbie Friendly", "Speedrun"];

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState("categories");

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#050508] relative overflow-hidden pb-20">
        
        {/* Cinematic Backdrop */}
        <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-600/[0.04] to-transparent -z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-full h-[800px] bg-gradient-to-b from-violet-600/[0.04] to-transparent -z-10 pointer-events-none" />

        <div className="container py-12 px-4 sm:px-6 space-y-16">
          
          {/* Enhanced Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-3">
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                      <Compass className="h-5 w-5 text-white" />
                  </div>
                  <h1 className="text-4xl font-black text-white uppercase tracking-tight">Discovery Node</h1>
               </div>
               <p className="text-sm font-medium text-white/40 italic">Mapping the network for optimal content signals and community clusters.</p>
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
               <div className="relative flex-1 lg:w-80 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-violet-500 transition-colors" />
                  <Input
                    placeholder="Search protocols..."
                    className="h-12 pl-12 bg-white/5 border-white/10 focus:border-violet-500/50 rounded-2xl text-white placeholder:text-white/20 font-bold text-xs uppercase tracking-widest"
                  />
               </div>
               <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl border border-white/10 bg-white/5 text-white/60 hover:text-white">
                  <Filter className="h-5 w-5" />
               </Button>
            </div>
          </div>

          {/* Quick Tags Scroll - Premium Version */}
          <div className="space-y-4">
             <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 mask-fade-edges">
                {tags.map((tag, i) => (
                    <motion.button 
                        key={tag}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="h-10 px-6 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black text-white/40 uppercase tracking-widest hover:border-violet-500/30 hover:text-white hover:bg-violet-600/10 transition-all whitespace-nowrap"
                    >
                        {tag}
                    </motion.button>
                ))}
             </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-12">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
               <TabsList className="bg-white/5 p-1 rounded-2xl h-12">
                  <TabsTrigger value="categories" className="rounded-xl px-10 data-[state=active]:bg-violet-600 data-[state=active]:text-white font-black text-[10px] uppercase tracking-widest">
                     SPECTRUM
                  </TabsTrigger>
                  <TabsTrigger value="trending" className="rounded-xl px-10 data-[state=active]:bg-violet-600 data-[state=active]:text-white font-black text-[10px] uppercase tracking-widest">
                     HOT SIGNALS
                  </TabsTrigger>
               </TabsList>
            </div>

            <AnimatePresence mode="wait">
               <TabsContent value="categories" className="mt-0 focus-visible:outline-none">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
                  >
                    {categories.map((cat) => (
                      <CategoryCard key={cat.name} name={cat.name} image={cat.image} count={cat.count} tags={cat.tags} />
                    ))}
                  </motion.div>
               </TabsContent>

               <TabsContent value="trending" className="mt-0 space-y-20 focus-visible:outline-none">
                  <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-4 w-4 text-violet-500" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Live Amplitude</h3>
                      </div>
                      <Button variant="ghost" className="text-[10px] font-black text-violet-400 hover:text-white uppercase tracking-widest group">
                        MAP ALL
                        <Zap className="h-3 w-3 ml-2 group-hover:fill-current" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                       {[1, 2, 3, 4].map(i => (
                         <div key={i} className="aspect-video bg-white/[0.02] border border-white/5 rounded-3xl animate-pulse relative overflow-hidden">
                             <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 via-transparent to-transparent" />
                         </div>
                       ))}
                    </div>
                  </motion.section>

                  <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Sparkles className="h-4 w-4 text-fuchsia-500" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Elite Highlights</h3>
                      </div>
                      <Button variant="ghost" className="text-[10px] font-black text-fuchsia-400 hover:text-white uppercase tracking-widest group">
                        DECRYPT ALL
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                       {[1, 2, 3].map(i => (
                         <div key={i} className="aspect-video bg-white/[0.02] border border-white/5 rounded-3xl animate-pulse relative overflow-hidden">
                             <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600/10 via-transparent to-transparent" />
                         </div>
                       ))}
                    </div>
                  </motion.section>
               </TabsContent>
            </AnimatePresence>
          </Tabs>

          {/* Genre Selection - Ultra Premium */}
          <section className="space-y-12 pt-20 border-t border-white/5">
             <div className="flex flex-col items-center text-center space-y-4">
                <h2 className="text-sm font-black text-white uppercase tracking-[0.5em]">Protocol Clusters</h2>
                <p className="text-xs text-white/20 font-medium uppercase tracking-[0.2em]">Browse by encrypted content designation</p>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { icon: Gamepad2, label: "Gaming", color: "text-blue-500", bg: "bg-blue-500/10", tier: "Tier 1" },
                  { icon: Mic2, label: "Podcasts", color: "text-purple-500", bg: "bg-purple-500/10", tier: "Tier 1" },
                  { icon: Music, label: "Music", color: "text-pink-500", bg: "bg-pink-500/10", tier: "Tier 2" },
                  { icon: Trophy, label: "Sports", color: "text-orange-500", bg: "bg-orange-500/10", tier: "Tier 2" },
                  { icon: Ghost, label: "Studio", color: "text-emerald-500", bg: "bg-emerald-500/10", tier: "Elite" },
                ].map((genre, i) => (
                  <motion.div 
                    key={genre.label} 
                    whileHover={{ scale: 1.05 }}
                    className={cn("p-8 rounded-[2.5rem] flex flex-col items-center gap-6 cursor-pointer transition-all border border-transparent hover:border-white/10 relative overflow-hidden group shadow-2xl", i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.01]")}
                  >
                     <div className={cn("h-16 w-16 rounded-3xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-12", genre.bg, genre.color)}>
                        <genre.icon className="h-7 w-7" />
                     </div>
                     <div className="text-center">
                        <span className="text-base font-black text-white uppercase tracking-tighter italic">{genre.label}</span>
                        <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mt-1">{genre.tier}</p>
                     </div>
                  </motion.div>
                ))}
             </div>
          </section>

          <div className="text-center pt-20">
             <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/[0.02] border border-white/5 opacity-30">
                <Shield className="h-3.5 w-3.5 text-violet-400" />
                <span className="text-[9px] font-black uppercase tracking-[0.5em]">Discovery Protocol Optimized / Node v1.2</span>
             </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
