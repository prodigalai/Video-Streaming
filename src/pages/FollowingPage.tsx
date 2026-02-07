import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { CreatorCard } from "@/components/cards/CreatorCard";
import { StreamCard } from "@/components/cards/StreamCard";
import { VideoCard } from "@/components/cards/VideoCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Radio, Film, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      <div className="container py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              Following
            </h1>
            <p className="text-muted-foreground">Content from creators you love</p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search following..."
              className="pl-10 bg-white/5 border-white/10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Live Now Summary (Always visible if any) */}
        {followingLive.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-live animate-pulse" />
              <h2 className="text-lg font-bold">Live Now</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {followingLive.map(creator => (
                <div key={creator.id} className="glass-card p-4 rounded-2xl border-primary/20 flex items-center gap-4">
                  <div className="relative shrink-0">
                    <img src={creator.avatar} alt={creator.name} className="h-12 w-12 rounded-full ring-2 ring-primary" />
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-live text-[8px] font-black px-1.5 rounded-full text-white">LIVE</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold truncate">{creator.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{creator.category}</p>
                  </div>
                  <Button size="sm" variant="ghost" className="ml-auto h-8 px-3 rounded-lg bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">Watch</Button>
                </div>
              ))}
            </div>
          </section>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white/5 p-1 rounded-2xl h-12 w-full max-w-sm grid grid-cols-3">
            <TabsTrigger value="all" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-black font-bold">All</TabsTrigger>
            <TabsTrigger value="live" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-black font-bold">Live</TabsTrigger>
            <TabsTrigger value="videos" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-black font-bold">Videos</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8 space-y-12">
             <section>
               <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                 <Users className="h-5 w-5 text-primary" />
                 Your Creators
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 {filteredCreators.map(creator => (
                   <CreatorCard key={creator.id} {...creator} />
                 ))}
               </div>
             </section>

             <section>
               <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                 <Film className="h-5 w-5 text-primary" />
                 Recent Uploads
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {recentUploads.map(video => (
                   <VideoCard key={video.id} {...video} />
                 ))}
               </div>
             </section>
          </TabsContent>

          <TabsContent value="live" className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {followedCreators.filter(c => c.isLive).map(creator => (
                <CreatorCard key={creator.id} {...creator} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentUploads.map(video => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
