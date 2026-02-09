import { useState } from "react";
import { Search, MoreHorizontal, Send, Paperclip, Phone, Video, Info, ArrowLeft, Check, CheckCheck, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data
const conversations = [
  {
    id: 1,
    user: "Alex Visuals",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    lastMessage: "The color grading on that last video was insane! How did you achieve that teal look?",
    time: "2m ago",
    unread: 2,
    online: true,
    type: "Subscriber"
  },
  {
    id: 2,
    user: "Sarah Creative",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    lastMessage: "Hey! Just wanted to ask about the collaboration we discussed.",
    time: "1h ago",
    unread: 0,
    online: false,
    type: "Collab"
  },
  {
    id: 3,
    user: "Mike Audio",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    lastMessage: "I sent over the audio files. Let me know if you need anything else.",
    time: "3h ago",
    unread: 1,
    online: true,
    type: "Editor"
  },
  {
    id: 4,
    user: "Jessica Design",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
    lastMessage: "Thanks for the shoutout in your stream!",
    time: "1d ago",
    unread: 0,
    online: false,
    type: "Subscriber"
  },
  {
    id: 5,
    user: "David Tech",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    lastMessage: "Are you planning to review the new GPU?",
    time: "2d ago",
    unread: 0,
    online: true,
    type: "Subscriber"
  }
];

const messages = [
  { id: 1, sender: "other", content: "Hey! Loved your recent video on color theory.", time: "10:30 AM" },
  { id: 2, sender: "me", content: "Thanks Alex! Really appreciate the support. Glad you found it helpful.", time: "10:32 AM", status: "read" },
  { id: 3, sender: "other", content: "The color grading on that last video was insane! How did you achieve that teal look?", time: "10:33 AM" },
];

export default function CommentsPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [mobileView, setMobileView] = useState("list"); // 'list' or 'chat'

  const activeChat = conversations.find(c => c.id === selectedChat);

  const handleChatSelect = (id: number) => {
    setSelectedChat(id);
    setMobileView("chat");
  };

  const handleBackToList = () => {
    setMobileView("list");
    setSelectedChat(null);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] rounded-2xl border border-border/50 bg-card overflow-hidden shadow-sm animate-fade-in">
      
      {/* Sidebar / Chat List */}
      <div className={cn(
        "w-full md:w-80 lg:w-96 border-r border-border/50 flex flex-col bg-muted/10",
        mobileView === "chat" ? "hidden md:flex" : "flex"
      )}>
        <div className="p-4 border-b border-border/50 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-foreground">Messages</h1>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-9 bg-background border-border/50" />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="flex flex-col p-2 gap-1">
            {conversations.map((chat) => (
              <button
                key={chat.id}
                onClick={() => handleChatSelect(chat.id)}
                className={cn(
                  "flex items-start gap-3 p-3 text-left rounded-xl transition-all hover:bg-muted/50",
                  selectedChat === chat.id ? "bg-primary/10 hover:bg-primary/15" : "transparent"
                )}
              >
                <div className="relative shrink-0">
                  <Avatar className="h-10 w-10 md:h-12 md:w-12 border border-border/50">
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>{chat.user[0]}</AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className={cn("text-sm font-bold truncate", selectedChat === chat.id ? "text-primary" : "text-foreground")}>
                      {chat.user}
                    </p>
                    <span className="text-[10px] md:text-xs text-muted-foreground whitespace-nowrap">{chat.time}</span>
                  </div>
                  <p className={cn(
                      "text-xs md:text-sm truncate",
                      chat.unread > 0 ? "font-semibold text-foreground" : "text-muted-foreground"
                    )}>
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <div className="flex flex-col items-end justify-center h-full">
                     <Badge className="h-5 min-w-[1.25rem] px-1.5 rounded-full flex items-center justify-center bg-primary text-primary-foreground text-[10px] shadow-sm border-0">
                        {chat.unread}
                     </Badge>
                  </div>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className={cn(
        "flex-1 flex flex-col bg-background/50",
        mobileView === "list" ? "hidden md:flex" : "flex"
      )}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border/50 flex items-center justify-between bg-card/50 backdrop-blur-sm z-10">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="md:hidden -ml-2 mr-1" onClick={handleBackToList}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="relative">
                  <Avatar className="h-10 w-10 border border-border/50">
                    <AvatarImage src={activeChat?.avatar} />
                    <AvatarFallback>{activeChat?.user[0]}</AvatarFallback>
                  </Avatar>
                  {activeChat?.online && (
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background" />
                  )}
                </div>
                <div>
                  <h2 className="text-sm md:text-base font-bold text-foreground flex items-center gap-2">
                    {activeChat?.user}
                    <Badge variant="outline" className="text-[10px] h-5 px-2 bg-primary/5 text-primary border-primary/20">{activeChat?.type}</Badge>
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {activeChat?.online ? "Active now" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 md:gap-2">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hidden sm:inline-flex">
                  <Info className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages List */}
            <ScrollArea className="flex-1 p-4 md:p-6 bg-muted/5">
              <div className="space-y-6">
                <div className="flex items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground bg-background/80 border border-border/50 px-3 py-1 rounded-full shadow-sm">Today</span>
                </div>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex gap-3 max-w-[85%] md:max-w-[75%]",
                      msg.sender === "me" ? "ml-auto flex-row-reverse" : ""
                    )}
                  >
                   {msg.sender !== "me" && (
                    <Avatar className="h-8 w-8 mt-1 border border-border/50 hidden sm:block">
                      <AvatarImage src={activeChat?.avatar} />
                      <AvatarFallback>{activeChat?.user[0]}</AvatarFallback>
                    </Avatar>
                   )}
                    <div className={cn(
                      "space-y-1",
                      msg.sender === "me" ? "text-right" : "text-left"
                    )}>
                      <div className={cn(
                        "p-3 md:p-4 rounded-2xl md:rounded-3xl text-sm md:text-base shadow-sm",
                        msg.sender === "me" 
                          ? "bg-primary text-primary-foreground rounded-tr-none" 
                          : "bg-card border border-border/50 text-foreground rounded-tl-none"
                      )}>
                        {msg.content}
                      </div>
                      <div className={cn(
                        "flex items-center gap-1 text-[10px] md:text-xs text-muted-foreground px-1",
                        msg.sender === "me" ? "justify-end" : "justify-start"
                      )}>
                        {msg.time}
                        {msg.sender === "me" && (
                          <span className="ml-1">
                            {msg.status === "read" ? <CheckCheck className="h-3 w-3 text-primary" /> : <Check className="h-3 w-3" />}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-3 md:p-4 border-t border-border/50 bg-card/50 backdrop-blur-sm">
               <div className="flex items-end gap-2 md:gap-3 bg-muted/30 p-2 rounded-xl md:rounded-2xl border border-border/50 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all">
                  <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-primary rounded-xl shrink-0">
                     <Paperclip className="h-5 w-5" />
                  </Button>
                  <div className="flex-1 py-2">
                     <Input 
                        placeholder="Type a message..." 
                        className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-sm md:text-base placeholder:text-muted-foreground/50" 
                     />
                  </div>
                  <Button size="icon" className="h-10 w-10 rounded-xl bg-primary shadow-lg shadow-primary/20 hover:scale-105 transition-all shrink-0">
                     <Send className="h-4 w-4 ml-0.5" />
                  </Button>
               </div>
            </div>
          </>
        ) : (
             // Empty State (Desktop)
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-muted/5">
             <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-pulse">
                <Search className="h-10 w-10 text-primary" />
             </div>
             <h2 className="text-2xl font-bold text-foreground mb-2">Select a conversation</h2>
             <p className="text-muted-foreground max-w-sm">Choose a chat from the sidebar to start messaging your community members.</p>
          </div>
        )}
      </div>
    </div>
  );
}
