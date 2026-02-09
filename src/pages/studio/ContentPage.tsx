import { useState } from "react";
import { Search, Filter, MoreHorizontal, Edit, BarChart2, MessageSquare, Trash2, Globe, Eye, DollarSign, Box, Plus, Play, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ContentUploadModal } from "@/components/content/ContentUploadModal";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const contentItems = [
  { 
    id: 1, 
    title: "Mastering the Art of Digital Painting", 
    type: "VOD", 
    visibility: "Public", 
    monetization: "On", 
    views: "12,450", 
    earnings: "4,500", 
    date: "Feb 07, 2026",
    thumbnail: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=320&h=180&fit=crop"
  },
  { 
    id: 2, 
    title: "Saturday Night Gaming Sessions", 
    type: "LIVE", 
    visibility: "Public", 
    monetization: "On", 
    views: "5,840", 
    earnings: "2,100", 
    date: "Feb 06, 2026",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=320&h=180&fit=crop"
  },
  { 
    id: 3, 
    title: "Behind the Scenes - New Studio", 
    type: "VOD", 
    visibility: "Unlisted", 
    monetization: "Off", 
    views: "2,100", 
    earnings: "0", 
    date: "Feb 05, 2026",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=320&h=180&fit=crop"
  },
  { 
    id: 4, 
    title: "Quick Tips - Improving Your Workflow", 
    type: "VOD", 
    visibility: "Public", 
    monetization: "On", 
    views: "45,200", 
    earnings: "12,800", 
    date: "Feb 04, 2026",
    thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=320&h=180&fit=crop"
  }
];

export default function ContentPage() {
  const [activeType, setActiveType] = useState('All');
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in relative pb-12">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 md:gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 md:gap-3">
             <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                <Box className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
             </div>
             <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
                Content Library
             </h1>
          </div>
          <p className="text-xs md:text-sm font-medium text-muted-foreground">Manage your videos and content</p>
        </div>
        
        <ContentUploadModal open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <Button className="h-10 md:h-12 px-6 md:px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Upload Content
            </Button>
        </ContentUploadModal>
      </div>

      {/* Control Panel */}
      <div className="bg-card p-4 md:p-6 rounded-xl border border-border/50 flex flex-col md:flex-row items-stretch md:items-center gap-4">
        <div className="flex gap-2 bg-muted/30 p-1 rounded-xl border border-border/50 overflow-x-auto scrollbar-hide">
          {['All', 'VOD', 'LIVE', 'Archive'].map((type) => (
            <Button 
              key={type}
              variant="ghost" 
              size="sm" 
              onClick={() => { setActiveType(type); toast.info(`Filtered by: ${type}`); }}
              className={cn(
                "h-8 md:h-9 px-3 md:px-5 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap",
                activeType === type ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {type}
            </Button>
          ))}
        </div>
        <div className="relative flex-1 group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none">
             <Search className="h-full w-full" />
          </div>
          <Input 
            placeholder="Search content..." 
            className="pl-11 h-10 md:h-12 bg-background border-border/50 rounded-xl focus:border-primary/50"
            onChange={(e) => { if(e.target.value.length > 2) toast.info(`Searching: ${e.target.value}`); }}
          />
        </div>
        <Button variant="outline" className="h-10 md:h-12 px-4 md:px-6 rounded-xl font-bold">
          <Filter className="h-4 w-4 mr-2" /> Filters
        </Button>
      </div>

      {/* Content Grid */}
      <div className="space-y-4 md:space-y-6">
        {contentItems.map((item, idx) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group relative bg-card border border-border/50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm hover:border-primary/50 transition-all cursor-pointer"
            onClick={() => toast.success(`Opening: ${item.title}`)}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                {/* Thumbnail */}
                <div className="relative h-40 md:h-32 w-full md:w-56 shrink-0 rounded-lg overflow-hidden group/thumb">
                    <img src={item.thumbnail} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" alt={item.title} />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                    <div className="absolute top-2 left-2">
                        <Badge className={cn(
                        "h-6 px-2 text-xs font-bold border-none shadow-lg",
                        item.type === 'LIVE' ? "bg-red-600 text-white animate-pulse" : "bg-black/60 text-white backdrop-blur-md"
                        )}>
                        {item.type}
                        </Badge>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                        <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                            <Monitor className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-3 md:space-y-4">
                    <div className="space-y-1">
                        <h3 className="text-base md:text-lg font-bold text-foreground truncate group-hover:text-primary transition-colors">{item.title}</h3>
                        <p className="text-xs text-muted-foreground font-medium">ID: FOC-{2000 + item.id} • {item.date}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-muted-foreground">Visibility</p>
                            <div className="flex items-center gap-2">
                                <Globe className="h-3.5 w-3.5 text-green-500" />
                                <span className="text-sm font-bold text-foreground">{item.visibility}</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-muted-foreground">Monetization</p>
                            <div className="flex items-center gap-2">
                                <div className={cn("h-1.5 w-1.5 rounded-full", item.monetization === 'On' ? "bg-green-500 shadow-glow-sm" : "bg-muted-foreground/20")} />
                                <span className="text-sm font-bold text-foreground">{item.monetization}</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-muted-foreground">Views</p>
                            <div className="flex items-center gap-2">
                                <Eye className="h-3.5 w-3.5 text-primary" />
                                <span className="text-sm font-bold text-foreground">{item.views}</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-muted-foreground">Earnings</p>
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-3.5 w-3.5 text-green-500" />
                                <span className="text-sm font-bold text-foreground">${item.earnings}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col items-center gap-2 md:gap-3 md:pl-6 md:border-l border-border/50">
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-muted/30 hover:bg-primary/10 hover:text-primary" onClick={(e) => { e.stopPropagation(); toast.success("Edit mode"); }}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-muted/30 hover:bg-primary/10 hover:text-primary" onClick={(e) => { e.stopPropagation(); toast.success("Analytics"); }}>
                        <BarChart2 className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-muted/30 hover:bg-muted/50" onClick={(e) => e.stopPropagation()}>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="cursor-pointer">
                                <MessageSquare className="h-4 w-4 mr-2" /> Comments
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-destructive" onClick={() => toast.error("Delete initiated")}>
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 pt-6">
        <p className="text-xs md:text-sm font-semibold text-muted-foreground">Showing {contentItems.length} items</p>
        <div className="flex gap-2">
            <Button variant="outline" disabled className="h-10 px-6 rounded-xl font-bold">Previous</Button>
            <Button variant="outline" disabled className="h-10 px-6 rounded-xl font-bold">Next</Button>
        </div>
      </div>
    </div>
  );
}
