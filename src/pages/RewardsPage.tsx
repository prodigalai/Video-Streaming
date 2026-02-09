import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Gift, Share2, Copy, Users, Star, ArrowRight, Zap, Shield, Sparkles, Send, Box, Target } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const RewardStatCard = ({ label, value, sub, icon: Icon, color }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 relative overflow-hidden group shadow-2xl"
  >
    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="h-20 w-20" />
    </div>
    <div className="space-y-4 relative z-10">
        <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg", color)}>
            <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-1">{label}</p>
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{value}</h3>
            <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mt-1">{sub}</p>
        </div>
    </div>
  </motion.div>
);

export default function RewardsPage() {
  const copyReferralCode = () => {
    navigator.clipboard.writeText("ASH123");
    toast.success("Identity Code Copied", {
        description: "Your referral code ASH123 is ready for transmission.",
        style: { background: '#0f0f14', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }
    });
  };

  const handleShare = () => {
    const shareData = {
      title: 'Join the FOC Network',
      text: 'Secure your node on Fans on Chain Limited. Use code ASH123 for 500 initial credits.',
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData).catch((err) => console.error("Error sharing:", err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Signal Link Copied", {
          description: "Encrypted connection link copied to clipboard.",
          style: { background: '#0f0f14', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }
      });
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#050508] relative overflow-hidden pb-20">
        
        {/* Background Atmosphere */}
        <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-violet-600/[0.05] via-transparent to-transparent -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-full h-[800px] bg-gradient-to-t from-fuchsia-600/[0.05] via-transparent to-transparent -z-10 pointer-events-none" />

        <div className="container max-w-6xl py-12 sm:py-20 px-4 sm:px-6 space-y-20">
          
          {/* Header */}
          <div className="text-center space-y-6 max-w-3xl mx-auto">
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-600/10 border border-violet-500/20 mb-4"
             >
                <Trophy className="h-3.5 w-3.5 text-violet-400" />
                <span className="text-[10px] font-black text-violet-300 uppercase tracking-[0.2em]">Loyalty & Expansion Protocol</span>
             </motion.div>
             
             <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase leading-[1.1]">
                Network <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400">Incentives.</span>
             </h1>
             
             <p className="text-lg text-white/40 font-medium leading-relaxed">
                Scale your influence and earn architectural credits by engaging with nodes and expanding the network.
             </p>
          </div>

          {/* Level Progress */}
          <motion.div 
            whileHover={{ scale: 1.005 }}
            className="rounded-[3rem] bg-white/[0.02] border border-white/10 p-10 sm:p-12 shadow-2xl relative overflow-hidden group"
          >
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 opacity-50" />
             
             <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                   <div className="space-y-2">
                       <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Current Authority Tier</h3>
                       <div className="flex items-center gap-4">
                          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">GOLD CONDUCTOR</h2>
                          <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 font-black text-[10px] uppercase tracking-widest px-3">TOP 5% IN VIEWERS</Badge>
                       </div>
                   </div>

                   <div className="space-y-4">
                      <div className="flex justify-between items-end">
                         <p className="text-[10px] font-black text-white uppercase tracking-[0.2em]">EXPERIENCE POINTS (XP)</p>
                         <p className="text-sm font-black text-white uppercase tracking-widest">3,450 / 5,000 <span className="text-white/20">XP</span></p>
                      </div>
                      <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 p-1 relative">
                         <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "69%" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                         />
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                         <Zap className="h-3 w-3 text-violet-500" />
                         Next protocol unlock: <span className="text-white/60 mx-1">PLATINUM NODE</span> + 500 Credits
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 text-center space-y-2">
                       <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">ARCHIVED XP</p>
                       <p className="text-2xl font-black text-white">12,450</p>
                   </div>
                   <div className="p-6 rounded-[2rem] bg-violet-600/5 border border-violet-500/10 text-center space-y-2">
                       <p className="text-[9px] font-black text-violet-400 uppercase tracking-widest">CLAIMABLE</p>
                       <p className="text-2xl font-black text-white">450 <span className="text-xs">CR</span></p>
                   </div>
                </div>
             </div>
          </motion.div>

          {/* Referral & Rewards Grid */}
          <div className="grid lg:grid-cols-12 gap-8">
             {/* Referral Card */}
             <div className="lg:col-span-7 rounded-[3rem] bg-white/[0.02] border border-white/10 p-10 sm:p-12 relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/[0.03] to-transparent -z-10" />
                <div className="space-y-10 relative z-10">
                   <div className="space-y-4">
                      <h2 className="text-3xl font-black text-white uppercase tracking-tight italic leading-none">
                         Expand the <br />
                         <span className="text-violet-500">Network.</span>
                      </h2>
                      <p className="text-sm text-white/40 font-medium leading-relaxed max-w-sm">
                         Broadcast your unique identity code. Receive 500 Credits for every high-value connection established.
                      </p>
                   </div>

                   <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 h-16 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-between px-6">
                         <span className="font-mono text-xl font-black text-white tracking-widest uppercase">ASH123</span>
                         <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] hidden sm:block">IDENTITY CODE</span>
                      </div>
                      <Button onClick={copyReferralCode} className="h-16 px-10 bg-violet-600 hover:bg-violet-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-violet-500/20 transition-all active:scale-95 group border-none">
                         <Copy className="h-4 w-4 mr-3" />
                         COPY SIGNAL
                      </Button>
                   </div>

                   <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
                      <div>
                         <p className="text-2xl font-black text-white">12</p>
                         <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mt-1">SENT</p>
                      </div>
                      <div>
                         <p className="text-2xl font-black text-violet-500">4</p>
                         <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mt-1">VERIFIED</p>
                      </div>
                      <div>
                         <p className="text-2xl font-black text-white">2,000</p>
                         <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mt-1">EARNED CR</p>
                      </div>
                   </div>
                </div>
             </div>

             {/* Missions Card */}
             <div className="lg:col-span-5 rounded-[3rem] bg-white/[0.02] border border-white/10 p-10 sm:p-12 relative overflow-hidden shadow-2xl">
                <div className="space-y-10 relative z-10">
                   <div className="flex items-center justify-between">
                      <h2 className="text-xl font-black text-white uppercase tracking-tight">Daily Quests</h2>
                      <Sparkles className="h-4 w-4 text-violet-500" />
                   </div>

                   <div className="space-y-4">
                      {[
                        { title: "Broadcast Watch", desc: "Monitor any node for 15m", xp: "+50 XP", progress: 65, icon: Radio },
                        { title: "Engagement Signal", desc: "Interact with 5 transmissions", xp: "+80 XP", progress: 20, icon: MessageSquare },
                        { title: "Node Support", desc: "Send 1 gift to a creator", xp: "+150 XP", progress: 0, icon: Gift }
                      ].map((quest, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4 hover:border-white/10 transition-colors group">
                           <div className="flex justify-between items-start">
                              <div className="flex gap-4">
                                 <div className="h-10 w-10 rounded-xl bg-violet-600/10 flex items-center justify-center">
                                    <quest.icon className="h-4 w-4 text-violet-400" />
                                 </div>
                                 <div>
                                    <p className="text-xs font-black text-white uppercase tracking-wider">{quest.title}</p>
                                    <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mt-0.5">{quest.desc}</p>
                                 </div>
                              </div>
                              <span className="text-[9px] font-black text-violet-400 uppercase tracking-widest">{quest.xp}</span>
                           </div>
                           <div className="space-y-1.5">
                              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                 <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${quest.progress}%` }}
                                    className="h-full bg-violet-600 shadow-[0_0_8px_rgba(139,92,246,0.5)]" 
                                 />
                              </div>
                              <div className="flex justify-between">
                                 <p className="text-[8px] font-black text-white/10 uppercase tracking-widest">{quest.progress}% SYNCED</p>
                                 {quest.progress === 100 && <Check className="h-2 w-2 text-emerald-500" />}
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>

                   <Button variant="ghost" className="w-full text-xs font-black text-white/40 hover:text-white uppercase tracking-[0.3em] group">
                      VIEW ALL MISSIONS
                      <ArrowRight className="h-3.5 w-3.5 ml-2 transition-transform group-hover:translate-x-1" />
                   </Button>
                </div>
             </div>
          </div>

          {/* Claimable Bonuses */}
          <div className="space-y-8">
             <div className="flex items-center gap-4">
                <Box className="h-4 w-4 text-fuchsia-500" />
                <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">Vault Bonuses</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
             </div>
             
             <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Weekly Conductor", desc: "Log in 7 consecutive cycles", reward: "100 CR", status: "claimable", icon: Zap },
                  { title: "Community Hero", desc: "Gift 5 node accesses", reward: "500 CR", status: "locked", icon: Users },
                  { title: "Signal Booster", desc: "Share 10 broadcasts", reward: "250 CR", status: "locked", icon: Send }
                ].map((bonus, i) => (
                   <div key={i} className={cn(
                      "p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-6 transition-all duration-500 group",
                      bonus.status === "claimable" ? "hover:border-violet-500/30 hover:bg-violet-600/[0.03]" : "opacity-40 grayscale"
                   )}>
                      <div className="flex justify-between items-start">
                         <div className="h-12 w-12 rounded-3xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-violet-500/30 transition-all">
                            <bonus.icon className="h-5 w-5 text-white/40 group-hover:text-violet-400 transition-colors" />
                         </div>
                         <Badge className={cn(
                            "font-black text-[9px] uppercase tracking-widest px-3",
                            bonus.status === "claimable" ? "bg-violet-600 text-white" : "bg-white/5 text-white/30"
                         )}>
                            {bonus.reward}
                         </Badge>
                      </div>
                      <div className="space-y-1">
                         <h4 className="text-sm font-black text-white uppercase tracking-wider">{bonus.title}</h4>
                         <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest leading-relaxed">{bonus.desc}</p>
                      </div>
                      <Button 
                         variant={bonus.status === "claimable" ? "default" : "outline"} 
                         className={cn(
                            "w-full h-11 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] transition-all",
                            bonus.status === "claimable" 
                                ? "bg-violet-600 hover:bg-violet-700 text-white shadow-xl shadow-violet-500/20 border-none" 
                                : "bg-transparent text-white/20 border-white/10 hover:bg-transparent"
                         )}
                         disabled={bonus.status === "locked"}
                      >
                         {bonus.status === "claimable" ? "CLAIM REWARD" : "ENCRYPTED"}
                      </Button>
                   </div>
                ))}
             </div>
          </div>

          <div className="text-center">
             <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/[0.02] border border-white/5 opacity-30">
                <Shield className="h-3.5 w-3.5 text-violet-400" />
                <span className="text-[9px] font-black uppercase tracking-[0.5em]">Global Incentive Protocol v4.81 / 2026</span>
             </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Radio({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="2" />
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M7.76 7.76a6 6 0 0 0 0 8.49" />
      <path d="M4.93 4.93a10 10 0 0 0 0 14.14" />
    </svg>
  );
}
