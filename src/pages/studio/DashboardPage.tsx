import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Eye, Users, Clock, DollarSign, ArrowUpRight, ArrowDownRight, Play, Edit3, BarChart2, Plus, Zap, Target, Shield, Download, Sparkles, Signal, Box, Lock, Monitor, ArrowRight, Activity, ShieldCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
  { id: 1, title: "Lofi Beats // Node Selection", status: "Published", views: "1.2K", time: "2 HOURS AGO", type: "VOD" },
  { id: 2, title: "Late Night Gaming // Sub Node", status: "Live", views: "450", time: "NOW", type: "LIVE" },
  { id: 3, title: "New Asset Pack // Reveal", status: "Scheduled", views: "0", time: "TOMORROW", type: "VOD" },
];

const SummaryCard = ({ title, value, change, icon: Icon, trend, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-card border border-border/50 p-4 md:p-6 rounded-xl relative overflow-hidden group shadow-sm hover:border-primary/50 transition-all cursor-pointer"
  >
    <div className="absolute top-0 right-0 p-4 md:p-6 opacity-0 group-hover:opacity-[0.03] transition-all duration-700 pointer-events-none">
        <Icon className="h-16 md:h-24 w-16 md:w-24 text-white" />
    </div>
    <div className="flex items-center justify-between mb-4 md:mb-6 relative z-10">
      <div className="h-10 md:h-12 w-10 md:w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500">
        <Icon className="h-4 md:h-5 w-4 md:w-5 text-primary" />
      </div>
      <div className={cn(
        "flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-0.5 md:py-1 rounded-full border text-xs font-bold",
        trend === 'up' ? "text-green-500 border-green-500/20 bg-green-500/5" : "text-red-400 border-red-500/20 bg-red-500/5"
      )}>
        {trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
        {change}
      </div>
    </div>
    <div className="relative z-10 space-y-1">
      <h3 className="text-muted-foreground text-xs md:text-sm font-medium">{title}</h3>
      <div className="flex items-baseline gap-2">
        <p className="text-xl md:text-2xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  </motion.div>
);

export default function DashboardPage() {
  return (
    <div className="space-y-6 md:space-y-10 animate-fade-in relative pb-12">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 md:gap-8">
        <div className="space-y-2 md:space-y-3">
          <div className="flex items-center gap-2 md:gap-3">
             <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                <Zap className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
             </div>
             <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
                Creator Dashboard
             </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            <p className="text-xs md:text-sm font-medium text-muted-foreground">Active Channel: <span className="text-foreground font-bold">@creator_pro</span></p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="h-10 md:h-11 px-4 md:px-6 rounded-xl font-bold text-sm"
            onClick={() => toast.success("Exporting analytics...")}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button 
            className="h-10 md:h-11 px-6 md:px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl shadow-lg text-sm"
            onClick={() => toast.success("Starting live stream...")}
          >
            Go Live Now
            <Signal className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        <SummaryCard title="Total Revenue" value="$45,200.50" change="+12.5%" icon={DollarSign} trend="up" delay={0.1} />
        <SummaryCard title="Total Views" value="124.5K" change="+8.2%" icon={Eye} trend="up" delay={0.2} />
        <SummaryCard title="Subscribers" value="12,450" change="+4.3%" icon={Users} trend="up" delay={0.3} />
        <SummaryCard title="Engagement Rate" value="8.4%" change="-2.1%" icon={Target} trend="down" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Performance Chart */}
        <div className="lg:col-span-8 bg-card border border-border/50 p-4 md:p-6 lg:p-8 rounded-xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 md:gap-6 mb-6 md:mb-10">
            <div className="space-y-1">
                <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2 md:gap-3">
                    <div className="h-8 md:h-10 w-8 md:w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Activity className="h-4 md:h-5 w-4 md:w-5 text-primary" />
                    </div>
                    Performance Analytics
                </h2>
                <p className="text-xs md:text-sm font-medium text-muted-foreground pl-10 md:pl-13">Real-time engagement metrics</p>
            </div>
            <div className="flex gap-1.5 md:gap-2 bg-muted/30 p-1 rounded-xl border border-border/50 overflow-x-auto scrollbar-hide">
              {['7 Days', '28 Days', '90 Days'].map((period) => (
                <button
                    key={period}
                    className={cn(
                        "h-8 md:h-9 px-3 md:px-5 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap",
                        period === '7 Days' ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => toast.info(`Viewing ${period} analytics`)}
                >
                    {period}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[250px] md:h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 600 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 600 }}
                  tickFormatter={(value) => `${value / 1000}K`}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderRadius: '12px', 
                    border: '1px solid hsl(var(--border))',
                    boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
                    padding: '12px',
                  }}
                  itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 700, fontSize: '12px' }}
                  labelStyle={{ color: 'hsl(var(--foreground))', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}
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
        <div className="lg:col-span-4 bg-card border border-border/50 p-4 md:p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2 md:gap-3">
                <div className="h-8 md:h-10 w-8 md:w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Activity className="h-4 md:h-5 w-4 md:w-5 text-primary" />
                </div>
                Recent Activity
            </h2>
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-glow-sm" />
          </div>
          <div className="space-y-3 md:space-y-4 flex-1">
            {recentActivities.map((activity) => (
              <div 
                key={activity.id} 
                className="flex gap-4 group/item cursor-pointer p-4 rounded-xl hover:bg-muted/30 transition-all border border-transparent hover:border-border/50" 
                onClick={() => toast.info(`Opening: ${activity.title}`)}
              >
                <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-muted border border-border/50 group-hover/item:border-primary/40 transition-all">
                  <Play className="absolute inset-0 m-auto h-4 w-4 text-foreground opacity-0 group-hover/item:opacity-100 transition-all z-20" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/item:opacity-100 transition-opacity z-10" />
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Badge className={cn(
                        "h-5 px-2 text-xs font-bold border-none",
                        activity.status === 'Live' ? 'bg-red-600 text-white animate-pulse' : 'bg-primary text-primary-foreground'
                    )}>
                      {activity.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-semibold">{activity.type}</span>
                  </div>
                  <h3 className="font-bold text-foreground text-sm truncate group-hover/item:text-primary transition-colors">{activity.title}</h3>
                  <div className="flex items-center gap-4 pt-0.5">
                    <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
                      <Eye className="h-3 w-3" /> {activity.views}
                    </span>
                    <span className="text-xs text-muted-foreground font-semibold">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            className="w-full mt-6 h-12 bg-muted/50 hover:bg-muted text-foreground font-bold rounded-xl border border-border/50 transition-all"
            onClick={() => toast.info("Loading all activities...")}
          >
            View All Activity
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-center pt-6">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-muted/30 border border-border/50 opacity-60">
            <Signal className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-muted-foreground">Creator Portal • Powered by Fans on Chain</span>
        </div>
      </div>
    </div>
  );
}
