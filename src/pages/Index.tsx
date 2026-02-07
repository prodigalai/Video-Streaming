import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, ChevronRight, Flame, Clock, Star, Eye, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { StreamCard } from "@/components/cards/StreamCard";
import { VideoCard } from "@/components/cards/VideoCard";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { MadeForYou } from "@/components/feed/MadeForYou";
import { ForYouFeed } from "@/components/feed/ForYouFeed";
import { MainLayout } from "@/components/layout/MainLayout";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { TopChannels } from "@/components/hero/TopChannels";

// Featured streams data for hero slider
const featuredStreams = [
  {
    id: "featured-1",
    title: "Late Night Vibes 🌙 Chill Music & Chat",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=675&fit=crop",
    creator: {
      name: "Luna_Live",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
      isVerified: true,
    },
    viewers: 12500,
    category: "Just Chatting",
    tags: ["ENVtuber", "English", "Chill"],
  },
  {
    id: "featured-2",
    title: "Pro League Championship Finals 🏆",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=675&fit=crop",
    creator: {
      name: "GamerPro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gamer",
      isVerified: true,
    },
    viewers: 45200,
    category: "Gaming",
    tags: ["Esports", "Tournament", "English"],
  },
  {
    id: "featured-3",
    title: "Making Fresh Pasta From Scratch 🍝",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=675&fit=crop",
    creator: {
      name: "ChefMaria",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
    },
    viewers: 8900,
    category: "Cooking",
    tags: ["IRL", "Food", "Tutorial"],
  },
  {
    id: "featured-4",
    title: "Sunset DJ Set - House & Techno 🎧",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=675&fit=crop",
    creator: {
      name: "BeatMaster",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=beat",
      isVerified: true,
    },
    viewers: 22100,
    category: "Music",
    tags: ["DJ", "Electronic", "Live Set"],
  },
];

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
];

const topChannels = [
  { name: "Luna_Live", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna", viewers: 12500, isLive: true },
  { name: "GamerPro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gamer", viewers: 8432, isLive: true },
  { name: "ChefMaria", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria", viewers: 3201, isLive: true },
  { name: "BeatMaster", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=beat", viewers: 5678, isLive: true },
  { name: "FitJess", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jess", viewers: 2890, isLive: true },
  { name: "ArtByAlex", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex", viewers: 1543, isLive: true },
];

const videos = [
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
    id: "v2",
    title: "Exclusive Behind The Scenes Content",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=338&fit=crop",
    creator: { name: "Luna_Live", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna" },
    duration: "18:22",
    views: 32000,
    price: 100,
    isLocked: true,
  },
  {
    id: "v3",
    title: "Complete Guitar Tutorial for Beginners",
    thumbnail: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&h=338&fit=crop",
    creator: { name: "MusicMike", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike" },
    duration: "45:10",
    views: 28000,
  },
  {
    id: "v4",
    title: "My Daily Skincare Routine - All Products",
    thumbnail: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=338&fit=crop",
    creator: { name: "BeautyBella", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bella" },
    duration: "12:45",
    views: 67000,
  },
  {
    id: "v5",
    title: "Advanced Workout Techniques Revealed",
    thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=338&fit=crop",
    creator: { name: "FitJess", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jess" },
    duration: "32:18",
    views: 19000,
    price: 75,
  },
  {
    id: "v6",
    title: "Cooking Masterclass - French Cuisine",
    thumbnail: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=338&fit=crop",
    creator: { name: "ChefMaria", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria" },
    duration: "58:32",
    views: 41000,
  },
];

const categories = [
  { name: "Gaming", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop", count: 234, tags: ["FPS", "Shooter"] },
  { name: "Music", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop", count: 156, tags: ["Live", "DJ"] },
  { name: "Fitness", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop", count: 89, tags: ["Health", "Yoga"] },
  { name: "Cooking", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop", count: 67, tags: ["Food", "ASMR"] },
  { name: "Art", image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop", count: 123, tags: ["Creative", "Design"] },
  { name: "Talk Shows", image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop", count: 45, tags: ["Podcast", "News"] },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("live");

  return (
    <MainLayout>
        <div className="relative">
          {/* Ambient background orbs & Particles */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="cosmos-particles" />
            <div className="ambient-orb orb-primary w-[600px] h-[600px] -top-[200px] -left-[200px]" />
            <div className="ambient-orb orb-secondary w-[400px] h-[400px] top-[50%] -right-[100px]" />
          </div>

          {/* Hero Slider - Cinematic Entry */}
          <div className="relative z-10 mb-8 lg:mb-0">
             <HeroSlider streams={featuredStreams} />
          </div>

          <div className="container py-4 lg:py-8 space-y-8 lg:space-y-16 relative z-10">

          {/* Categories Section - High Density Browse */}
          <section className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-2">
                Top Live Categories
              </h2>
              <Button variant="ghost" size="sm" asChild className="text-primary font-bold hover:bg-primary/10">
                <Link to="/search" className="flex items-center gap-1">
                  View all
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.map((cat) => (
                <CategoryCard key={cat.name} name={cat.name} image={cat.image} count={cat.count} tags={cat.tags} />
              ))}
            </div>
          </section>

          {/* Live Channels - Social Proof */}
          <section className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <TopChannels channels={topChannels} />
          </section>

          {/* Made For You - Reels & Social Sidebar */}
          <section className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <MadeForYou />
          </section>

          {/* Recommended Feed - Personalized Discovery */}
          <section className="animate-fade-in" style={{ animationDelay: '350ms' }}>
            <ForYouFeed />
          </section>

          {/* Featured Live Streams Grid */}
          <section className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-live animate-pulse" />
                Recommended Streams
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {liveStreams.map((stream, index) => (
                <div key={stream.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <StreamCard {...stream} />
                </div>
              ))}
            </div>
          </section>

          {/* VOD / Premium Highlights Section */}
          <section className="animate-fade-in border-t border-border/50 pt-16" style={{ animationDelay: '500ms' }}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Star className="h-4 w-4 text-primary-foreground fill-current" />
                </div>
                <span>Premium Highlights</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.slice(0, 3).map((video, index) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
          </section>

        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
