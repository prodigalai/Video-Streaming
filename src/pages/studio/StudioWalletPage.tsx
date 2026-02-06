import { Wallet, ArrowDownCircle, ArrowUpCircle, CreditCard, History, TrendingUp, DollarSign, Download, Filter, ChevronRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const earningsHistory = [
  { id: 1, source: "Video Ads", amount: "+450.00", date: "Feb 1, 2024", type: "Credit" },
  { id: 2, source: "Super Chat", amount: "+125.50", date: "Jan 31, 2024", type: "Credit" },
  { id: 3, source: "Payout - Bank Transfer", amount: "-1,200.00", date: "Jan 28, 2024", type: "Debit" },
  { id: 4, source: "Sponsorship", amount: "+850.00", date: "Jan 25, 2024", type: "Credit" },
];

export default function StudioWalletPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gradient">Creator Earnings & Wallet</h1>
          <p className="text-muted-foreground mt-1">Track your revenue generation and manage your payout methods.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-lg h-11 px-6 border-border/50 gap-2" onClick={() => toast.success("Exporting ledger to PDF...")}>
             <Download className="h-4 w-4" /> Export Ledger
          </Button>
          <Button className="rounded-lg bg-primary hover:shadow-glow transition-all px-8 h-11 font-bold" onClick={() => toast.success("Withdrawal initiation started")}>Withdraw Credits</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Balance Card */}
         <div className="lg:col-span-2 space-y-8">
            <div className="glass-card p-10 rounded-2xl relative overflow-hidden group border-primary/20 shadow-glow-sm">
               <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 transition-transform group-hover:scale-[1.6] duration-700">
                  <Wallet className="h-48 w-48 text-primary" />
               </div>
               <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div className="space-y-2">
                     <p className="text-muted-foreground font-black uppercase tracking-[0.2em] text-[10px]">Current Total Balance</p>
                     <div className="flex items-baseline gap-3">
                       <h2 className="text-6xl font-black tracking-tighter text-gradient">45,230</h2>
                       <span className="text-xl font-bold text-primary">CREDITS</span>
                     </div>
                     <p className="text-sm text-muted-foreground pt-4 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-success" />
                        <span className="text-success font-bold">+12.5%</span> increase from last month
                     </p>
                  </div>
                  <div className="space-y-3 min-w-[200px]">
                     <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Estimated Value</p>
                        <p className="text-2xl font-black">$452.30 <span className="text-xs font-medium text-muted-foreground">USD</span></p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Transaction History */}
            <div className="glass-card rounded-xl overflow-hidden shadow-glow-sm">
               <div className="p-6 border-b border-border/50 flex items-center justify-between bg-muted/10">
                 <h3 className="text-xl font-bold flex items-center gap-3">
                    <History className="h-5 w-5 text-primary" /> Transaction Ledger
                 </h3>
                 <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 rounded-lg text-primary bg-primary/10" onClick={() => toast.info("Filter: All")}>All</Button>
                    <Button variant="ghost" size="sm" className="h-8 rounded-lg hover:bg-muted" onClick={() => toast.info("Filter: Earnings")}>Earnings</Button>
                    <Button variant="ghost" size="sm" className="h-8 rounded-lg hover:bg-muted" onClick={() => toast.info("Filter: Payouts")}>Payouts</Button>
                 </div>
               </div>
               <div className="divide-y divide-border/50">
                  {earningsHistory.map((tx) => (
                    <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-primary/5 transition-colors group cursor-pointer" onClick={() => toast.info(`Transaction ID: ${tx.id} Details`)}>
                       <div className="flex items-center gap-4">
                          <div className={cn(
                             "h-11 w-11 rounded-full flex items-center justify-center shrink-0 border",
                             tx.type === 'Credit' ? "bg-success/5 border-success/20 text-success" : "bg-destructive/5 border-destructive/20 text-destructive"
                          )}>
                             {tx.type === 'Credit' ? <ArrowDownCircle className="h-5 w-5" /> : <ArrowUpCircle className="h-5 w-5" />}
                          </div>
                          <div>
                             <p className="font-bold tracking-tight">{tx.source}</p>
                             <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-1">{tx.date}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className={cn(
                             "text-lg font-black tracking-tighter",
                             tx.type === 'Credit' ? "text-success" : "text-foreground"
                          )}>
                             {tx.type === 'Credit' ? '+' : ''}{tx.amount}
                             <span className="text-[10px] font-bold ml-1 text-muted-foreground">CR</span>
                          </p>
                          <Badge variant="outline" className="h-5 border-0 bg-transparent text-[10px] text-muted-foreground p-0">ID: 8329-TX</Badge>
                       </div>
                    </div>
                  ))}
               </div>
               <div className="p-6 border-t border-border/50 text-center">
                  <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5 rounded-lg h-10 px-8" onClick={() => toast.info("Loading full history...")}>View Full Transaction History</Button>
               </div>
            </div>
         </div>

         {/* Sidebar Stats */}
         <div className="space-y-8">
            {/* Payout Information */}
            <div className="glass-card p-8 rounded-xl border-success/20 shadow-[0_0_30px_rgba(34,197,94,0.05)]">
               <h3 className="font-black text-xs uppercase tracking-[0.2em] text-success mb-6 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> Next Automatic Payout
               </h3>
               <div className="space-y-6">
                 <div>
                    <div className="flex justify-between items-end mb-3">
                       <p className="text-xl font-black">Feb 28, 2024</p>
                       <p className="text-xs font-bold text-muted-foreground italic">24 days left</p>
                    </div>
                    <Progress value={45} className="h-2 bg-muted shadow-inner" />
                 </div>
                 <div className="space-y-2 pt-4">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                       Your earnings will be automatically transferred to your verified bank account once they reach the minimum threshold of <span className="font-bold text-foreground">10,000 CR</span>.
                    </p>
                 </div>
                 <Button className="w-full bg-success/10 text-success border border-success/20 hover:bg-success/20 h-12 rounded-xl font-bold transition-all" onClick={() => toast.success("Redirecting to payout settings")}>
                    Update Payout Method
                 </Button>
               </div>
            </div>

            {/* Performance Snapshot */}
            <div className="glass-card p-8 rounded-xl space-y-6">
               <h3 className="font-black text-xs uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" /> Earning Velocity
               </h3>
               {[
                  { label: "Today's Revenue", val: "1,240", change: "+5%", up: true },
                  { label: "This Week", val: "8,450", change: "+12%", up: true },
                  { label: "Avg. Daily CPM", val: "$12.45", change: "-2%", up: false },
               ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center group cursor-default hover:bg-muted/10 p-2 rounded-lg transition-colors">
                     <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">{stat.label}</span>
                     <div className="text-right">
                        <p className="font-bold tracking-tight">{stat.val}</p>
                        <p className={cn(
                           "text-[10px] font-bold flex items-center justify-end gap-1",
                           stat.up ? "text-success" : "text-destructive"
                        )}>
                           {stat.up ? <ArrowDownCircle className="h-2.5 w-2.5 rotate-180" /> : <ArrowDownCircle className="h-2.5 w-2.5" />}
                           {stat.change}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}


