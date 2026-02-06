import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { Eye, Users, Clock, DollarSign, ArrowUpRight, ArrowDownRight, TrendingUp, UserPlus, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const overviewData = [
  { name: '1 Feb', views: 4200, watchTime: 2100, Revenue: 150 },
  { name: '2 Feb', views: 3800, watchTime: 1800, Revenue: 130 },
  { name: '3 Feb', views: 5100, watchTime: 2600, Revenue: 210 },
  { name: '4 Feb', views: 4800, watchTime: 2300, Revenue: 190 },
  { name: '5 Feb', views: 6200, watchTime: 3100, Revenue: 280 },
  { name: '6 Feb', views: 5900, watchTime: 2800, Revenue: 240 },
  { name: '7 Feb', views: 7500, watchTime: 4200, Revenue: 350 },
];

const audienceData = [
  { name: '18-24', value: 35 },
  { name: '25-34', value: 45 },
  { name: '35-44', value: 12 },
  { name: '45+', value: 8 },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--secondary))', 'hsl(var(--muted-foreground))'];

const MetricCard = ({ label, value, change, trend, active }: any) => (
  <button className={cn(
    "flex-1 text-left p-6 rounded-xl transition-all duration-300 border",
    active 
      ? "glass-card border-primary/30 shadow-glow-sm" 
      : "bg-muted/10 border-transparent hover:bg-muted/20"
  )}>
    <p className="text-muted-foreground text-sm font-medium mb-1">{label}</p>
    <div className="flex items-baseline gap-3">
      <span className="text-2xl font-bold">{value}</span>
      <span className={cn(
        "text-xs font-bold flex items-center gap-0.5",
        trend === 'up' ? "text-success" : "text-destructive"
      )}>
        {trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
        {change}
      </span>
    </div>
    {active && <div className="mt-4 h-1 w-full bg-primary rounded-full animate-pulse shadow-glow-sm" />}
  </button>
);

import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gradient">Channel Analytics</h1>
          <p className="text-muted-foreground mt-1">Detailed insights into your performance and audience growth.</p>
        </div>
        <div className="flex items-center gap-2 bg-muted/30 p-1 rounded-lg">
          <Button variant="ghost" size="sm" className="h-9 px-4 rounded-md bg-primary/10 text-primary" onClick={() => toast.info("Showing Last 28 Days")}>Last 28 Days</Button>
          <Button variant="ghost" size="sm" className="h-9 px-4 rounded-md hover:bg-muted" onClick={() => toast.info("Showing Last 90 Days")}>Last 90 Days</Button>
          <Button variant="ghost" size="sm" className="h-9 px-4 rounded-md hover:bg-muted" onClick={() => toast.info("Showing Last Year")}>Year</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="bg-transparent h-auto p-0 gap-4 flex overflow-x-auto no-scrollbar pb-2">
           <TabsTrigger value="overview" className="h-11 px-8 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-bold border border-transparent data-[state=active]:border-primary/20 transition-all" onClick={() => toast.success("Overview loaded")}>Overview</TabsTrigger>
           <TabsTrigger value="content" className="h-11 px-8 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-bold border border-transparent data-[state=active]:border-primary/20 transition-all" onClick={() => toast.success("Content metrics loaded")}>Content</TabsTrigger>
           <TabsTrigger value="audience" className="h-11 px-8 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-bold border border-transparent data-[state=active]:border-primary/20 transition-all" onClick={() => toast.success("Audience data loaded")}>Audience</TabsTrigger>
           <TabsTrigger value="revenue" className="h-11 px-8 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-bold border border-transparent data-[state=active]:border-primary/20 transition-all" onClick={() => toast.success("Revenue report loaded")}>Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8 mt-0 border-0 focus-visible:ring-0">
          {/* Top Metrics Row */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div onClick={() => toast.info("Views details")}>
                <MetricCard label="Views" value="124,530" change="45%" trend="up" active={true} />
            </div>
            <div onClick={() => toast.info("Watch time details")}>
                <MetricCard label="Watch time (hours)" value="4,820" change="32%" trend="up" active={false} />
            </div>
            <div onClick={() => toast.info("Subscribers details")}>
                <MetricCard label="Subscribers" value="+1,204" change="12%" trend="up" active={false} />
            </div>
            <div onClick={() => toast.info("Revenue details")}>
                <MetricCard label="Estimated Revenue" value="$3,420" change="25%" trend="up" active={false} />
            </div>
          </div>

          {/* Main Chart Section */}
          <div className="glass-card p-8 rounded-xl">
             <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                   <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Views Over Time</h3>
                  <p className="text-sm text-muted-foreground">Your channel received 124,530 views in the last 28 days.</p>
                </div>
             </div>
             <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={overviewData}>
                    <defs>
                      <linearGradient id="analyticsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))' }} />
                    <Area type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={4} fill="url(#analyticsGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Audience Demographics */}
             <div className="glass-card p-8 rounded-xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                   <Users className="h-5 w-5 text-primary" /> Audience Demographics
                </h3>
                <div className="flex flex-col md:flex-row items-center gap-8">
                   <div className="h-[200px] w-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                            <Pie
                               data={audienceData}
                               innerRadius={60}
                               outerRadius={80}
                               paddingAngle={5}
                               dataKey="value"
                            >
                               {audienceData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                               ))}
                            </Pie>
                         </PieChart>
                      </ResponsiveContainer>
                   </div>
                   <div className="flex-1 space-y-4">
                      {audienceData.map((item, index) => (
                         <div key={item.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                               <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                               <span className="text-sm font-medium">{item.name}</span>
                            </div>
                            <span className="text-sm font-bold">{item.value}%</span>
                         </div>
                      ))}
                   </div>
                </div>
             </div>

             {/* Top Content */}
             <div className="glass-card p-8 rounded-xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                   <PlayCircle className="h-5 w-5 text-primary" /> Top Content
                </h3>
                <div className="space-y-6">
                   {[
                      { title: 'The Ultimate Guide to StreamVault', views: '45.2K', growth: '+12%' },
                      { title: 'Late Night Lofi Session', views: '28.1K', growth: '+8%' },
                      { title: 'Designing Cosmos UI', views: '15.4K', growth: '+25%' },
                   ].map((video, i) => (
                      <div key={i} className="flex items-center justify-between group cursor-pointer" onClick={() => toast.success(`Viewing analytics for: ${video.title}`)}>
                         <div className="flex-1 min-w-0 pr-4">
                            <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{video.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{video.views} views</p>
                         </div>
                         <Badge variant="outline" className="text-success bg-success/5 border-success/20">{video.growth}</Badge>
                      </div>
                   ))}
                </div>
                <Button variant="ghost" className="w-full mt-6 text-primary font-bold hover:bg-primary/5 rounded-lg h-10" onClick={() => toast.success("Full report download started")}>See Full Report</Button>
             </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
