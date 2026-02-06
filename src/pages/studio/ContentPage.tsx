import { useState } from "react";
import { Search, Filter, MoreHorizontal, Edit, BarChart2, MessageSquare, Trash2, Globe, Eye, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const contentItems = [
  { 
    id: 1, 
    title: "Mastering the Art of Digital Painting", 
    type: "VOD", 
    visibility: "Public", 
    monetization: "On", 
    views: "12,450", 
    earnings: "4,500", 
    date: "Feb 1, 2024",
    thumbnail: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=160\u0026h=90\u0026fit=crop"
  },
  { 
    id: 2, 
    title: "Saturday Night Gaming Sessions - Chill Vibes", 
    type: "LIVE", 
    visibility: "Public", 
    monetization: "On", 
    views: "5,840", 
    earnings: "2,100", 
    date: "Jan 28, 2024",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=160\u0026h=90\u0026fit=crop"
  },
  { 
    id: 3, 
    title: "Behind the Scenes: New Studio Setup", 
    type: "VOD", 
    visibility: "Unlisted", 
    monetization: "Off", 
    views: "2,100", 
    earnings: "0", 
    date: "Jan 15, 2024",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=160\u0026h=90\u0026fit=crop"
  },
  { 
    id: 4, 
    title: "Quick Tips: Improving Your Workflow", 
    type: "VOD", 
    visibility: "Public", 
    monetization: "On", 
    views: "45,200", 
    earnings: "12,800", 
    date: "Jan 10, 2024",
    thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=160\u0026h=90\u0026fit=crop"
  }
];

import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ContentPage() {
  const [activeType, setActiveType] = useState('All');

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-gradient">Channel Content</h1>
        <Button className="rounded-lg bg-primary hover:shadow-glow transition-all px-6 h-11 font-bold" onClick={() => toast.success("Upload dialog opened")}>Upload Video</Button>
      </div>

      {/* Filters & Search */}
      <div className="glass-card p-4 rounded-xl flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-2 bg-muted/30 p-1 rounded-lg">
          {['All', 'VOD', 'LIVE', 'Shorts'].map((type) => (
            <Button 
              key={type}
              variant="ghost" 
              size="sm" 
              onClick={() => { setActiveType(type); toast.info(`Filtered by: ${type}`); }}
              className={cn(
                "h-9 px-4 rounded-md transition-all",
                activeType === type ? "bg-primary/10 text-primary" : "hover:bg-muted"
              )}
            >
              {type}
            </Button>
          ))}
        </div>
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search within your content..." 
            className="pl-10 h-11 bg-muted/20 border-border/50 rounded-lg focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
            onChange={(e) => { if(e.target.value.length > 2) toast.info(`Searching for: ${e.target.value}`); }}
          />
        </div>
        <Button variant="outline" className="rounded-lg h-11 gap-2 whitespace-nowrap px-4" onClick={() => toast.info("Filter menu opened")}>
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      {/* Content Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border/50 bg-muted/20 uppercase text-[10px] font-bold tracking-wider text-muted-foreground">
                <th className="px-6 py-4">Video</th>
                <th className="px-6 py-4 text-center">Visibility</th>
                <th className="px-6 py-4 text-center">Monetization</th>
                <th className="px-6 py-4 text-center">Views</th>
                <th className="px-6 py-4 text-center">Earning (Credits)</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {contentItems.map((item) => (
                <tr key={item.id} className="group hover:bg-primary/5 transition-colors cursor-pointer" onClick={() => toast.success(`Viewing analytics for ${item.title}`)}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4 min-w-[300px]">
                      <div className="relative h-16 w-16 md:w-28 flex-shrink-0 rounded-lg overflow-hidden bg-muted shadow-lg">
                        <img src={item.thumbnail} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                        <div className="absolute top-1 left-1">
                          <Badge className={cn(
                            "h-5 px-1.5 text-[10px] uppercase font-bold",
                            item.type === 'LIVE' ? "bg-live" : "bg-black/80"
                          )}>
                            {item.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm line-clamp-2 truncate whitespace-normal mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-1 italic">Add description...</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <Globe className="h-3 w-3 text-success" />
                        <span className="text-sm font-medium">{item.visibility}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className={cn(
                        "h-2 w-2 rounded-full shadow-[0_0_8px]",
                        item.monetization === 'On' ? "bg-success shadow-success/40" : "bg-muted shadow-none"
                      )} />
                      <span className="text-sm font-medium">{item.monetization}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm font-bold">
                       <Eye className="h-4 w-4 text-primary/70" /> {item.views}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm font-bold text-success">
                       <DollarSign className="h-3 w-3" /> {item.earnings}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-primary/10 hover:text-primary transition-all" onClick={() => toast.success("Edit video mode")}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-primary/10 hover:text-primary transition-all" onClick={() => toast.success("Analytics opened")}>
                        <BarChart2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-primary/10 hover:text-primary transition-all" onClick={() => toast.success("Comments opened")}>
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-primary/10 hover:text-primary transition-all">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="glass-strong border-border/50">
                          <DropdownMenuItem className="text-destructive focus:bg-destructive/10" onClick={() => toast.error("Video deleted")}>
                            <Trash2 className="h-4 w-4 mr-2" /> Delete permanently
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 border-t border-border/50 flex items-center justify-between text-muted-foreground text-sm">
          <span>Showing 4 items</span>
          <div className="flex gap-2">
            <Button variant="ghost" disabled className="h-9 rounded-lg border border-border/50">Previous</Button>
            <Button variant="ghost" disabled className="h-9 rounded-lg border border-border/50">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}


