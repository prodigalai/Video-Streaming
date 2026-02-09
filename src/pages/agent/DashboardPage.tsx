import { AgentLayout } from "@/components/layout/agent/AgentLayout";
import { Link } from "react-router-dom";
import { 
  Users, 
  DollarSign, 
  Briefcase,
  UserPlus,
  TrendingUp,
  AlertCircle,
  Activity,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AddTalentModal } from "@/components/agent/modals/AddTalentModal";
import { cn } from "@/lib/utils";

export default function AgentDashboard() {
  return (
    <AgentLayout>
      <div className="space-y-6 md:space-y-8 animate-fade-in relative pb-20">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 md:gap-6">
            <div className="space-y-2">
            <div className="flex items-center gap-2 md:gap-3">
                <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                    <Briefcase className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
                    Agent Dashboard
                </h1>
            </div>
            <p className="text-xs md:text-sm font-medium text-muted-foreground">Overview of your managed creators and earnings.</p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
                <AddTalentModal>
                    <Button className="h-10 md:h-12 px-6 bg-primary text-primary-foreground font-bold hover:bg-primary/90 shadow-lg w-full sm:w-auto">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add New Talent
                    </Button>
                </AddTalentModal>
            </div>
        </div>

        {/* Earnings Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
                { title: "Today's Revenue", value: "$1,240.50", change: "+12%", icon: DollarSign, color: "text-green-500", bg: "bg-green-500/10" },
                { title: "Weekly Revenue", value: "$8,784.00", change: "On Track", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-500/10" },
                { title: "Active Creators", value: "12", change: "+2 New", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
                { title: "Pending Contracts", value: "3", change: "Action Req.", icon: AlertCircle, color: "text-orange-500", bg: "bg-orange-500/10" },
            ].map((stat, i) => (
                <div key={i} className="bg-card p-4 md:p-6 rounded-xl border border-border/50 shadow-sm flex flex-col justify-between h-full hover:border-primary/50 transition-all group">
                    <div className="flex items-start justify-between mb-4">
                        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", stat.bg)}>
                            <stat.icon className={cn("h-5 w-5", stat.color)} />
                        </div>
                        <Badge variant="outline" className={cn("text-[10px] font-bold border-0", stat.bg)}>
                            {stat.change}
                        </Badge>
                    </div>
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">{stat.value}</h3>
                        <p className="text-xs font-medium text-muted-foreground mt-1">{stat.title}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            {/* Top Talent */}
            <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" /> Top Performing Talent
                    </h2>
                    <Button variant="ghost" className="text-xs font-bold">View All</Button>
                </div>
                
                <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:bg-muted/30 transition-all">
                            <Avatar className="h-12 w-12 border border-border/50">
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} />
                                <AvatarFallback>T{i}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-center sm:text-left space-y-1">
                                <h3 className="font-bold text-foreground">Creator Name {i+1}</h3>
                                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-muted-foreground">
                                    <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-bold">PRO</Badge>
                                    <span>Verified Creator</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 w-full sm:w-auto text-center sm:text-right">
                                <div>
                                    <p className="text-xs text-muted-foreground font-bold">Rev Share</p>
                                    <p className="text-sm font-bold text-green-500">20%</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-bold">Earnings</p>
                                    <p className="text-sm font-bold text-foreground">$4.2k</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-bold">Status</p>
                                    <p className="text-sm font-bold text-green-500">Active</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-4 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" /> Recent Alerts
                    </h2>
                </div>
                
                <div className="bg-card rounded-xl border border-border/50 p-4 space-y-4">
                    {[
                        { text: "New contract signed by Sarah", time: "2h ago", type: "success" },
                        { text: "Payout threshold reached for Mike", time: "5h ago", type: "info" },
                        { text: "Compliance review needed for Alex", time: "1d ago", type: "warning" },
                    ].map((alert, i) => (
                        <div key={i} className="flex gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                            <div className={cn(
                                "h-2 w-2 rounded-full mt-2 shrink-0", 
                                alert.type === 'success' ? "bg-green-500" : 
                                alert.type === 'warning' ? "bg-orange-500" : "bg-blue-500"
                            )} />
                            <div>
                                <p className="text-sm font-medium text-foreground">{alert.text}</p>
                                <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                            </div>
                        </div>
                    ))}
                    <Button variant="outline" className="w-full text-xs font-bold mt-2">View All Alerts</Button>
                </div>
            </div>
        </div>
      </div>
    </AgentLayout>
  );
}
