import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Channel {
  id: string;
  name: string;
  category: string;
  avatar: string;
  viewers: number;
  isLive: boolean;
}

const recommendedChannels: Channel[] = [
  { id: "1", name: "LaS_", category: "ARC Raiders", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=las", viewers: 83, isLive: true },
  { id: "2", name: "omareloff", category: "Grand Theft Auto V", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=omar", viewers: 708, isLive: true },
  { id: "3", name: "razo97", category: "Just Chatting", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=razo", viewers: 368, isLive: true },
  { id: "4", name: "A1PROSPECT", category: "Grand Theft Auto V", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=a1", viewers: 229, isLive: true },
  { id: "5", name: "Sardaco", category: "Old School RuneScape", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sard", viewers: 72, isLive: true },
  { id: "6", name: "keithlocks", category: "Slots & Casino", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=keith", viewers: 1200, isLive: true },
  { id: "7", name: "CaptainChickenD", category: "Off The Grid", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=captain", viewers: 28, isLive: true },
  { id: "8", name: "Murda", category: "IRL", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=murda", viewers: 295, isLive: true },
  { id: "9", name: "MaxHolloway", category: "Slots & Casino", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=max", viewers: 619, isLive: true },
  { id: "10", name: "feef", category: "IRL", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=feef", viewers: 277, isLive: true },
];

function formatViewers(count: number): string {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K";
  }
  return count.toString();
}

export function RecommendedChannels() {
  return (
    <div className="flex flex-col h-full border-r border-border bg-card/50">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Recommended
        </h3>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {recommendedChannels.map((channel) => (
            <Link
              key={channel.id}
              to={`/watch/live/${channel.id}`}
              className={cn(
                "flex items-center gap-3 p-2 rounded-lg transition-all duration-200",
                "hover:bg-primary/10 group"
              )}
            >
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={channel.avatar} />
                  <AvatarFallback>{channel.name[0]}</AvatarFallback>
                </Avatar>
                {channel.isLive && (
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-live border-2 border-card" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                  {channel.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {channel.category}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <span className="h-2 w-2 rounded-full bg-live animate-pulse" />
                <span className="text-muted-foreground font-medium">
                  {formatViewers(channel.viewers)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-border flex gap-2">
        <button className="text-sm text-primary hover:underline">Show More</button>
        <span className="text-muted-foreground">·</span>
        <button className="text-sm text-muted-foreground hover:text-primary">Show Less</button>
      </div>
    </div>
  );
}
