import { AgentLayout } from "@/components/layout/agent/AgentLayout";
import { ChatWindow } from "@/components/messaging/ChatWindow";
import { ConversationList } from "@/components/messaging/ConversationList";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AgentInboxPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  return (
    <AgentLayout>
      <div className="flex h-[calc(100vh-8rem)] w-full overflow-hidden bg-background border rounded-lg shadow-sm">
        {/* Conversation List */}
        <div className={cn(
          "w-full md:w-[320px] lg:w-[380px] border-r border-border shrink-0 flex flex-col transition-all duration-300",
          selectedConversationId ? "hidden md:flex" : "flex"
        )}>
          <div className="p-4 border-b bg-muted/30">
              <h2 className="text-lg font-bold">Unified Inbox</h2>
              <p className="text-xs text-muted-foreground">Manage messages for all your creators</p>
          </div>
          <ConversationList 
            onSelect={setSelectedConversationId} 
            selectedId={selectedConversationId || undefined} 
          />
        </div>

        {/* Chat Window */}
        <div className={cn(
          "flex-1 flex flex-col bg-card/20 relative",
          !selectedConversationId ? "hidden md:flex" : "flex"
        )}>
          {selectedConversationId ? (
            <ChatWindow onBack={() => setSelectedConversationId(null)} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8 text-center space-y-4">
               <p>Select a conversation to reply on behalf of your talent.</p>
            </div>
          )}
        </div>
      </div>
    </AgentLayout>
  );
}
