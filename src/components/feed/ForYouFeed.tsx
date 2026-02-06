import { Link } from "react-router-dom";
import { Sparkles, TrendingUp, Clock, Heart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StreamCard } from "@/components/cards/StreamCard";
import { VideoCard } from "@/components/cards/VideoCard";
import { cn } from "@/lib/utils";

// Mock personalized data based on "viewing history"
const forYouStreams = [
  {
    id: "fy-1",
    title: "Late Night Jazz & Lo-Fi Beats",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=338&fit=crop",
    creator: { name: "JazzVibes", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jazz" },
    viewers: 4521,
    category: "Music",
  },
  {
    id: "fy-2",
    title: "Cozy Gaming Session - RPG Adventures",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=338&fit=crop",
    creator: { name: "CozyGamer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cozy" },
    viewers: 2890,
    category: "Gaming",
  },
  {
    id: "fy-3",
    title: "Chill Art Stream - Watercolor Painting",
    thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=338&fit=crop",
    creator: { name: "ArtfulSoul", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=artful" },
    viewers: 1876,
    category: "Art",
  },
  {
    id: "fy-4",
    title: "Night Drive Vibes - Music & Chat",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=338&fit=crop",
    creator: { name: "NightOwl", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nightowl" },
    viewers: 5432,
    category: "Just Chatting",
  },
];

const recommendedVideos = [
  {
    id: "rv-1",
    title: "How to Create the Perfect Ambient Playlist",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=338&fit=crop",
    creator: { name: "MusicMaster", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=master" },
    duration: "18:45",
    views: 34000,
  },
  {
    id: "rv-2",
    title: "Ultimate Setup Tour - Streaming Edition",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=338&fit=crop",
    creator: { name: "TechVibes", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tech" },
    duration: "24:30",
    views: 67000,
  },
];

const watchAgain = [
  {
    id: "wa-1",
    title: "Luna's Best Moments - Compilation",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=338&fit=crop",
    creator: { name: "Luna_Live", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna" },
    duration: "45:00",
    views: 89000,
  },
  {
    id: "wa-2",
    title: "Previous Stream Highlights",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=338&fit=crop",
    creator: { name: "GamerPro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gamer" },
    duration: "32:15",
    views: 45000,
  },
];

interface ForYouFeedProps {
  className?: string;
}

export function ForYouFeed({ className }: ForYouFeedProps) {
  return (
    <div className={cn("space-y-10", className)}>
      {/* For You Header with personalization indicator */}
      <div className="relative">
        {/* Ambient glow */}
        <div className="absolute -top-20 left-1/4 w-96 h-32 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
        
        <div className="flex items-center justify-between mb-6 relative">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center animate-glow-pulse">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-gradient">For You</span>
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Heart className="h-4 w-4 text-primary animate-pulse" />
            <span>Based on your taste</span>
          </div>
        </div>

        {/* Personalized Live Streams */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {forYouStreams.map((stream, index) => (
            <div 
              key={stream.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <StreamCard {...stream} />
            </div>
          ))}
        </div>
      </div>

      {/* Because You Watched Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-secondary flex items-center justify-center">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <span>Watch Again</span>
          </h2>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
            <Link to="/library" className="flex items-center gap-1">
              View History <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {watchAgain.map((video, index) => (
            <div 
              key={video.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <VideoCard {...video} />
            </div>
          ))}
          {recommendedVideos.map((video, index) => (
            <div 
              key={video.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <VideoCard {...video} />
            </div>
          ))}
        </div>
      </div>

      {/* Trending in categories you like */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-secondary flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <span>Trending in Music</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {forYouStreams.slice(0, 2).map((stream, index) => (
            <div 
              key={`trending-${stream.id}`} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <StreamCard {...stream} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
