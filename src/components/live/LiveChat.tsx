import { useState, useRef, useEffect } from "react";
import { Send, Smile, Settings, Crown, Sparkles, Gift, Heart, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  avatar: string;
  isMod?: boolean;
  isPremium?: boolean;
  isSuperchat?: boolean;
  badges?: string[];
}

const chatMessages: ChatMessage[] = [
  { id: 1, user: "RudyTune3", message: "🎉", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rudy", isPremium: true },
  { id: 2, user: "shayla11", message: "uwu", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=shayla", isPremium: true },
  { id: 3, user: "BotRix", message: "Loyalty points will reset every 3 months. Use your points wisely! Thank you ❤️ Next reset is October 30th.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=botrix", isMod: true },
  { id: 4, user: "Jujubebe", message: "😆", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=juju" },
  { id: 5, user: "Chulls_PE", message: "Gnight ❤️", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chulls", isPremium: true },
  { id: 6, user: "Mister_LavaLava", message: "😊", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lava" },
  { id: 7, user: "BotRix", message: "When Enaira is in the game, she might miss your chat. Please be patient.❤️", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=botrix", isMod: true },
  { id: 8, user: "Drak_Cula", message: "😎", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=drak" },
  { id: 9, user: "Scarface00700", message: "💜", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=scarface", isPremium: true },
  { id: 10, user: "Gadreel1947", message: "🔥", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gadreel" },
];

interface LiveChatProps {
  onSendTip?: () => void;
}

export function LiveChat({ onSendTip }: LiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);
  const [message, setMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e?: React.FormEvent, customMsg?: string) => {
    if (e) e.preventDefault();
    const finalMsg = customMsg || message;
    if (finalMsg.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now(),
        user: "You",
        message: finalMsg.trim(),
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
        isPremium: true
      };
      setMessages([...messages, newMessage]);
      if (!customMsg) setMessage("");
    }
  };

  const sendQuickReaction = (emoji: string) => {
    handleSend(undefined, emoji);
  };

  return (
    <div className="flex flex-col h-full border-l border-primary/20 bg-background/95 backdrop-blur-xl">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-primary/20 bg-background/50">
        <div className="flex items-center gap-2">
           <div className="h-2 w-2 rounded-full bg-live animate-pulse" />
           <h3 className="font-bold text-sm uppercase tracking-tighter">Live Chat</h3>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
          <Settings className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      {/* Gift Leaderboard - Premium Style */}
      <div className="flex items-center justify-between p-3 border-b border-primary/10 bg-primary/5">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
          <Crown className="h-3 w-3" /> Top Gifter
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="h-5 w-5 border border-primary/30">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=eddie" />
          </Avatar>
          <span className="text-[10px] font-bold">Eddie</span>
          <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-primary/20 border border-primary/30">
             <span className="text-[9px] font-black">50</span>
             <Gift className="h-2 w-2 text-primary" />
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 px-4 py-2">
        <div className="space-y-4 py-2">
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-3 group animate-fade-in">
              <Avatar className="h-7 w-7 flex-shrink-0 border border-white/5">
                <AvatarImage src={msg.avatar} />
                <AvatarFallback>{msg.user[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className={cn(
                    "text-[11px] font-black uppercase tracking-tight",
                    msg.isMod ? "text-green-400" : msg.user === "You" ? "text-primary" : "text-muted-foreground/80"
                  )}>
                    {msg.user}
                  </span>
                  <p className="text-sm text-foreground/90 leading-tight break-words">
                    {msg.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Chat Input Area */}
      <div className="p-4 border-t border-primary/20 bg-background/50">
        <form onSubmit={handleSend} className="space-y-3">
          <div className="relative group">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Send a message..."
              className="h-11 bg-white/5 border-primary/10 rounded-xl focus:border-primary/50 focus:ring-primary/20 pr-10 placeholder:text-muted-foreground/50 transition-all"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-primary/10 text-muted-foreground"
            >
              <Smile className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
               <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 text-primary">
                  <Sparkles className="h-4 w-4" />
               </Button>
               <Button 
                type="button" 
                onClick={() => sendQuickReaction("❤️")} 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-lg hover:bg-red-500/20 text-red-500"
               >
                  <Heart className="h-4 w-4 fill-current" />
               </Button>
               <Button 
                type="button" 
                onClick={() => sendQuickReaction("📧")} 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-lg hover:bg-blue-500/20 text-blue-500"
               >
                  <Mail className="h-4 w-4" />
               </Button>
               <Button type="button" onClick={onSendTip} variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 text-yellow-500">
                  <Gift className="h-4 w-4" />
               </Button>
            </div>
            <Button 
              type="submit" 
              className="h-9 px-6 rounded-xl bg-primary text-black font-black text-xs hover:shadow-glow-primary transition-all"
            >
              CHAT
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
