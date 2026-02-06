import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, ChevronRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StreamCard } from "@/components/cards/StreamCard";
import { MainLayout } from "@/components/layout/MainLayout";
import { NoLiveStreams } from "@/components/shared/EmptyState";

// Mock data
const liveStreams = [
  {
    id: "1",
    title: "Gaming Marathon - Day 3!",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=338&fit=crop",
    creator: { name: "GamerPro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gamer" },
    viewers: 8432,
    category: "Gaming",
  },
  {
    id: "2",
    title: "Cooking Italian Pasta from Scratch",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=338&fit=crop",
    creator: { name: "ChefMaria", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria" },
    viewers: 3201,
    category: "Cooking",
  },
  {
    id: "3",
    title: "Music Production Live Session",
    thumbnail: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=600&h=338&fit=crop",
    creator: { name: "BeatMaster", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=beat" },
    viewers: 5678,
    category: "Music",
  },
  {
    id: "4",
    title: "Fitness & Wellness Morning Routine",
    thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=338&fit=crop",
    creator: { name: "FitJess", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jess" },
    viewers: 2890,
    category: "Fitness",
  },
  {
    id: "5",
    title: "Art Creation - Digital Painting",
    thumbnail: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&h=338&fit=crop",
    creator: { name: "ArtByAlex", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex" },
    viewers: 1543,
    category: "Art",
  },
  {
    id: "6",
    title: "Late Night Talk Show",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=338&fit=crop",
    creator: { name: "TalkWithTom", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tom" },
    viewers: 4321,
    category: "Talk Show",
  },
  {
    id: "7",
    title: "Late Night Vibes 🌙 Chill Music & Chat",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=338&fit=crop",
    creator: { name: "Luna_Live", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna" },
    viewers: 12500,
    category: "Just Chatting",
  },
  {
    id: "8",
    title: "Coding Live - Building a SaaS",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=338&fit=crop",
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

  const filteredStreams = selectedCategory === "All"
    ? liveStreams
    : liveStreams.filter((s) => s.category === selectedCategory);

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#05020d] text-white">
        <div className="container py-8 space-y-8">
          {/* Pro Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-live/10 border border-live/20 w-fit">
                <div className="h-2 w-2 rounded-full bg-live animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-live">Live Deck</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">
                Broadcasting <span className="text-gradient">Now</span>
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="h-10 px-4 bg-white/5 border-white/5 text-muted-foreground font-black text-xs uppercase tracking-widest">
                {liveStreams.length} ACTIVE STREAMS
              </Badge>
            </div>
          </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "secondary"}
              size="sm"
              className="flex-shrink-0"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Streams Grid */}
        {filteredStreams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
            {filteredStreams.map((stream) => (
              <StreamCard key={stream.id} {...stream} />
            ))}
          </div>
        ) : (
          <NoLiveStreams />
        )}
      </div>
     </div>
    </MainLayout>
  );
}
