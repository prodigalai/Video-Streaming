import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Zap, Shield, BarChart3, Globe, Sparkles, Wallet, ArrowRight, Play, Star, Trophy, Users, Check } from "lucide-react";
import { motion } from "framer-motion";

const FeatureCard = ({ icon: Icon, title, desc, color }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-violet-500/30 transition-all duration-500 relative group"
  >
    <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center mb-6 shadow-2xl transition-transform group-hover:scale-110", color)}>
      <Icon className="h-7 w-7 text-white" />
    </div>
    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-3">{title}</h3>
    <p className="text-sm font-medium text-white/40 leading-relaxed">{desc}</p>
  </motion.div>
);

export default function CreatorsPage() {
  const features = [
    {
      icon: Wallet,
      title: "Instant Crypto Payouts",
      desc: "Get paid instantly in USDC/SOL. No minimum thresholds, no 30-day holds.",
      color: "bg-emerald-600/20 shadow-emerald-500/20"
    },
    {
      icon: Shield,
      title: "Complete Ownership",
      desc: "You own your content and your audience. No algorithm changes taking away your reach.",
      color: "bg-blue-600/20 shadow-blue-500/20"
    },
    {
      icon: BarChart3,
      title: "Deep Analytics",
      desc: "Understand your audience with real-time insights and growth metrics.",
      color: "bg-violet-600/20 shadow-violet-500/20"
    },
    {
      icon: Globe,
      title: "Global Reach",
      desc: "Connect with fans worldwide without border restrictions or payment hurdles.",
      color: "bg-fuchsia-600/20 shadow-fuchsia-500/20"
    },
    {
      icon: Zap,
      title: "High Performance",
      desc: "Ultra-low latency streaming and 4K uploads for the best viewer experience.",
      color: "bg-amber-600/20 shadow-amber-500/20"
    },
    {
      icon: Sparkles,
      title: "AI-Powered Tools",
      desc: "Use our AI studio to edit, caption, and optimize your content automatically.",
      color: "bg-red-600/20 shadow-red-500/20"
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#050508] relative overflow-hidden pb-20">
        
        {/* Cinematic Backdrop */}
        <div className="absolute top-0 left-0 w-full h-[1000px] bg-gradient-to-b from-blue-600/[0.05] via-transparent to-transparent -z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-full h-[1000px] bg-gradient-to-b from-violet-600/[0.05] via-transparent to-transparent -z-10 pointer-events-none" />

        <div className="container py-20 px-4 sm:px-6 space-y-32">
          
          {/* Header Section */}
          <div className="text-center space-y-8 max-w-5xl mx-auto">
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-600/10 border border-violet-500/20 mb-4"
             >
                <Star className="h-3.5 w-3.5 text-violet-400 fill-current" />
                <span className="text-[10px] font-black text-violet-300 uppercase tracking-[0.2em]">Elevate Your Influence</span>
             </motion.div>
             
             <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase italic"
             >
                Create. <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">Earn.</span> <br />
                Own the Future.
             </motion.h1>
             
             <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg sm:text-2xl text-white/40 max-w-2xl mx-auto font-medium leading-relaxed"
             >
                The most advanced infrastructure for digital expressions. Zero friction, instant liquidity, and total creative freedom.
             </motion.p>

             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="pt-8 flex flex-wrap justify-center gap-6"
             >
                <Button className="h-16 px-12 bg-violet-600 hover:bg-violet-700 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-violet-500/20 border-none transition-all active:scale-95 group">
                    ESTABLISH YOUR NODE
                    <ArrowRight className="h-4 w-4 ml-3 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button className="h-16 px-12 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl transition-all">
                    VIEW PROTOCOLS
                </Button>
             </motion.div>
          </div>

          {/* Social Proof / Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-20 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
             <div className="flex items-center gap-3">
                <Trophy className="h-6 w-6 text-amber-500" />
                <span className="text-xl font-black text-white italic tracking-tighter">ELITE NETWORK</span>
             </div>
             <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-blue-500" />
                <span className="text-xl font-black text-white italic tracking-tighter">12.5M ENTHUSIASTS</span>
             </div>
             <div className="flex items-center gap-3">
                <Play className="h-6 w-6 text-fuchsia-500" />
                <span className="text-xl font-black text-white italic tracking-tighter">REAL-TIME TRANSMISSION</span>
             </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-16">
             <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Creator Utilities</h2>
                <div className="h-1.5 w-24 bg-gradient-to-r from-violet-600 to-fuchsia-600 mx-auto rounded-full" />
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, i) => (
                  <FeatureCard key={i} icon={feature.icon} title={feature.title} desc={feature.desc} color={feature.color} />
                ))}
             </div>
          </div>

          {/* Comparison / Why Us */}
          <div className="grid lg:grid-cols-2 gap-16 items-center bg-white/[0.02] border border-white/5 rounded-[4rem] p-12 sm:p-20 shadow-2xl overflow-hidden relative">
             <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.1),transparent_50%)]" />
             <div className="space-y-10 relative z-10">
                <div className="space-y-4">
                   <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">
                      Break the <br />
                      <span className="text-violet-500">Algorithm.</span>
                   </h2>
                   <p className="text-lg text-white/40 font-medium">Traditional platforms work against you. Fans on Chain Limited works for you.</p>
                </div>
                
                <div className="space-y-4">
                   {[
                      "95% Revenue Share on Subscriptions",
                      "Instant USDC-SOL Liquid Payouts",
                      "Direct Signal Access to Fans",
                      "No Shadowbanning or Reach Throttling",
                      "Encrypted Data Protection",
                      "Cross-Node Content Portability"
                   ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                         <div className="h-6 w-6 rounded-full bg-violet-600/20 flex items-center justify-center border border-violet-500/30">
                            <Check className="h-3 w-3 text-violet-400" />
                         </div>
                         <span className="text-sm font-black text-white/70 uppercase tracking-widest">{item}</span>
                      </div>
                   ))}
                </div>
             </div>

             <div className="relative aspect-square rounded-[3rem] overflow-hidden group shadow-2xl border border-white/10 rotate-3">
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/40 via-transparent to-transparent z-10" />
                <img 
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=800&fit=crop" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Gaming Studio"
                />
                <div className="absolute bottom-10 left-10 z-20 space-y-2">
                   <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">ACTIVE NODE: TRANSMITTING</p>
                   <p className="text-2xl font-black text-white uppercase tracking-tighter italic">CRYPTO-GEN ALPHA</p>
                </div>
             </div>
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-12">
             <div className="space-y-4">
                <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter">Ready to take control?</h2>
                <p className="text-lg text-white/40 max-w-2xl mx-auto font-medium">Establish your node in the network today and start earning without boundaries.</p>
             </div>
             
             <div className="flex flex-col items-center gap-8">
                <Button className="h-16 px-16 bg-white text-black hover:bg-gray-100 font-black text-sm uppercase tracking-[0.3em] rounded-2xl shadow-glow-primary border-none transition-all active:scale-95">
                    INITIALIZE REGISTRATION
                </Button>
                <div className="flex gap-8 opacity-30">
                    <span className="text-[10px] font-black uppercase tracking-widest">No Hidden Fees</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Global Payouts</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Cancel Anytime</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
