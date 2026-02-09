import { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Mic, 
  DollarSign, 
  MoreVertical, 
  Phone, 
  Video, 
  Smile,
  Paperclip,
  Check,
  X,
  Zap,
  Sparkles,
  Lock,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Message, MessageBubble, MessageType } from "./MessageBubble";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data
const MOCK_MESSAGES: Message[] = [
  {
    id: "m1",
    senderId: "luna",
    senderName: "Luna Live",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    type: "text",
    content: "Hey Alex! Thanks so much for subscribing to the new tier. 💖",
    isMe: false // Luna sent this to Me (Alex)
  },
  {
    id: "m2",
    senderId: "me",
    senderName: "Alex",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    timestamp: new Date(Date.now() - 1000 * 60 * 55),
    type: "text",
    content: "Of course! I've been loving the content lately. That last stream was insane!",
    isMe: true
  },
  {
    id: "m3",
    senderId: "luna",
    senderName: "Luna Live",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
    timestamp: new Date(Date.now() - 1000 * 60 * 50),
    type: "image",
    content: "Glad you liked it! Here's a little BTS from the setup.",
    mediaUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop",
    isMe: false
  },
  {
    id: "m4",
    senderId: "me",
    senderName: "Alex",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    type: "tip_payment",
    tipAmount: 50,
    content: "Keep up the amazing work! ☕️",
    isMe: true
  }
];

interface ChatWindowProps {
  onBack?: () => void;
}

export function ChatWindow({ onBack }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Simulation State
  const [isCreatorMode, setIsCreatorMode] = useState(false); // Toggle to simulate Creator vs Fan view
  const [showTipInput, setShowTipInput] = useState(false);
  const [tipAmount, setTipAmount] = useState("");

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const msg: Message = {
      id: `m-${Date.now()}`,
      senderId: isCreatorMode ? "luna" : "me",
      senderName: isCreatorMode ? "Luna Live" : "Alex",
      senderAvatar: isCreatorMode ? "https://api.dicebear.com/7.x/avataaars/svg?seed=luna" : "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      timestamp: new Date(),
      type: "text",
      content: newMessage,
      isMe: true 
    };

    setMessages(prev => [...prev, msg]);
    setNewMessage("");
    
    // Simulate Reply if User sent it
    if (!isCreatorMode) {
        setTimeout(() => {
            const reply: Message = {
                id: `r-${Date.now()}`,
                senderId: "luna",
                senderName: "Luna Live",
                senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
                timestamp: new Date(),
                type: "text",
                content: "Thanks for the message! I'll get back to you soon.",
                isMe: false
            };
            setMessages(prev => [...prev, reply]);
        }, 3000);
    }
  };

  const handleSendTip = () => {
      if (!tipAmount || isNaN(Number(tipAmount))) return;
      
      const parsedAmount = parseFloat(tipAmount);
      const type = isCreatorMode ? "tip_request" : "tip_payment";

      const msg: Message = {
          id: `t-${Date.now()}`,
          senderId: isCreatorMode ? "luna" : "me",
          senderName: isCreatorMode ? "Luna Live" : "Alex",
          senderAvatar: isCreatorMode ? "https://api.dicebear.com/7.x/avataaars/svg?seed=luna" : "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
          timestamp: new Date(),
          type: type as MessageType,
          tipAmount: parsedAmount,
          content: newMessage || (isCreatorMode ? "Hey, could you support this goal?" : "Here's a tip!"),
          isMe: true
      };

      setMessages(prev => [...prev, msg]);
      setShowTipInput(false);
      setTipAmount("");
      setNewMessage(""); // Clear text if any was added as context
      
      toast.success(isCreatorMode ? "Protocol Request Generated" : "Credits Successfully Transmitted", {
          style: { background: '#0f0f14', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }
      });
  };

  return (
    <div className="flex flex-col h-full bg-[#050508] relative overflow-hidden">
      
      {/* Decorative background atmosphere */}
      <div className="absolute top-0 right-0 w-full h-40 bg-gradient-to-b from-violet-600/[0.04] to-transparent pointer-events-none" />

      {/* Extended Header Design */}
      <div className="h-20 border-b border-white/5 flex items-center justify-between px-6 bg-[#0a0a0f]/80 backdrop-blur-xl z-20">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden h-10 w-10 text-white/40" onClick={onBack}>
             <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="relative group">

            <div className="absolute inset-0 bg-violet-600/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-0.5 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 relative">
                <Avatar className="h-11 w-11 rounded-[0.8rem] border-2 border-[#0a0a0f]">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=luna" className="object-cover" />
                    <AvatarFallback className="bg-[#1a1a24] text-white font-black">LL</AvatarFallback>
                </Avatar>
            </div>
            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-[#0a0a0f] shadow-lg shadow-emerald-500/20"></span>
          </div>
          <div>
             <h3 className="text-sm font-black text-white flex items-center gap-2 tracking-tight uppercase">
                 Luna Live 
                 <Sparkles className="h-3 w-3 text-violet-400" />
            </h3>
             <div className="flex items-center gap-2 mt-0.5">
                <span className="h-1 w-1 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Live Connection</span>
             </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 px-4 py-2 rounded-xl bg-white/5 border border-white/5 mr-2">
                <Lock className="h-3 w-3 text-white/20" />
                <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">E2E Encrypted</span>
            </div>
            
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white transition-all">
                <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white transition-all">
                <Video className="h-4 w-4" />
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white transition-all">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2 bg-[#0f0f14] border-white/10 rounded-2xl shadow-2xl">
                    <DropdownMenuItem 
                        onClick={() => setIsCreatorMode(!isCreatorMode)}
                        className="flex items-center justify-between text-white hover:bg-white/5 rounded-xl px-4 py-3 font-bold text-xs uppercase tracking-widest cursor-pointer group"
                    >
                        <span>SIMULATE {isCreatorMode ? "FAN" : "CREATOR"}</span>
                        <Zap className="h-3 w-3 opacity-20 group-hover:opacity-100 text-violet-400" />
                    </DropdownMenuItem>
                    <div className="h-px bg-white/5 my-2 mx-2" />
                    <DropdownMenuItem className="text-red-500 hover:bg-red-500/5 hover:text-red-400 rounded-xl px-4 py-3 font-bold text-xs uppercase tracking-widest cursor-pointer">BLOCK IDENTITY</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500 hover:bg-red-500/5 hover:text-red-400 rounded-xl px-4 py-3 font-bold text-xs uppercase tracking-widest cursor-pointer">TERMINATE SIGNAL</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>

      {/* Messages Area - Ultra Smooth Scroll */}
      <div className="flex-1 overflow-y-auto p-6 space-y-2 scroll-smooth scrollbar-thin scrollbar-thumb-white/10" ref={scrollRef}>
          {messages.map((msg, idx) => (
             <MessageBubble 
                key={msg.id} 
                message={msg} 
                previousMessageSameSender={idx > 0 && messages[idx-1].senderId === msg.senderId}
             />
          ))}
          <div className="h-4" />
      </div>

      <AnimatePresence>
        {/* Tip Input Overlay - Redesigned as a Slide-up Console */}
        {showTipInput && (
            <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="absolute inset-x-4 bottom-24 bg-[#0a0a0f] border border-violet-500/20 rounded-[2.5rem] p-8 shadow-3xl z-40 backdrop-blur-3xl overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-violet-600/[0.05] to-transparent pointer-events-none" />
                
                <div className="flex justify-between items-center mb-8 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-violet-600/20 flex items-center justify-center">
                            <DollarSign className="h-5 w-5 text-violet-400" />
                        </div>
                        <h4 className="text-sm font-black text-white uppercase tracking-tight">
                            {isCreatorMode ? "PROTOCOL REQUEST" : "CREDIT TRANSMISSION"}
                        </h4>
                    </div>
                    <Button variant="ghost" size="icon" className="h-9 w-9 bg-white/5 rounded-xl border border-white/5 text-white/40 hover:text-white" onClick={() => setShowTipInput(false)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                
                <div className="space-y-6 relative z-10">
                    <div className="relative group">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 text-3xl font-black group-focus-within:text-violet-500 transition-colors">$</span>
                        <Input 
                            autoFocus
                            type="number" 
                            placeholder="0.00" 
                            className="h-20 pl-16 bg-black/40 border-white/5 focus-visible:border-violet-500/50 rounded-2xl text-5xl font-black text-white placeholder:text-white/5 transition-all text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={tipAmount}
                            onChange={(e) => setTipAmount(e.target.value)}
                        />
                    </div>
                    
                    {!isCreatorMode && (
                        <div className="grid grid-cols-4 gap-4">
                            {[5, 10, 20, 50].map(amt => (
                                <Button 
                                    key={amt} 
                                    variant="outline" 
                                    className="h-12 bg-white/5 border-white/5 rounded-xl font-black text-xs text-white/60 hover:text-white hover:border-violet-500/50 hover:bg-violet-600/10 transition-all uppercase tracking-widest"
                                    onClick={() => setTipAmount(amt.toString())}
                                >
                                    ${amt}
                                </Button>
                            ))}
                        </div>
                    )}

                    <Input 
                        placeholder="Add encrypted context message..." 
                        className="h-14 bg-white/5 border-white/5 focus-visible:border-violet-500/50 rounded-2xl px-6 text-sm font-medium text-white placeholder:text-white/10"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />

                    <Button className="w-full h-16 bg-violet-600 hover:bg-violet-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-violet-500/30 border-none transition-all active:scale-95" onClick={handleSendTip}>
                        {isCreatorMode ? "INITIALIZE REQUEST" : "INITIATE TRANSFER"}
                    </Button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Input Terminal Area */}
      <div className="px-6 py-6 pb-9 bg-[#0a0a0f]/80 backdrop-blur-xl border-t border-white/5 relative z-30">
        <div className="flex items-end gap-4 max-w-5xl mx-auto">
            <div className="flex-1 bg-white/5 border border-white/5 focus-within:border-violet-500/30 rounded-[2rem] flex items-center p-2 relative group transition-all">
                <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl text-white/20 hover:text-white transition-colors shrink-0">
                    <Paperclip className="h-5 w-5" />
                </Button>
                
                <Input 
                    className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-4 h-11 text-sm font-medium text-white placeholder:text-white/10"
                    placeholder="Input signal data..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />

                <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn(
                        "h-11 w-11 rounded-2xl transition-all shrink-0",
                        showTipInput ? "bg-violet-600 text-white" : "text-white/20 hover:text-white hover:bg-white/5"
                    )}
                    onClick={() => setShowTipInput(!showTipInput)}
                >
                    <DollarSign className="h-5 w-5" />
                </Button>
                
                <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl text-white/20 hover:text-white transition-colors shrink-0">
                    <Smile className="h-5 w-5" />
                </Button>
            </div>
            
            <AnimatePresence mode="wait">
                {newMessage.trim() ? (
                    <motion.button 
                        key="send"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="h-14 w-14 rounded-[1.4rem] shrink-0 bg-violet-600 hover:bg-violet-700 text-white shadow-xl shadow-violet-600/20 flex items-center justify-center transition-all active:scale-95 border-none group"
                        onClick={handleSendMessage}
                    >
                        <Send className="h-6 w-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </motion.button>
                ) : (
                    <motion.button 
                        key="mic"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className={cn(
                            "h-14 w-14 rounded-[1.4rem] shrink-0 flex items-center justify-center transition-all active:scale-95 border border-white/5 group",
                            isRecording ? "bg-red-600 text-white shadow-xl shadow-red-600/20 animate-pulse border-none" : "bg-white/5 text-white/20 hover:text-white"
                        )}
                        onMouseDown={() => setIsRecording(true)}
                        onMouseUp={() => setIsRecording(false)}
                    >
                        <Mic className="h-6 w-6" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
