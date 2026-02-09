import { Wallet, ArrowUpRight, ArrowDownRight, CreditCard, DollarSign, History, Plus, MoreHorizontal, Settings, ShieldCheck, Download, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const transactions = [
  { id: 1, type: "Withdrawal", amount: "-$2,500.00", date: "Feb 07, 2026", status: "Completed", icon: ArrowUpRight, color: "text-red-500" },
  { id: 2, type: "Ad Revenue", amount: "+$1,200.50", date: "Feb 06, 2026", status: "Completed", icon: DollarSign, color: "text-green-500" },
  { id: 3, type: "Sponsorship", amount: "+$800.00", date: "Feb 05, 2026", status: "Pending", icon: Handshake, color: "text-yellow-500" },
  { id: 4, type: "Subscription", amount: "+$25.00", date: "Feb 05, 2026", status: "Completed", icon: Users, color: "text-blue-500" },
];

function Handshake(props: any) {
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
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-1.42-1.42l.88-.88a5 5 0 0 1 7.07 0l2.12 2.12a5 5 0 0 1 0 7.07l-2.5 2.5a5 5 0 0 1-7.07 0l-2.5-2.5" />
    </svg>
  )
}

function Users(props: any) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

export default function StudioWalletPage() {
  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in relative pb-20">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 md:gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 md:gap-3">
             <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-green-600 flex items-center justify-center shadow-lg">
                <Wallet className="h-4 w-4 md:h-5 md:w-5 text-white" />
             </div>
             <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
                Wallet
             </h1>
          </div>
          <p className="text-xs md:text-sm font-medium text-muted-foreground">Manage your funds and payouts</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
             <Button variant="outline" className="h-10 md:h-12 px-6 font-bold">
                 <Settings className="h-4 w-4 mr-2" /> Settings
             </Button>
             <Button className="h-10 md:h-12 px-6 bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg shadow-green-500/20">
                 <Plus className="h-4 w-4 mr-2" /> Add Funds
             </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Main Wallet Card */}
        <div className="lg:col-span-8 space-y-6 md:space-y-8">
           <div className="bg-gradient-to-br from-green-600 to-emerald-800 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden group text-white">
              <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                  <Wallet className="h-64 w-64" />
              </div>
              
              <div className="relative z-10 space-y-8">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                        <ShieldCheck className="h-4 w-4 text-green-300" />
                        <span className="text-xs font-bold tracking-wide">SECURE VAULT</span>
                    </div>
                    <CreditCard className="h-8 w-8 text-white/50" />
                 </div>
                 
                 <div className="space-y-2">
                    <p className="text-sm font-medium text-green-100 opacity-80 uppercase tracking-widest">Total Balance</p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">$34,500.00</h2>
                 </div>

                 <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button className="h-12 px-8 bg-white text-green-900 hover:bg-white/90 font-bold rounded-xl border-0 shadow-lg">
                        Withdraw Funds
                    </Button>
                    <Button variant="outline" className="h-12 px-8 bg-transparent text-white border-white/20 hover:bg-white/10 font-bold rounded-xl">
                        View Analytics
                    </Button>
                 </div>
              </div>
           </div>

           {/* Transaction History */}
           <div className="bg-card border border-border/50 rounded-xl md:rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 md:p-6 border-b border-border/50 flex items-center justify-between bg-muted/5">
                 <h3 className="font-bold text-foreground flex items-center gap-2">
                    <History className="h-4 w-4 text-muted-foreground" /> Recent Transactions
                 </h3>
                 <Button variant="ghost" size="sm" className="h-8 text-xs font-bold text-muted-foreground hover:text-primary">
                    View All
                 </Button>
              </div>
              <div className="divide-y divide-border/50">
                 {transactions.map((tx) => (
                    <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors group cursor-pointer" onClick={() => toast.info("Transaction details")}>
                       <div className="flex items-center gap-4">
                          <div className={cn("h-10 w-10 md:h-12 md:w-12 rounded-xl flex items-center justify-center shrink-0", 
                              tx.type === 'Withdrawal' ? "bg-red-500/10" : "bg-green-500/10"
                          )}>
                              <tx.icon className={cn("h-5 w-5 md:h-6 md:w-6", tx.color)} />
                          </div>
                          <div>
                             <p className="font-bold text-sm md:text-base text-foreground">{tx.type}</p>
                             <p className="text-xs text-muted-foreground font-medium">{tx.date}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className={cn("font-bold text-sm md:text-base", tx.color)}>{tx.amount}</p>
                          <span className={cn(
                              "text-[10px] px-2 py-0.5 rounded-full font-bold",
                              tx.status === 'Completed' ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"
                          )}>
                              {tx.status}
                          </span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6 md:space-y-8">
           {/* Payment Methods */}
           <div className="bg-card p-6 md:p-8 rounded-xl border border-border/50 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Payment Methods</h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Plus className="h-4 w-4" /></Button>
              </div>
              
              <div className="space-y-3">
                 <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center gap-4 relative group cursor-pointer hover:border-primary/50 transition-all">
                    <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-foreground">Mastercard **** 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/28</p>
                    </div>
                    <div className="h-3 w-3 rounded-full bg-primary absolute top-4 right-4 ring-2 ring-background" />
                 </div>

                 <div className="p-4 rounded-xl border border-border/50 bg-card hover:bg-muted/30 transition-all flex items-center gap-4 cursor-pointer">
                    <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center shadow-sm border border-border/10">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-foreground">PayPal</p>
                        <p className="text-xs text-muted-foreground">ash@example.com</p>
                    </div>
                 </div>
              </div>
           </div>

            {/* Quick Actions */}
           <div className="bg-card p-6 md:p-8 rounded-xl border border-border/50 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Quick Actions</h3>
              <Button variant="outline" className="w-full justify-start h-12 font-medium">
                  <Download className="h-4 w-4 mr-3 text-muted-foreground" />
                  Download Monthly Statement
              </Button>
              <Button variant="outline" className="w-full justify-start h-12 font-medium">
                  <Banknote className="h-4 w-4 mr-3 text-muted-foreground" />
                  Tax Documents
              </Button>
              <Button variant="outline" className="w-full justify-start h-12 font-medium">
                  <Settings className="h-4 w-4 mr-3 text-muted-foreground" />
                  Payout Settings
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
