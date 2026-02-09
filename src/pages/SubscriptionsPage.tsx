import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Calendar, RefreshCw, CheckCircle, XCircle, Crown, Shield, Zap, Sparkles, Signal, ShieldCheck, Box, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Mock data
const activeSubscriptions = [
  {
    id: 1,
    creator: {
      id: "luna",
      name: "Luna Live",
      username: "luna_live",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
      isLive: true,
    },
    tier: "Elite Node",
    price: 499,
    renewsAt: "Feb 15, 2026",
    subscribedSince: "Dec 15, 2025",
  },
  {
    id: 2,
    creator: {
      id: "gamer",
      name: "GamerPro",
      username: "gamer_pro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gamer",
      isLive: false,
    },
    tier: "Verified Access",
    price: 199,
    renewsAt: "Feb 20, 2026",
    subscribedSince: "Jan 20, 2026",
  },
];

const expiredSubscriptions = [
  {
    id: 3,
    creator: {
      id: "maria",
      name: "ChefMaria",
      username: "chef_maria",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
      isLive: false,
    },
    tier: "Standard",
    price: 199,
    expiredAt: "Jan 10, 2026",
  },
];

const SubscriptionStats = ({ title, value, icon: Icon, color, delay = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ y: -5 }}
    className="bg-[#0a0a0f] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-3xl"
  >
    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-5 transition-opacity">
        <Icon className="h-20 w-20" />
    </div>
    <div className="flex items-center gap-6 relative z-10">
      <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shadow-xl", color)}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <h3 className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] mb-1">{title}</h3>
        <p className="text-3xl font-black text-white tracking-tighter italic uppercase">{value}</p>
      </div>
    </div>
  </motion.div>
);

export default function SubscriptionsPage() {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#050508] relative overflow-hidden pb-20">
        
        {/* Dynamic Atmosphere */}
        <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-violet-600/[0.04] to-transparent -z-10" />
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-fuchsia-600/[0.03] rounded-full blur-[120px] -z-10 animate-pulse" />

        <div className="container py-8 lg:py-12 px-6 sm:px-8 space-y-16">
          
          {/* Header Architecture */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="space-y-4">
               <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-violet-600 flex items-center justify-center shadow-2xl shadow-violet-500/20">
                      <ShieldCheck className="h-6 w-6 text-white" />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic">Access <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Inventory</span></h1>
               </div>
               <p className="text-sm font-medium text-white/40 italic">Interface for managing peer-to-peer encrypted node connections.</p>
            </div>
            
            <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5 self-start lg:self-auto">
                <Signal className="h-3.5 w-3.5 text-violet-500" />
                <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Uplink Status: Secure</span>
            </div>
          </div>

          {/* Core Metrics Engine */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SubscriptionStats title="Sync Nodes" value={activeSubscriptions.length} icon={Signal} color="bg-violet-600/20" delay={0.1} />
            <SubscriptionStats title="Archive Count" value={expiredSubscriptions.length} icon={Box} color="bg-white/5" delay={0.2} />
            <SubscriptionStats title="Node Credits" value={`$${activeSubscriptions.reduce((sum, s) => sum + s.price, 0)}`} icon={Zap} color="bg-fuchsia-600/20" delay={0.3} />
          </div>

          {/* Interactive Protocol Control */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-12">
            <div className="flex items-center justify-between border-b border-white/5 pb-1">
                <TabsList className="h-auto bg-transparent p-0 gap-10 w-full justify-start rounded-none overflow-x-auto scrollbar-hide">
                    {[
                        { id: "active", label: "Active Links", icon: CheckCircle },
                        { id: "expired", label: "Archive Data", icon: Box }
                    ].map((tab) => (
                    <TabsTrigger 
                        key={tab.id}
                        value={tab.id}
                        className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-violet-500 rounded-none px-0 pb-5 text-[10px] font-black text-white/20 uppercase tracking-[0.4em] transition-all hover:text-white relative group"
                    >
                        <tab.icon className="h-4 w-4 mr-3 opacity-20 group-hover:opacity-100 transition-opacity" />
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div layoutId="activeSubTab" className="absolute bottom-0 left-0 right-0 h-1 bg-violet-600 rounded-t-full" />
                        )}
                    </TabsTrigger>
                    ))}
                </TabsList>
            </div>

            <AnimatePresence mode="wait">
              <TabsContent value="active" className="mt-0 space-y-8 focus-visible:outline-none">
                {activeSubscriptions.length > 0 ? (
                  <div className="grid grid-cols-1 gap-8">
                    {activeSubscriptions.map((sub, index) => (
                      <motion.div
                        key={sub.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-[#0a0a0f] border border-white/5 rounded-[3.5rem] p-10 shadow-3xl overflow-hidden hover:border-violet-500/20 transition-all duration-700"
                      >
                         <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/[0.02] rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-violet-600/[0.05] transition-all" />
                         
                         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative z-10">
                            <div className="flex items-center gap-8">
                                <Link to={`/creator/${sub.creator.id}`} className="relative group/avatar">
                                    <div className="absolute inset-0 bg-violet-600/30 blur-2xl rounded-[2rem] opacity-0 group-hover/avatar:opacity-100 transition-opacity" />
                                    <div className="h-20 w-20 md:h-24 md:w-24 rounded-[2rem] p-1 bg-gradient-to-br from-violet-600/30 via-white/10 to-fuchsia-600/30 relative">
                                        <Avatar className="h-full w-full rounded-[1.8rem] border-4 border-[#0a0a0f] shadow-2xl">
                                            <AvatarImage src={sub.creator.avatar} />
                                            <AvatarFallback className="bg-violet-600 text-white font-black">LL</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    {sub.creator.isLive && (
                                        <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-[#0a0a0f] p-1 shadow-2xl">
                                             <div className="h-full w-full bg-red-600 rounded-full animate-pulse shadow-lg shadow-red-500/50" />
                                        </div>
                                    )}
                                </Link>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 flex-wrap">
                                        <Link to={`/creator/${sub.creator.id}`} className="text-2xl font-black text-white hover:text-violet-400 transition-colors uppercase tracking-tight leading-none italic">
                                            {sub.creator.name}
                                        </Link>
                                        <div className="bg-violet-600/10 border border-violet-500/20 px-4 py-1.5 rounded-full flex items-center gap-2">
                                            <Crown className="h-3.5 w-3.5 text-violet-500" />
                                            <span className="text-[9px] font-black text-violet-400 uppercase tracking-widest">{sub.tier}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-6 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                                        <div className="flex items-center gap-2.5">
                                            <Calendar className="h-4 w-4 text-violet-500" /> NODE EST. {sub.subscribedSince}
                                        </div>
                                        <div className="h-1 w-1 rounded-full bg-white/10" />
                                        <div className="flex items-center gap-2.5 text-violet-500/60">
                                            <Zap className="h-4 w-4" /> {sub.price} CREDITS / MO
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
                                <div className="text-center sm:text-right space-y-1">
                                    <p className="text-[9px] font-black text-white/10 uppercase tracking-[0.4em]">RE-COMPUTE DATE</p>
                                    <p className="text-sm font-black text-white uppercase tracking-widest">{sub.renewsAt}</p>
                                </div>
                                <div className="flex gap-4 w-full sm:w-auto">
                                    <Button variant="ghost" className="flex-1 sm:flex-none h-14 px-8 rounded-2xl border border-white/5 bg-white/[0.02] text-white/40 hover:text-white hover:bg-white/5 font-black text-[10px] uppercase tracking-[0.3em] transition-all">
                                        RECONFIGURE
                                    </Button>
                                    <Button className="flex-1 sm:flex-none h-14 px-8 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-violet-500/20 active:scale-95 border-none group">
                                        ENTRY VAULT
                                        <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                         </div>
                         
                         {/* Dynamic Progress Engine */}
                         <div className="mt-10 h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "68%" }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className="h-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 opacity-60 group-hover:opacity-100 transition-opacity" 
                            />
                         </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                    <div className="py-40 flex flex-col items-center justify-center text-center space-y-10 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-violet-600/10 blur-[80px] rounded-full" />
                            <div className="h-32 w-32 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex items-center justify-center relative z-10">
                                <Signal className="h-10 w-10 text-white/5" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">No Active Uplinks</h3>
                            <p className="max-w-xs mx-auto text-[10px] font-black uppercase tracking-[0.4em] text-white/10 leading-loose">
                                Your network access protocol is idle. Connect to elite creators to initiate encrypted transmission streams.
                            </p>
                        </div>
                        <Link to="/explore">
                            <Button className="h-14 px-10 bg-violet-600 hover:bg-violet-700 font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl shadow-2xl shadow-violet-500/30 border-none transition-all">
                                DISCOVER NODES
                            </Button>
                        </Link>
                    </div>
                )}
              </TabsContent>

              <TabsContent value="expired" className="mt-0 focus-visible:outline-none">
                {expiredSubscriptions.length > 0 ? (
                  <div className="grid grid-cols-1 gap-8">
                    {expiredSubscriptions.map((sub, index) => (
                      <motion.div
                        key={sub.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#0a0a0f]/40 border border-white/5 rounded-[3.5rem] p-10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 group shadow-3xl"
                      >
                         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                            <div className="flex items-center gap-8">
                                <Avatar className="h-20 w-20 rounded-[1.8rem] border-4 border-[#0a0a0f] shadow-2xl group-hover:border-violet-500/20 transition-all">
                                  <AvatarImage src={sub.creator.avatar} />
                                  <AvatarFallback>{sub.creator.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-3">
                                   <h3 className="text-2xl font-black text-white uppercase tracking-tight italic leading-none">{sub.creator.name}</h3>
                                   <div className="flex items-center gap-3">
                                       <Box className="h-3.5 w-3.5 text-white/20" />
                                       <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                                          Signal Terminated // {sub.expiredAt}
                                       </p>
                                   </div>
                                </div>
                            </div>
                            <Button className="h-14 px-10 rounded-2xl bg-white/5 hover:bg-violet-600 text-white font-black text-[10px] uppercase tracking-[0.3em] border border-white/10 hover:border-violet-600 transition-all group/btn">
                               <RefreshCw className="h-4 w-4 mr-3 group-hover/btn:rotate-180 transition-transform duration-700" />
                               RE-SYNC LINK
                            </Button>
                         </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="py-40 text-center space-y-6">
                    <div className="h-24 w-24 rounded-[2rem] bg-white/[0.01] border border-white/5 flex items-center justify-center mx-auto opacity-20">
                         <Box className="h-8 w-8" />
                    </div>
                    <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">Inventory Archive Empty</p>
                  </div>
                )}
              </TabsContent>
            </AnimatePresence>
          </Tabs>
          
          <div className="pt-20 text-center">
             <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/[0.02] border border-white/5 opacity-50 shadow-2xl">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em]">System Verified Integrity / Epoch 48.02</span>
             </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
