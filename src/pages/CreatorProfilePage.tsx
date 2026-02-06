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

// Mock creator data
const creatorData = {
  id: "luna",
  name: "Luna Live",
  username: "luna_live",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
  banner: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=400&fit=crop",
  bio: "Welcome to my channel! 🌙 I stream late night vibes, chill music, and real conversations. Join our amazing community!",
  followers: 125000,
  isLive: true,
  isVerified: true,
  socials: {
    twitter: "luna_live",
    instagram: "lunalive",
  },
  currentStream: {
    id: "featured-1",
    title: "Late Night Vibes 🌙 Chill Music & Chat",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=338&fit=crop",
    viewers: 12500,
    category: "Just Chatting",
  },
};

const creatorVideos = [
  {
    id: "v1",
    title: "Behind The Scenes - My Setup Tour",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=338&fit=crop",
    creator: { name: "Luna Live", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna" },
    duration: "18:22",
    views: 32000,
    price: 100,
    isLocked: false,
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
  },
  {
    id: "v3",
    title: "Music Session - Relaxing Piano Covers",
    thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=338&fit=crop",
    creator: { name: "Luna Live", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna" },
    duration: "32:15",
    views: 28000,
  },
];

export default function CreatorProfilePage() {
  const { id } = useParams();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notificationsOn, setNotificationsOn] = useState(false);
  const [activeTab, setActiveTab] = useState("live");

  const creator = creatorData;

  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Banner */}
        <div className="relative h-48 md:h-64 lg:h-80 bg-gradient-primary">
          <img
            src={creator.banner}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        {/* Profile Info */}
        <div className="container relative -mt-20 md:-mt-24">
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
            {/* Avatar */}
            <div className="relative">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="h-32 w-32 md:h-40 md:w-40 rounded-2xl border-4 border-background ring-4 ring-primary/20"
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
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold">{creator.name}</h1>
                {creator.isVerified && (
                  <CheckCircle2 className="h-6 w-6 text-primary fill-primary/20" />
                )}
              </div>
              <p className="text-muted-foreground">@{creator.username}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-primary" />
                  <strong>{(creator.followers / 1000).toFixed(1)}K</strong> followers
                </span>
                {creator.socials.twitter && (
                  <a
                    href={`https://twitter.com/${creator.socials.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {creator.socials.instagram && (
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

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant={isSubscribed ? "secondary" : "default"}
                className={!isSubscribed ? "glow-primary-sm" : ""}
                onClick={() => setIsSubscribed(!isSubscribed)}
              >
                <Heart className={`h-4 w-4 mr-2 ${isSubscribed ? "fill-current" : ""}`} />
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </Button>
              {isSubscribed && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setNotificationsOn(!notificationsOn)}
                >
                  {notificationsOn ? (
                    <Bell className="h-5 w-5 text-primary" />
                  ) : (
                    <BellOff className="h-5 w-5" />
                  )}
                </Button>
              )}
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Bio */}
          <p className="mt-6 text-muted-foreground max-w-2xl">{creator.bio}</p>
        </div>

        {/* Content Tabs */}
        <div className="container mt-8 pb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full max-w-md grid grid-cols-3 bg-muted/50">
              <TabsTrigger value="live">
                {creator.isLive && <span className="h-2 w-2 rounded-full bg-live mr-2 animate-pulse" />}
                Live
              </TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="live" className="mt-6">
              {creator.isLive && creator.currentStream ? (
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
                          {(creator.currentStream.viewers / 1000).toFixed(1)}K watching
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ) : (
                <NoContent />
              )}
            </TabsContent>

            <TabsContent value="videos" className="mt-6">
              {creatorVideos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {creatorVideos.map((video) => (
                    <VideoCard key={video.id} {...video} />
                  ))}
                </div>
              ) : (
                <NoContent />
              )}
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
                    {creator.socials.twitter && (
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
                    {creator.socials.instagram && (
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
