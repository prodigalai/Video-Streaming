import { Search, Sparkles, UserPlus, Signal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Conversation {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    isCreator?: boolean;
    isVerified?: boolean;
    isOnline?: boolean;
  };
  lastMessage: {
    text: string;
    timestamp: Date;
    isRead: boolean;
  };
  unreadCount: number;
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    user: {
      id: "luna",
      name: "Luna Live",
      username: "luna_live",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
      isCreator: true,
      isVerified: true,
      isOnline: true,
    },
    lastMessage: {
      text: "Thanks for the support! 💖",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isRead: false
    },
    unreadCount: 2
  },
  {
    id: "c2",
    user: {
      id: "gamer",
      name: "GamerPro",
      username: "gamerpro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gamer",
      isCreator: true,
      isVerified: true,
      isOnline: false,
    },
    lastMessage: {
      text: "Did you catch the end of the stream?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isRead: true
    },
    unreadCount: 0
  },
  {
    id: "c3",
    user: {
      id: "alex",
      name: "Alex Gamer",
      username: "alex_plays",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      isCreator: false,
      isOnline: true,
    },
    lastMessage: {
      text: "Yo! When are you going live again?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      isRead: true
    },
    unreadCount: 0
  }
];

export function ConversationList({ onSelect, selectedId }: { onSelect: (id: string) => void, selectedId?: string }) {
  const [search, setSearch] = useState("");
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);

  const filtered = conversations.filter(c => 
    c.user.name.toLowerCase().includes(search.toLowerCase()) || 
    c.user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#0a0a0f] border-r border-white/5 relative overflow-hidden">
      
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-violet-600/[0.03] to-transparent pointer-events-none" />

      <div className="p-6 border-b border-white/5 space-y-6 relative z-10">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Signal className="h-4 w-4 text-violet-500" />
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Encrypted Sat-Links</h2>
            </div>
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white transition-all">
                <UserPlus className="h-4 w-4" />
            </Button>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-violet-500 transition-colors" />
          <Input 
            placeholder="Search channels..." 
            className="h-11 pl-12 bg-white/5 border-white/5 focus-visible:border-violet-500/50 rounded-2xl text-xs font-bold uppercase tracking-widest placeholder:text-white/10" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
        <AnimatePresence mode="popLayout">
            {filtered.map((conv, index) => (
            <motion.div 
                key={conv.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelect(conv.id)}
                className={cn(
                "group relative flex items-center gap-4 p-5 cursor-pointer transition-all border-l-4 border-transparent hover:bg-white/[0.03]",
                selectedId === conv.id ? "bg-white/[0.05] border-violet-500 shadow-2xl" : "border-transparent"
                )}
            >
                <div className="relative shrink-0">
                    <div className={cn(
                        "p-0.5 rounded-2xl transition-all group-hover:scale-105",
                        conv.user.isOnline ? "bg-gradient-to-br from-violet-600 to-fuchsia-600" : "bg-white/10"
                    )}>
                        <Avatar className="h-14 w-14 rounded-[0.9rem] border-2 border-[#0a0a0f]">
                            <AvatarImage src={conv.user.avatar} className="object-cover" />
                            <AvatarFallback className="bg-[#1a1a24] text-white font-black">{conv.user.name[0]}</AvatarFallback>
                        </Avatar>
                    </div>
                    {conv.user.isOnline && (
                        <span className="absolute -bottom-1 -right-1 h-5 w-5 bg-black rounded-full flex items-center justify-center border-2 border-[#0a0a0f] shadow-lg">
                           <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        </span>
                    )}
                </div>
                
                <div className="flex-1 min-w-0 py-1">
                    <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                            <h4 className={cn(
                                "text-[11px] font-black uppercase tracking-wider truncate transition-colors",
                                selectedId === conv.id ? "text-white" : "text-white/60 group-hover:text-white"
                            )}>
                                {conv.user.name}
                            </h4>
                            {conv.user.isVerified && <Sparkles className="h-3 w-3 text-violet-400 shrink-0" />}
                        </div>
                        <span className="text-[9px] font-black text-white/10 uppercase tracking-widest whitespace-nowrap">
                            {formatDistanceToNow(conv.lastMessage.timestamp, { addSuffix: false })}
                        </span>
                    </div>
                    <div className="flex justify-between items-center gap-3">
                        <p className={cn(
                            "text-[10px] truncate leading-relaxed tracking-wide font-medium",
                            !conv.lastMessage.isRead ? "text-white/80 font-bold" : "text-white/30 group-hover:text-white/40"
                        )}>
                            {conv.lastMessage.text}
                        </p>
                        {conv.unreadCount > 0 && (
                            <motion.span 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="h-5 w-5 rounded-full bg-violet-600 flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-violet-500/30 shrink-0"
                            >
                                {conv.unreadCount}
                            </motion.span>
                        )}
                    </div>
                </div>

                {/* Hover Indicator */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-1 bg-violet-600 rounded-l-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            ))}
        </AnimatePresence>

        {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center">
                    <Search className="h-5 w-5 text-white/10" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">No matching connections detected.</p>
            </div>
        )}
      </div>

      <div className="p-4 bg-white/[0.01] border-t border-white/5 flex items-center justify-center">
          <p className="text-[8px] font-black text-white/10 uppercase tracking-[0.5em]">Transmitting via Sec-Channel v4.2</p>
      </div>
    </div>
  );
}
