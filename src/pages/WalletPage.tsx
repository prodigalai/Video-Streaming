import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Wallet, 
  Plus, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft,
  Bitcoin,
  Building2,
  CheckCircle,
  XCircle,
  Clock,
  Coins,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  Star,
  Signal,
  Shield,
  Lock,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MainLayout } from "@/components/layout/MainLayout";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";

// Mock data
const walletData = {
  balance: 1250,
  pending: 50,
};

const transactions = [
  { id: 1, type: "purchase", description: "Video Unlock // Business Strategy", amount: -75, status: "completed", date: "Today, 2:30 PM" },
  { id: 2, type: "tip", description: "Protocol Tip // Luna Live", amount: -100, status: "completed", date: "Today, 1:15 PM" },
  { id: 3, type: "deposit", description: "Credit Transmission", amount: 500, status: "completed", date: "Yesterday" },
  { id: 4, type: "subscription", description: "Network Access // GamerPro", amount: -199, status: "completed", date: "Feb 05, 2026" },
  { id: 5, type: "deposit", description: "Credit Transmission", amount: 1000, status: "pending", date: "Feb 04, 2026" },
  { id: 6, type: "refund", description: "Protocol Refund // System Error", amount: 99, status: "completed", date: "Feb 01, 2026" },
];

const creditPackages = [
  { credits: 100, price: 9.99, popular: false },
  { credits: 500, price: 39.99, popular: true, bonus: 50 },
  { credits: 1000, price: 74.99, popular: false, bonus: 150 },
  { credits: 2500, price: 174.99, popular: false, bonus: 500 },
];

const paymentMethods = [
  { id: "card", name: "Credit / Debit Matrix", icon: CreditCard, description: "Visa, Mastercard, Amex" },
  { id: "bank", name: "Node Transfer", icon: Building2, description: "Direct terminal settlement" },
  { id: "crypto", name: "Encrypted Asset", icon: Bitcoin, description: "BTC, ETH, USDT" },
];

export default function WalletPage() {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "pending" | "success" | "failed">("idle");

  const handlePurchase = () => {
    setPaymentStatus("pending");
    setTimeout(() => {
      setPaymentStatus(Math.random() > 0.1 ? "success" : "failed");
    }, 2500);
  };

  const resetPayment = () => {
    setPaymentStatus("idle");
    setSelectedPackage(null);
    setSelectedPaymentMethod(null);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#050508] relative overflow-hidden pb-20">
        
        {/* Dynamic Space Background */}
        <div className="absolute top-0 right-0 w-full h-[800px] bg-gradient-to-b from-indigo-600/[0.04] to-transparent -z-10 pointer-events-none" />
        <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-violet-600/[0.03] rounded-full blur-[140px] -z-10 animate-pulse" />

        <div className="container max-w-6xl py-12 px-6 sm:px-8 space-y-16 relative z-10">
          
          {/* Enhanced Header Architecture */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
             <div className="space-y-4">
                <div className="flex items-center gap-4">
                   <div className="h-12 w-12 rounded-2xl bg-violet-600 flex items-center justify-center shadow-2xl shadow-violet-500/20 group hover:rotate-12 transition-transform duration-500">
                       <Wallet className="h-6 w-6 text-white" />
                   </div>
                   <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic leading-none">
                     Economic <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Vault</span>
                   </h1>
                </div>
                <p className="text-sm font-medium text-white/40 italic">Global Liquidity Interface // Fans on Chain Settlement Layer</p>
             </div>
             
             <Dialog onOpenChange={(open) => !open && resetPayment()}>
               <DialogTrigger asChild>
                 <Button className="h-16 px-10 bg-violet-600 hover:bg-violet-700 text-white font-black text-xs uppercase tracking-[0.3em] rounded-[1.5rem] shadow-2xl shadow-violet-500/20 border-none transition-all active:scale-95 group">
                   <Plus className="h-4 w-4 mr-3" />
                   TRANSMIT CREDITS
                 </Button>
               </DialogTrigger>
               <DialogContent className="max-w-xl bg-[#0a0a0f] border-white/10 rounded-[3rem] p-0 overflow-hidden shadow-4xl backdrop-blur-3xl">
                 <div className="h-1.5 bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
                 
                 <AnimatePresence mode="wait">
                    {paymentStatus === "idle" && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-10 md:p-14"
                    >
                        <DialogHeader className="mb-10 text-center sm:text-left">
                        <DialogTitle className="text-3xl font-black text-white uppercase tracking-tighter italic">Add Liquid Assets</DialogTitle>
                        <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em] mt-2">Initializing Peer-to-Peer Funding Protocol</p>
                        </DialogHeader>

                        <div className="space-y-10">
                        {/* Package Selection */}
                        <div className="grid grid-cols-2 gap-4">
                            {creditPackages.map((pkg, i) => (
                            <button
                                key={pkg.credits}
                                onClick={() => setSelectedPackage(i)}
                                className={cn(
                                "relative p-8 rounded-[2.5rem] border transition-all text-left group overflow-hidden shadow-2xl",
                                selectedPackage === i
                                    ? "bg-violet-600/[0.08] border-violet-500/50 shadow-violet-500/10"
                                    : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
                                )}
                            >
                                {pkg.popular && (
                                <div className="absolute top-0 right-0 p-4">
                                    <div className="h-6 w-6 rounded-lg bg-violet-600/20 flex items-center justify-center">
                                        <Star className="h-3 w-3 text-violet-400 fill-current" />
                                    </div>
                                </div>
                                )}
                                <div className="flex items-center gap-3 mb-3">
                                <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center transition-all", selectedPackage === i ? "bg-violet-600 text-white" : "bg-white/5 text-white/20")}>
                                    <Coins className="h-5 w-5" />
                                </div>
                                <span className="text-3xl font-black text-white tracking-tighter italic">{pkg.credits}</span>
                                </div>
                                <div className="flex items-baseline gap-1.5 px-1">
                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">$</span>
                                    <span className="text-xl font-black text-white tracking-tight">{pkg.price}</span>
                                </div>
                                {pkg.bonus && (
                                    <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                        <Sparkles className="h-2.5 w-2.5 text-emerald-500 mr-1.5" />
                                        <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">+{pkg.bonus} BONUS</span>
                                    </div>
                                )}
                            </button>
                            ))}
                        </div>

                        {/* Payment Selection */}
                        <div className="space-y-5">
                            <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 ml-2">Uplink Gateway</Label>
                            <div className="space-y-3">
                                {paymentMethods.map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => setSelectedPaymentMethod(method.id)}
                                    className={cn(
                                    "w-full flex items-center gap-6 p-6 rounded-[1.8rem] border transition-all group relative overflow-hidden",
                                    selectedPaymentMethod === method.id
                                        ? "bg-white/[0.04] border-white/20 shadow-2xl"
                                        : "bg-white/[0.01] border-white/5 hover:border-white/10"
                                    )}
                                >
                                    <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center transition-all shadow-xl", selectedPaymentMethod === method.id ? "bg-violet-600 text-white" : "bg-white/5 text-white/20")}>
                                        <method.icon className="h-5 w-5" />
                                    </div>
                                    <div className="text-left flex-1 space-y-1">
                                    <p className="font-black text-white text-[11px] uppercase tracking-[0.2em]">{method.name}</p>
                                    <p className="text-[9px] text-white/20 font-black uppercase tracking-widest">{method.description}</p>
                                    </div>
                                    <div className={cn("h-6 w-6 rounded-full border border-white/10 flex items-center justify-center transition-all", selectedPaymentMethod === method.id && "border-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]")}>
                                    {selectedPaymentMethod === method.id && <motion.div layoutId="paymentCheck" className="h-3 w-3 rounded-full bg-violet-500" />}
                                    </div>
                                </button>
                                ))}
                            </div>
                        </div>

                        <Button
                            className="w-full h-16 bg-violet-600 hover:bg-violet-700 text-white font-black text-[11px] uppercase tracking-[0.3em] rounded-[1.2rem] shadow-2xl shadow-violet-500/30 border-none transition-all active:scale-95 group"
                            disabled={selectedPackage === null || selectedPaymentMethod === null}
                            onClick={handlePurchase}
                        >
                            INITIATE SETTLEMENT
                            <ArrowRight className="h-4 w-4 ml-3 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        </div>
                    </motion.div>
                    )}

                    {paymentStatus === "pending" && (
                    <motion.div 
                        key="pending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-16 text-center space-y-10"
                    >
                        <div className="relative h-32 w-32 mx-auto">
                            <div className="absolute inset-0 bg-violet-600/20 rounded-full animate-ping" />
                            <div className="relative h-full w-full rounded-[2.5rem] bg-[#050508] border border-violet-500/20 flex items-center justify-center shadow-4xl group overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 to-transparent" />
                                <Clock className="h-12 w-12 text-violet-400 relative z-10" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic leading-none">Awaiting Clearance</h3>
                            <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em]">Synchronizing with global economic matrix...</p>
                        </div>
                    </motion.div>
                    )}

                    {paymentStatus === "success" && (
                    <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-16 text-center space-y-10"
                    >
                        <div className="h-32 w-32 mx-auto rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-4xl group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent" />
                            <CheckCircle className="h-12 w-12 text-emerald-500 relative z-10" />
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none">Vault Unlocked</h3>
                            <p className="text-sm text-white/40 font-bold uppercase tracking-widest px-8">
                                {selectedPackage !== null && creditPackages[selectedPackage].credits} Credits successfully transferred to your local node.
                            </p>
                        </div>
                        <Button 
                            onClick={resetPayment}
                            className="w-full h-16 bg-white/[0.03] hover:bg-white/[0.05] text-white border border-white/5 font-black text-[10px] uppercase tracking-[0.4em] rounded-[1.2rem] transition-all"
                        >
                            CLOSE TERMINAL
                        </Button>
                    </motion.div>
                    )}

                    {paymentStatus === "failed" && (
                    <motion.div 
                        key="failed"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-16 text-center space-y-10"
                    >
                        <div className="h-32 w-32 mx-auto rounded-[2.5rem] bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-4xl group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 to-transparent" />
                            <XCircle className="h-12 w-12 text-red-500 relative z-10" />
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none">Signal Lost</h3>
                            <p className="text-sm text-white/40 font-bold uppercase tracking-widest px-8">Uplink sequence failed. Re-verify source connection and try again.</p>
                        </div>
                        <Button onClick={resetPayment} className="w-full h-16 bg-red-600 hover:bg-red-700 text-white font-black text-[10px] uppercase tracking-[0.4em] rounded-[1.2rem] shadow-2xl shadow-red-500/30 border-none transition-all">
                            RE-INITIALIZE
                        </Button>
                    </motion.div>
                    )}
                 </AnimatePresence>
               </DialogContent>
             </Dialog>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Primary Balance Display */}
            <div className="lg:col-span-12">
               <motion.div 
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative group h-full"
               >
                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[4rem] blur-[20px] opacity-10 group-hover:opacity-20 transition duration-1000" />
                    <div className="relative h-full bg-[#0a0a0f] border border-white/5 rounded-[4rem] p-10 md:p-16 overflow-hidden shadow-4xl flex items-center">
                        {/* High-detail background effects */}
                        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-violet-600/[0.03] to-transparent pointer-events-none" />
                        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-fuchsia-600/[0.02] rounded-full blur-[140px]" />
                        
                        <div className="grid lg:grid-cols-2 gap-16 items-center w-full relative z-10">
                            <div className="space-y-10">
                                <div className="space-y-2">
                                    <p className="text-[11px] text-white/20 font-black uppercase tracking-[0.5em] mb-6">Local Ledger Weight</p>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-8">
                                        <div className="h-20 w-20 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-[2rem] flex items-center justify-center shadow-3xl transform rotate-3">
                                            <Coins className="h-10 w-10 text-white" />
                                        </div>
                                        <div>
                                            <div className="flex items-baseline gap-3">
                                                <span className="text-7xl font-black text-white tracking-tighter leading-none italic">{walletData.balance.toLocaleString()}</span>
                                                <span className="text-[11px] font-black text-violet-400 uppercase tracking-[0.4em]">NXS</span>
                                            </div>
                                            {walletData.pending > 0 && (
                                              <div className="flex items-center gap-3 mt-4 bg-white/[0.03] border border-white/5 px-4 py-2 rounded-xl w-fit">
                                                <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                                                <span className="text-[9px] text-white/40 font-black uppercase tracking-widest">{walletData.pending} Processing Transmission</span>
                                              </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <div className="px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-3xl group/meta hover:bg-white/[0.05] transition-colors">
                                        <p className="text-[8px] text-white/20 font-black uppercase tracking-[0.4em] mb-1 group-hover:text-white/40">Network Rank</p>
                                        <p className="text-sm font-black text-white italic tracking-tight">CITIZEN #4,281</p>
                                    </div>
                                    <div className="px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-3xl group/meta hover:bg-white/[0.05] transition-colors">
                                        <p className="text-[8px] text-white/20 font-black uppercase tracking-[0.4em] mb-1 group-hover:text-white/40">Node Status</p>
                                        <div className="flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                            <p className="text-sm font-black text-white italic tracking-tight uppercase">OPTIMIZED</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden lg:block space-y-6">
                                <div className="p-8 bg-white/[0.01] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.03] transition-all group/item relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/[0.02] to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                    <div className="flex items-center justify-between relative z-10">
                                        <div className="flex items-center gap-6">
                                            <div className="h-12 w-12 bg-[#050508] border border-white/5 rounded-2xl flex items-center justify-center shadow-xl group-hover/item:scale-110 transition-transform">
                                                <ShieldCheck className="h-6 w-6 text-violet-400 opacity-40 group-hover/item:opacity-100" />
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="font-black text-white text-[11px] uppercase tracking-[0.3em]">Protected Node</h4>
                                                <p className="text-[10px] text-white/20 font-black uppercase tracking-widest leading-none">Encrypted local ledger system Active</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-white/10 group-hover/item:text-white/40 transition-colors" />
                                    </div>
                                </div>
                                <div className="p-8 bg-white/[0.01] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.03] transition-all group/item relative overflow-hidden">
                                     <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/[0.02] to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                     <div className="flex items-center justify-between relative z-10">
                                        <div className="flex items-center gap-6">
                                            <div className="h-12 w-12 bg-[#050508] border border-white/5 rounded-2xl flex items-center justify-center shadow-xl group-hover/item:scale-110 transition-transform">
                                                <Signal className="h-6 w-6 text-fuchsia-400 opacity-40 group-hover/item:opacity-100" />
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="font-black text-white text-[11px] uppercase tracking-[0.3em]">Sync Protocol</h4>
                                                <p className="text-[10px] text-white/20 font-black uppercase tracking-widest leading-none">Automated settlement active on mainchain</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-white/10 group-hover/item:text-white/40 transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
               </motion.div>
            </div>

            {/* Transaction Ledger Architecture */}
            <div className="lg:col-span-8 space-y-10">
                <div className="flex items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-white/20" />
                        </div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Ledger History</h2>
                    </div>
                    <Button variant="ghost" className="h-12 px-6 rounded-2xl border border-white/5 bg-white/[0.02] text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-all">
                        EXPORT DATA
                    </Button>
                </div>

                <div className="space-y-4">
                {transactions.map((tx, idx) => (
                    <motion.div
                        key={tx.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group flex items-center justify-between gap-6 p-8 rounded-[2.5rem] bg-[#0a0a0f] border border-white/5 hover:border-violet-500/20 transition-all cursor-pointer relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="flex items-center gap-6 flex-1 min-w-0 relative z-10">
                            <div className={cn(
                                "h-16 w-16 rounded-[1.2rem] flex items-center justify-center shrink-0 shadow-2xl transition-all group-hover:scale-105",
                                tx.amount > 0 ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-white/[0.02] text-white/10 group-hover:text-white/40 border border-white/5"
                            )}>
                                {tx.amount > 0 ? (
                                    <ArrowDownLeft className="h-7 w-7" />
                                ) : (
                                    <ArrowUpRight className="h-7 w-7" />
                                )}
                            </div>
                            <div className="min-w-0 space-y-1.5">
                                <p className="text-sm font-black text-white uppercase tracking-tight truncate italic">{tx.description}</p>
                                <div className="flex items-center gap-3">
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">{tx.date}</p>
                                    <div className="h-1 w-1 rounded-full bg-white/5" />
                                    <p className="text-[10px] font-black text-white/10 uppercase tracking-widest">{tx.type}</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-right shrink-0 relative z-10">
                            <p className={cn(
                                "text-2xl font-black tracking-tighter italic",
                                tx.amount > 0 ? "text-emerald-500" : "text-white"
                            )}>
                                {tx.amount > 0 ? "+" : ""}{tx.amount}
                            </p>
                            <div className="flex items-center justify-end gap-2 mt-2">
                                <div className={cn("h-1.5 w-1.5 rounded-full", tx.status === 'completed' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]')} />
                                <span className="text-[9px] text-white/10 font-black uppercase tracking-[0.4em]">{tx.status}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
                </div>
            </div>

            {/* Sidebar Data Visualization */}
            <div className="lg:col-span-4 space-y-8">
               <div className="bg-[#0a0a0f] border border-white/5 rounded-[3rem] p-10 space-y-10 shadow-4xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 rounded-full blur-[60px] -mr-16 -mt-16" />
                  
                  <div className="space-y-10 relative z-10">
                    <div>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20 mb-8 border-b border-white/5 pb-4">Allocation Tree</h3>
                        <div className="space-y-10">
                            {[
                                { label: "Unlocked Assets", value: 82, color: "bg-violet-600" },
                                { label: "Sealed Assets", value: 18, color: "bg-white/20" }
                            ].map((item, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{item.label}</span>
                                        <span className="text-xs font-black text-white italic">{item.value}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                                            className={cn("h-full origin-left transition-all group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]", item.color)} 
                                            style={{ width: `${item.value}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6">
                        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-violet-600/10 via-[#050508] to-[#050508] border border-violet-500/20 relative overflow-hidden group/card shadow-2xl">
                            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover/card:opacity-30 transition-all duration-500">
                                <Sparkles className="h-14 w-14 text-violet-400 rotate-12" />
                            </div>
                            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.4em] mb-4">Referral Bonus</h4>
                            <p className="text-[11px] text-white/20 font-black uppercase tracking-widest leading-relaxed italic">Synchronize others with the chain and earn 2.5% yield on every transmission.</p>
                            <Button variant="link" className="px-0 h-auto mt-6 text-[11px] font-black uppercase tracking-[0.2em] text-violet-500 hover:text-white transition-colors">INITIATE UPLINK</Button>
                        </div>
                    </div>
                  </div>
               </div>

               <div className="px-10 space-y-4 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/[0.02] border border-white/5 opacity-40">
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                        <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em]">Ledger Secure // Settlement v2.4</span>
                    </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
