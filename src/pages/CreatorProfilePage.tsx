import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Users, 
  Heart, 
  Share2, 
  ExternalLink, 
  Twitter, 
  Instagram,
  CheckCircle2,
  Bell,
  BellOff
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StreamCard } from "@/components/cards/StreamCard";
import { VideoCard } from "@/components/cards/VideoCard";
import { MainLayout } from "@/components/layout/MainLayout";
import { NoContent } from "@/components/shared/EmptyState";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Mock creator data by slug (so /creator/malek_04 and /creator/luna both work)
type CreatorData = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  banner: string;
  bio: string;
  followers: number;
  isLive: boolean;
  isVerified: boolean;
  socials: { twitter?: string; instagram?: string };
  currentStream?: {
    id: string;
    title: string;
    thumbnail: string;
    viewers: number;
    category: string;
  };
};

const creatorsBySlug: Record<string, CreatorData> = {
  luna: {
    id: "luna",
    name: "Luna Live",
    username: "luna_live",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
    banner: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=400&fit=crop",
    bio: "Welcome to my channel! 🌙 I stream late night vibes, chill music, and real conversations. Join our amazing community!",
    followers: 125000,
    isLive: true,
    isVerified: true,
    socials: { twitter: "luna_live", instagram: "lunalive" },
    currentStream: {
      id: "featured-1",
      title: "Late Night Vibes 🌙 Chill Music & Chat",
      thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=338&fit=crop",
      viewers: 12500,
      category: "Just Chatting",
    },
  },
  luna_live: {
    id: "luna",
    name: "Luna Live",
    username: "luna_live",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
    banner: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=400&fit=crop",
    bio: "Welcome to my channel! 🌙 I stream late night vibes, chill music, and real conversations. Join our amazing community!",
    followers: 125000,
    isLive: true,
    isVerified: true,
    socials: { twitter: "luna_live", instagram: "lunalive" },
    currentStream: {
      id: "featured-1",
      title: "Late Night Vibes 🌙 Chill Music & Chat",
      thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=338&fit=crop",
      viewers: 12500,
      category: "Just Chatting",
    },
  },
  malek_04: {
    id: "malek_04",
    name: "Malek_04",
    username: "malek_04",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=malek",
    banner: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&h=400&fit=crop",
    bio: "Chatting, gaming, and good vibes. Thanks for stopping by!",
    followers: 1240,
    isLive: true,
    isVerified: false,
    socials: {},
    currentStream: {
      id: "malek-live-1",
      title: "Chatting & Chill",
      thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=338&fit=crop",
      viewers: 160,
      category: "Chatting",
    },
  },
};

// Following / Recommended channel row item
const followingChannels = [
  { id: "luna", name: "Luna_Live", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna", category: "Music", viewers: 2400, isLive: true },
  { id: "gamer", name: "GamerPro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gamer", category: "Gaming", viewers: 15200, isLive: true },
  { id: "chill", name: "ChillVibes", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chill", category: "Recommended", viewers: 890, isLive: true },
];

const recommendedStreams = [
  { id: "razo97-1", title: "CS 2", creator: { name: "razo97", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=razo" }, viewers: 335, category: "CS 2", thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=338&fit=crop" },
  { id: "malek-04-1", title: "Chatting", creator: { name: "Malek_04", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=malek" }, viewers: 160, category: "Chatting", thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=338&fit=crop" },
  { id: "funny-1", title: "Slots", creator: { name: "funnyhoodvidz", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=funny" }, viewers: 465, category: "Slots", thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=338&fit=crop" },
];

function getCreatorBySlug(slug: string | undefined): CreatorData | null {
  if (!slug) return null;
  const normalized = slug.toLowerCase().replace(/-/g, "_");
  if (creatorsBySlug[normalized]) return creatorsBySlug[normalized];
  // Fallback: show a profile for any slug so /creator/anything never 404s
  const name = slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    id: slug,
    name: name,
    username: slug,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(slug)}`,
    banner: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&h=400&fit=crop",
    bio: "Creator on StreamVault.",
    followers: 0,
    isLive: false,
    isVerified: false,
    socials: {},
  };
}

const creatorVideos = [
  {
    id: "v1",
    title: "Behind The Scenes - My Setup Tour",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=338&fit=crop",
    creator: { name: "Luna Live", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna" },
    duration: "18:22",
    views: 32000,
    price: 0,
    isLocked: false,
    type: 'free'
  },
  {
    id: "v2",
    title: "Exclusive Q&A - Answering Your Questions",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=338&fit=crop",
    creator: { name: "Luna Live", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna" },
    duration: "45:10",
    views: 18000,
    price: 150,
    isLocked: true,
    type: 'ppv'
  },
  {
    id: "v3",
    title: "Music Session - Relaxing Piano Covers",
    thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=338&fit=crop",
    creator: { name: "Luna Live", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna" },
    duration: "32:15",
    views: 28000,
    price: 0,
    isLocked: true,
    type: 'sub'
  },
  {
    id: "v4",
    title: "Morning Yoga Routine",
    thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=338&fit=crop",
    creator: { name: "Luna Live", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna" },
    duration: "15:00",
    views: 12000,
    price: 0,
    isLocked: false,
    type: 'free'
  },
];

export default function CreatorProfilePage() {
  const { id } = useParams();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notificationsOn, setNotificationsOn] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const creator = getCreatorBySlug(id) ?? getCreatorBySlug("luna");

  const handleShare = () => {
    const shareData = {
      title: creator.name,
      text: `Check out ${creator.name} on StreamVault!`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData).catch((err) => {
        console.error("Error sharing:", err);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Profile link copied to clipboard!");
    }
  };

  const getFilteredContent = (tab: string) => {
    switch (tab) {
      case 'free':
        return creatorVideos.filter(v => v.type === 'free');
      case 'premium':
        return creatorVideos.filter(v => v.type === 'sub' || v.type === 'ppv');
      default:
        return creatorVideos;
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen pb-safe">
        {/* Banner */}
        <div className="relative h-40 sm:h-48 md:h-64 lg:h-80 bg-gradient-primary">
          <img
            src={creator.banner}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        {/* Profile Info */}
        <div className="container relative -mt-16 sm:-mt-20 md:-mt-24 px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
            {/* Avatar */}
            <div className="relative flex justify-center md:justify-start">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 rounded-2xl border-4 border-background ring-4 ring-primary/20"
              />
              {creator.isLive && (
                <Badge
                  variant="destructive"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-live glow-live text-white font-bold"
                >
                  LIVE
                </Badge>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-3 text-center md:text-left mt-4 md:mt-0">
              <div className="flex flex-col md:flex-row items-center md:items-baseline gap-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-bold">{creator.name}</h1>
                  {creator.isVerified && (
                    <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-primary fill-primary/20" />
                  )}
                </div>
                <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">@{creator.username}</p>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-6 text-sm">
                <span className="flex items-center gap-1.5 font-bold">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{(creator.followers / 1000).toFixed(1)}K</span>
                  <span className="text-muted-foreground font-normal">followers</span>
                </span>
                <div className="flex items-center gap-4">
                  {creator.socials?.twitter && (
                    <a
                      href={`https://twitter.com/${creator.socials.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {creator.socials?.instagram && (
                    <a
                      href={`https://instagram.com/${creator.socials.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 w-full md:w-auto pt-4 md:pt-0">
              <Button
                variant={isSubscribed ? "secondary" : "default"}
                className={cn(
                  "flex-1 xs:flex-none h-11 px-6 rounded-xl font-black uppercase tracking-widest text-[10px]",
                  !isSubscribed && "glow-primary-sm"
                )}
                onClick={() => setIsSubscribed(!isSubscribed)}
              >
                <Heart className={cn("h-4 w-4 mr-2", isSubscribed && "fill-current text-pink-500")} />
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </Button>
              <div className="flex gap-2 w-full xs:w-auto">
                {isSubscribed && (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="flex-1 xs:flex-none h-11 w-11 rounded-xl bg-white/5"
                    onClick={() => setNotificationsOn(!notificationsOn)}
                  >
                    {notificationsOn ? (
                      <Bell className="h-5 w-5 text-primary" />
                    ) : (
                      <BellOff className="h-5 w-5" />
                    )}
                  </Button>
                )}
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="flex-1 xs:flex-none h-11 w-11 rounded-xl bg-white/5"
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-8 text-center md:text-left">
             <p className="text-muted-foreground max-w-2xl leading-relaxed text-sm font-medium italic">
                "{creator.bio}"
             </p>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="container mt-6 sm:mt-8 pb-8 px-4 sm:px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 mb-6">
              <TabsList className="w-full min-w-[280px] sm:min-w-[360px] md:min-w-0 md:max-w-xl grid grid-cols-4 bg-muted/50 rounded-2xl p-1 h-11 sm:h-12">
                <TabsTrigger value="home" className="rounded-xl data-[state=active]:bg-background data-[state=active]:text-primary font-bold">Home</TabsTrigger>
                <TabsTrigger value="free" className="rounded-xl data-[state=active]:bg-background data-[state=active]:text-primary font-bold">Free</TabsTrigger>
                <TabsTrigger value="premium" className="rounded-xl data-[state=active]:bg-background data-[state=active]:text-primary font-bold">Premium</TabsTrigger>
                <TabsTrigger value="about" className="rounded-xl data-[state=active]:bg-background data-[state=active]:text-primary font-bold">About</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="home" className="mt-6 space-y-8">
              {/* Following */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold flex items-center gap-2">Following</h2>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-1">
                  {followingChannels.map((ch) => (
                    <Link
                      key={ch.id}
                      to={`/creator/${ch.id === "luna" ? "luna" : ch.id}`}
                      className="flex-shrink-0 w-36 sm:w-40 rounded-xl border border-white/10 bg-card/50 p-3 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <img src={ch.avatar} alt="" className="h-10 w-10 rounded-full ring-2 ring-border" />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm truncate">{ch.name}</p>
                          <p className="text-xs text-muted-foreground">{ch.category}</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium">
                        {ch.viewers >= 1000 ? `${(ch.viewers / 1000).toFixed(1)}K` : ch.viewers} watching
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recommended */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold flex items-center gap-2">Recommended</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendedStreams.map((stream) => (
                    <StreamCard
                      key={stream.id}
                      id={stream.id}
                      title={stream.title}
                      thumbnail={stream.thumbnail}
                      creator={stream.creator}
                      viewers={stream.viewers}
                      category={stream.category}
                    />
                  ))}
                </div>
              </div>

              {/* Featured Live */}
              {creator.isLive && creator.currentStream && (
                <div className="max-w-3xl">
                  <Link
                    to={`/watch/live/${creator.currentStream.id}`}
                    className="block group"
                  >
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
                      <img
                        src={creator.currentStream.thumbnail}
                        alt={creator.currentStream.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button size="lg" className="glow-primary">
                          Watch Now
                        </Button>
                      </div>
                      <Badge
                        variant="destructive"
                        className="absolute top-4 left-4 bg-live glow-live text-white font-bold"
                      >
                        🔴 LIVE
                      </Badge>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {creator.currentStream.title}
                        </h3>
                        <p className="text-white/80">
                          {creator.currentStream.viewers >= 1000
                            ? `${(creator.currentStream.viewers / 1000).toFixed(1)}K`
                            : creator.currentStream.viewers} watching
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Recent Videos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {creatorVideos.map((video) => (
                  <VideoCard key={video.id} {...video} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="free" className="mt-6">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredContent('free').length > 0 ? (
                  getFilteredContent('free').map((video) => (
                    <VideoCard key={video.id} {...video} />
                  ))
                ) : (
                  <div className="col-span-full">
                     <NoContent />
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="premium" className="mt-6">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredContent('premium').length > 0 ? (
                  getFilteredContent('premium').map((video) => (
                    <VideoCard key={video.id} {...video} />
                  ))
                ) : (
                  <div className="col-span-full">
                     <NoContent />
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="about" className="mt-6">
              <div className="max-w-2xl space-y-6">
                <div className="rounded-xl bg-card border border-border p-6">
                  <h3 className="font-semibold mb-3">About {creator.name}</h3>
                  <p className="text-muted-foreground">{creator.bio}</p>
                </div>
                <div className="rounded-xl bg-card border border-border p-6">
                  <h3 className="font-semibold mb-3">Social Links</h3>
                  <div className="flex flex-wrap gap-3">
                    {creator.socials?.twitter && (
                      <a
                        href={`https://twitter.com/${creator.socials.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-primary/10 transition-colors"
                      >
                        <Twitter className="h-5 w-5" />
                        <span>@{creator.socials.twitter}</span>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </a>
                    )}
                    {creator.socials?.instagram && (
                      <a
                        href={`https://instagram.com/${creator.socials.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-primary/10 transition-colors"
                      >
                        <Instagram className="h-5 w-5" />
                        <span>@{creator.socials.instagram}</span>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
