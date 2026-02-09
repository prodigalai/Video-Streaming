import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Users, 
  Heart, 
  Share2, 
  CheckCircle2,
  Lock,
  Image as ImageIcon,
  Video,
  Grid,
  Bell,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Globe,
  Signal,
  Shield,
  Zap,
  Radio,
  Clock,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import { PostCard } from "@/components/feed/PostCard";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data
const CREATOR_DATA = {
  id: "luna",
  name: "Luna Live",
  username: "luna_live",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
  banner: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=400&fit=crop",
  bio: "Welcome to my world! 🌙 Exclusive backstage access, daily vlogs, and spicy photoshoots. Join the inner circle and let's create something beautiful together.",
  followers: 125400,
  isVerified: true,
  isLive: true,
  socials: { twitter: "luna_live", instagram: "lunalive" },
  location: "Los Angeles, CA",
  website: "lunalive.io",
  subscription: {
      price: 14.99,
      bundle3Month: 35.97, // 20% off
      benefits: ["Daily exclusive posts", "Direct messaging priority", "Behind the scenes access", "Custom requests access"]
  }
};

const MOCK_POSTS = [
  {
    id: "p1",
    creator: { id: CREATOR_DATA.id, name: CREATOR_DATA.name, username: CREATOR_DATA.username, avatar: CREATOR_DATA.avatar, isVerified: CREATOR_DATA.isVerified },
    content: {
      text: "Feeling great today! ☀️ Here's a little sneak peek from today's shoot.",
      media: [{ type: 'image', url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop", isLocked: false }]
    },
    stats: { likes: 1240, comments: 85, tips: 120 },
    timestamp: "2h ago",
    isLiked: true,
    type: 'free'
  },
  {
    id: "p2",
    creator: { id: CREATOR_DATA.id, name: CREATOR_DATA.name, username: CREATOR_DATA.username, avatar: CREATOR_DATA.avatar, isVerified: CREATOR_DATA.isVerified },
    content: {
      text: "FULL video from last night is up! 🎥 This one is wild. Unlock to watch.",
      media: [{ type: 'video', url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=1000&fit=crop", isLocked: true }]
    },
    stats: { likes: 850, comments: 42, tips: 15 },
    timestamp: "5h ago",
    isLiked: false,
    type: 'ppv'
  },
  {
    id: "p3",
    creator: { id: CREATOR_DATA.id, name: CREATOR_DATA.name, username: CREATOR_DATA.username, avatar: CREATOR_DATA.avatar, isVerified: CREATOR_DATA.isVerified },
    content: {
      text: "Subscribers only: My morning routine ☕️",
      media: [{ type: 'image', url: "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?w=800&h=1000&fit=crop", isLocked: true }]
    },
    stats: { likes: 3200, comments: 145, tips: 50 },
    timestamp: "1d ago",
    isLiked: false,
    type: 'sub'
  }
] as const;

export default function CreatorProfilePage() {
  const { id } = useParams();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [filter, setFilter] = useState<'all' | 'free' | 'sub' | 'ppv'>('all');

  const filteredPosts = MOCK_POSTS.filter(post => {
      if (filter === 'all') return true;
      if (filter === 'free') return post.type === 'free';
      if (filter === 'sub') return post.type === 'sub';
      if (filter === 'ppv') return post.type === 'ppv';
      return true;
  });

  return (
    <MainLayout>
      <div className="min-h-screen pb-20 bg-[#050508] relative overflow-hidden">
        
        {/* Dynamic Space Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-[800px] bg-gradient-to-b from-violet-600/[0.04] to-transparent -z-10" />
           <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-fuchsia-600/[0.03] rounded-full blur-[120px] -z-10 animate-pulse" />
        </div>

        {/* Hero / Banner Area */}
        <div className="relative h-[320px] md:h-[450px] w-full group overflow-hidden">
           <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              src={CREATOR_DATA.banner} 
              alt="Banner" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/20 to-transparent" />
           <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
           
           {/* Top Right Actions */}
           <div className="absolute top-8 right-8 flex items-center gap-4 z-20">
               <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-violet-600 transition-all shadow-2xl">
                   <Share2 className="h-5 w-5" />
               </Button>
               <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-violet-600 transition-all shadow-2xl">
                   <Bell className="h-5 w-5" />
               </Button>
           </div>

           {/* Live Indicator on Banner */}
           {CREATOR_DATA.isLive && (
               <div className="absolute bottom-12 right-8 z-20">
                    <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-red-600/20 backdrop-blur-xl border border-red-500/30 shadow-2xl animate-in slide-in-from-right-10 duration-500">
                        <Radio className="h-4 w-4 text-red-500 animate-pulse" />
                        <span className="text-xs font-black text-red-500 uppercase tracking-[0.3em]">Live Feed Active</span>
                    </div>
               </div>
           )}
        </div>

        <div className="max-w-[1300px] mx-auto px-6 relative -mt-40 md:-mt-52 z-30">
            {/* Split Layout */}
            <div className="flex flex-col lg:flex-row gap-10">
                
                {/* Profile Core Data Column */}
                <div className="flex-1 space-y-10">
                    <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
                            {/* Avatar Design */}
                            <motion.div 
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="relative shrink-0"
                            >
                                <div className="absolute inset-0 bg-violet-600/30 blur-2xl rounded-[2.5rem] -z-10 animate-pulse" />
                                <div className="h-32 w-32 md:h-44 md:w-44 rounded-[2.5rem] p-1 bg-gradient-to-br from-violet-600/50 via-white/10 to-fuchsia-600/50 overflow-hidden shadow-2xl">
                                    <img src={CREATOR_DATA.avatar} alt={CREATOR_DATA.name} className="w-full h-full object-cover rounded-[2.3rem] border-2 border-[#0a0a0f]" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-[#0a0a0f] border-4 border-[#0a0a0f] rounded-full shadow-2xl flex items-center justify-center">
                                    <div className="h-2.5 w-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                </div>
                            </motion.div>

                            {/* Identity Header */}
                            <div className="flex-1 space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-4 flex-wrap">
                                        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic">
                                            {CREATOR_DATA.name}
                                        </h1>
                                        {CREATOR_DATA.isVerified && (
                                            <div className="h-7 w-7 bg-violet-600 rounded-xl flex items-center justify-center shadow-xl shadow-violet-500/20 transform -rotate-12">
                                                <CheckCircle2 className="h-4 w-4 text-white" />
                                            </div>
                                        )}
                                        <div className="bg-white/5 border border-white/5 px-4 py-1.5 rounded-full flex items-center gap-2">
                                            <Zap className="h-3.5 w-3.5 text-violet-400" />
                                            <span className="text-[9px] font-black text-white/60 uppercase tracking-widest">Top 0.1% Creator</span>
                                        </div>
                                    </div>
                                    <p className="text-xs font-black text-white/30 uppercase tracking-[0.4em]">Node Address // {CREATOR_DATA.username}</p>
                                </div>

                                <p className="text-white/60 leading-relaxed max-w-xl text-base font-medium">
                                    {CREATOR_DATA.bio}
                                </p>

                                <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-2.5 hover:text-white/60 transition-colors cursor-pointer">
                                        <MapPin className="h-4 w-4 text-violet-500" /> {CREATOR_DATA.location}
                                    </div>
                                    <div className="flex items-center gap-2.5 hover:text-white/60 transition-colors cursor-pointer">
                                        <Globe className="h-4 w-4 text-violet-500" /> {CREATOR_DATA.website}
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <ShieldCheck className="h-4 w-4 text-violet-500" /> Identity Synced
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-white/5">
                            {[
                                { icon: Users, label: "Network Fans", value: "125,400", color: "text-violet-500" },
                                { icon: Heart, label: "Signal Likes", value: "840,241", color: "text-fuchsia-500" },
                                { icon: Video, label: "Data Nodes", value: "342", color: "text-blue-500" },
                                { icon: TrendingUp, label: "Global Rank", value: "#12", color: "text-emerald-500" }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 text-center hover:bg-white/5 transition-all group/stat relative overflow-hidden">
                                    <div className={cn("absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/5 opacity-0 group-hover/stat:opacity-100 transition-opacity")} />
                                    <stat.icon className={cn("h-5 w-5 mx-auto mb-3 opacity-20", stat.color)} />
                                    <p className="text-[9px] font-black uppercase text-white/20 tracking-[0.3em] mb-1">{stat.label}</p>
                                    <p className="text-2xl font-black text-white tracking-tight">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Feed Filter and Content */}
                    <div className="space-y-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-4">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center">
                                    <Signal className="h-5 w-5 text-violet-500" />
                                </div>
                                <h2 className="text-xl font-black text-white uppercase tracking-[0.2em] italic">Transmission Feed</h2>
                            </div>
                            <div className="flex items-center bg-[#0a0a0f] p-1.5 rounded-2xl border border-white/5 overflow-x-auto scrollbar-hide shadow-inner">
                                {(['all', 'free', 'sub', 'ppv'] as const).map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={cn(
                                            "px-6 py-2.5 rounded-xl text-[10px] font-black transition-all whitespace-nowrap uppercase tracking-[0.2em]",
                                            filter === f 
                                                ? "bg-violet-600 text-white shadow-xl shadow-violet-500/30" 
                                                : "text-white/20 hover:text-white"
                                        )}
                                    >
                                        {f === 'all' ? 'All' : f === 'sub' ? 'Club' : f === 'ppv' ? 'Elite' : 'Open'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-10">
                            <AnimatePresence mode="popLayout">
                                {filteredPosts.map((post, idx) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <PostCard post={post as any} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Right Column: Premium Vault Card */}
                <aside className="w-full lg:w-[420px] space-y-8">
                    <div className="bg-[#0a0a0f] backdrop-blur-3xl border border-white/5 rounded-[3.5rem] p-10 shadow-3xl relative overflow-hidden lg:sticky lg:top-24 group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/[0.08] rounded-full blur-[100px] -mr-32 -mt-32 transition-all group-hover:bg-violet-600/[0.12]" />
                        
                        <div className="relative space-y-10">
                            <div className="flex flex-col items-center text-center space-y-2">
                                <div className="h-14 w-14 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mb-4">
                                    <Shield className="h-6 w-6 text-violet-500" />
                                </div>
                                <h3 className="text-[11px] font-black text-violet-400 uppercase tracking-[0.5em]">Fan Vault Protocol</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-6xl font-black text-white tracking-tighter italic">${CREATOR_DATA.subscription.price}</span>
                                    <span className="text-[11px] font-black text-white/20 uppercase tracking-[0.3em]">/ MONTH</span>
                                </div>
                            </div>

                            <div className="space-y-5 py-8 border-y border-white/5">
                                {CREATOR_DATA.subscription.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-center gap-4 group/item">
                                        <div className="h-6 w-6 rounded-lg bg-violet-600/10 border border-violet-500/10 flex items-center justify-center shrink-0 group-hover/item:border-violet-500 transition-colors">
                                            <Sparkles className="h-3 w-3 text-violet-500" />
                                        </div>
                                        <span className="text-sm font-bold text-white/50 group-hover/item:text-white transition-colors tracking-tight">{benefit}</span>
                                    </li>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <Button 
                                    className="w-full h-16 bg-violet-600 hover:bg-violet-700 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-2xl shadow-violet-500/20 transition-all active:scale-95 border-none group"
                                    onClick={() => setIsSubscribed(!isSubscribed)}
                                >
                                    {isSubscribed ? "EXTEND PROTOCOL" : "UNSEAL THE VAULT"}
                                    <Zap className="h-4 w-4 ml-3 group-hover:fill-current" />
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    className="w-full h-16 text-white/40 hover:text-white hover:bg-white/5 font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl transition-all border border-transparent hover:border-white/5"
                                >
                                    <MessageCircle className="h-4 w-4 mr-3" /> SIGNAL CREATOR
                                </Button>
                            </div>

                            <div className="text-center pt-2">
                                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/[0.02] border border-white/5">
                                    <ShieldCheck className="h-3 w-3 text-emerald-500" />
                                    <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em]">SECURE CHAIN ENCRYPTED</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Elite Offer Card */}
                    <div className="bg-gradient-to-br from-[#1a1a24] to-[#0a0a0f] border border-white/5 rounded-[3.5rem] p-10 shadow-3xl relative overflow-hidden group hover:scale-[1.02] transition-all cursor-pointer">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-[60px] -mr-20 -mt-20 group-hover:bg-emerald-500/10 transition-all" />
                        <div className="relative space-y-6">
                            <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em]">ELITE PASS</h4>
                                <div className="bg-emerald-500/10 text-emerald-400 text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-500/20">
                                    SIGNAL GAIN +20%
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-2xl font-black text-white uppercase italic tracking-tight">Full Epoch Access</p>
                                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">90 Days Continuous Signal</p>
                            </div>
                            <div className="flex items-end justify-between pt-4">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-white/20 line-through uppercase tracking-widest">$44.97</span>
                                    <span className="text-4xl font-black text-white tracking-tighter">$35.97</span>
                                </div>
                                <Button className="h-12 w-12 rounded-xl bg-white text-black hover:bg-white/90 border-none">
                                    <ChevronRight className="h-6 w-6" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
      </div>
    </MainLayout>
  );
}
