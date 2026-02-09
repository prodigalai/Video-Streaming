import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ConversationList } from "@/components/messaging/ConversationList";
import { ChatWindow } from "@/components/messaging/ChatWindow";
import { cn } from "@/lib/utils";
import { MessageSquare, Shield, Signal, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MessagesPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  // Mobile navigation helper
  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id);
  };

  const handleBackToConversations = () => {
    setSelectedConversationId(null);
  };

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-[#050508]">
        {/* Conversation List - Hidden on mobile if chat is open */}
        <div className={cn(
          "w-full md:w-[360px] lg:w-[420px] bg-[#0a0a0f] shrink-0 flex flex-col transition-all duration-300 relative z-10",
          selectedConversationId ? "hidden md:flex" : "flex"
        )}>
          <ConversationList 
            onSelect={handleSelectConversation} 
            selectedId={selectedConversationId || undefined} 
          />
        </div>

        {/* Chat Window - Hidden on mobile if no chat is open */}
        <div className={cn(
          "flex-1 flex flex-col bg-[#050508] relative",
          !selectedConversationId ? "hidden md:flex" : "flex"
        )}>
          {selectedConversationId ? (
            <ChatWindow 
               // In a real app, we'd pass conversation ID and fetch messages
            />
          ) : (
            <div className="hidden md:flex flex-col items-center justify-center h-full p-12 text-center space-y-12 relative overflow-hidden">
               {/* Background atmosphere for empty state */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[120px] -z-10" />
               
               <div className="space-y-8">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative inline-block"
                  >
                     <div className="absolute inset-0 bg-violet-600/20 blur-3xl rounded-full" />
                     <div className="h-32 w-32 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex items-center justify-center relative z-10">
                        <MessageSquare className="h-12 w-12 text-white/10" />
                     </div>
                     <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-2xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-600/20 border-4 border-[#050508] z-20">
                        <Signal className="h-4 w-4 text-white" />
                     </div>
                  </motion.div>
                  
                  <div className="space-y-3">
                     <h3 className="text-3xl font-black text-white uppercase tracking-tight italic">Secure Signal Node</h3>
                     <p className="max-w-xs mx-auto text-[10px] font-black uppercase tracking-[0.4em] text-white/20 leading-loose">
                        Select a communication channel to establish a peer-to-peer encrypted connection.
                     </p>
                  </div>
               </div>

               <div className="flex flex-wrap items-center justify-center gap-6 opacity-30 grayscale underline-offset-4">
                  <div className="flex items-center gap-2">
                     <Shield className="h-3 w-3" />
                     <span className="text-[8px] font-black uppercase tracking-widest">E2E ENCRYPTED</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Zap className="h-3 w-3" />
                     <span className="text-[8px] font-black uppercase tracking-widest">LOW LATENCY</span>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
