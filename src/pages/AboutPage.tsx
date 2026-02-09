import { MainLayout } from "@/components/layout/MainLayout";
import { Shield, Zap, Globe, Users, ArrowRight, Sparkles, Star, Trophy, Radio, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const FeatureCard = ({ icon: Icon, title, desc, color }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-violet-500/30 transition-all duration-500 relative group overflow-hidden"
  >
    <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center mb-6 shadow-2xl transition-transform group-hover:scale-110", color)}>
      <Icon className="h-7 w-7 text-white" />
    </div>
    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-3">{title}</h3>
    <p className="text-sm font-medium text-white/40 leading-relaxed">{desc}</p>
    
    <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
        <Icon className="h-32 w-32" />
    </div>
  </motion.div>
);

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-[#050508] relative overflow-hidden pb-20">
        
        {/* Background Ambience */}
        <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-violet-600/[0.07] via-transparent to-transparent -z-10 pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        
        <div className="container max-w-6xl py-12 sm:py-20 px-4 sm:px-6 space-y-24">
          
          {/* Hero Section */}
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-600/10 border border-violet-500/20 mb-4"
            >
                <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                <span className="text-[10px] font-black text-violet-300 uppercase tracking-[0.2em]">The Future of Digital Expression</span>
            </motion.div>
            
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] uppercase"
            >
                Fans on Chain <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400">Limited.</span>
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto font-medium leading-relaxed"
            >
                We are building the most exclusive, secure, and technologically advanced creator network in the world. Owned by creators, fueled by fans.
            </motion.p>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
                <Button className="h-14 px-10 bg-violet-600 hover:bg-violet-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-violet-500/30 border-none transition-all active:scale-95 group">
                    Enter the Network
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="ghost" className="h-14 px-10 rounded-2xl border border-white/5 bg-white/5 text-white/80 hover:text-white font-black text-xs uppercase tracking-[0.2em] transition-all">
                    Explore Nodes
                </Button>
            </motion.div>
          </div>

          {/* Core Values / Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
                { label: "Global Reach", value: "190+", sub: "Verified Nodes", icon: Globe },
                { label: "Growth Index", value: "320%", sub: "Quarterly Delta", icon: Zap },
                { label: "Identity Layer", value: "AES-256", sub: "Secure Encryption", icon: Shield },
                { label: "Active Nodes", value: "125K", sub: "Verified Network", icon: Users },
             ].map((stat, i) => (
                <div key={i} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center space-y-2">
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">{stat.label}</p>
                    <p className="text-3xl font-black text-white uppercase tracking-tight">{stat.value}</p>
                    <p className="text-[10px] font-medium text-violet-400 uppercase tracking-widest">{stat.sub}</p>
                </div>
             ))}
          </div>

          {/* Mission Section */}
          <div className="grid lg:grid-cols-2 gap-20 items-center pt-12">
             <div className="space-y-8">
                <div className="space-y-4">
                    <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none italic">
                        The Core <br />
                        <span className="text-violet-500">Protocol.</span>
                    </h2>
                    <p className="text-lg text-white/40 font-medium leading-relaxed">
                        Our platform is designed to bypass traditional distribution limitations, giving creators direct, un-interrupted pathways to their most dedicated supporters.
                    </p>
                </div>
                
                <div className="space-y-6">
                   {[
                      { title: "Direct Monetization", desc: "Keep what you earn with transparent, instant credit settlements." },
                      { title: "Global Infrastructure", desc: "Low-latency streaming nodes deployed globally for a seamless experience." },
                      { title: "Elite Community", desc: "A curated network of professional creators and high-value enthusiasts." }
                   ].map((item, i) => (
                      <div key={i} className="flex gap-6">
                         <div className="h-6 w-6 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shrink-0 mt-1">
                            <div className="h-2 w-2 rounded-full bg-violet-400" />
                         </div>
                         <div className="space-y-1">
                            <h4 className="text-sm font-black text-white uppercase tracking-wider">{item.title}</h4>
                            <p className="text-xs text-white/40 leading-relaxed font-medium">{item.desc}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
             
             <div className="relative aspect-video rounded-[3rem] overflow-hidden group shadow-2xl border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/30 via-transparent to-fuchsia-600/30 opacity-60 group-hover:opacity-100 transition-opacity z-10" />
                <img 
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=800&fit=crop" 
                    alt="Technology" 
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="h-20 w-20 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">
                        <Radio className="h-8 w-8 text-white animate-pulse" />
                    </div>
                </div>
             </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-12">
             <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Technical Spectrum</h2>
                <div className="h-1 w-24 bg-violet-600 mx-auto rounded-full" />
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard 
                    icon={Radio} 
                    title="Live Pipeline" 
                    desc="4K ultra-low latency streaming architecture designed for real-time interaction." 
                    color="bg-blue-600/20 shadow-blue-500/20"
                />
                <FeatureCard 
                    icon={Target} 
                    title="Discovery Engine" 
                    desc="Advanced interest mapping helps you find the exact content and communities you value most." 
                    color="bg-fuchsia-600/20 shadow-fuchsia-500/20"
                />
                <FeatureCard 
                    icon={Star} 
                    title="Elite Tiers" 
                    desc="Specialized membership levels providing unprecedented access to your favorite creators." 
                    color="bg-violet-600/20 shadow-violet-500/20"
                />
             </div>
          </div>

          {/* CTA Section */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="rounded-[3rem] bg-gradient-to-br from-violet-900 to-fuchsia-900 p-12 sm:p-20 text-center space-y-8 relative overflow-hidden shadow-2xl border border-white/10"
          >
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
             <div className="relative z-10">
                <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-6">Ready to establish your node?</h2>
                <p className="text-lg text-white/70 max-w-2xl mx-auto font-medium mb-10">
                    Join thousands of elite creators and fans who have already migrated to the most advanced network in existence.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button className="h-14 px-12 bg-white text-black hover:bg-gray-100 font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl transition-all active:scale-95">
                        GET STARTED
                    </Button>
                    <Button className="h-14 px-12 bg-black/40 text-white border border-white/20 hover:bg-black/60 font-black text-xs uppercase tracking-[0.2em] rounded-2xl backdrop-blur-xl transition-all active:scale-95">
                        CONTACT ENVOY
                    </Button>
                </div>
             </div>
          </motion.div>

          <div className="text-center pt-12">
             <div className="flex flex-col items-center gap-4">
                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Fans on Chain Limited / Protocol 2026</p>
                <p className="text-[8px] font-medium text-white/10 uppercase tracking-[0.3em] max-w-sm leading-loose">
                    This network is secured by RSA-4096. Any unauthorized attempts to access protected nodes will be logged and analyzed by the safety guard.
                </p>
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
