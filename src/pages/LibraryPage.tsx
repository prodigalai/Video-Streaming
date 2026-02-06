import { useState } from "react";
import { Link } from "react-router-dom";
import { Library, Play, Bookmark, Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoCard } from "@/components/cards/VideoCard";
import { StreamCard } from "@/components/cards/StreamCard";
import { MainLayout } from "@/components/layout/MainLayout";
import { EmptyState } from "@/components/shared/EmptyState";

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

const watchHistory = [
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

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState("unlocked");

  return (
    <MainLayout>
      <div className="container py-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Library className="h-7 w-7 text-primary" />
            My Library
          </h1>
          <p className="text-muted-foreground">Your purchased content and watch history</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full max-w-lg grid grid-cols-3 bg-muted/50">
            <TabsTrigger value="unlocked">
              <Play className="h-4 w-4 mr-2" />
              Unlocked
            </TabsTrigger>
            <TabsTrigger value="saved">
              <Bookmark className="h-4 w-4 mr-2" />
              Saved
            </TabsTrigger>
            <TabsTrigger value="history">
              <Clock className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>

          {/* Unlocked Videos */}
          <TabsContent value="unlocked" className="mt-6">
            {unlockedVideos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {unlockedVideos.map((video) => (
                  <VideoCard key={video.id} {...video} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Play className="h-10 w-10 text-muted-foreground" />}
                title="No Unlocked Content"
                description="Videos you purchase will appear here."
                action={{
                  label: "Browse Videos",
                  onClick: () => {},
                }}
              />
            )}
          </TabsContent>

          {/* Saved Streams */}
          <TabsContent value="saved" className="mt-6">
            {savedStreams.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {savedStreams.map((stream) => (
                  <div key={stream.id} className="relative group">
                    <StreamCard {...stream} />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Bookmark className="h-10 w-10 text-muted-foreground" />}
                title="No Saved Streams"
                description="Save stream replays to watch later."
              />
            )}
          </TabsContent>

          {/* Watch History */}
          <TabsContent value="history" className="mt-6">
            {watchHistory.length > 0 ? (
              <div className="space-y-6">
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear History
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {watchHistory.map((item) => (
                    <div key={item.id} className="relative">
                      {item.duration ? (
                        <VideoCard id={item.id} title={item.title} thumbnail={item.thumbnail} creator={item.creator} duration={item.duration} views={item.views || 0} />
                      ) : (
                        <StreamCard id={item.id} title={item.title} thumbnail={item.thumbnail} creator={item.creator} viewers={item.viewers || 0} category={item.category || ""} isLive={false} />
                      )}
                      {/* Progress bar */}
                      {item.progress && item.progress < 100 && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Watched {item.watchedAt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <EmptyState
                icon={<Clock className="h-10 w-10 text-muted-foreground" />}
                title="No Watch History"
                description="Your watch history will appear here."
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
