import { Link } from "react-router-dom";
import { Heart, Share2, Users, Check, ExternalLink, Sparkles, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface StreamInfoProps {
  creator: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    followers: number;
    bio: string;
    isVerified?: boolean;
    socialLinks?: { platform: string; handle: string }[];
  };
  title: string;
  category: string;
  tags: string[];
  viewers: number;
  isFollowing: boolean;
  isSubscribed: boolean;
  onFollowToggle: () => void;
  onSubscribeToggle: () => void;
  followerGoal?: { current: number; target: number };
}

export function StreamInfo({
  creator,
  title,
  category,
  tags,
  viewers,
  isFollowing,
  isSubscribed,
  onFollowToggle,
  onSubscribeToggle,
  followerGoal,
}: StreamInfoProps) {
  return (
    <div className="space-y-8">
      {/* Stream Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 p-6 glass-card rounded-2xl border-white/5 bg-white/[0.02]">
        <div className="flex items-start gap-5">
           <Link to={`/creator/${creator.id}`} className="relative shrink-0">
              <div className="relative p-1 rounded-2xl bg-gradient-primary">
                 <Avatar className="h-16 w-16 md:h-20 md:w-20 rounded-xl border-2 border-background">
                    <AvatarImage src={creator.avatar} />
                    <AvatarFallback>{creator.name[0]}</AvatarFallback>
                 </Avatar>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-live px-2 py-0.5 rounded-full shadow-glow-live">
                 <span className="text-[10px] font-black text-white italic tracking-tighter">LIVE</span>
              </div>
           </Link>

           <div className="space-y-2 min-w-0">
              <div className="flex items-center gap-2">
                 <Link to={`/creator/${creator.id}`} className="text-xl md:text-2xl font-black text-gradient hover:opacity-80 transition-opacity flex items-center gap-2">
                    {creator.name}
                    {creator.isVerified && (
                       <Check className="h-5 w-5 bg-primary text-black rounded-full p-1" />
                    )}
                 </Link>
                 <Badge variant="outline" className="hidden sm:flex border-primary/20 text-primary bg-primary/5 uppercase font-black text-[10px] tracking-widest px-3 py-1">
                    Partner
                 </Badge>
              </div>
              
              <h1 className="text-lg md:text-xl font-bold leading-tight line-clamp-2 text-white/90">
                 {title}
              </h1>

              <div className="flex flex-wrap items-center gap-3">
                 <Link to={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`} className="text-xs font-black uppercase text-primary hover:underline tracking-widest">
                    {category}
                 </Link>
                 <div className="h-1 w-1 rounded-full bg-white/20" />
                 {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-white/10 text-white/60 uppercase font-bold text-[9px] tracking-wider px-2 py-0.5 border-none">
                       #{tag}
                    </Badge>
                 ))}
              </div>
           </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-end xl:self-center">
           <div className="flex flex-col items-center px-4">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Viewers</span>
              <div className="flex items-center gap-2">
                 <div className="h-2 w-2 rounded-full bg-live animate-pulse" />
                 <span className="text-lg font-black">{viewers.toLocaleString()}</span>
              </div>
           </div>

           <div className="h-10 w-px bg-white/10 mx-2 hidden sm:block" />

           <div className="flex gap-2">
              <Button
                 variant={isFollowing ? "secondary" : "default"}
                 onClick={onFollowToggle}
                 className={cn(
                    "h-12 px-6 rounded-xl font-black text-xs uppercase tracking-widest border-none transition-all duration-300",
                    isFollowing 
                    ? "bg-white/10 text-white hover:bg-white/20" 
                    : "bg-white text-black hover:bg-primary hover:text-black hover:shadow-glow-primary"
                 )}
              >
                 <Heart className={cn("h-4 w-4 mr-2", isFollowing && "fill-current text-pink-500")} />
                 {isFollowing ? "Following" : "Follow"}
              </Button>

              <div className="flex items-center bg-white/5 rounded-xl border border-white/5 overflow-hidden">
                 <Button variant="ghost" className="h-12 px-4 rounded-none hover:bg-white/10 text-white border-r border-white/5 group">
                    <ThumbsUp className="h-4 w-4 mr-2 group-hover:text-primary group-hover:scale-110 transition-all" />
                    <span className="text-[10px] font-black uppercase">1.2K</span>
                 </Button>
                 <Button variant="ghost" className="h-12 px-4 rounded-none hover:bg-white/10 text-white group">
                    <ThumbsDown className="h-4 w-4 group-hover:text-red-500 group-hover:scale-110 transition-all" />
                 </Button>
              </div>

              <Button
                 onClick={onSubscribeToggle}
                 className="h-12 px-6 rounded-xl bg-primary text-black font-black text-xs uppercase tracking-widest hover:shadow-glow-primary transition-all duration-300"
              >
                 <Sparkles className="h-4 w-4 mr-2" />
                 Subscribe
              </Button>

              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl border border-white/5 hover:bg-white/5 text-muted-foreground">
                 <Share2 className="h-5 w-5" />
              </Button>
           </div>
        </div>
      </div>

      {/* About & Goal Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-8 rounded-2xl border-white/5 space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">About the Creator</h3>
              <div className="flex gap-4">
                 {creator.socialLinks?.map((link) => (
                    <span key={link.platform} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                       <ExternalLink className="h-4 w-4" />
                    </span>
                 ))}
              </div>
           </div>
           
           <p className="text-base text-white/70 leading-relaxed font-medium italic">
              "{creator.bio}"
           </p>

           <div className="pt-4 border-t border-white/5 flex items-center gap-8">
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Followers</p>
                 <p className="text-xl font-black">{(creator.followers / 1000).toFixed(1)}K</p>
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Subscribers</p>
                 <p className="text-xl font-black">1.2K</p>
              </div>
              <div className="flex-1" />
           </div>
        </div>

        {/* Dynamic Goal Tracker */}
        {followerGoal && (
           <div className="glass-card p-8 rounded-2xl border-white/5 flex flex-col justify-between bg-primary/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Heart className="h-20 w-20 fill-current text-primary" />
              </div>

              <div className="relative">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">Sub Goal</h3>
                 <div className="space-y-2 mb-4">
                    <div className="flex items-end justify-between">
                       <span className="text-3xl font-black italic">{followerGoal.current.toLocaleString()}</span>
                       <span className="text-xs font-bold text-muted-foreground">/ {followerGoal.target.toLocaleString()}</span>
                    </div>
                    <Progress
                       value={(followerGoal.current / followerGoal.target) * 100}
                       className="h-2 bg-white/5"
                    />
                 </div>
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    {(followerGoal.target - followerGoal.current).toLocaleString()} more to next level!
                 </p>
              </div>

              <Button variant="ghost" className="w-full mt-6 rounded-xl border border-primary/20 hover:bg-primary/10 text-primary font-black text-[10px] tracking-widest uppercase">
                 Support Goal
              </Button>
           </div>
        )}
      </div>
    </div>
  );
}
