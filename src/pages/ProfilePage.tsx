import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Share2, 
  Pencil, 
  User, 
  Search, 
  Facebook, 
  Twitter, 
  Copy, 
  Code,
  MoreVertical,
  Instagram,
  Settings,
  Bell,
  Shield,
  Zap,
  Globe,
  MapPin,
  Calendar,
  Sparkles,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("home");
  const username = "AshN0408";
  const isOnline = false;
  const followers = 12;

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#050508] relative overflow-hidden pb-20">
        
        {/* Dynamic Space Atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-violet-600/[0.04] to-transparent -z-10" />
           <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[100px] -z-10 animate-pulse" />
        </div>

        {/* Hero Section / Banner */}
        <div className="relative h-[300px] md:h-[400px] w-full group overflow-hidden">
           {/* Custom Pattern Banner matching the user style but premium */}
           <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105" 
                style={{
                  backgroundImage: 'linear-gradient(45deg, #0a0a0f 25%, transparent 25%), linear-gradient(-45deg, #0a0a0f 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #0a0a0f 75%), linear-gradient(-45deg, transparent 75%, #0a0a0f 75%)',
                  backgroundSize: '30px 30px',
                  backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0px',
                  backgroundColor: '#8b5cf6' // Premium violet base
                }} 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/20 to-transparent" />
           <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
           
           {/* Header Navigation UI */}
           <div className="absolute top-8 left-8 right-8 flex items-center justify-between z-20">
               <Link to="/">
                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-all">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
               </Link>
               <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-all">
                        <Settings className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-all">
                        <Pencil className="h-5 w-5" />
                    </Button>
               </div>
           </div>

           {/* User Status Badge Overlay */}
           {!isOnline && (
               <div className="absolute bottom-16 right-8 md:right-16 z-20">
                    <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl animate-in slide-in-from-right-10 duration-700">
                        <div className="h-2 w-2 rounded-full bg-white/20" />
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Node Inactive</span>
                    </div>
               </div>
           )}
        </div>

        <div className="max-w-[1300px] mx-auto px-6 relative -mt-32 md:-mt-44 z-30">
            {/* Identity Profile Container */}
            <div className="bg-[#0a0a0f]/80 backdrop-blur-3xl border border-white/5 rounded-[3.5rem] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
                    {/* Avatar Design */}
                    <div className="relative shrink-0">
                        <div className="absolute inset-0 bg-violet-600/20 blur-2xl rounded-full -z-10" />
                        <div className="h-32 w-32 md:h-44 md:w-44 rounded-[2.5rem] p-1.5 bg-gradient-to-br from-violet-600/50 via-white/10 to-fuchsia-600/50">
                            <Avatar className="h-full w-full rounded-[2.2rem] border-4 border-[#0a0a0f] shadow-2xl">
                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                                <AvatarFallback className="bg-violet-600 text-white text-3xl font-black">AN</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-[#0a0a0f] border-4 border-[#0a0a0f] rounded-full shadow-2xl flex items-center justify-center">
                            <div className={cn("h-3 w-3 rounded-full border-2 border-[#0a0a0f]", isOnline ? "bg-emerald-500" : "bg-white/20")} />
                        </div>
                    </div>

                    {/* Info UI */}
                    <div className="flex-1 space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-4 flex-wrap">
                                <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic leading-none">{username}</h1>
                                <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full flex items-center gap-2">
                                    <Shield className="h-3.5 w-3.5 text-emerald-500" />
                                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest text-white/80 transition-colors">Verified Citizen</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="text-xs font-black text-white/20 uppercase tracking-[0.4em]">Member Since Feb 2026</p>
                                <div className="h-1 w-1 bg-white/20 rounded-full" />
                                <p className="text-xs font-black text-white/40 uppercase tracking-[0.2em]">{followers} NETWORK LINKS</p>
                            </div>
                        </div>

                        {/* Profile Meta Icons */}
                        <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/5">
                            <div className="flex items-center gap-2.5 text-[9px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-white/60 transition-colors cursor-pointer group">
                                <Globe className="h-4 w-4 text-violet-500 group-hover:scale-110 transition-transform" /> ASHN.ETH
                            </div>
                            <div className="flex items-center gap-2.5 text-[9px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-white/60 transition-colors cursor-pointer group">
                                <Zap className="h-4 w-4 text-violet-500 group-hover:scale-110 transition-transform" /> LVL 4
                            </div>
                            <div className="flex items-center gap-2.5 text-[9px] font-black uppercase tracking-[0.3em] text-white/30">
                                <ShieldCheck className="h-4 w-4 text-violet-500" /> BIOMETRIC SYNCED
                            </div>
                        </div>
                    </div>

                    {/* Header Actions UI */}
                    <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="h-14 px-8 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl border border-white/10 transition-all flex gap-3 shadow-xl">
                                    <Share2 className="h-4 w-4 text-violet-500" />
                                    BROADCAST PORTAL
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80 p-3 bg-[#0f0f14] border-white/10 rounded-3xl shadow-3xl">
                                <div className="p-4 space-y-6">
                                    <div className="space-y-2">
                                        <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Channel Broadcast</h4>
                                        <div className="flex justify-between gap-3">
                                            {[Facebook, Twitter, Instagram, Copy].map((Icon, i) => (
                                                <Button key={i} variant="ghost" className="flex-1 h-16 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-violet-600 transition-all group">
                                                    <Icon className="h-5 w-5 text-white/40 group-hover:text-white" />
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
                                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest truncate max-w-[150px]">fans-on-chain.io/ashn0408</span>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-violet-400"><Copy className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all shadow-xl">
                            <MoreVertical className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Navigation Core Tabs */}
                <div className="mt-12 overflow-x-auto scrollbar-hide border-t border-white/5 -mx-8 md:-mx-12 px-8 md:px-12">
                   <Tabs defaultValue="home" className="w-full" onValueChange={setActiveTab}>
                      <TabsList className="h-auto bg-transparent p-0 gap-10 sm:gap-14 border-b border-transparent w-full justify-start rounded-none">
                        {["Home", "Archive", "Signals", "Vault"].map((tab) => (
                          <TabsTrigger 
                            key={tab}
                            value={tab.toLowerCase()}
                            className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-6 text-[10px] font-black uppercase tracking-[0.4em] text-white/20 data-[state=active]:text-violet-500 relative transition-all hover:text-white group/tab"
                          >
                            {tab}
                            <motion.div 
                                className="absolute bottom-0 left-0 right-0 h-1 bg-violet-600 rounded-t-full scale-x-0 data-[state=active]:group-focus-within:scale-x-100 transition-transform origin-center"
                                initial={false}
                                animate={activeTab === tab.toLowerCase() ? { scaleX: 1 } : { scaleX: 0 }}
                            />
                          </TabsTrigger>
                        ))}
                      </TabsList>
                   </Tabs>
                </div>
            </div>

            {/* Content Display Area */}
            <div className="mt-10 py-20 bg-white/[0.01] border border-dashed border-white/5 rounded-[3.5rem] flex flex-col items-center justify-center text-center space-y-10 min-h-[500px]">
                <div className="relative">
                    <div className="absolute inset-0 bg-violet-600/10 blur-[80px] rounded-full" />
                    <div className="h-32 w-32 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex items-center justify-center relative z-10 animate-pulse">
                        <Search className="h-10 w-10 text-white/5" />
                    </div>
                    <div className="absolute -bottom-4 -right-4">
                        <div className="h-14 w-14 rounded-2xl bg-[#0a0a0f] border border-white/5 flex items-center justify-center shadow-3xl">
                             <Sparkles className="h-6 w-6 text-violet-500/30" />
                        </div>
                    </div>
                </div>
                
                <div className="space-y-3">
                    <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">No Signal Detected</h3>
                    <p className="max-w-xs mx-auto text-[10px] font-black uppercase tracking-[0.4em] text-white/10 leading-loose">
                        Your communication archive is currently offline. Start exploring to populate your personal cloud.
                    </p>
                </div>

                <div className="flex gap-4">
                    <Link to="/explore">
                        <Button className="h-12 px-8 bg-violet-600 hover:bg-violet-700 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-violet-500/20 active:scale-95 border-none">
                            INITIATE DISCOVERY
                        </Button>
                    </Link>
                </div>
            </div>
            
            <div className="mt-20 flex flex-col items-center text-center space-y-4">
                 <div className="h-px w-24 bg-white/5" />
                 <p className="text-[8px] font-black text-white/10 uppercase tracking-[0.6em]">System Identity Verified / Citizen Node 4801.A</p>
            </div>
        </div>
      </div>
    </MainLayout>
  );
}
