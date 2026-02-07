import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { StreamCard } from "@/components/cards/StreamCard";
import { VideoCard } from "@/components/cards/VideoCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Compass, TrendingUp, Sparkles, Trophy, Music, Ghost, Gamepad2, Mic2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "Gaming", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop", count: 234, tags: ["FPS", "Shooter"] },
  { name: "Music", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop", count: 156, tags: ["Live", "DJ"] },
  { name: "Fitness", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop", count: 89, tags: ["Health", "Yoga"] },
  { name: "Cooking", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop", count: 67, tags: ["Food", "ASMR"] },
  { name: "Art", image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop", count: 123, tags: ["Creative", "Design"] },
  { name: "Talk Shows", image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop", count: 45, tags: ["Podcast", "News"] },
  { name: "Sports", image: "https://images.unsplash.com/photo-1461896642383-02947113e64b?w=400&h=300&fit=crop", count: 32, tags: ["Live", "Football"] },
  { name: "Crypto", image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=300&fit=crop", count: 78, tags: ["Web3", "Bitcoin"] },
];

const tags = ["English", "Competitive", "Casual", "No Commentary", "High MMR", "Newbie Friendly", "Speedrun"];

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState("categories");

  return (
    <MainLayout>
      <div className="container py-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
           <h1 className="text-4xl font-black text-white flex items-center gap-3">
              <Compass className="h-10 w-10 text-primary" />
              Explore
           </h1>
           <p className="text-muted-foreground text-lg max-w-2xl">
              Discover the next big thing. Browse through categories, tags, and find your new favorite community.
           </p>
        </div>

        {/* Quick Tags Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
           {tags.map(tag => (
             <Button key={tag} variant="secondary" className="rounded-full h-9 px-6 bg-white/5 border-white/5 whitespace-nowrap text-xs font-bold uppercase tracking-widest hover:border-primary/30 transition-all">
                {tag}
             </Button>
           ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
           <TabsList className="bg-white/5 p-1 rounded-2xl h-12 w-full max-w-md grid grid-cols-2">
             <TabsTrigger value="categories" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-black font-bold">Categories</TabsTrigger>
             <TabsTrigger value="trending" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-black font-bold">Trending Content</TabsTrigger>
           </TabsList>

           <TabsContent value="categories" className="mt-8">
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
               {categories.map((cat) => (
                 <CategoryCard key={cat.name} name={cat.name} image={cat.image} count={cat.count} tags={cat.tags} />
               ))}
             </div>
           </TabsContent>

           <TabsContent value="trending" className="mt-8 space-y-12">
              <section>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-white flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    Trending Live
                  </h3>
                  <Button variant="ghost" className="text-primary font-bold">View More</Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                   {/* Placeholder for trending streams */}
                   {[1, 2, 3, 4].map(i => (
                     <div key={i} className="aspect-video bg-white/5 rounded-2xl animate-pulse" />
                   ))}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-white flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-primary" />
                    Promoted Highlighs
                  </h3>
                  <Button variant="ghost" className="text-primary font-bold">View More</Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                   {/* Placeholder for trending videos */}
                   {[1, 2, 3].map(i => (
                     <div key={i} className="aspect-video bg-white/5 rounded-2xl animate-pulse" />
                   ))}
                </div>
              </section>
           </TabsContent>
        </Tabs>

        {/* Explore More Genres */}
        <section className="space-y-8 pt-8 border-t border-white/5">
           <h2 className="text-2xl font-black text-white">Browse by Genre</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Gamepad2, label: "Gaming", color: "text-blue-500", bg: "bg-blue-500/10" },
                { icon: Mic2, label: "Podcasts", color: "text-purple-500", bg: "bg-purple-500/10" },
                { icon: Music, label: "Music", color: "text-pink-500", bg: "bg-pink-500/10" },
                { icon: Trophy, label: "Sports", color: "text-orange-500", bg: "bg-orange-500/10" },
                { icon: Ghost, label: "Entertainment", color: "text-emerald-500", bg: "bg-emerald-500/10" },
              ].map(genre => (
                <div key={genre.label} className={cn("p-6 rounded-3xl flex items-center gap-4 cursor-pointer hover:scale-[1.02] transition-transform", genre.bg)}>
                   <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center", genre.bg, genre.color)}>
                      <genre.icon className="h-6 w-6" />
                   </div>
                   <span className="text-lg font-black">{genre.label}</span>
                </div>
              ))}
           </div>
        </section>
      </div>
    </MainLayout>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
