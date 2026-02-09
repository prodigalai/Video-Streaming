import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  DollarSign, 
  MoreHorizontal, 
  Lock,
  PlayCircle,
  Image as ImageIcon,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CommentsSection } from "@/components/comments/CommentsSection";
import { SubscribeDialog } from "@/components/feed/SubscribeDialog";
import { BentoVideoPlayer } from "@/components/feed/BentoVideoPlayer";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Post {
  id: string;
  creator: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    isVerified?: boolean;
  };
  content: {
    text: string;
    media?: {
      type: 'image' | 'video';
      url: string;
      thumbnail?: string; // For videos
      isLocked?: boolean;
    }[];
  };
  stats: {
    likes: number;
    comments: number;
    tips: number;
  };
  timestamp: string;
  isLiked?: boolean;
}

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.stats.likes);
  const [isTipping, setIsTipping] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [showHeartPop, setShowHeartPop] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      setShowHeartPop(true);
      setTimeout(() => setShowHeartPop(false), 1000);
      setLikeCount(prev => prev + 1);
      setIsLiked(true);
    } else {
      setLikeCount(prev => prev - 1);
      setIsLiked(false);
    }
  };

  const handleTip = () => {
    setIsTipping(true);
    setTimeout(() => {
        setIsTipping(false);
        toast.success(`Sent 5 credits to ${post.creator.name}!`, {
            icon: <DollarSign className="h-4 w-4 text-green-500" />,
            style: { background: '#0f0f14', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }
        });
    }, 1000);
  };

  const handleSubscribe = () => {
    setIsSubscribeOpen(true);
  };

  return (
    <>
    <SubscribeDialog 
        isOpen={isSubscribeOpen} 
        onOpenChange={setIsSubscribeOpen} 
        creatorName={post.creator.name} 
    />
    
    <article className="animate-fade-in bg-[#0f0f14] border border-white/10 sm:rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,.4)] overflow-hidden mb-8 transition-all hover:border-white/20 relative">
      <AnimatePresence>
        {showHeartPop && (
          <motion.div 
            initial={{ scale: 0, opacity: 0, y: 0 }}
            animate={{ scale: 1.5, opacity: 1, y: -100 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <Heart className="h-24 w-24 text-red-500 fill-current drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]" />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <Link to={`/creator/${post.creator.username}`} className="flex items-center gap-4 group">
          <div className="relative">
            <Avatar className="h-12 w-12 border-2 border-transparent group-hover:border-primary transition-all shadow-lg">
              <AvatarImage src={post.creator.avatar} />
              <AvatarFallback>{post.creator.name[0]}</AvatarFallback>
            </Avatar>
            {post.creator.isVerified && (
              <div className="absolute -right-0.5 -bottom-0.5 h-4 w-4 rounded-full bg-violet-600 border-2 border-[#0f0f14] flex items-center justify-center">
                <CheckCircle2 className="h-2.5 w-2.5 text-white" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-1 group-hover:text-primary transition-colors tracking-tight">
              {post.creator.name}
            </h3>
            <p className="text-xs text-muted-foreground font-medium opacity-80">@{post.creator.username} • {post.timestamp}</p>
          </div>
        </Link>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white rounded-full">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="space-y-4">
          {description(post.content.text)}
          
           {/* Media Grid - Edge to Edge */}
           {post.content.media && post.content.media.length > 0 && (
               <div className={cn(
                   "relative w-full overflow-hidden bg-black/50 border-y border-white/5 max-h-[70vh]",
                   post.content.media.length > 1 ? "grid grid-cols-2 gap-0.5" : ""
               )}>
                  {post.content.media.map((item, idx) => (
                      <div key={idx} className={cn(
                          "relative aspect-auto min-h-[300px] max-h-[60vh] flex items-center justify-center bg-zinc-900 group",
                          item.isLocked && "blur-xl scale-105"
                      )}>
                         {/* Locked Content Overlay */}
                         {item.isLocked ? (
                             <>
                                <img src={item.url} alt="Locked Content" className="w-full h-full object-cover opacity-30 blur-2xl pointer-events-none" />
                                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md p-6 text-center">
                                    <div className="h-16 w-16 mb-4 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-2xl">
                                        <Lock className="h-8 w-8 text-white animate-pulse" />
                                    </div>
                                    <h4 className="text-xl font-black text-white mb-1 uppercase tracking-tight">Premium Post</h4>
                                    <p className="text-xs text-white/60 mb-6 max-w-[200px]">Unlock this exclusive content by subscribing today.</p>
                                    <Button 
                                      onClick={handleSubscribe}
                                      className="bg-violet-600 hover:bg-violet-700 text-white font-bold w-full max-w-[220px] rounded-full h-11 shadow-lg shadow-violet-500/20 py-0 border-none transition-all hover:scale-[1.02]"
                                    >
                                        Unlock for $5.00
                                    </Button>
                                </div>
                             </>
                         ) : (
                             <>
                                {item.type === 'video' ? (
                                    <BentoVideoPlayer 
                                        src={item.url} 
                                        thumbnail={item.thumbnail} 
                                    />
                                ) : (
                                    <img src={item.url} className="w-full h-full object-cover" loading="lazy" />
                                )}
                             </>
                         )}
                     </div>
                 ))}
              </div>
          )}
      </div>

      {/* Actions */}
      <div className="px-4 py-4 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-5">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={cn("px-0 h-auto hover:bg-transparent transition-colors", isLiked ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-white")}
                    onClick={handleLike}
                  >
                      <Heart className={cn("h-6 w-6 mr-1.5 transition-transform active:scale-125", isLiked && "fill-current")} />
                      <span className="font-bold text-sm tracking-tight">{likeCount}</span>
                  </Button>
                  
                  <Sheet open={isCommentsOpen} onOpenChange={setIsCommentsOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="sm" className="px-0 h-auto hover:bg-transparent text-muted-foreground hover:text-white transition-colors">
                          <MessageCircle className="h-6 w-6 mr-1.5" />
                          <span className="font-bold text-sm tracking-tight">{post.stats.comments}</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full sm:w-[440px] p-0 border-l border-white/10 bg-[#0f0f13] text-white">
                        <SheetHeader className="p-4 border-b border-white/5">
                            <SheetTitle>Comments</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col h-[calc(100vh-60px)]">
                            <CommentsSection postId={post.id} creatorId={post.creator.id} />
                        </div>
                    </SheetContent>
                  </Sheet>
              </div>
              
              <div className="flex items-center gap-2">
                  <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-9 px-4 rounded-full border-white/10 text-xs font-bold hover:bg-white/5"
                      onClick={handleTip}
                      disabled={isTipping}
                    >
                      <DollarSign className="h-3.5 w-3.5 mr-1" />
                      Tip
                  </Button>
                  <Button 
                    onClick={handleSubscribe}
                    className="h-9 px-5 rounded-full bg-violet-600 hover:bg-violet-700 text-white text-xs font-black shadow-lg shadow-violet-500/10 transition-transform active:scale-95"
                  >
                    Subscribe
                  </Button>
              </div>
          </div>
          
          {/* Recent Comments Preview */}
          <div 
            className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer hover:text-white transition-colors"
            onClick={() => setIsCommentsOpen(true)}
          >
              <span className="font-bold text-white">user123</span>
              <span className="truncate">Obsessed with this! 🔥</span>
              <span className="text-muted-foreground/50 ml-auto text-[10px]">View all {post.stats.comments} comments</span>
          </div>
      </div>

    </article>
    </>
  );
}

function description(text: string) {
    // Simple helper to render text with hashtags highlighted
    const parts = text.split(/(\s+)/);
    return (
        <div className="px-4 text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
            {parts.map((part, i) => 
                part.startsWith('#') ? <span key={i} className="text-primary hover:underline cursor-pointer">{part}</span> : part
            )}
        </div>
    );
}
