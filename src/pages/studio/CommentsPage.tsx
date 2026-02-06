import { useState } from "react";
import { MessageSquare, MoreHorizontal, Reply, Pin, Trash2, ShieldAlert, Heart, Filter, Search, UserMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const comments = [
  { 
    id: 1, 
    user: "Alex_Visuals", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex", 
    content: "The way you explained the color theory was so helpful! Can't wait for the next video.", 
    video: "Mastering Digital Painting", 
    date: "2 hours ago",
    isHearted: true,
    isPinned: false
  },
  { 
    id: 2, 
    user: "Lofi_Lover", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lofi", 
    content: "Perfect study music. Please keep these coming daily!", 
    video: "Lofi Beats for Coding", 
    date: "5 hours ago",
    isHearted: false,
    isPinned: true
  },
  { 
    id: 3, 
    user: "CyberPunk99", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cyber", 
    content: "Check out my channel for free assets!", 
    video: "New Asset Pack Reveal", 
    date: "1 day ago",
    isHearted: false,
    isPinned: false,
    isFlagged: true
  },
  { 
    id: 4, 
    user: "Dev_Sarah", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah", 
    content: "Loved the breakdown. Very clean setup!", 
    video: "New Studio Setup", 
    date: "2 days ago",
    isHearted: true,
    isPinned: false
  }
];

export default function CommentsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gradient">Channel Comments</h1>
          <p className="text-muted-foreground mt-1">Manage and respond to your community's feedback.</p>
        </div>
        <div className="flex items-center gap-2 bg-muted/30 p-1 rounded-lg">
           {["All", "New", "Held for review", "Flagged"].map((f) => (
              <Button 
                key={f}
                variant="ghost" 
                size="sm" 
                onClick={() => { setActiveFilter(f); toast.info(`Filtered by: ${f}`); }}
                className={cn(
                   "h-9 px-4 rounded-md transition-all",
                   activeFilter === f ? "bg-primary/10 text-primary" : "hover:bg-muted"
                )}
              >
                 {f}
              </Button>
           ))}
        </div>
      </div>

      <div className="glass-card p-4 rounded-xl flex items-center gap-4">
         <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input placeholder="Search comments or users..." className="pl-10 h-11 bg-muted/20 border-border/50 rounded-lg focus:border-primary/50 focus:ring-2 focus:ring-primary/10" onChange={(e) => { if(e.target.value.length > 2) toast.info(`Searching: ${e.target.value}`); }} />
         </div>
         <Button variant="outline" className="h-11 rounded-lg gap-2 border-border/50" onClick={() => toast.success("Filter menu opened")}>
            <Filter className="h-4 w-4" /> Filter By Video
         </Button>
      </div>

      <div className="glass-card rounded-xl overflow-hidden shadow-glow-sm">
         <div className="divide-y divide-border/50">
            {comments.map((comment) => (
               <div key={comment.id} className="p-6 flex gap-4 hover:bg-primary/5 transition-all group">
                  <Avatar className="h-12 w-12 border-2 border-border/50 flex-shrink-0">
                     <AvatarImage src={comment.avatar} />
                     <AvatarFallback>{comment.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <span className="font-bold cursor-pointer hover:text-primary transition-colors" onClick={() => toast.info(`Viewing profile: ${comment.user}`)}>{comment.user}</span>
                           <span className="text-xs text-muted-foreground">{comment.date}</span>
                           {comment.isPinned && (
                              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 gap-1 h-5 px-1.5 text-[10px]">
                                 <Pin className="h-3 w-3" /> Pinned
                              </Badge>
                           )}
                           {comment.isFlagged && (
                              <Badge variant="destructive" className="bg-live/10 text-live border-live/20 gap-1 h-5 px-1.5 text-[10px]">
                                 <ShieldAlert className="h-3 w-3" /> Spam
                              </Badge>
                           )}
                        </div>
                        <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                 <MoreHorizontal className="h-4 w-4" />
                              </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent align="end" className="glass-strong border-border/50">
                              <DropdownMenuItem className="gap-2 focus:bg-primary/10" onClick={() => toast.success("Comment pinned")}>
                                 <Pin className="h-4 w-4" /> Pin comment
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive focus:bg-destructive/10" onClick={() => toast.error("Comment deleted")}>
                                 <Trash2 className="h-4 w-4" /> Delete
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive focus:bg-destructive/10" onClick={() => toast.error("User blocked")}>
                                 <UserMinus className="h-4 w-4" /> Block user
                              </DropdownMenuItem>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     </div>
                     <p className="text-sm leading-relaxed max-w-4xl">{comment.content}</p>
                     <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-4">
                           <Button variant="ghost" className="h-8 text-xs font-bold gap-2 rounded-lg hover:text-primary transition-colors" onClick={() => toast.success("Replying to comment...")}>
                              <Reply className="h-4 w-4" /> Reply
                           </Button>
                           <Button variant="ghost" size="icon" className={cn(
                              "h-8 w-8 rounded-lg transition-colors",
                              comment.isHearted ? "text-destructive hover:bg-destructive/10" : "text-muted-foreground hover:text-destructive"
                           )} onClick={() => toast.success(comment.isHearted ? "Heart removed" : "Heart added")}>
                              <Heart className={cn("h-4 w-4", comment.isHearted && "fill-current")} />
                           </Button>
                        </div>
                        <span className="text-[11px] text-muted-foreground italic">On video: <span className="font-bold text-foreground hover:text-primary cursor-pointer transition-colors" onClick={() => toast.info(`Navigating to video: ${comment.video}`)}>"{comment.video}"</span></span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
         <div className="p-6 border-t border-border/50 text-center">
            <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5 rounded-lg h-10 px-8" onClick={() => toast.info("Loading more comments...")}>Load More Comments</Button>
         </div>
      </div>
    </div>
  );
}


