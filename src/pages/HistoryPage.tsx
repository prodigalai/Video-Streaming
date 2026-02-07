import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { VideoCard } from "@/components/cards/VideoCard";
import { StreamCard } from "@/components/cards/StreamCard";
import { Clock, Trash2, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      <div className="container py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              <Clock className="h-8 w-8 text-primary" />
              Watch History
            </h1>
            <p className="text-muted-foreground">Pick up where you left off</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search history..."
                className="pl-10 bg-white/5 border-white/10 h-10 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="h-10 w-10 shrink-0 bg-white/5 border-white/10 rounded-xl">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-[#18181b] border-white/10">
                <DropdownMenuItem className="text-white hover:bg-white/5 focus:bg-white/5">All Content</DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-white/5 focus:bg-white/5">Videos only</DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-white/5 focus:bg-white/5">Streams only</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
               variant="ghost" 
               onClick={clearHistory}
               className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-10 rounded-xl px-4"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>

        {filteredHistory.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredHistory.map((item) => (
              <div key={item.id} className="space-y-3 group relative">
                {/* Wrap in relative to position progress bar */}
                {item.duration ? (
                  <VideoCard id={item.id} title={item.title} thumbnail={item.thumbnail} creator={item.creator} duration={item.duration} views={item.views || 0} />
                ) : (
                  <StreamCard id={item.id} title={item.title} thumbnail={item.thumbnail} creator={item.creator} viewers={item.viewers || 0} category={item.category || ""} isLive={false} />
                )}
                
                {/* Progress Overlay */}
                {item.progress && item.progress < 100 && (
                  <div className="absolute top-[170px] left-0 right-0 h-1 bg-white/10 pointer-events-none mx-3 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary shadow-glow-primary" 
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.watchedAt}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-400">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center">
               <Clock className="h-8 w-8 text-white/20" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">History is empty</h3>
              <p className="text-muted-foreground">Videos you watch will show up here.</p>
            </div>
            <Button className="mt-4 glow-primary">Back to Home</Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
