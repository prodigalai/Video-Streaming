import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Play, Pause, DollarSign, Image as ImageIcon, Video, Check, Shield, Zap, Sparkles } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export type MessageType = 'text' | 'image' | 'video' | 'audio' | 'tip_request' | 'tip_payment';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  timestamp: Date;
  type: MessageType;
  content?: string;
  mediaUrl?: string;
  tipAmount?: number;
  isMe: boolean;
}

interface MessageBubbleProps {
  message: Message;
  previousMessageSameSender: boolean;
  onPayTip?: (amount: number) => void;
}

export function MessageBubble({ message, previousMessageSameSender, onPayTip }: MessageBubbleProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => setIsPlaying(!isPlaying);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        "flex w-full mb-1",
        message.isMe ? "justify-end" : "justify-start",
        !previousMessageSameSender && "mt-6"
      )}
    >
      {/* Avatar Design */}
      {!message.isMe && !previousMessageSameSender && (
        <div className="relative mr-3 mt-1 shrink-0 group">
            <div className="absolute inset-0 bg-violet-600/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-0.5 rounded-xl bg-white/10 group-hover:bg-violet-600/50 transition-all relative">
                <Avatar className="h-8 w-8 rounded-[0.6rem] border-2 border-[#050508]">
                    <AvatarImage src={message.senderAvatar} />
                    <AvatarFallback className="bg-[#1a1a24] text-white text-[10px] font-black">{message.senderName[0]}</AvatarFallback>
                </Avatar>
            </div>
        </div>
      )}
      {!message.isMe && previousMessageSameSender && <div className="w-11" />}

      <div className={cn(
        "max-w-[85%] sm:max-w-[70%] rounded-[1.5rem] relative group/bubble transition-all",
        message.isMe 
          ? "bg-violet-600 text-white rounded-tr-none px-5 py-3.5 shadow-xl shadow-violet-600/10" 
          : "bg-white/[0.04] border border-white/5 hover:bg-white/[0.06] text-white rounded-tl-none px-5 py-3.5",
        
        // Special types styling
        message.type === 'tip_request' && "p-0 overflow-hidden bg-[#0f0f14] border-amber-500/30",
        message.type === 'tip_payment' && "p-0 overflow-hidden bg-[#0f0f14] border-fuchsia-500/30"
      )}>
        
        {/* Content Designation Label for special messages */}
        {(message.type === 'tip_request' || message.type === 'tip_payment') && (
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-white/[0.02]">
                <Zap className={cn("h-3 w-3", message.type === 'tip_request' ? "text-amber-500" : "text-fuchsia-500")} />
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/40">
                    {message.type === 'tip_request' ? "Protocol Request" : "Credit Transfer"}
                </span>
            </div>
        )}

        {/* Text Message */}
        {message.type === 'text' && (
          <p className="whitespace-pre-wrap text-[13px] font-medium leading-relaxed tracking-wide">{message.content}</p>
        )}

        {/* Media Message */}
        {(message.type === 'image' || message.type === 'video') && (
          <div className="rounded-2xl overflow-hidden my-1 relative group/media">
             {message.type === 'image' ? (
                 <img src={message.mediaUrl} alt="Media" className="max-w-full h-auto max-h-[400px] object-cover transition-transform duration-700 group-hover/media:scale-105" />
             ) : (
                 <div className="relative bg-black/50 flex items-center justify-center aspect-video w-full min-w-[200px] sm:min-w-[300px]">
                     <img src={message.mediaUrl} className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale" />
                     <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl transition-transform group-hover/media:scale-110">
                            <Play className="h-6 w-6 text-white ml-1 fill-white" />
                        </div>
                     </div>
                 </div>
             )}
             {message.content && (
                 <div className="pt-3">
                    <p className="text-[13px] font-medium leading-relaxed text-white/90">{message.content}</p>
                 </div>
             )}
          </div>
        )}

        {/* Audio Message - Ultra Premium */}
        {message.type === 'audio' && (
            <div className="flex items-center gap-4 min-w-[240px] py-1">
                <button 
                    onClick={toggleAudio}
                    className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-all border shadow-lg",
                        message.isMe 
                          ? "bg-white/10 border-white/20 hover:bg-white/20 text-white" 
                          : "bg-violet-600/20 border-violet-500/20 hover:bg-violet-600/30 text-violet-400"
                    )}
                >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5 fill-current" />}
                </button>
                <div className="flex-1 space-y-2">
                    <div className="flex items-end gap-[2px] h-6">
                        {[1, 2, 3, 4, 3, 2, 3, 4, 5, 4, 3, 2, 1, 2, 3, 4, 3, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
                            <div 
                                key={i} 
                                className={cn(
                                    "flex-1 rounded-full transition-all",
                                    message.isMe ? "bg-white/40" : "bg-violet-500/40",
                                    isPlaying && "animate-pulse"
                                )}
                                style={{ 
                                    height: `${h * 20}%`,
                                    animationDelay: `${i * 0.1}s`,
                                    opacity: i > 15 && isPlaying ? 0.2 : 1
                                }}
                            />
                        ))}
                    </div>
                </div>
                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest whitespace-nowrap">0:15</span>
            </div>
        )}

        {/* Tip Request Message (Creator -> Fan) */}
        {message.type === 'tip_request' && (
            <div className="w-full min-w-[300px]">
                <div className="p-8 flex flex-col items-center text-center gap-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.05] to-transparent -z-10" />
                    <div className="h-16 w-16 rounded-[2rem] bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-1 shadow-2xl">
                        <DollarSign className="h-8 w-8 text-amber-500" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-4xl font-black text-white tracking-tighter uppercase italic">${message.tipAmount}</h3>
                        <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">INCOMING REQUEST</p>
                    </div>
                    {message.content && <p className="text-xs text-white/40 font-medium italic max-w-[220px]">"{message.content}"</p>}
                </div>
                {!message.isMe && (
                    <div className="p-4 bg-white/[0.02] border-t border-white/5">
                        <Button 
                            className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-black font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-amber-500/20 active:scale-95"
                            onClick={() => onPayTip && message.tipAmount && onPayTip(message.tipAmount)}
                        >
                            TRANSMIT CREDITS
                        </Button>
                    </div>
                )}
            </div>
        )}

        {/* Tip Payment Message (Fan -> Creator) */}
        {message.type === 'tip_payment' && (
            <div className="w-full min-w-[300px]">
                <div className="p-8 flex flex-col items-center text-center gap-4 relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/[0.05] to-transparent -z-10" />
                     <div className="relative">
                        <div className="absolute inset-0 bg-fuchsia-500/40 blur-xl rounded-full" />
                        <div className="h-16 w-16 rounded-[2rem] bg-fuchsia-600 border border-fuchsia-400/30 flex items-center justify-center mb-1 shadow-2xl relative z-10">
                            <DollarSign className="h-8 w-8 text-white" />
                        </div>
                     </div>
                     <div className="space-y-1">
                        <h3 className="text-4xl font-black text-white tracking-tighter uppercase italic">${message.tipAmount}</h3>
                        <p className="text-[10px] font-black text-fuchsia-400 uppercase tracking-[0.2em]">CREDITS RECEIVED</p>
                     </div>
                     {message.content && (
                         <div className="mt-4 text-[11px] font-medium text-white/90 bg-white/5 px-4 py-3 rounded-2xl w-full border border-white/10 italic">
                             {message.content}
                         </div>
                     )}
                </div>
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent" />
            </div>
        )}

        {/* Timestamp & Status Indicator */}
        <div className={cn(
            "text-[9px] mt-2 font-black uppercase tracking-widest flex items-center gap-1.5 transition-opacity",
            message.isMe ? "text-white/40 justify-end" : "text-white/20 justify-start",
            (message.type === 'tip_request' || message.type === 'tip_payment') && "px-6 pb-4 justify-center"
        )}>
            {format(message.timestamp, 'HH:mm')}
            {message.isMe && (
                <div className="flex items-center -space-x-1">
                    <Check className="h-2.5 w-2.5 text-violet-400" />
                    <Check className="h-2.5 w-2.5 text-violet-400" />
                </div>
            )}
        </div>

        {/* Bubble Tail Design */}
        {message.isMe ? (
            <div className="absolute top-0 -right-2 h-4 w-4 bg-violet-600 rounded-bl-[2rem] -z-10" />
        ) : (
            <div className="absolute top-0 -left-2 h-4 w-4 bg-white/[0.04] rounded-br-[2rem] -z-10" />
        )}
      </div>
    </motion.div>
  );
}
