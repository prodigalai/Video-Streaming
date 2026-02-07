import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Smile, 
  Paperclip, 
  Mic, 
  Send,
  Check,
  CheckCheck,
  Circle,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const conversations = [
  {
    id: 1,
    user: {
      name: "Luna_Live",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
      status: "online",
      isCreator: true
    },
    lastMessage: "Thanks for the donation! 🙏",
    time: "2m ago",
    unread: 2,
    isActive: true
  },
  {
    id: 2,
    user: {
      name: "TechVibes",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tech",
      status: "offline",
      isCreator: true
    },
    lastMessage: "Did you see the new setup video?",
    time: "1h ago",
    unread: 0,
    isActive: false
  },
  {
    id: 3,
    user: {
      name: "GamerPro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gamer",
      status: "dnd",
      isCreator: false
    },
    lastMessage: "GG yesterday!",
    time: "1d ago",
    unread: 0,
    isActive: false
  },
  {
    id: 4,
    user: {
      name: "Alice Wonderland",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      status: "online",
      isCreator: false
    },
    lastMessage: "Can you help me with the stream key?",
    time: "2d ago",
    unread: 0,
    isActive: false
  }
];

const initialChatHistory = [
  {
    id: 1,
    sender: "Luna_Live",
    content: "Hey! Just wanted to say thanks for tuning in yesterday.",
    time: "10:30 AM",
    isMe: false
  },
  {
    id: 2,
    sender: "me",
    content: "No problem! love the content. The new overlay looks sick!",
    time: "10:32 AM",
    isMe: true
  },
  {
    id: 3,
    sender: "Luna_Live",
    content: "Thank you! spent all weekend working on it 😅",
    time: "10:33 AM",
    isMe: false
  },
  {
    id: 4,
    sender: "Luna_Live",
    content: "Thanks for the donation! 🙏",
    time: "10:33 AM",
    isMe: false
  }
];

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState("");
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [chatHistory, setChatHistory] = useState(initialChatHistory);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    
    const newMessage = {
      id: chatHistory.length + 1,
      sender: "me",
      content: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    
    setChatHistory([...chatHistory, newMessage]);
    setMessageInput("");

    // Mock Reply Sequence
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const reply = {
          id: chatHistory.length + 2,
          sender: activeChat.user.name,
          content: "Got your message! Let's chat more later. 💜✨",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: false
        };
        setChatHistory(prev => [...prev, reply]);
      }, 2000);
    }, 1000);
  };

  const onChatSelect = (chat: typeof conversations[0]) => {
    setActiveChat(chat);
    setShowMobileChat(true);
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-4rem)] bg-[#05020d] flex overflow-hidden relative">
        
        {/* Sidebar - Conversations List */}
        <div className={cn(
          "w-full md:w-96 border-r border-white/5 flex flex-col bg-black/40 absolute md:relative z-10 h-full transition-transform duration-300 md:translate-x-0 backdrop-blur-md",
          showMobileChat ? "-translate-x-full md:translate-x-0" : "translate-x-0"
        )}>
          
          {/* Header */}
          <div className="p-4 border-b border-white/5 flex items-center justify-between shrink-0">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent underline decoration-primary/30 decoration-2 underline-offset-8">Messages</h1>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          {/* Search */}
          <div className="p-4 pt-2 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search messages..." 
                className="pl-9 bg-white/5 border-white/10 focus:border-primary/50 rounded-xl"
              />
            </div>
          </div>

          {/* List */}
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {conversations.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => onChatSelect(chat)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-2xl transition-all hover:bg-white/5 text-left group",
                    activeChat.id === chat.id && "bg-primary/20"
                  )}
                >
                  <div className="relative shrink-0">
                    <Avatar className={cn("h-12 w-12 border-2", activeChat.id === chat.id ? "border-primary" : "border-transparent")}>
                      <AvatarImage src={chat.user.avatar} />
                      <AvatarFallback>{chat.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className={cn(
                      "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
                      chat.user.status === 'online' ? "bg-green-500" : 
                      chat.user.status === 'dnd' ? "bg-red-500" : "bg-gray-500"
                    )} />
                  </div>
                  
                  <div className={cn(
                    "flex-1 min-w-0 overflow-hidden",
                  )}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-semibold text-base text-white truncate flex items-center gap-1.5">
                        {chat.user.name}
                        {chat.user.isCreator && (
                          <CheckCheck className="h-3 w-3 text-primary" />
                        )}
                      </span>
                      <span className={cn(
                        "text-[10px] whitespace-nowrap opacity-60",
                        chat.unread > 0 ? "text-primary font-bold" : "text-muted-foreground"
                      )}>{chat.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className={cn(
                        "text-sm truncate pr-2 opacity-70",
                        chat.unread > 0 ? "text-white font-medium opacity-100" : "text-muted-foreground"
                      )}>
                        {chat.lastMessage}
                      </p>
                      {chat.unread > 0 && (
                        <span className="h-5 min-w-[20px] px-1.5 rounded-full bg-primary text-white text-[10px] font-black flex items-center justify-center shadow-glow-sm scale-90">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className={cn(
          "flex-1 flex flex-col bg-[#05020d] w-full absolute md:relative h-full transition-transform duration-300 md:translate-x-0 relative",
           showMobileChat ? "translate-x-0" : "translate-x-full md:translate-x-0"
        )}>
          {/* Ambient Background Orbs */}
          <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
          
          {/* Chat Header */}
          <div className="h-16 flex items-center justify-between px-4 shrink-0 bg-white/[0.03] backdrop-blur-xl z-20 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden -ml-2 mr-1 h-10 w-10 text-muted-foreground hover:text-white rounded-full" 
                onClick={() => setShowMobileChat(false)}
              >
                <ChevronRight className="h-6 w-6 rotate-180" />
              </Button>
              <Avatar className="h-10 w-10 border border-primary/20">
                <AvatarImage src={activeChat.user.avatar} />
                <AvatarFallback>{activeChat.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <h2 className="font-bold text-white text-base truncate flex items-center gap-2">
                  {activeChat.user.name}
                  {activeChat.user.isCreator && <CheckCheck className="h-4 w-4 text-primary" />}
                </h2>
                <span className="text-[10px] text-primary flex items-center gap-1 font-bold tracking-wider uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  Online
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-white/5 rounded-full">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-white/5 rounded-full">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-white/5 rounded-full">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 sm:p-8 z-10">
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-center my-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-white/5 px-4 py-1.5 rounded-full border border-white/5">Today</span>
              </div>
              
              {chatHistory.map((msg) => (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex gap-3 max-w-[85%] sm:max-w-[70%]",
                    msg.isMe ? "ml-auto justify-end" : "justify-start"
                  )}
                >
                  <div className={cn(
                    "px-4 py-3 rounded-2xl text-sm shadow-xl relative group transition-all hover:scale-[1.02]",
                    msg.isMe 
                      ? "bg-primary text-white rounded-tr-sm shadow-primary/10" 
                      : "bg-white/[0.08] text-white rounded-tl-sm border border-white/5 backdrop-blur-md"
                  )}>
                    {/* Tail Effect */}
                    {msg.isMe ? (
                       <div className="absolute top-0 -right-1 w-2 h-2 bg-primary [clip-path:polygon(0_0,0_100%,100%_0)]" />
                    ) : (
                       <div className="absolute top-0 -left-1 w-2 h-2 bg-white/[0.08] [clip-path:polygon(0_0,100%_100%,100%_0)]" />
                    )}

                    <p className="leading-relaxed mb-1">{msg.content}</p>
                    <span className={cn(
                      "text-[9px] font-bold opacity-50 flex items-center gap-1 justify-end",
                    )}>
                      {msg.time}
                      {msg.isMe && <CheckCheck className="h-3 w-3 text-white" />}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start max-w-[85%] sm:max-w-[70%]">
                   <div className="bg-white/[0.08] text-white px-4 py-3 rounded-2xl rounded-tl-sm border border-white/5 backdrop-blur-md relative shadow-xl">
                      <div className="absolute top-0 -left-1 w-2 h-2 bg-white/[0.08] [clip-path:polygon(0_0,100%_100%,100%_0)]" />
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                      </div>
                   </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-white/5 bg-white/[0.02] backdrop-blur-xl z-20">
            <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-center gap-3">
              <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-full h-11 w-11 shrink-0 bg-white/5">
                <Paperclip className="h-5 w-5" />
              </Button>
              
              <div className="flex-1 relative">
                <Input 
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..." 
                  className="w-full bg-white/5 border-white/10 focus:border-primary/50 pr-12 rounded-2xl h-11 focus:ring-1 focus:ring-primary/20"
                />
                <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 text-muted-foreground hover:text-primary rounded-full">
                  <Smile className="h-5 w-5" />
                </Button>
              </div>

              {messageInput.trim() ? (
                <Button type="submit" size="icon" className="h-11 w-11 rounded-2xl bg-primary hover:bg-primary/90 text-white shrink-0 shadow-glow transition-all active:scale-90">
                  <Send className="h-5 w-5 ml-0.5" />
                </Button>
              ) : (
                 <Button type="button" variant="ghost" size="icon" className="h-11 w-11 rounded-2xl bg-white/5 hover:bg-white/10 text-muted-foreground shrink-0 border border-white/5">
                  <Mic className="h-5 w-5" />
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
