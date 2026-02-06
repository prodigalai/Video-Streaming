import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Eye, Users, Clock, DollarSign, ArrowUpRight, ArrowDownRight, Play, Edit3, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const performanceData = [
  { name: 'Mon', views: 4000, watchTime: 2400 },
  { name: 'Tue', views: 3000, watchTime: 1398 },
  { name: 'Wed', views: 2000, watchTime: 9800 },
  { name: 'Thu', views: 2780, watchTime: 3908 },
  { name: 'Fri', views: 1890, watchTime: 4800 },
  { name: 'Sat', views: 2390, watchTime: 3800 },
  { name: 'Sun', views: 3490, watchTime: 4300 },
];

const recentActivities = [
  { id: 1, title: "Lofi Beats for Coding", status: "Published", views: "1.2K", time: "2 hours ago", type: "VOD" },
  { id: 2, title: "Late Night Gaming With Subs", status: "Live", views: "450", time: "Now", type: "LIVE" },
  { id: 3, title: "New Asset Pack Reveal", status: "Scheduled", views: "0", time: "Tomorrow", type: "VOD" },
];

const SummaryCard = ({ title, value, change, icon: Icon, trend }: any) => (
  <div className="glass-card p-6 rounded-xl hover:shadow-glow-sm transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <Badge variant="outline" className={cn(
        "bg-transparent border-0 flex items-center gap-1",
        trend === 'up' ? "text-success" : "text-destructive"
      )}>
        {trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
        {change}
      </Badge>
    </div>
    <div>
      <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  </div>
);

import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gradient">Channel Dashboard</h1>
          <p className="text-muted-foreground mt-1">Good morning, Creator! Here's what's happening with your channel.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-lg h-10" onClick={() => toast.success("Report export started...")}>Export Report</Button>
          <Button className="rounded-lg bg-primary hover:shadow-glow transition-all h-10" onClick={() => toast.success("Going Live! Setting up stream...")}>Go Live</Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard title="Total Views" value="124.5K" change="+12.5%" icon={Eye} trend="up" />
        <SummaryCard title="Watch Time (hrs)" value="3,840" change="+8.2%" icon={Clock} trend="up" />
        <SummaryCard title="Subscribers" value="12,450" change="+4.3%" icon={Users} trend="up" />
        <SummaryCard title="Credits Earned" value="45,200" change="-2.1%" icon={DollarSign} trend="down" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <div className="lg:col-span-2 glass-card p-6 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Channel Analytics</h2>
            <div className="flex gap-2 bg-muted/30 p-1 rounded-lg">
              <Button variant="ghost" size="sm" className="h-8 rounded-md bg-primary/10 text-primary" onClick={() => toast.info("Showing last 7 days")}>7d</Button>
              <Button variant="ghost" size="sm" className="h-8 rounded-md hover:bg-muted" onClick={() => toast.info("Showing last 28 days")}>28d</Button>
              <Button variant="ghost" size="sm" className="h-8 rounded-md hover:bg-muted" onClick={() => toast.info("Showing last 90 days")}>90d</Button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}
                  itemStyle={{ color: 'hsl(var(--primary))' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorViews)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-6">Latest Activity</h2>
          <div className="space-y-6">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-4 group cursor-pointer" onClick={() => toast.info(`Viewing details for: ${activity.title}`)}>
                <div className="relative h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                  <Play className="absolute inset-0 m-auto h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={activity.status === 'Live' ? 'destructive' : 'secondary'} className="h-5 px-1.5 text-[10px] uppercase font-bold tracking-wider">
                      {activity.status}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground uppercase">{activity.type}</span>
                  </div>
                  <h3 className="font-semibold text-sm truncate">{activity.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Eye className="h-3 w-3" /> {activity.views}
                    </span>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
                <div className="flex items-start">
                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10" onClick={(e) => { e.stopPropagation(); toast.info("Opening analytics preview"); }}>
                    <BarChart2 className="h-4 w-4" />
                   </Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-6 text-primary hover:bg-primary/5 rounded-lg h-10 font-semibold" onClick={() => toast.info("Navigating to all content...")}>
            View All Content
          </Button>
        </div>
      </div>
    </div>
  );
}
