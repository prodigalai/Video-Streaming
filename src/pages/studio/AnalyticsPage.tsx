import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { Eye, Users, Clock, DollarSign, ArrowUpRight, ArrowDownRight, TrendingUp, UserPlus, PlayCircle, Signal, ShieldCheck, Zap, Sparkles, Target, Box, ChevronRight, Download, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const overviewData = [
  { name: '01', views: 4200, watchTime: 2100, Revenue: 150 },
  { name: '02', views: 3800, watchTime: 1800, Revenue: 130 },
  { name: '03', views: 5100, watchTime: 2600, Revenue: 210 },
  { name: '04', views: 4800, watchTime: 2300, Revenue: 190 },
  { name: '05', views: 6200, watchTime: 3100, Revenue: 280 },
  { name: '06', views: 5900, watchTime: 2800, Revenue: 240 },
  { name: '07', views: 7500, watchTime: 4200, Revenue: 350 },
];

const audienceData = [
  { name: '18-24', value: 35 },
  { name: '25-34', value: 45 },
  { name: '35-44', value: 12 },
  { name: '45+', value: 8 },
];

const COLORS = ['#8b5cf6', '#d946ef', '#6366f1', '#475569'];

const MetricCard = ({ label, value, change, trend, active, icon: Icon, delay = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className={cn(
        "bg-card p-4 md:p-6 rounded-xl border border-border/50 shadow-sm relative overflow-hidden group cursor-pointer hover:border-primary/50 transition-all",
        active && "ring-2 ring-primary/20"
    )}
  >
    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Icon className="h-16 w-16 md:h-20 md:w-20" />
    </div>
    <div className="flex items-center justify-between mb-2 relative z-10">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <span className={cn(
            "text-xs font-bold flex items-center gap-1 px-2 py-0.5 rounded-full",
            trend === 'up' ? "text-green-600 bg-green-500/10" : "text-red-500 bg-red-500/10"
        )}>
            {trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {change}
        </span>
    </div>
    <div className="relative z-10">
        <span className="text-2xl md:text-3xl font-bold text-foreground">{value}</span>
    </div>
    {active && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
    )}
  </motion.div>
);

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in relative pb-20">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 md:gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 md:gap-3">
             <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                <BarChart2 className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
             </div>
             <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
                Channel Analytics
             </h1>
          </div>
          <p className="text-xs md:text-sm font-medium text-muted-foreground">Deep dive into your channel's performance</p>
        </div>
        
        <div className="flex gap-2 bg-muted/30 p-1 rounded-xl border border-border/50 overflow-x-auto scrollbar-hide w-full sm:w-auto">
          {['7D', '28D', '90D', 'Year'].map((period, i) => (
            <Button 
                key={period}
                variant="ghost" 
                size="sm" 
                className={cn(
                    "h-8 md:h-9 px-3 md:px-4 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap flex-1 sm:flex-none",
                    i === 0 ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => toast.info(`Viewing ${period} data`)}
            >
                {period}
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6 md:space-y-8">
        <div className="border-b border-border/50">
            <TabsList className="h-auto bg-transparent p-0 gap-6 w-full justify-start overflow-x-auto scrollbar-hide">
                {[
                    { id: "overview", label: "Overview", icon: Signal },
                    { id: "content", label: "Content", icon: Box },
                    { id: "audience", label: "Audience", icon: Users },
                    { id: "revenue", label: "Revenue", icon: DollarSign }
                ].map((tab) => (
                <TabsTrigger 
                    key={tab.id}
                    value={tab.id}
                    className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary rounded-none px-0 pb-3 text-xs md:text-sm font-bold text-muted-foreground transition-all hover:text-foreground relative border-b-2 border-transparent data-[state=active]:border-primary"
                >
                    <tab.icon className="h-4 w-4 mr-2" />
                    {tab.label}
                </TabsTrigger>
                ))}
            </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6 md:space-y-8 mt-0 focus-visible:ring-0">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <MetricCard label="Total Views" value="124.5K" change="45%" trend="up" active={true} icon={Eye} delay={0.1} />
            <MetricCard label="Watch Time (H)" value="4.8K" change="32%" trend="up" active={false} icon={Clock} delay={0.2} />
            <MetricCard label="New Subscribers" value="+1,204" change="12%" trend="up" active={false} icon={UserPlus} delay={0.3} />
            <MetricCard label="Est. Revenue" value="$3,420" change="25%" trend="up" active={false} icon={DollarSign} delay={0.4} />
          </div>

          {/* Main Chart */}
          <div className="bg-card p-4 md:p-8 rounded-xl border border-border/50 shadow-sm">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-10">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg md:text-xl font-bold text-foreground">Views Trend</h3>
                        <p className="text-xs text-muted-foreground font-medium">Daily views over selected period</p>
                    </div>
                </div>
                <Button variant="outline" size="sm" className="h-9 font-bold">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                </Button>
             </div>
             
             <div className="h-[250px] md:h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={overviewData}>
                    <defs>
                      <linearGradient id="analyticsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                        dy={10}
                    />
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                        tickFormatter={(v) => `${v / 1000}K`}
                        dx={-10}
                    />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: '#1f1f23', 
                            borderRadius: '12px', 
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        }} 
                        itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 600 }}
                        cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="views" 
                        stroke="#8b5cf6" 
                        strokeWidth={3} 
                        fill="url(#analyticsGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
             {/* Demographics */}
             <div className="bg-card p-4 md:p-8 rounded-xl border border-border/50 shadow-sm">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                    <div className="h-10 w-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                        <Target className="h-5 w-5 text-pink-500" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Audience Age</h3>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-8">
                   <div className="h-[200px] w-full sm:w-[50%] relative">
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
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: '#1f1f23', 
                                    borderRadius: '8px', 
                                    border: 'none',
                                    padding: '8px'
                                }}
                                itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 600 }}
                            />
                         </PieChart>
                      </ResponsiveContainer>
                   </div>
                   <div className="w-full sm:w-[50%] space-y-3">
                      {audienceData.map((item, index) => (
                         <div key={item.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                               <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                               <span className="text-xs font-medium text-muted-foreground">{item.name}</span>
                            </div>
                            <span className="text-sm font-bold text-foreground">{item.value}%</span>
                         </div>
                      ))}
                   </div>
                </div>
             </div>

             {/* Top Content */}
             <div className="bg-card p-4 md:p-8 rounded-xl border border-border/50 shadow-sm">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                    <div className="h-10 w-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-green-500" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Top Performing Content</h3>
                </div>
                
                <div className="space-y-4">
                   {[
                      { title: 'Ultimate Guide to Streaming', views: '45.2K', growth: '+12%', color: 'text-primary' },
                      { title: 'Late Night Lofi Session', views: '28.1K', growth: '+8%', color: 'text-pink-500' },
                      { title: 'Studio Tour 2026', views: '15.4K', growth: '+25%', color: 'text-green-500' },
                   ].map((video, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 md:p-4 rounded-xl hover:bg-muted/30 transition-all border border-transparent hover:border-border/50 group cursor-pointer" onClick={() => toast.success(`Viewing analytics for: ${video.title}`)}>
                         <div className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                            <PlayCircle className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                         </div>
                         <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-foreground truncate">{video.title}</p>
                            <p className="text-xs text-muted-foreground font-medium">{video.views} views</p>
                         </div>
                         <div className="text-right">
                             <span className={cn("text-xs font-bold", video.color)}>{video.growth}</span>
                         </div>
                      </div>
                   ))}
                </div>
                <Button variant="outline" className="w-full mt-6 h-10 text-xs font-bold">
                    View Full Report
                </Button>
             </div>
          </div>
        </TabsContent>
        {/* Placeholder contents for other tabs */}
        <TabsContent value="content" className="mt-0"><div className="p-12 text-center text-muted-foreground">Content Analytics Placeholder</div></TabsContent>
        <TabsContent value="audience" className="mt-0"><div className="p-12 text-center text-muted-foreground">Audience Analytics Placeholder</div></TabsContent>
        <TabsContent value="revenue" className="mt-0"><div className="p-12 text-center text-muted-foreground">Revenue Analytics Placeholder</div></TabsContent>
      </Tabs>
    </div>
  );
}
