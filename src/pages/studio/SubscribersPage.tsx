import { Search, Filter, MoreHorizontal, UserCheck, Star, Crown, Shield, TrendingUp, UserMinus, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const subscribers = [
  { id: 1, name: "Alex Visuals", tier: "Tier 3", since: "2 years", status: "Active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex" },
  { id: 2, name: "Sarah Creative", tier: "Tier 1", since: "5 months", status: "Active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" },
  { id: 3, name: "Mike Audio", tier: "Tier 2", since: "1 year", status: "Active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike" },
  { id: 4, name: "Jessica Design", tier: "Tier 1", since: "2 weeks", status: "New", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica" },
  { id: 5, name: "David Tech", tier: "Free", since: "1 month", status: "Active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david" },
];

export default function SubscribersPage() {
  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in relative pb-20">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 md:gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 md:gap-3">
             <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg">
                <UserCheck className="h-4 w-4 md:h-5 md:w-5 text-white" />
             </div>
             <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
                Community
             </h1>
          </div>
          <p className="text-xs md:text-sm font-medium text-muted-foreground">Manage your subscriber base</p>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
            <Button variant="outline" className="h-10 md:h-12 px-6 font-bold flex-1 sm:flex-none">
                <Mail className="h-4 w-4 mr-2" /> Message All
            </Button>
            <Button className="h-10 md:h-12 px-6 bg-violet-600 hover:bg-violet-700 text-white font-bold shadow-lg shadow-violet-500/20 flex-1 sm:flex-none">
                <Crown className="h-4 w-4 mr-2" /> Manage Tiers
            </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
         {[
            { label: "Total Subscribers", value: "12,450", change: "+12%", icon: UserCheck, color: "text-violet-500", bg: "bg-violet-500/10" },
            { label: "New This Month", value: "840", change: "+8%", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
            { label: "Active Revenue", value: "$12.4k", change: "+15%", icon: Crown, color: "text-yellow-500", bg: "bg-yellow-500/10" },
            { label: "Churn Rate", value: "2.1%", change: "-0.5%", icon: UserMinus, color: "text-red-500", bg: "bg-red-500/10" },
         ].map((stat, i) => (
            <div key={i} className="bg-card p-4 md:p-6 rounded-xl border border-border/50 shadow-sm flex flex-col justify-between h-full">
               <div className="flex items-start justify-between mb-2">
                  <div className={cn("h-8 w-8 md:h-10 md:w-10 rounded-lg flex items-center justify-center", stat.bg)}>
                     <stat.icon className={cn("h-4 w-4 md:h-5 md:w-5", stat.color)} />
                  </div>
                  <Badge variant="outline" className={cn("text-[10px] font-bold border-0", stat.color.replace('text-', 'bg-').replace('500', '500/10'))}>
                     {stat.change}
                  </Badge>
               </div>
               <div>
                  <h3 className="text-2xl md:text-3xl font-black text-foreground">{stat.value}</h3>
                  <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
               </div>
            </div>
         ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-card p-4 md:p-6 rounded-xl border border-border/50 flex flex-col md:flex-row gap-4 items-center justify-between">
         <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-violet-500 transition-colors pointer-events-none" />
            <Input 
                placeholder="Search by name or email..." 
                className="pl-10 h-10 md:h-12 bg-background border-border/50 rounded-xl focus:border-violet-500/50 transition-all" 
                onChange={(e) => { if(e.target.value.length > 2) toast.info(`Searching: ${e.target.value}`); }} 
            />
         </div>
         <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto scrollbar-hide pb-2 md:pb-0">
            {["All Tiers", "Tier 1", "Tier 2", "Tier 3"].map((f) => (
                <Button key={f} variant="ghost" size="sm" className="h-9 px-4 rounded-lg text-xs font-bold whitespace-nowrap border border-border/50 hover:bg-muted/50 hover:border-violet-500/50">
                    {f}
                </Button>
            ))}
            <Button variant="outline" size="icon" className="h-9 w-9 shrink-0"><Filter className="h-4 w-4" /></Button>
         </div>
      </div>

      {/* Subscribers List */}
      <div className="bg-card border border-border/50 rounded-xl md:rounded-2xl shadow-sm overflow-hidden">
         <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-border/50 bg-muted/5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <div className="col-span-4 pl-2">Subscriber</div>
            <div className="col-span-2">Tier</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Joined</div>
            <div className="col-span-2 text-right pr-2">Actions</div>
         </div>
         
         <div className="divide-y divide-border/50">
            {subscribers.map((sub) => (
               <motion.div 
                  key={sub.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-muted/20 transition-colors group"
               >
                  <div className="col-span-1 md:col-span-4 flex items-center gap-3 md:gap-4">
                     <Avatar className="h-10 w-10 md:h-12 md:w-12 border border-border/50 group-hover:border-violet-500/50 transition-colors">
                        <AvatarImage src={sub.avatar} />
                        <AvatarFallback>{sub.name[0]}</AvatarFallback>
                     </Avatar>
                     <div>
                        <p className="font-bold text-sm md:text-base text-foreground group-hover:text-violet-500 transition-colors">{sub.name}</p>
                        <p className="text-xs text-muted-foreground md:hidden">{sub.tier} • {sub.status}</p>
                     </div>
                  </div>
                  
                  <div className="hidden md:block col-span-2">
                     <Badge variant="outline" className={cn(
                        "font-bold",
                        sub.tier === 'Tier 3' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : 
                        sub.tier === 'Tier 2' ? "bg-slate-300/10 text-slate-400 border-slate-400/20" : 
                        sub.tier === 'Tier 1' ? "bg-orange-700/10 text-orange-700 border-orange-700/20" : "bg-muted text-muted-foreground"
                     )}>
                        {sub.tier}
                     </Badge>
                  </div>
                  
                  <div className="hidden md:block col-span-2">
                     <div className="flex items-center gap-2">
                        <div className={cn("h-2 w-2 rounded-full", sub.status === 'Active' ? "bg-green-500" : "bg-blue-500")} />
                        <span className="text-sm font-medium text-foreground">{sub.status}</span>
                     </div>
                  </div>
                  
                  <div className="hidden md:block col-span-2 text-sm font-medium text-muted-foreground">
                     {sub.since}
                  </div>
                  
                  <div className="col-span-1 md:col-span-2 flex justify-end gap-2">
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => toast.success(`Drafting message to ${sub.name}`)}>
                        <MessageSquare className="h-4 w-4" />
                     </Button>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                              <MoreHorizontal className="h-4 w-4" />
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                           <DropdownMenuItem>View Profile</DropdownMenuItem>
                           <DropdownMenuItem>Gift Subscription</DropdownMenuItem>
                           <DropdownMenuItem className="text-red-500">Block User</DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </div>
               </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
}
