import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { StreamCard } from "@/components/cards/StreamCard";
import { VideoCard } from "@/components/cards/VideoCard";
import { CreatorCard } from "@/components/cards/CreatorCard";
import { MainLayout } from "@/components/layout/MainLayout";
import { NoResults } from "@/components/shared/EmptyState";

// Mock data
const liveResults = [
  {
    id: "1",
    title: "Gaming Marathon - Day 3!",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=338&fit=crop",
    creator: { name: "GamerPro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gamer" },
    viewers: 8432,
    category: "Gaming",
  },
  {
    id: "3",
    title: "Music Production Live Session",
    thumbnail: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=600&h=338&fit=crop",
    creator: { name: "BeatMaster", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=beat" },
    viewers: 5678,
    category: "Music",
  },
];

const videoResults = [
  {
    id: "v1",
    title: "How I Made $10K This Month - Full Breakdown",
    thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=338&fit=crop",
    creator: { name: "BusinessPro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=business" },
    duration: "24:35",
    views: 45000,
    price: 50,
  },
  {
    id: "v3",
    title: "Complete Guitar Tutorial for Beginners",
    thumbnail: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&h=338&fit=crop",
    creator: { name: "MusicMike", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike" },
    duration: "45:10",
    views: 28000,
  },
  {
    id: "v4",
    title: "My Daily Skincare Routine - All Products",
    thumbnail: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=338&fit=crop",
    creator: { name: "BeautyBella", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bella" },
    duration: "12:45",
    views: 67000,
  },
];

const creatorResults = [
  {
    id: "luna",
    name: "Luna Live",
    username: "luna_live",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
    followers: 125000,
    isLive: true,
  },
  {
    id: "gamer",
    name: "GamerPro",
    username: "gamerpro",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gamer",
    followers: 89000,
    isLive: true,
  },
  {
    id: "maria",
    name: "Chef Maria",
    username: "chefmaria",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
    followers: 56000,
    isLive: false,
  },
];

const suggestedSearches = ["Gaming", "Music", "Cooking", "Fitness", "Art", "Talk Shows"];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);
  const [activeTab, setActiveTab] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  const hasResults = query && (liveResults.length > 0 || videoResults.length > 0 || creatorResults.length > 0);

  return (
    <MainLayout>
      <div className="container py-6 space-y-6">
        {/* Search Header */}
        <div className="space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search streams, videos, creators..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10 h-12 text-lg bg-muted border-transparent focus:border-primary"
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="icon" className="h-12 w-12">
                  <SlidersHorizontal className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="space-y-6 py-6">
                  {/* Category */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="gaming">Gaming</SelectItem>
                        <SelectItem value="music">Music</SelectItem>
                        <SelectItem value="cooking">Cooking</SelectItem>
                        <SelectItem value="fitness">Fitness</SelectItem>
                        <SelectItem value="art">Art</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Price (Credits)</label>
                      <span className="text-sm text-muted-foreground">
                        {priceRange[0]} - {priceRange[1]}
                      </span>
                    </div>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={500}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  {/* Language */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Language</label>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Languages" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Languages</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">Apply Filters</Button>
                </div>
              </SheetContent>
            </Sheet>
          </form>

          {query && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Results for:</span>
              <Badge variant="secondary" className="text-base gap-2">
                {query}
                <button onClick={() => setSearchParams({})}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            </div>
          )}
        </div>

        {/* No Query State */}
        {!query && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">Suggested Searches</h2>
              <div className="flex flex-wrap gap-2">
                {suggestedSearches.map((term) => (
                  <Button
                    key={term}
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setSearchInput(term);
                      setSearchParams({ q: term });
                    }}
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {query && (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full max-w-md grid grid-cols-4 bg-muted/50">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="live">Live</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="creators">Creators</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8 mt-6">
              {hasResults ? (
                <>
                  {liveResults.length > 0 && (
                    <section>
                      <h2 className="text-lg font-semibold mb-4">Live Streams</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {liveResults.map((stream) => (
                          <StreamCard key={stream.id} {...stream} />
                        ))}
                      </div>
                    </section>
                  )}
                  {videoResults.length > 0 && (
                    <section>
                      <h2 className="text-lg font-semibold mb-4">Videos</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videoResults.map((video) => (
                          <VideoCard key={video.id} {...video} />
                        ))}
                      </div>
                    </section>
                  )}
                  {creatorResults.length > 0 && (
                    <section>
                      <h2 className="text-lg font-semibold mb-4">Creators</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {creatorResults.map((creator) => (
                          <CreatorCard key={creator.id} {...creator} />
                        ))}
                      </div>
                    </section>
                  )}
                </>
              ) : (
                <NoResults query={query} />
              )}
            </TabsContent>

            <TabsContent value="live" className="mt-6">
              {liveResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {liveResults.map((stream) => (
                    <StreamCard key={stream.id} {...stream} />
                  ))}
                </div>
              ) : (
                <NoResults query={query} />
              )}
            </TabsContent>

            <TabsContent value="videos" className="mt-6">
              {videoResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videoResults.map((video) => (
                    <VideoCard key={video.id} {...video} />
                  ))}
                </div>
              ) : (
                <NoResults query={query} />
              )}
            </TabsContent>

            <TabsContent value="creators" className="mt-6">
              {creatorResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {creatorResults.map((creator) => (
                    <CreatorCard key={creator.id} {...creator} />
                  ))}
                </div>
              ) : (
                <NoResults query={query} />
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </MainLayout>
  );
}
