import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, UserPlus, Star, ChevronRight, Search, Filter, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from '@/components/ui/input';
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const subscriberGrowthData = [
  { name: 'Week 1', subs: 450 },
  { name: 'Week 2', subs: 890 },
  { name: 'Week 3', subs: 1200 },
  { name: 'Week 4', subs: 1845 },
];

const subscribers = [
  { id: 1, name: "Neon_Warrior", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=neon", tier: "Legendary", date: "Joined Jan 2024", subCount: "4.5K" },
  { id: 2, name: "Cosmic_Explorer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cosmic", tier: "Elite", date: "Joined Dec 2023", subCount: "12K" },
  { id: 3, name: "Pixel_Artist", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pixel", tier: "Member", date: "Joined Feb 2024", subCount: "850" },
  { id: 4, name: "Digital_Nomad", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nomad", tier: "Elite", date: "Joined Jan 2024", subCount: "2.1K" },
];

export default function SubscribersPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gradient">Subscribers</h1>
          <p className="text-muted-foreground mt-1">Track your audience growth and interact with your members.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="glass-card px-6 py-2 rounded-xl border-primary/20 flex flex-col items-center">
              <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-0.5">Total Subs</span>
              <span className="text-2xl font-black text-gradient">12,450</span>
           </div>
           <Button className="rounded-lg bg-primary hover:shadow-glow transition-all px-8 h-12 font-bold whitespace-nowrap" onClick={() => toast.success("Manage Tiers Dialog")}>Manage Tiers</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Subscriber Growth Chart */}
         <div className="lg:col-span-2 glass-card p-8 rounded-xl shadow-glow-sm">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-bold flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-primary" /> Subscription Growth
               </h3>
               <Badge variant="outline" className="text-success border-success/30 bg-success/5">+24% this month</Badge>
            </div>
            <div className="h-[250px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={subscriberGrowthData}>
                    <defs>
                      <linearGradient id="subsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))' }} />
                    <Area type="monotone" dataKey="subs" stroke="hsl(var(--primary))" strokeWidth={3} fill="url(#subsGradient)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Subscriber Tiers Card */}
         <div className="glass-card p-8 rounded-xl space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-3">
               <Award className="h-5 w-5 text-accent" /> Revenue Tiers
            </h3>
            <div className="space-y-4">
               {[
                  { name: 'Basic Member', price: '$2.99', count: '1,240', color: 'bg-muted-foreground' },
                  { name: 'Elite Explorer', price: '$9.99', count: '450', color: 'bg-primary' },
                  { name: 'Legendary Founder', price: '$24.99', count: '120', color: 'bg-accent' },
               ].map((tier) => (
                  <div key={tier.name} className="p-4 rounded-xl bg-muted/20 border border-border/50 hover:border-primary/30 transition-all group cursor-pointer" onClick={() => toast.info(`Viewing ${tier.name} tier details`)}>
                     <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-sm group-hover:text-primary transition-colors">{tier.name}</span>
                        <span className="text-xs font-bold text-success">{tier.price}/mo</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{tier.count} subscribers</span>
                        <div className={cn("h-1.5 w-16 rounded-full bg-muted/40 overflow-hidden")}>
                           <div className={cn("h-full", tier.color)} style={{ width: '60%' }} />
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Recent Subscribers List */}
      <div className="glass-card rounded-xl overflow-hidden">
         <div className="p-6 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-xl font-bold flex items-center gap-3">
               <Users className="h-5 w-5 text-primary" /> Recent Subscribers
            </h3>
            <div className="flex items-center gap-3">
               <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input placeholder="Search subscribers..." className="pl-10 h-10 w-64 bg-muted/20 border-border/50 rounded-lg focus:border-primary/50" onChange={(e) => { if(e.target.value.length > 2) toast.info(`Searching: ${e.target.value}`); }} />
               </div>
               <Button variant="outline" size="icon" className="h-10 w-10 rounded-lg border-border/50" onClick={() => toast.info("Filter options")}><Filter className="h-4 w-4" /></Button>
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-border/50 bg-muted/10 uppercase text-[10px] font-bold tracking-wider text-muted-foreground">
                     <th className="px-6 py-4">User</th>
                     <th className="px-6 py-4 text-center">Tier</th>
                     <th className="px-6 py-4">Join Date</th>
                     <th className="px-6 py-4 text-center">Subscribers</th>
                     <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-border/50">
                  {subscribers.map((sub) => (
                     <tr key={sub.id} className="group hover:bg-primary/5 transition-colors cursor-pointer" onClick={() => toast.info(`Opened profile for ${sub.name}`)}>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10 border border-border/30">
                                 <AvatarImage src={sub.avatar} />
                                 <AvatarFallback>{sub.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                 <p className="font-bold text-sm tracking-tight">{sub.name}</p>
                                 <p className="text-[10px] text-muted-foreground uppercase font-black">@subscriber_{sub.id}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                           <Badge variant="outline" className={cn(
                              "font-bold text-[10px] uppercase h-6 rounded-full px-3",
                              sub.tier === 'Legendary' ? "bg-accent/10 text-accent border-accent/20 shadow-[0_0_10px_rgba(255,50,255,0.1)]" : 
                              sub.tier === 'Elite' ? "bg-primary/10 text-primary border-primary/20" : 
                              "bg-muted/10 text-muted-foreground border-border/50"
                           )}>
                              {sub.tier}
                           </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
                           {sub.date}
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-sm">
                           {sub.subCount}
                        </td>
                        <td className="px-6 py-4 text-right">
                           <Button variant="ghost" className="h-9 px-4 rounded-lg text-xs font-bold hover:bg-primary/10 hover:text-primary transition-all" onClick={(e) => { e.stopPropagation(); toast.success("Redirecting to profile..."); }}>
                              View Profile
                           </Button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="p-6 border-t border-border/50 text-center">
            <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5 rounded-lg h-10 px-8" onClick={() => toast.info("Showing all 12,450 subscribers...")}>View All Subscribers</Button>
         </div>
      </div>
    </div>
  );
}


