import { DollarSign, Wallet, ArrowRight, History, Download, CreditCard, ChevronRight, TrendingUp, HandCoins, ShieldCheck, Zap, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const transactions = [
  { id: 1, type: "Ad Revenue", amount: "1,200", date: "Feb 07, 2026", status: "Completed" },
  { id: 2, type: "Stream Tip", amount: "450", date: "Feb 06, 2026", status: "Completed" },
  { id: 3, type: "Sponsorship", amount: "800", date: "Feb 06, 2026", status: "Pending" },
  { id: 4, type: "Monthly Sub", amount: "2,500", date: "Feb 05, 2026", status: "Settled" },
];

export default function MonetizationPage() {
  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in relative pb-20">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 md:gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 md:gap-3">
             <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-green-600 flex items-center justify-center shadow-lg">
                <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-white" />
             </div>
             <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
                Monetization
             </h1>
          </div>
          <p className="text-xs md:text-sm font-medium text-muted-foreground">Manage your earnings and payouts</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="h-10 md:h-12 px-6 font-bold"
            onClick={() => toast.success("Downloading report...")}
          >
             <Download className="h-4 w-4 mr-2" /> 
             Export CSV
          </Button>
          <Button 
            className="h-10 md:h-12 px-6 bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg shadow-green-500/20"
            onClick={() => toast.success("Payout requested")}
          >
            Request Payout
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Primary Economic Engine */}
        <div className="lg:col-span-8 space-y-6 md:space-y-8">
           {/* Dynamic Wallet Architecture */}
           <div className="bg-card p-4 md:p-8 rounded-xl md:rounded-2xl border border-border/50 shadow-sm relative overflow-hidden group">
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Available Balance</p>
                  <div className="flex items-baseline gap-2">
                     <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight">$34,500</h2>
                     <span className="text-sm font-bold text-green-500">USD</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                     <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                     <p className="text-xs font-medium text-muted-foreground">Next payout: Feb 15, 2026</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                   <div className="p-4 rounded-xl bg-muted/30 border border-border/50 flex items-center justify-between">
                      <div>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Lifetime Earnings</p>
                          <p className="text-xl font-bold text-foreground">$850,230</p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-green-500" />
                      </div>
                   </div>
                   <div className="p-4 rounded-xl bg-muted/30 border border-border/50 flex items-center justify-between">
                      <div>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Pending Clearance</p>
                          <p className="text-xl font-bold text-yellow-500">$12,400</p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-yellow-500" />
                      </div>
                   </div>
                </div>
              </div>
           </div>

           {/* Layout Transaction History */}
           <div className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-between px-1">
                 <h3 className="text-lg font-bold flex items-center gap-2">
                    <History className="h-5 w-5 text-muted-foreground" />
                    Transaction History
                 </h3>
                 <Button variant="ghost" size="sm" className="text-xs font-bold text-primary">View All</Button>
              </div>
              <div className="space-y-3">
                 {transactions.map((tx, idx) => (
                    <div 
                        key={tx.id} 
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border/50 rounded-xl hover:border-primary/50 transition-all cursor-pointer group"
                        onClick={() => toast.info(`Transaction details: ${tx.id}`)}
                    >
                       <div className="flex items-center gap-4">
                          <div className={cn(
                              "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                              tx.status === 'Completed' ? "bg-green-500/10 text-green-500" : 
                              tx.status === 'Pending' ? "bg-yellow-500/10 text-yellow-500" : "bg-primary/10 text-primary"
                          )}>
                             <DollarSign className="h-5 w-5" />
                          </div>
                          <div>
                             <p className="font-bold text-foreground text-sm">{tx.type}</p>
                             <p className="text-xs text-muted-foreground font-medium">{tx.date}</p>
                          </div>
                       </div>
                       
                       <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0 pl-14 sm:pl-0">
                          <div className="text-right">
                             <p className="text-lg font-bold text-foreground">+${tx.amount}</p>
                             <Badge variant="outline" className={cn(
                                 "text-[10px] h-5 px-2 border-0",
                                 tx.status === 'Completed' ? "bg-green-500/10 text-green-600" :
                                 tx.status === 'Pending' ? "bg-yellow-500/10 text-yellow-600" : "bg-blue-500/10 text-blue-600"
                             )}>
                                 {tx.status}
                             </Badge>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground hidden sm:block group-hover:translate-x-1 transition-transform" />
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="lg:col-span-4 space-y-6 md:space-y-8">
           {/* Payout Progress */}
           <div className="bg-card p-6 md:p-8 rounded-xl border border-border/50 shadow-sm space-y-6">
              <h3 className="text-sm font-bold flex items-center gap-2">
                 <HandCoins className="h-4 w-4 text-primary" /> Payout Threshold
              </h3>
              <div className="space-y-2">
                 <div className="flex justify-between items-end">
                     <span className="text-xs font-medium text-muted-foreground">$34,500 / $50,000</span>
                     <span className="text-sm font-bold text-foreground">69%</span>
                 </div>
                 <Progress value={69} className="h-2" />
                 <p className="text-xs text-muted-foreground pt-2">
                    You need <span className="text-foreground font-bold">$15,500</span> more to reach the next automated payout tier.
                 </p>
              </div>
              <Button variant="outline" className="w-full font-bold">Manage Payout Settings</Button>
           </div>

            {/* KYC Status */}
            <div className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 p-6 rounded-xl border border-indigo-500/20 shadow-sm relative overflow-hidden">
               <div className="flex items-start justify-between mb-4">
                  <div className="space-y-1">
                      <h3 className="font-bold text-foreground">Identity Verification</h3>
                      <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 border-0">Action Required</Badge>
                      </div>
                  </div>
                  <ShieldCheck className="h-8 w-8 text-indigo-500 opacity-50" />
               </div>
               
               <p className="text-xs text-muted-foreground font-medium mb-4 leading-relaxed">
                  Complete your identity verification to unlock higher withdrawal limits and instant payouts.
               </p>
               <Link to="/studio/kyc">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/20">
                       Complete Verification
                    </Button>
               </Link>
            </div>

           {/* Income Sources */}
           <div className="bg-card p-6 md:p-8 rounded-xl border border-border/50 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Income Sources</h3>
              <div className="space-y-4">
                 {[
                    { label: 'Ads', value: 45, amount: '$15,525', color: 'bg-green-500' },
                    { label: 'Subscriptions', value: 25, amount: '$8,625', color: 'bg-blue-500' },
                    { label: 'Sponsorships', value: 20, amount: '$6,900', color: 'bg-purple-500' },
                    { label: 'Tips', value: 10, amount: '$3,450', color: 'bg-orange-500' },
                 ].map((stream) => (
                    <div key={stream.label} className="space-y-2 group cursor-pointer">
                       <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-muted-foreground">{stream.label}</span>
                          <span className="text-foreground">{stream.amount}</span>
                       </div>
                       <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                          <div className={cn("h-full transition-all duration-1000", stream.color)} style={{ width: `${stream.value}%` }} />
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function Clock(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )
}
