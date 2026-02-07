import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize,
  Heart, 
  Share2, 
  Lock,
  Coins,
  ChevronDown,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { VideoCard } from "@/components/cards/VideoCard";
import { MainLayout } from "@/components/layout/MainLayout";
import { VideoComments } from "@/components/video/VideoComments";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Mock data
const videoData = {
  id: "v1",
  title: "How I Made $10K This Month - Full Breakdown",
  description: "In this video, I break down exactly how I generated $10,000 in revenue this month. From strategies to specific tactics, everything is revealed. This is exclusive content for my supporters!",
  thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=675&fit=crop",
  creator: {
    id: "business",
    name: "BusinessPro",
    username: "businesspro",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=business",
    followers: 89000,
    isVerified: true,
  },
  duration: "24:35",
  views: 45000,
  price: 50,
  isLocked: false,
  uploadedAt: "2 days ago",
};

const lockedVideoData = {
  ...videoData,
  id: "v2",
  title: "Exclusive Behind The Scenes Content",
  isLocked: true,
  price: 100,
};

const relatedVideos = [
  {
    id: "v3",
    title: "Complete Business Strategy Guide",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=338&fit=crop",
    creator: { name: "BusinessPro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=business" },
    duration: "45:10",
    views: 28000,
    price: 75,
  },
  {
    id: "v4",
    title: "Marketing Secrets Revealed",
    thumbnail: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&h=338&fit=crop",
    creator: { name: "BusinessPro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=business" },
    duration: "32:18",
    views: 19000,
  },
  {
    id: "v5",
    title: "Passive Income Masterclass",
    thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=338&fit=crop",
    creator: { name: "WealthGuru", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wealth" },
    duration: "58:32",
    views: 41000,
    price: 150,
    isLocked: true,
  },
];

export default function VideoWatchPage() {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  // Use locked video for demo if id matches
  const video = id === "v2" ? lockedVideoData : videoData;

  const handleUnlock = () => {
    // Would trigger purchase flow
    console.log("Unlocking video for", video.price, "credits");
  };

  const handleShare = () => {
    const shareData = {
      title: video.title,
      text: `Check out this video on StreamVault: ${video.title}`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData).catch((err) => {
        console.error("Error sharing:", err);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Video link copied to clipboard!");
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#05020d] text-white">
        <div className="container py-4 lg:py-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* Cinematic Video Player Container */}
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-black group shadow-2xl border border-white/5">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                />

                {/* Locked Content Experience */}
                {video.isLocked && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-500">
                    <div className="text-center p-8 max-w-sm">
                      <div className="h-24 w-24 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-glow-primary-sm">
                        <Lock className="h-10 w-10 text-primary animate-pulse" />
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-2">Premium Content</h3>
                      <p className="text-white/60 font-medium mb-8">Access this exclusive video breakdown and support the creator.</p>
                      <Button onClick={handleUnlock} size="lg" className="h-14 px-8 rounded-2xl bg-primary text-black font-black uppercase tracking-widest hover:shadow-glow-primary transition-all">
                        <Coins className="h-5 w-5 mr-2" />
                        Unlock for {video.price} Credits
                      </Button>
                    </div>
                  </div>
                )}

                {/* Video HUD Overlays */}
                {!video.isLocked && (
                  <>
                    <div
                      className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      <div className="h-24 w-24 rounded-full bg-primary/95 flex items-center justify-center shadow-glow-primary scale-90 group-hover:scale-100 transition-transform">
                        {isPlaying ? (
                          <Pause className="h-10 w-10 text-black" />
                        ) : (
                          <Play className="h-10 w-10 text-black ml-1" />
                        )}
                      </div>
                    </div>

                    {/* Progress Bar & HUD Controls */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <div className="relative h-1.5 w-full bg-white/10 rounded-full mb-6 overflow-hidden">
                        <div className="absolute h-full bg-primary w-[30%] shadow-glow-primary" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 text-white rounded-xl hover:bg-primary/20 hover:text-primary transition-colors"
                            onClick={() => setIsPlaying(!isPlaying)}
                          >
                            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 text-white rounded-xl hover:bg-primary/20 hover:text-primary transition-colors"
                            onClick={() => setIsMuted(!isMuted)}
                          >
                            {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                          </Button>
                          <span className="text-xs font-black uppercase tracking-widest text-white/80 tabular-nums">08:42 / {video.duration}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 text-white rounded-xl hover:bg-primary/20 hover:text-primary transition-colors"
                        >
                          <Maximize className="h-6 w-6" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Video Metrics & Actions */}
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
                   <h1 className="text-2xl md:text-3xl font-black text-white/90 leading-tight tracking-tight max-w-2xl">
                     {video.title}
                   </h1>
                   <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center bg-white/5 rounded-2xl border border-white/5 overflow-hidden w-full sm:w-auto">
                        <Button
                          variant="ghost"
                          onClick={() => setIsLiked(!isLiked)}
                          className={cn(
                            "flex-1 sm:flex-none h-11 px-6 rounded-none font-black text-[10px] uppercase tracking-widest border-r border-white/5 transition-all text-white group",
                            isLiked && "text-primary bg-primary/10"
                          )}
                        >
                          <ThumbsUp className={cn("h-4 w-4 mr-2 transition-transform group-hover:scale-110", isLiked && "fill-current")} />
                          {isLiked ? "Liked" : "Like"}
                        </Button>
                        <Button
                          variant="ghost"
                          className="h-11 px-4 rounded-none hover:bg-white/10 text-white group"
                        >
                          <ThumbsDown className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-red-500" />
                        </Button>
                      </div>
                      <Button 
                        variant="ghost" 
                        onClick={handleShare}
                        className="flex-1 sm:flex-none h-11 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/5 hover:bg-white/5 text-white"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                   </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                   <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                      <Play className="h-3 w-3 text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{video.views.toLocaleString()} Views</span>
                   </div>
                   <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{video.uploadedAt}</span>
                   </div>
                   {video.price && (
                      <Badge className="bg-primary/10 text-primary border-primary/20 font-black text-[10px] tracking-widest uppercase px-3 py-1.5">
                        {video.price} CREDITS
                      </Badge>
                   )}
                </div>

                {/* Creator Profile Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-3xl glass-card border-white/5 bg-white/[0.02] gap-4">
                      <Link to={`/creator/${video.creator.id}`} className="flex items-center gap-4 group">
                        <div className="relative p-1 rounded-2xl bg-gradient-primary">
                           <Avatar className="h-14 w-14 rounded-xl border-2 border-background">
                             <AvatarImage src={video.creator.avatar} />
                             <AvatarFallback>{video.creator.name[0]}</AvatarFallback>
                           </Avatar>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-black text-gradient group-hover:opacity-80 transition-opacity tracking-tight">
                              {video.creator.name}
                            </span>
                            {video.creator.isVerified && (
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                            {(video.creator.followers / 1000).toFixed(1)}K Supporters
                          </p>
                        </div>
                      </Link>
                      <Button
                        variant={isSubscribed ? "secondary" : "default"}
                        onClick={() => setIsSubscribed(!isSubscribed)}
                        className={cn(
                           "w-full md:w-auto h-12 px-8 rounded-xl font-black text-xs uppercase tracking-widest transition-all",
                           isSubscribed ? "bg-white/10 text-white" : "bg-primary text-black hover:shadow-glow-primary"
                        )}
                      >
                        {isSubscribed ? "Subscribed" : "Subscribe"}
                      </Button>
                    </div>

                {/* Video Meta Info */}
                <div className="p-6 rounded-3xl bg-white/[0.01] border border-white/5">
                  <div className={cn("text-base text-white/70 leading-relaxed font-medium transition-all duration-300", !showDescription && "line-clamp-2")}>
                    {video.description}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 text-primary font-black text-[10px] tracking-widest uppercase hover:bg-transparent"
                    onClick={() => setShowDescription(!showDescription)}
                  >
                    <ChevronDown className={cn("h-4 w-4 mr-1 transition-transform duration-300", showDescription && "rotate-180")} />
                    {showDescription ? "Show less" : "Read more"}
                  </Button>
                </div>

                <div className="h-px w-full bg-white/5 my-12" />

                {/* NEW: Comments Section */}
                <VideoComments />
              </div>
            </div>

            {/* Side Suggestions Bar */}
            <div className="space-y-8">
              <div className="flex items-center justify-between border-l-4 border-primary pl-4">
                 <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white/90">Up Next</h2>
                 <Button variant="ghost" className="text-primary font-black text-[10px] tracking-widest">AUTOPLAY</Button>
              </div>
              <div className="grid gap-6">
                {relatedVideos.map((v) => (
                  <VideoCard key={v.id} {...v} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
