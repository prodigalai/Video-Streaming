import { useState } from "react";
import { Bell, Check, Clock, Heart, MessageSquare, Star, UserPlus, Zap, Shield, Sparkles } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Mock data
type NotificationType = "like" | "comment" | "follow" | "live" | "system";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read: boolean;
  avatar?: string;
  link?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "live",
    title: "GamerPro is Live Now!",
    description: "Gaming Marathon - Day 3! Undefeated Goal",
    time: "2 min ago",
    read: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gamer",
  },
  {
    id: "2",
    type: "like",
    title: "New Signal Received",
    description: "Luna_Live liked your comment on 'Late Night Vibes'",
    time: "1 hour ago",
    read: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
  },
  {
    id: "3",
    type: "follow",
    title: "New Node Connection",
    description: "Alex Design established a follow connection with your profile",
    time: "3 hours ago",
    read: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
  },
  {
    id: "4",
    type: "comment",
    title: "New Incoming Transmission",
    description: "ChefMaria replied: 'Thanks for watching! Next recipe is up.'",
    time: "5 hours ago",
    read: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
  },
  {
    id: "5",
    type: "system",
    title: "Vault Update Successful",
    description: "Your digital vault has been credited with 500 FOC Credits.",
    time: "1 day ago",
    read: true,
  },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [notifications, setNotifications] = useState(mockNotifications);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "live": return <Bell className="h-4 w-4 text-red-400" />;
      case "like": return <Heart className="h-4 w-4 text-fuchsia-400" />;
      case "comment": return <MessageSquare className="h-4 w-4 text-blue-400" />;
      case "follow": return <UserPlus className="h-4 w-4 text-emerald-400" />;
      case "system": return <Zap className="h-4 w-4 text-amber-400" />;
      default: return <Bell className="h-4 w-4 text-violet-400" />;
    }
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const filteredNotifications = filter === "all" 
    ? notifications 
    : notifications.filter(n => !n.read);

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#050508] relative overflow-hidden pb-safe">
        {/* Ambient background decoration */}
        <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-blue-600/[0.03] to-transparent -z-10 pointer-events-none" />
        
        <div className="container max-w-4xl py-8 sm:py-12 px-4 sm:px-6 space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
            <div className="space-y-3">
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                      <Bell className="h-5 w-5 text-white" />
                  </div>
                  <h1 className="text-4xl font-black text-white uppercase tracking-tight">Signal Terminal</h1>
               </div>
               <p className="text-sm font-medium text-white/40 italic">Monitoring real-time community engagement and system alerts.</p>
            </div>
            <Button 
                variant="ghost" 
                size="sm"
                onClick={markAllRead}
                className="h-12 px-6 border border-white/5 bg-white/5 text-white/60 hover:text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all"
            >
                <Check className="h-4 w-4 mr-2" />
                CLEAR ALL SIGNALS
            </Button>
          </div>

          <div className="space-y-6">
            <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5 w-fit">
              <button
                onClick={() => setFilter("all")}
                className={cn(
                  "h-10 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  filter === "all" ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20" : "text-white/30 hover:text-white"
                )}
              >
                ALL LOGS
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={cn(
                  "h-10 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  filter === "unread" ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20" : "text-white/30 hover:text-white"
                )}
              >
                UNREAD
              </button>
            </div>

            <ScrollArea className="min-h-[600px] rounded-[2.5rem] border border-white/10 bg-white/[0.01] shadow-2xl overflow-hidden relative group">
                {/* Decorative overlay for the scroll area */}
                <div className="absolute inset-0 bg-[#0f0f14]/50 -z-10" />
                
                <div className="p-6 space-y-4 relative z-10">
                <AnimatePresence mode="popLayout">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notification, index) => (
                        <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={cn(
                            "group/item flex gap-6 p-6 rounded-[2rem] transition-all hover:bg-white/[0.03] cursor-pointer border border-transparent hover:border-white/5",
                            !notification.read && "bg-violet-600/[0.03] border-violet-500/10"
                            )}
                        >
                            <div className="relative shrink-0">
                                {notification.avatar ? (
                                    <div className="relative">
                                        <img 
                                            src={notification.avatar} 
                                            alt=""
                                            className="h-14 w-14 rounded-2xl object-cover border border-white/10 shadow-xl group-hover/item:border-violet-500/30 transition-all"
                                        />
                                        <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center border border-white/5 shadow-2xl">
                                            {getIcon(notification.type)}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover/item:border-amber-500/30 transition-all">
                                        {getIcon(notification.type)}
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className={cn(
                                        "text-[13px] font-black uppercase tracking-wider transition-colors",
                                        !notification.read ? "text-white" : "text-white/40 group-hover/item:text-white/60"
                                    )}>
                                        {notification.title}
                                    </h4>
                                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
                                        <Clock className="h-2.5 w-2.5" />
                                        {notification.time}
                                    </span>
                                </div>
                                <p className="text-[11px] font-medium text-white/50 line-clamp-2 leading-relaxed tracking-wide">
                                    {notification.description}
                                </p>
                            </div>

                            {!notification.read && (
                                <div className="shrink-0 self-center">
                                    <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                                </div>
                            )}
                        </motion.div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
                            <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center border border-dashed border-white/10">
                                <Bell className="h-8 w-8 text-white/10" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-xl font-black text-white uppercase tracking-tight">Signal Void</p>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">The terminal is currently silent.</p>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
                </div>
            </ScrollArea>
          </div>

          <div className="flex items-center justify-center pt-8">
             <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <Shield className="h-4 w-4 text-violet-400" />
                <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Encrypted Transmission Protocol v2.4</span>
             </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
