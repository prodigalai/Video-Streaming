import { DollarSign, Wallet, ArrowRight, History, Download, CreditCard, ChevronRight, PieChart as PieIcon, TrendingUp, HandCoins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";


const transactions = [
  { id: 1, type: "Ad Revenue", amount: "1,200", date: "Feb 1, 2024", status: "Completed" },
  { id: 2, type: "Super Chat", amount: "450", date: "Jan 30, 2024", status: "Completed" },
  { id: 3, type: "Channel Membership", amount: "800", date: "Jan 28, 2024", status: "Pending" },
  { id: 4, type: "Sponsorship", amount: "2,500", date: "Jan 25, 2024", status: "Settled" },
];

export default function MonetizationPage() {
  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gradient">Monetization & Wallet</h1>
          <p className="text-muted-foreground mt-1">Manage your channel revenue, credits, and payouts.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-lg h-11 px-6 gap-2 border-border/50" onClick={() => toast.success("Downloading statement...")}>
             <Download className="h-4 w-4" /> Download Statement
          </Button>
          <Button className="rounded-lg bg-primary hover:shadow-glow transition-all px-8 h-11 font-bold" onClick={() => toast.success("Payout request submitted")}>Request Payout</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Wallet Control */}
        <div className="lg:col-span-2 space-y-8">
           {/* Total Earnings Card */}
           <div className="glass-card p-8 rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 transition-opacity group-hover:opacity-20">
                <Wallet className="h-32 w-32 text-primary" />
              </div>
              <div className="relative z-10">
                <p className="text-muted-foreground font-medium uppercase tracking-wider text-xs mb-2">Available Balance</p>
                <div className="flex items-baseline gap-2">
                   <h2 className="text-5xl font-extrabold text-gradient">34,500</h2>
                   <span className="text-xl font-bold text-primary">CREDITS</span>
                </div>
                <div className="flex gap-4 mt-8">
                   <div className="flex-1 p-4 rounded-xl bg-muted/20 border border-border/30">
                      <p className="text-xs text-muted-foreground mb-1">Total Lifetime Earnings</p>
                      <p className="text-xl font-bold">850,230</p>
                   </div>
                   <div className="flex-1 p-4 rounded-xl bg-muted/20 border border-border/30">
                      <p className="text-xs text-muted-foreground mb-1">Pending Settlements</p>
                      <p className="text-xl font-bold text-yellow-500">12,400</p>
                   </div>
                </div>
              </div>
           </div>

           {/* Transaction History */}
           <div className="glass-card rounded-xl overflow-hidden shadow-glow-sm">
              <div className="p-6 border-b border-border/50 flex items-center justify-between bg-muted/10">
                 <h3 className="text-xl font-bold flex items-center gap-3">
                    <History className="h-5 w-5 text-primary" /> Recent Transactions
                 </h3>
                 <Button variant="link" className="text-primary font-bold" onClick={() => toast.info("Showing all transactions")}>See all</Button>
              </div>
              <div className="divide-y divide-border/50">
                 {transactions.map((tx) => (
                    <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-primary/5 transition-colors group cursor-pointer" onClick={() => toast.info(`Transaction Details: ${tx.type}`)}>
                       <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                             <TrendingUp className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                             <p className="font-bold">{tx.type}</p>
                             <p className="text-xs text-muted-foreground mt-1">{tx.date}</p>
                          </div>
                       </div>
                       <div className="text-right flex items-center gap-6">
                          <div>
                             <p className="font-bold text-gradient">+{tx.amount} CR</p>
                             <div className="flex items-center justify-end gap-1.5 mt-1">
                                <div className={cn(
                                   "h-1.5 w-1.5 rounded-full",
                                   tx.status === 'Completed' ? "bg-success" : "bg-yellow-500"
                                )} />
                                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">{tx.status}</span>
                             </div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                             <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </Button>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right Column: Insights & Thresholds */}
        <div className="space-y-8">
           {/* Payout Threshold */}
           <div className="glass-card p-6 rounded-xl border-primary/10 bg-primary/5">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                 <HandCoins className="h-5 w-5 text-primary" /> Payout Threshold
              </h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-bold">69%</span>
                 </div>
                 <Progress value={69} className="h-3 bg-muted shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]" />
                 <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                    You've reached <span className="text-primary font-bold">34,500</span> out of <span className="text-foreground font-bold">50,000</span> credits required for next automatic settlement.
                 </p>
                 <Button variant="outline" className="w-full h-11 rounded-lg border-primary/20 text-primary font-bold hover:bg-primary/10 mt-2" onClick={() => toast.success("Payment method settings opened")}>
                    Manage Payment Method
                 </Button>
              </div>
           </div>

           {/* Revenue Streams */}
           <div className="glass-card p-6 rounded-xl space-y-6">
              <h3 className="font-bold flex items-center gap-2">
                 <PieIcon className="h-5 w-5 text-accent" /> Revenue Streams
              </h3>
              <div className="space-y-6">
                 {[
                    { label: 'Advertising', value: '45%', amount: '15,525', color: 'bg-primary' },
                    { label: 'Super Chats', value: '25%', amount: '8,625', color: 'bg-accent' },
                    { label: 'Memberships', value: '20%', amount: '6,900', color: 'bg-secondary' },
                    { label: 'Tips', value: '10%', amount: '3,450', color: 'bg-muted-foreground' },
                 ].map((stream) => (
                    <div key={stream.label} className="space-y-2 group cursor-pointer" onClick={() => toast.info(`Detailed view: ${stream.label}`)}>
                       <div className="flex justify-between items-center text-xs">
                          <span className="font-medium text-muted-foreground group-hover:text-primary transition-colors">{stream.label}</span>
                          <span className="font-bold">{stream.amount} CR</span>
                       </div>
                       <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 rounded-full bg-muted/40 overflow-hidden">
                             <div className={cn("h-full rounded-full", stream.color)} style={{ width: stream.value }} />
                          </div>
                          <span className="text-[10px] font-bold min-w-[30px]">{stream.value}</span>
                       </div>
                    </div>
                 ))}
              </div>
              <Button variant="ghost" className="w-full text-xs font-bold text-muted-foreground hover:text-primary transition-colors" onClick={() => toast.success("Full revenue report downloading...")}>
                 See Detailed Revenue Report
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}

