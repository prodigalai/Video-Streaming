import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Flame,
  TrendingUp,
  Eye,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface FeaturedContent {
  id: string;
  type: "live" | "video";
  title: string;
  thumbnail: string;
  creator: {
    id: string;
    name: string;
    avatar: string;
  };
  metrics: string;
  category: string;
}

const featuredItems: FeaturedContent[] = [
  {
    id: "7",
    type: "live",
    title: "Late Night Vibes 🌙 Chill Music & Chat",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=675&fit=crop",
    creator: { id: "luna", name: "Luna_Live", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna" },
    metrics: "12.5K Viewers",
    category: "Just Chatting",
  },
  {
    id: "v1",
    type: "video",
    title: "How I Made $10K This Month - Full Breakdown",
    thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=675&fit=crop",
    creator: { id: "business", name: "BusinessPro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=business" },
    metrics: "125K Views",
    category: "Business",
  },
  {
    id: "1",
    type: "live",
    title: "Gaming Marathon - Day 3! Undefeated Goal",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=675&fit=crop",
    creator: { id: "gamer", name: "GamerPro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gamer" },
    metrics: "8.4K Viewers",
    category: "Gaming",
  }
];

export function TrendingSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const activeItem = featuredItems[selectedIndex];

  return (
    <div className="relative group/slider">
      <div className="overflow-hidden rounded-[2.5rem] bg-black border border-white/5 shadow-2xl" ref={emblaRef}>
        <div className="flex">
          {featuredItems.map((item) => (
            <div key={item.id} className="relative flex-[0_0_100%] md:aspect-[21/9] aspect-video md:min-h-[400px] min-h-[300px]">
              <img 
                src={item.thumbnail} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 transition-scale duration-700 group-hover/slider:scale-105" 
                alt={item.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end space-y-6">
                <div className="flex items-center gap-3">
                   <div className={cn(
                     "flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest",
                     item.type === "live" ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-primary/10 border-primary/20 text-primary"
                   )}>
                      {item.type === "live" ? <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" /> : <TrendingUp className="h-3 w-3" />}
                      {item.type === "live" ? "Live" : "Viral"}
                   </div>
                   <Badge variant="secondary" className="bg-white/5 border-white/10 text-white/50 text-[10px] uppercase font-black px-3 py-1">
                      {item.category}
                   </Badge>
                </div>

                <div className="space-y-4 max-w-2xl">
                   <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none text-white">
                      {item.title}
                   </h1>
                   
                   <div className="flex items-center gap-6">
                      <Link to={`/creator/${item.creator.id}`} className="flex items-center gap-3 group/creator">
                         <Avatar className="h-10 w-10 ring-2 ring-primary/20 group-hover/creator:ring-primary transition-all">
                            <AvatarImage src={item.creator.avatar} />
                            <AvatarFallback>{item.creator.name[0]}</AvatarFallback>
                         </Avatar>
                         <span className="font-black text-sm uppercase tracking-widest text-white/90 group-hover/creator:text-primary transition-colors">{item.creator.name}</span>
                      </Link>
                      <div className="flex items-center gap-2 text-white/60 font-black text-xs uppercase tracking-widest">
                         {item.type === "live" ? <Eye className="h-4 w-4 text-live" /> : <Play className="h-4 w-4 text-primary" />}
                         {item.metrics}
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                   <Button asChild className="h-14 px-10 rounded-2xl bg-primary text-black font-black uppercase tracking-widest hover:shadow-glow-primary transition-all">
                      <Link to={item.type === "live" ? `/watch/live/${item.id}` : `/watch/video/${item.id}`}>
                         {item.type === "live" ? "Watch Live" : "Play Video"}
                      </Link>
                   </Button>
                   <Button variant="ghost" className="h-14 w-14 rounded-2xl border border-white/10 hover:bg-white/5 text-white">
                      <Flame className="h-6 w-6" />
                   </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 left-6 right-6 flex justify-between z-10 pointer-events-none">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={scrollPrev}
          className="h-14 w-14 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 text-white opacity-0 group-hover/slider:opacity-100 transition-all pointer-events-auto hover:bg-primary hover:text-black"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={scrollNext}
          className="h-14 w-14 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 text-white opacity-0 group-hover/slider:opacity-100 transition-all pointer-events-auto hover:bg-primary hover:text-black"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Pagination */}
      <div className="absolute bottom-8 right-12 flex gap-3 z-10">
         {featuredItems.map((_, i) => (
            <button
               key={i}
               onClick={() => emblaApi?.scrollTo(i)}
               className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === selectedIndex ? "w-12 bg-primary" : "w-3 bg-white/20 hover:bg-white/40"
               )}
            />
         ))}
      </div>
    </div>
  );
}
