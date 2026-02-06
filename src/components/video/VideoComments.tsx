import { useState } from "react";
import { MessageSquare, ThumbsUp, Reply, MoreVertical, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  timestamp: string;
  likes: number;
  replies?: number;
}

const mockComments: Comment[] = [
  {
    id: "1",
    user: { name: "Alex Rivers", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex" },
    text: "This breakdown is incredible! Been waiting for something this detailed for a long time. 💜",
    timestamp: "2 hours ago",
    likes: 245,
    replies: 12
  },
  {
    id: "2",
    user: { name: "Sarah Zen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" },
    text: "The marketing strategy section really changed my perspective. Thank you for sharing these secrets!",
    timestamp: "5 hours ago",
    likes: 89
  },
  {
    id: "3",
    user: { name: "DevGamer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dev" },
    text: "Quality content as always. The Obsidian theme on your dashboard looks sick btw.",
    timestamp: "1 day ago",
    likes: 156,
    replies: 5
  }
];

export function VideoComments() {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        user: { 
          name: "You", 
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user" 
        },
        text: newComment.trim(),
        timestamp: "Just now",
        likes: 0
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black uppercase tracking-widest text-white/90">
          Comments <span className="text-primary ml-2">{comments.length}</span>
        </h3>
        <Button variant="ghost" className="text-muted-foreground hover:text-primary font-bold text-xs">
          SORT BY
        </Button>
      </div>

      {/* Write Comment */}
      <div className="flex gap-4 p-6 glass-card rounded-2xl border-white/5 bg-white/[0.02]">
        <Avatar className="h-10 w-10 border border-primary/20">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
          <AvatarFallback>Y</AvatarFallback>
        </Avatar>
        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          <div className="relative group">
            <Input 
              placeholder="Add a comment..." 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-all placeholder:text-muted-foreground/30 font-medium"
            />
          </div>
          <div className="flex justify-end gap-3">
             <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setNewComment("")}
              className="text-muted-foreground hover:text-white font-bold text-xs"
             >
              CANCEL
             </Button>
             <Button 
              type="submit" 
              disabled={!newComment.trim()}
              className="bg-primary text-black font-black text-xs px-6 rounded-xl hover:shadow-glow-primary transition-all disabled:opacity-50 disabled:hover:shadow-none"
             >
              COMMENT
             </Button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 group">
            <Avatar className="h-10 w-10 shrink-0 border border-white/5">
              <AvatarImage src={comment.user.avatar} />
              <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-white/90">{comment.user.name}</span>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">{comment.timestamp}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-xl border-white/5">
                    <DropdownMenuItem className="text-xs font-bold uppercase">Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-sm text-white/70 leading-relaxed font-medium">
                {comment.text}
              </p>
              <div className="flex items-center gap-6 pt-1">
                <div className="flex items-center gap-1.5 grayscale hover:grayscale-0 transition-all cursor-pointer group/like">
                  <ThumbsUp className="h-3.5 w-3.5 text-primary group-hover/like:scale-110 transition-transform" />
                  <span className="text-[10px] font-black text-muted-foreground">{comment.likes}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors cursor-pointer group/reply">
                  <Reply className="h-3.5 w-3.5 group-hover/reply:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Reply</span>
                </div>
              </div>
              {comment.replies && (
                 <Button variant="ghost" className="h-8 p-0 text-primary font-black text-[10px] tracking-widest uppercase hover:bg-transparent hover:text-primary/70">
                    View {comment.replies} Replies
                 </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
