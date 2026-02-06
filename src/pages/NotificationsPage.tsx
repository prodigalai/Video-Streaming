import { useState } from "react";
// Notifications Page Component
import { Bell, Check, Clock, Heart, MessageSquare, Star, UserPlus } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
    title: "New Like",
    description: "Luna_Live liked your comment on 'Late Night Vibes'",
    time: "1 hour ago",
    read: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
  },
  {
    id: "3",
    type: "follow",
    title: "New Follower",
    description: "Alex Design started following you",
    time: "3 hours ago",
    read: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
  },
  {
    id: "4",
    type: "comment",
    title: "New Reply",
    description: "ChefMaria replied: 'Thanks for watching! Next recipe is up.'",
    time: "5 hours ago",
    read: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
  },
  {
    id: "5",
    type: "system",
    title: "System Update",
    description: "Your wallet has been successfully credited with 500 Credits.",
    time: "1 day ago",
    read: true,
  },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [notifications, setNotifications] = useState(mockNotifications);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "live": return <Bell className="h-4 w-4 text-red-500" />;
      case "like": return <Heart className="h-4 w-4 text-pink-500" />;
      case "comment": return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "follow": return <UserPlus className="h-4 w-4 text-green-500" />;
      case "system": return <Star className="h-4 w-4 text-yellow-500" />;
      default: return <Bell className="h-4 w-4" />;
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
      <div className="min-h-screen bg-[#05020d] text-white">
        <div className="container max-w-4xl py-8 space-y-8">
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-black uppercase tracking-tighter italic">
                Notifications
              </h1>
              <p className="text-muted-foreground text-sm font-medium">
                Stay updated with your community
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={markAllRead}
                className="h-9 border-white/10 hover:bg-white/5 text-xs font-bold uppercase tracking-widest"
              >
                <Check className="h-4 w-4 mr-2" />
                Mark all read
              </Button>
            </div>
          </div>

          <div className="flex gap-2 border-b border-white/5 pb-1">
            <Button
              variant="ghost"
              onClick={() => setFilter("all")}
              className={cn(
                "rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 text-sm font-bold uppercase tracking-widest hover:bg-transparent",
                filter === "all" ? "border-primary text-primary" : "text-muted-foreground hover:text-white"
              )}
            >
              All
            </Button>
            <Button
              variant="ghost"
              onClick={() => setFilter("unread")}
              className={cn(
                "rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 text-sm font-bold uppercase tracking-widest hover:bg-transparent",
                filter === "unread" ? "border-primary text-primary" : "text-muted-foreground hover:text-white"
              )}
            >
              Unread
            </Button>
          </div>

          <ScrollArea className="h-[600px] rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
            <div className="p-4 space-y-2">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "group flex gap-4 p-4 rounded-xl transition-all hover:bg-white/5 cursor-pointer border border-transparent",
                      !notification.read && "bg-primary/5 border-primary/10"
                    )}
                  >
                    <div className="relative shrink-0">
                      {notification.avatar ? (
                        <Avatar className="h-10 w-10 border border-white/10">
                          <AvatarImage src={notification.avatar} />
                          <AvatarFallback>N</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                          <Bell className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                      
                      <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-[#05020d] flex items-center justify-center border border-white/10">
                        {getIcon(notification.type)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-4">
                        <p className={cn("text-sm font-medium leading-tight", !notification.read ? "text-white" : "text-white/70")}>
                          {notification.title}
                        </p>
                        <span className="text-[10px] text-muted-foreground font-bold whitespace-nowrap flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {notification.description}
                      </p>
                    </div>

                    {!notification.read && (
                      <div className="shrink-0 self-center">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center">
                    <Bell className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-bold text-white/90">No notifications</p>
                    <p className="text-sm text-muted-foreground">You're all caught up!</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

        </div>
      </div>
    </MainLayout>
  );
}
