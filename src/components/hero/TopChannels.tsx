import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Channel {
  name: string;
  avatar: string;
  viewers: number;
  isLive: boolean;
}

interface TopChannelsProps {
  channels: Channel[];
}

export function TopChannels({ channels }: TopChannelsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 200;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
    setTimeout(checkScroll, 300);
  };

  return (
    <section className="relative py-8 lg:py-10">
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-live" />
            </div>
            Top Channels Live Now
          </h2>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={cn(
                "h-9 w-9 rounded-full border border-border/50 transition-all",
                canScrollLeft 
                  ? "hover:bg-primary/10 hover:border-primary/50" 
                  : "opacity-50 cursor-not-allowed"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={cn(
                "h-9 w-9 rounded-full border border-border/50 transition-all",
                canScrollRight 
                  ? "hover:bg-primary/10 hover:border-primary/50" 
                  : "opacity-50 cursor-not-allowed"
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Channels Scroll Container */}
        <div className="relative">
          {/* Left Fade Gradient */}
          <div 
            className={cn(
              "absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none transition-opacity duration-300",
              canScrollLeft ? "opacity-100" : "opacity-0"
            )} 
          />
          
          {/* Right Fade Gradient */}
          <div 
            className={cn(
              "absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none transition-opacity duration-300",
              canScrollRight ? "opacity-100" : "opacity-0"
            )} 
          />

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 snap-x snap-mandatory"
          >
            {channels.map((channel) => (
              <Link
                key={channel.name}
                to={`/watch/live/${channel.name.toLowerCase().replace("_", "-")}`}
                className="flex-shrink-0 snap-start group"
              >
                <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-card/50 hover:bg-card border border-transparent hover:border-primary/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/10">
                  {/* Avatar with Live Ring */}
                  <div className="relative">
                    <Avatar className={cn(
                      "h-16 w-16 md:h-20 md:w-20 ring-[3px] transition-all duration-300",
                      channel.isLive 
                        ? "ring-primary group-hover:ring-4 group-hover:shadow-lg group-hover:shadow-primary/40" 
                        : "ring-muted-foreground/30"
                    )}>
                      <AvatarImage src={channel.avatar} className="object-cover" />
                      <AvatarFallback className="text-lg font-bold">
                        {channel.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    
                    {/* Live Indicator */}
                    {channel.isLive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-live text-white text-[10px] font-bold rounded-full shadow-lg shadow-red-500/30 animate-pulse">
                        LIVE
                      </span>
                    )}
                  </div>

                  {/* Channel Info */}
                  <div className="text-center space-y-1">
                    <p className="font-semibold text-sm group-hover:text-primary transition-colors truncate max-w-[100px]">
                      {channel.name}
                    </p>
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <Eye className="h-3 w-3 text-primary" />
                      <span className="text-xs font-medium">
                        {channel.viewers >= 1000 
                          ? `${(channel.viewers / 1000).toFixed(1)}K` 
                          : channel.viewers}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
