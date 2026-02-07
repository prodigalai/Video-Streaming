import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Volume2, 
  Settings, 
  Maximize, 
  Users,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface FeaturedStream {
  id: string;
  title: string;
  thumbnail: string;
  creator: {
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  viewers: number;
  category: string;
  tags?: string[];
}

interface HeroSliderProps {
  streams: FeaturedStream[];
  autoPlayInterval?: number;
}

export function HeroSlider({ streams, autoPlayInterval = 5000 }: HeroSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "center",
    skipSnaps: false,
    dragFree: false,
  });
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [tweenValues, setTweenValues] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;

    const scrollProgress = emblaApi.scrollProgress();

    const styles = emblaApi.scrollSnapList().map((snap, index) => {
      let diffToTarget = emblaApi.scrollSnapList()[index] - scrollProgress;
      
      // Handle loop wrapping correctly for 3D tweening
      if (emblaApi.canScrollNext() && diffToTarget > 0.5) diffToTarget -= 1;
      if (emblaApi.canScrollPrev() && diffToTarget < -0.5) diffToTarget += 1;

      return diffToTarget;
    });

    setTweenValues(styles);
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onScroll();
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onScroll);
    emblaApi.on("select", onScroll);

    return () => {
      emblaApi.off("scroll", onScroll);
      emblaApi.off("reInit", onScroll);
      emblaApi.off("select", onScroll);
    };
  }, [emblaApi, onScroll]);

  const startAutoPlay = useCallback(() => {
    if (!emblaApi) return;
    return setInterval(() => {
      if (!isHovered) emblaApi.scrollNext();
    }, autoPlayInterval);
  }, [emblaApi, isHovered, autoPlayInterval]);

  useEffect(() => {
    if (!emblaApi) return;
    
    let intervalId = startAutoPlay();

    const stop = () => clearInterval(intervalId);
    const start = () => {
      clearInterval(intervalId);
      intervalId = startAutoPlay();
    };

    emblaApi.on("pointerDown", stop);
    emblaApi.on("pointerUp", start);

    return () => {
      stop();
      emblaApi.off("pointerDown", stop);
      emblaApi.off("pointerUp", start);
    };
  }, [emblaApi, startAutoPlay]);

  const activeStream = streams[selectedIndex];

  return (
    <section 
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container relative py-6 lg:py-12 px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch min-h-[auto] lg:min-h-[400px]">
          
          {/* Main Stage Carousel */}
          <div className="flex-1 min-w-0 relative group/carousel">
            <div ref={emblaRef} className="overflow-hidden lg:overflow-visible h-full pb-8 lg:pb-0">
              <div className="flex h-full items-center">
                {streams.map((stream, index) => {
                  const tweenValue = tweenValues[index] || 0;
                  const absDiff = Math.abs(tweenValue);
                  
                  // Cinematic 3D Depth Formula - More conservative on mobile
                  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
                  const scale = 1 - absDiff * (isMobile ? 0.15 : 0.25);
                  const opacity = 1 - absDiff * (isMobile ? 0.4 : 0.6);
                  const rotateY = tweenValue * (isMobile ? -25 : -45); 
                  const translateZ = (1 - absDiff) * (isMobile ? 50 : 150); 
                  const blur = absDiff * (isMobile ? 2 : 5); 

                  return (
                    <div
                      key={stream.id}
                      className="relative flex-[0_0_92%] lg:flex-[0_0_80%] min-w-0 px-2 lg:px-4"
                      style={{ 
                        perspective: '1500px',
                        transformStyle: 'preserve-3d',
                        opacity: Math.max(0.1, opacity),
                        zIndex: 10 - Math.round(absDiff * 10),
                        transform: `
                          perspective(1500px)
                          translateZ(${translateZ}px)
                          rotateY(${rotateY}deg)
                          scale(${scale})
                        `,
                        filter: `blur(${blur}px)`,
                        transition: 'transform 0.1s ease-out, filter 0.1s ease-out'
                      }}
                    >
                      <Link to={`/watch/live/${stream.id}`} className="block h-full">
                        <div 
                          className={cn(
                            "relative aspect-video rounded-2xl lg:rounded-3xl overflow-hidden transition-all duration-500 ring-1 ring-white/5",
                            index === selectedIndex && "shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] ring-primary/20"
                          )}
                        >
                          <img
                            src={stream.thumbnail}
                            alt={stream.title}
                            className="w-full h-full object-cover"
                          />
                          
                          <div className="absolute top-2 left-2 lg:top-4 lg:left-4">
                            <Badge className="bg-red-600 text-white font-black px-2 py-0.5 text-[8px] tracking-widest border-none flex items-center gap-1.5">
                               <div className="h-1 w-1 rounded-full bg-white animate-pulse" />
                               LIVE
                            </Badge>
                          </div>

                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
                             <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-primary flex items-center justify-center scale-90 group-hover/carousel:scale-100 transition-transform duration-300">
                                <Play className="h-4 w-4 lg:h-5 lg:w-5 text-black fill-current" />
                             </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={scrollPrev}
              className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 opacity-0 group-hover/carousel:opacity-100 transition-all z-20"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollNext}
              className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 opacity-0 group-hover/carousel:opacity-100 transition-all z-20"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </Button>
            
            <div className="flex justify-center gap-1.5 mt-2 lg:mt-6 absolute bottom-2 left-0 right-0 lg:static">
               {streams.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => emblaApi?.scrollTo(i)}
                    className={cn(
                       "h-1 rounded-full transition-all duration-500",
                       i === selectedIndex ? "w-8 bg-primary" : "w-1.5 bg-white/20 hover:bg-white/40"
                    )}
                  />
               ))}
            </div>
          </div>

          {/* Compact Info Panel */}
          <div className="w-full lg:w-[200px] h-auto lg:h-[400px] flex">
             <div className="glass-card w-full p-4 lg:p-5 rounded-2xl lg:rounded-3xl border-white/10 flex flex-row lg:flex-col justify-between items-center lg:items-stretch relative overflow-hidden gap-4 lg:gap-0">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 blur-[40px] rounded-full pointer-events-none" />
                
                <div className="space-y-1 lg:space-y-4 flex-1 min-w-0">
                   <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 lg:h-10 lg:w-10 ring-1 ring-primary/20 shrink-0">
                         <AvatarImage src={activeStream?.creator.avatar} />
                         <AvatarFallback>{activeStream?.creator.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                         <p className="font-bold text-sm truncate">{activeStream?.creator.name}</p>
                         <p className="text-[8px] text-primary uppercase font-bold tracking-widest truncate">{activeStream?.category}</p>
                      </div>
                   </div>

                   <h2 className="hidden lg:block text-sm font-bold leading-tight line-clamp-2">
                      {activeStream?.title}
                   </h2>

                   <div className="hidden lg:flex gap-1 flex-wrap">
                      {activeStream?.tags?.slice(0, 2).map(tag => (
                         <Badge key={tag} variant="secondary" className="text-[7px] bg-white/5 text-muted-foreground uppercase font-medium px-1.5 py-0">
                            {tag}
                         </Badge>
                      ))}
                   </div>
                </div>

                <div className="flex lg:block items-center gap-3 lg:gap-0 lg:pt-4 lg:space-y-4 shrink-0">
                   <div className="flex items-center gap-3 lg:mb-4">
                      <div className="h-8 w-8 rounded-xl bg-live/20 flex items-center justify-center shrink-0">
                         <Users className="h-4 w-4 text-live" />
                      </div>
                      <div className="min-w-0 hidden sm:block lg:block">
                         <p className="text-sm font-bold leading-none">{activeStream?.viewers.toLocaleString()}</p>
                         <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-tighter">Live</p>
                      </div>
                   </div>

                   <Button asChild className="w-auto lg:w-full h-9 lg:h-10 px-4 lg:px-0 rounded-xl bg-primary text-black font-bold text-xs hover:shadow-glow-primary transition-all">
                      <Link to={`/watch/live/${activeStream?.id}`}>
                         WATCH
                      </Link>
                   </Button>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
