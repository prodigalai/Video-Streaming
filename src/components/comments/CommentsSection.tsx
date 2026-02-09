import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoreHorizontal, Heart, MessageCircle, Reply, Trash2, Flag, Send } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Comment {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    isCreator?: boolean;
  };
  text: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
  replies: Comment[];
  parentId?: string;
}

interface CommentsSectionProps {
  postId: string;
  creatorId: string; // To check if current user is the creator
}

// Mock initial comments data
const INITIAL_COMMENTS: Comment[] = [
  {
    id: "c1",
    user: {
      id: "u1",
      name: "Alex Rivera",
      username: "alex_r",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    },
    text: "This is absolutely stunning! The lighting is perfect. 🔥",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    likes: 24,
    isLiked: false,
    replies: [
      {
        id: "c1-r1",
        user: {
          id: "luna",
          name: "Luna Live",
          username: "luna_live",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
          isCreator: true,
        },
        text: "Thank you Alex! It took a few tries to get right 😊",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hour ago
        likes: 5,
        isLiked: true,
        replies: [],
        parentId: "c1"
      }
    ]
  },
  {
    id: "c2",
    user: {
      id: "u2",
      name: "Sarah Chen",
      username: "sarahc",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    text: "Can't wait for the next stream! 🎥",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    likes: 12,
    isLiked: false,
    replies: []
  },
  {
    id: "c3",
    user: {
      id: "luna",
      name: "Luna Live",
      username: "luna_live",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
      isCreator: true,
    },
    text: "Thanks for the love everyone! ❤️ Check my bio for the preset link.",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
    likes: 64,
    isLiked: true,
    replies: []
  }
];

export function CommentsSection({ postId, creatorId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Mock current user
  const currentUser = {
    id: "luna", // Simulating being the creator for demo purposes
    name: "Luna Live",
    username: "luna_live",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
    isCreator: true
  };

  const handlePostComment = () => {
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      id: `new-${Date.now()}`,
      user: currentUser,
      text: newComment,
      timestamp: new Date(),
      likes: 0,
      isLiked: false,
      replies: []
    };

    if (replyingTo) {
      // Add as reply
      setComments(prev => prev.map(c => {
        if (c.id === replyingTo.id || c.id === replyingTo.parentId) {
          return {
            ...c,
            replies: [...c.replies, { ...newCommentObj, parentId: c.id }]
          };
        }
        return c;
      }));
      toast.success("Reply posted!");
    } else {
      // Add as top-level comment
      setComments(prev => [newCommentObj, ...prev]);
      toast.success("Comment posted!");
    }

    setNewComment("");
    setReplyingTo(null);
  };

  const handleDelete = (commentId: string, parentId?: string) => {
      if (parentId) {
          setComments(prev => prev.map(c => {
              if (c.id === parentId) {
                  return { ...c, replies: c.replies.filter(r => r.id !== commentId) };
              }
              return c;
          }));
      } else {
          setComments(prev => prev.filter(c => c.id !== commentId));
      }
      toast.success("Comment deleted");
  };

  const handleLike = (commentId: string, parentId?: string) => {
      // TODO: Optimistic UI update logic for likes
      toast.success("Liked comment");
  };

  const initiateReply = (comment: Comment, parent: Comment | null) => {
      const target = parent || comment; // Always reply to the top-level parent visually
      setReplyingTo(target);
      const mention = `@${comment.user.username} `;
      setNewComment(mention);
      inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f13]">
      <div className="p-4 border-b border-white/5">
         <h3 className="font-bold text-lg">Comments ({comments.reduce((acc, c) => acc + 1 + c.replies.length, 0)})</h3>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentItem 
              key={comment.id} 
              comment={comment} 
              currentUser={currentUser}
              onReply={(c) => initiateReply(c, null)}
              onDelete={(id) => handleDelete(id)}
              onLike={handleLike}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-white/5 bg-[#0f0f13]">
         {replyingTo && (
             <div className="flex items-center justify-between text-xs text-muted-foreground mb-2 px-2">
                 <span>Replying to <span className="font-bold text-primary">@{replyingTo.user.username}</span></span>
                 <button onClick={() => { setReplyingTo(null); setNewComment(""); }} className="hover:text-white">Cancel</button>
             </div>
         )}
         <div className="flex gap-3">
             <Avatar className="h-8 w-8">
                 <AvatarImage src={currentUser.avatar} />
                 <AvatarFallback>ME</AvatarFallback>
             </Avatar>
             <div className="flex-1 relative">
                 <Textarea 
                    ref={inputRef}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={replyingTo ? "Write a reply..." : "Add a comment..."}
                    className="min-h-[44px] max-h-32 bg-white/5 border-white/10 focus:border-primary/50 resize-y rounded-xl pr-12"
                 />
                 <Button 
                    size="icon" 
                    className="absolute bottom-1 right-1 h-8 w-8 rounded-lg" 
                    disabled={!newComment.trim()}
                    onClick={handlePostComment}
                 >
                     <Send className="h-4 w-4" />
                 </Button>
             </div>
         </div>
      </div>
    </div>
  );
}

// Sub-component for individual comment interface
function CommentItem({ 
    comment, 
    currentUser, 
    onReply, 
    onDelete, 
    onLike,
    parent
}: { 
    comment: Comment, 
    currentUser: any, 
    onReply: (c: Comment) => void, 
    onDelete: (id: string, parentId?: string) => void,
    onLike: (id: string, parentId?: string) => void,
    parent?: Comment
}) {
    const isOwner = currentUser.id === comment.user.id;
    const canManage = isOwner || currentUser.isCreator;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2">
            <div className="flex gap-3 group">
                <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={comment.user.avatar} />
                    <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={cn("font-bold text-sm", comment.user.isCreator && "text-primary")}>
                            {comment.user.name}
                        </span>
                        {comment.user.isCreator && (
                             <span className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Creator</span>
                        )}
                        <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                        </span>
                    </div>
                    
                    <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap mb-2">
                         {/* Basic highlight for mentions */}
                        {comment.text.split(/(@\w+)/).map((part, i) => 
                            part.startsWith('@') ? <span key={i} className="text-primary font-medium">{part}</span> : part
                        )}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <button 
                            className="flex items-center gap-1 hover:text-red-500 transition-colors"
                            onClick={() => onLike(comment.id, parent?.id)}
                        >
                            <Heart className={cn("h-3.5 w-3.5", comment.isLiked && "fill-red-500 text-red-500")} />
                            {comment.likes > 0 && <span>{comment.likes}</span>}
                        </button>
                        <button 
                            className="flex items-center gap-1 hover:text-white transition-colors"
                            onClick={() => onReply(comment)}
                        >
                            <span className="font-bold">Reply</span>
                        </button>
                        
                        {/* More Actions */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-white p-1">
                                    <MoreHorizontal className="h-3.5 w-3.5" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-32 bg-[#1a1a1f] border-white/10">
                                {canManage ? (
                                    <DropdownMenuItem className="text-red-500 focus:text-red-500 cursor-pointer" onClick={() => onDelete(comment.id, parent?.id)}>
                                        <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuItem className="cursor-pointer">
                                        <Flag className="h-3.5 w-3.5 mr-2" /> Report
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* Render Replies Recursively */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="pl-11 pt-4 space-y-4 relative">
                    {/* Thread line visual */}
                    <div className="absolute left-[19px] top-0 bottom-6 w-0.5 bg-white/5 rounded-full" />
                    
                    {comment.replies.map(reply => (
                        <CommentItem 
                            key={reply.id} 
                            comment={reply} 
                            currentUser={currentUser}
                            onReply={(c) => onReply(c)} // Reply to reply bubbles up to parent visually for now usually
                            onDelete={onDelete}
                            onLike={onLike}
                            parent={comment}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

