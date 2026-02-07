import { useState, useEffect, useRef } from "react";
import { 
  MessageCircle, 
  X, 
  Search, 
  ChevronRight, 
  ExternalLink, 
  Send,
  HelpCircle,
  Home,
  MessageSquare,
  ArrowLeft,
  Smile,
  Paperclip
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SupportMessage {
  id: number;
  type: 'user' | 'bot';
  text: string;
  time: string;
}

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'messages'>('home');
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<SupportMessage[]>([
    { id: 1, type: 'bot', text: "Hello! I'm your StreamVault AI assistant. How can I help you today?", time: "2:00 PM" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, activeTab, isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const newMessage: SupportMessage = {
      id: Date.now(),
      type: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageInput("");
    setIsTyping(true);
    setActiveTab('messages');

    // Simulate Bot Response
    setTimeout(() => {
      let botText = "Got it! I'm looking into that for you. Is there anything else you'd like to add?";
      
      if (text.toLowerCase().includes("kyc") || text.toLowerCase().includes("verify")) {
        botText = "For KYC verification, please head to your Studio Settings under the 'Verification' tab. You'll need a valid ID!";
      } else if (text.toLowerCase().includes("payout") || text.toLowerCase().includes("money")) {
        botText = "Payouts are processed every Friday. You can track your earnings in the Monetization dashboard.";
      }

      const botResponse: SupportMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: botText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setIsTyping(false);
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  const faqItems = [
    "Verification & KYC Guide",
    "How to enable Super Chat",
    "Channel Membership Tiers",
    "Payout Schedule & Methods",
    "Copyright & DMCA Policy"
  ].filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[380px] h-[640px] bg-[#0f0f13] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Header */}
          <div className="bg-black p-6 text-white relative border-b border-white/5 shrink-0 h-48 flex flex-col justify-end">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>
            
            {activeTab === 'messages' && (
              <button 
                onClick={() => setActiveTab('home')}
                className="absolute top-6 left-6 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}

            <div className="flex items-center gap-2 mb-6 justify-start">
              <div className="flex -space-x-3">
                 {[
                   { seed: 'support1', name: 'Mike' },
                   { seed: 'support2', name: 'Jenny' },
                   { seed: 'support3', name: 'Eric' }
                 ].map((agent, i) => (
                    <Avatar key={i} className="h-10 w-10 border-2 border-black ring-1 ring-white/10 translate-y-0 hover:-translate-y-1 transition-transform">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${agent.seed}`} />
                      <AvatarFallback className="bg-primary/20 text-[10px]">{agent.name[0]}</AvatarFallback>
                    </Avatar>
                 ))}
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-1">
              {activeTab === 'home' ? 'Hi there! 👋' : 'Support Team'}
            </h2>
            <p className="text-white/60 text-base">
              {activeTab === 'home' ? 'How can we help?' : 'AI Assistant is online'}
            </p>
          </div>

          {/* Content Area */}
          <div ref={scrollRef} className="flex-1 bg-black/40 overflow-y-auto p-5 space-y-5 scrollbar-hide">
            {activeTab === 'home' ? (
              <div className="space-y-5 animate-in fade-in duration-300">
                {/* Search Box */}
                <div className="bg-white/[0.03] rounded-2xl p-2 border border-white/10 flex items-center gap-3 focus-within:border-primary/50 transition-colors shadow-inner">
                   <div className="p-2">
                      <Search className="h-5 w-5 text-zinc-600" />
                   </div>
                   <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for help" 
                      className="flex-1 bg-transparent outline-none text-zinc-300 text-sm py-2 placeholder:text-zinc-600"
                   />
                </div>

                {/* FAQ List */}
                <div className="space-y-2">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1">Suggested Articles</h4>
                   <div className="bg-white/[0.03] rounded-[24px] border border-white/10 overflow-hidden divide-y divide-white/5 shadow-xl">
                      {faqItems.length > 0 ? faqItems.map((item, i) => (
                         <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-all group text-left">
                           <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">{item}</span>
                           <ChevronRight className="h-4 w-4 text-zinc-700 group-hover:text-primary transition-colors" />
                         </button>
                      )) : (
                        <p className="p-4 text-xs text-zinc-600 italic">No articles found...</p>
                      )}
                   </div>
                </div>

                {/* External Links */}
                <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/10 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-all shadow-xl">
                   <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                         <HelpCircle className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">StreamVault Creators Hub</span>
                   </div>
                   <ExternalLink className="h-4 w-4 text-zinc-700 group-hover:text-primary transition-colors" />
                </div>
                
                {/* Start Chat Button */}
                <div className="bg-primary/5 rounded-[24px] p-6 border border-primary/10 space-y-5 relative overflow-hidden group/card shadow-xl">
                   <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/card:opacity-10 transition-opacity">
                      <MessageSquare className="h-20 w-20 text-primary" />
                   </div>
                   <div className="space-y-1 relative z-10">
                      <h3 className="font-black text-white uppercase tracking-tighter text-lg italic">Ask a question</h3>
                      <p className="text-xs text-zinc-400 leading-relaxed font-medium">Our AI Agent typically replies instantly, or our team will get back to you within 10m.</p>
                   </div>
                   <Button 
                    onClick={() => setActiveTab('messages')}
                    className="w-full bg-primary hover:bg-primary/90 shadow-glow h-12 rounded-xl font-black uppercase tracking-widest text-[11px] relative z-10 group/btn transition-all active:scale-[0.98]"
                   >
                      Send us a message
                      <Send className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
                   </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-8 duration-500 pb-4">
                <div className="flex flex-col items-center justify-center py-4 space-y-2 opacity-50">
                   <div className="h-px w-full bg-white/5" />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Conversation started</span>
                </div>

                {messages.map((msg) => (
                  <div key={msg.id} className={cn(
                    "flex flex-col max-w-[85%] space-y-1.5",
                    msg.type === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                  )}>
                    <div className={cn(
                      "px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-lg relative group transition-all",
                      msg.type === 'user' 
                        ? "bg-primary text-white rounded-br-none glow-primary-sm" 
                        : "bg-white/[0.08] text-zinc-200 border border-white/5 rounded-bl-none backdrop-blur-md"
                    )}>
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest px-1">{msg.time}</span>
                  </div>
                ))}
                
                {isTyping && (
                   <div className="flex flex-col max-w-[80%] space-y-1.5 mr-auto">
                      <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-bl-none border border-white/5 flex gap-1.5 items-center backdrop-blur-md">
                         <div className="h-1.5 w-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                         <div className="h-1.5 w-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                         <div className="h-1.5 w-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                   </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Input Area for Messages */}
          {activeTab === 'messages' && (
            <div className="p-4 border-t border-white/5 bg-black shrink-0 pb-6">
               <div className="flex items-center bg-white/[0.03] rounded-2xl border border-white/10 p-1.5 group focus-within:border-primary/50 transition-all shadow-inner">
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-zinc-600 hover:text-primary shrink-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <input 
                    type="text" 
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(messageInput); }}
                    placeholder="Type your message..."
                    className="flex-1 bg-transparent border-none focus:ring-0 text-[13px] text-zinc-300 px-3 py-2 outline-none placeholder:text-zinc-700"
                  />
                  <Button 
                    size="icon" 
                    onClick={() => handleSendMessage(messageInput)}
                    disabled={!messageInput.trim()}
                    className="h-10 w-10 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-20 transition-all shadow-glow active:scale-90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
               </div>
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="h-24 bg-black border-t border-white/5 flex items-center justify-around px-12 shrink-0 pb-safe">
             <button 
               onClick={() => setActiveTab('home')}
               className={cn(
                 "flex flex-col items-center gap-1.5 transition-all group",
                 activeTab === 'home' ? "text-primary" : "text-zinc-700 hover:text-white"
               )}
             >
                <div className={cn(
                  "h-1 w-8 rounded-full transition-all mb-1 shadow-glow-sm",
                  activeTab === 'home' ? "bg-primary opacity-100 scale-100" : "bg-zinc-800 opacity-0 scale-50"
                )} />
                <Home className={cn("h-6 w-6 transition-all", activeTab === 'home' ? "scale-110" : "group-hover:scale-110")} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Home</span>
             </button>
             <button 
               onClick={() => setActiveTab('messages')}
               className={cn(
                 "flex flex-col items-center gap-1.5 transition-all group",
                 activeTab === 'messages' ? "text-primary" : "text-zinc-700 hover:text-white"
               )}
             >
                <div className={cn(
                  "h-1 w-8 rounded-full transition-all mb-1 shadow-glow-sm",
                  activeTab === 'messages' ? "bg-primary opacity-100 scale-100" : "bg-zinc-800 opacity-0 scale-50"
                )} />
                <MessageSquare className={cn("h-6 w-6 transition-all", activeTab === 'messages' ? "scale-110" : "group-hover:scale-110")} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Messages</span>
             </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-16 w-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 active:scale-90 overflow-hidden group border border-white/10",
          isOpen ? "bg-white text-black rotate-90" : "bg-primary text-white"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? <X className="h-7 w-7" /> : <MessageCircle className="h-8 w-8" />}
      </button>
    </div>
  );
}
