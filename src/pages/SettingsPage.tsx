import { useState } from "react";
import { 
  Upload, Pencil, Lock, Shield, Smartphone, Mail, Bell, CreditCard, 
  Globe, Laptop, Key, Plus, Trash2, CheckCircle2, AlertCircle,
  Zap, Settings, ShieldCheck, Sparkles, User, Box, Signal, LockIcon
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const handleSave = () => {
    toast.success("Identity Matrix Updated", {
        style: { background: '#0a0a0f', border: '1px solid rgba(139,92,246,0.3)', color: 'white' }
    });
  };

  const handleConnect = (platform: string) => {
    toast.info(`Initializing uplink to ${platform}...`);
  };

  const menuItems = [
    { id: "profile", label: "Identity", icon: User },
    { id: "security", label: "Shield", icon: Lock },
    { id: "preferences", label: "Matrix", icon: Settings },
    { id: "notifications", label: "Signals", icon: Bell },
    { id: "connections", label: "Uplinks", icon: Signal },
    { id: "developer", label: "Terminal", icon: Key },
    { id: "payment-methods", label: "Credits", icon: CreditCard },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#050508] relative overflow-hidden pb-20">
        
        {/* Dynamic Space Background */}
        <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-violet-600/[0.04] to-transparent -z-10" />
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-violet-600/[0.03] rounded-full blur-[120px] -z-10 animate-pulse" />

        <div className="container py-12 px-6 max-w-6xl space-y-12 relative z-10">
          
          {/* Enhanced Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
             <div className="space-y-3">
                <div className="flex items-center gap-3">
                   <div className="h-10 w-10 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                       <Settings className="h-5 w-5 text-white" />
                   </div>
                   <h1 className="text-4xl font-black text-white uppercase tracking-tight italic">Core Config</h1>
                </div>
                <p className="text-sm font-medium text-white/40 italic">Manage your interface parameters and node security protocols.</p>
             </div>
             
             <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <ShieldCheck className="h-4 w-4 text-violet-500" />
                <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Integrity Level: MAXIMUM</span>
             </div>
          </div>
          
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full space-y-12">
            <div className="border-b border-white/5 pb-1">
                <TabsList className="h-auto bg-transparent p-0 gap-8 w-full justify-start rounded-none overflow-x-auto scrollbar-hide">
                    {menuItems.map((item) => (
                    <TabsTrigger 
                        key={item.id}
                        value={item.id}
                        className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-violet-500 rounded-none px-0 pb-5 text-[10px] font-black text-white/20 uppercase tracking-[0.3em] transition-all hover:text-white relative group"
                    >
                        <item.icon className="h-3.5 w-3.5 mr-2 opacity-20 group-hover:opacity-100 transition-opacity" />
                        {item.label}
                        {activeTab === item.id && (
                            <motion.div layoutId="activeSettingsTab" className="absolute bottom-0 left-0 right-0 h-1 bg-violet-600 rounded-t-full" />
                        )}
                    </TabsTrigger>
                    ))}
                </TabsList>
            </div>

            <AnimatePresence mode="wait">
                {/* PROFILE TAB */}
                <TabsContent value="profile" className="space-y-12 focus-visible:outline-none">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-10"
                    >
                        <div className="lg:col-span-2 space-y-10">
                            <section className="space-y-6">
                                <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
                                    <User className="h-4 w-4 text-violet-500" />
                                    Identity Profile
                                </h3>
                                <div className="bg-[#0a0a0f] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl relative group overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-600/30 to-transparent" />
                                    <div className="flex flex-col sm:flex-row items-center gap-10 relative z-10">
                                        <div className="relative group/avatar">
                                            <div className="absolute inset-0 bg-violet-600/20 blur-xl rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity" />
                                            <div className="h-32 w-32 rounded-[2rem] p-1 bg-gradient-to-br from-violet-600/20 via-white/5 to-fuchsia-600/20 transition-transform group-hover/avatar:scale-105">
                                                <Avatar className="h-full w-full rounded-[1.8rem] border-2 border-[#0a0a0f] shadow-2xl">
                                                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                                                    <AvatarFallback className="bg-violet-600 text-white font-black">AN</AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <Button size="icon" className="absolute -bottom-2 -right-2 h-10 w-10 rounded-xl bg-violet-600 hover:bg-violet-700 text-white border-none shadow-xl shadow-violet-500/20">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="flex-1 space-y-4 text-center sm:text-left">
                                            <div className="space-y-1">
                                                <p className="text-2xl font-black text-white uppercase tracking-tighter italic">{username}</p>
                                                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Primary Node Identifier</p>
                                            </div>
                                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                                                <div className="bg-white/5 px-4 py-2 rounded-xl flex items-center gap-2">
                                                    <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                                                    <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Master Identity</span>
                                                </div>
                                                <div className="bg-white/5 px-4 py-2 rounded-xl flex items-center gap-2">
                                                    <Signal className="h-3.5 w-3.5 text-emerald-500" />
                                                    <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Broadcast Ready</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-6">
                                <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
                                    <Box className="h-4 w-4 text-violet-500" />
                                    Visual Overlays
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] p-8 space-y-6 relative group overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/[0.02] to-transparent pointer-events-none" />
                                        <div className="space-y-2">
                                            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Signal Banner</h4>
                                            <p className="text-[9px] font-medium text-white/20 uppercase tracking-widest">Appears on your main profile node</p>
                                        </div>
                                        <div className="w-full h-24 rounded-[1.5rem] bg-violet-600/10 border border-white/5 overflow-hidden flex items-center justify-center relative">
                                            <div className="absolute inset-0 opacity-40 grayscale" 
                                                style={{
                                                backgroundImage: 'linear-gradient(45deg, #0a0a0f 25%, transparent 25%), linear-gradient(-45deg, #0a0a0f 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #0a0a0f 75%), linear-gradient(-45deg, transparent 75%, #0a0a0f 75%)',
                                                backgroundSize: '20px 20px',
                                                backgroundColor: '#8b5cf6' 
                                                }} 
                                            />
                                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white relative z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Upload className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] p-8 space-y-6 relative group overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600/[0.02] to-transparent pointer-events-none" />
                                        <div className="space-y-2">
                                            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Idle Loop Overlay</h4>
                                            <p className="text-[9px] font-medium text-white/20 uppercase tracking-widest">Displayed when transmission is offline</p>
                                        </div>
                                        <div className="w-full h-24 rounded-[1.5rem] bg-black border border-white/5 overflow-hidden flex items-center justify-center relative">
                                            <div className="absolute inset-0 bg-[#0f0f14] flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <h1 className="text-3xl font-black text-white/5 tracking-tighter uppercase italic">Offline</h1>
                                            </div>
                                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white relative z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Upload className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <aside className="space-y-8">
                            <div className="bg-gradient-to-br from-violet-600/10 to-transparent border border-violet-500/20 rounded-[2.5rem] p-8 space-y-8 relative overflow-hidden group shadow-2xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/20 rounded-full blur-[60px] -mr-16 -mt-16" />
                                <div className="space-y-2 relative z-10">
                                    <h4 className="text-[10px] font-black text-violet-400 uppercase tracking-[0.4em]">Protocol Status</h4>
                                    <p className="text-xl font-black text-white italic tracking-tight leading-none uppercase">Identity Fully Synced</p>
                                </div>
                                <div className="space-y-6 relative z-10">
                                    {[
                                        { label: "Biometrics", status: "Active" },
                                        { label: "Chain Link", status: "Encrypted" },
                                        { label: "Node Visibility", status: "Public" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{item.label}</span>
                                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-full">{item.status}</span>
                                        </div>
                                    ))}
                                </div>
                                <Button onClick={handleSave} className="w-full h-14 bg-violet-600 hover:bg-violet-700 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-violet-500/30 transition-all active:scale-95 border-none group">
                                    SAVE PARAMETERS
                                    <Zap className="h-3.5 w-3.5 ml-2 group-hover:fill-current" />
                                </Button>
                            </div>

                            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 text-center space-y-4 opacity-40">
                                <Shield className="h-8 w-8 text-white/10 mx-auto" />
                                <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] leading-relaxed">
                                    This node is encrypted via <br/> SEC-CHAIN Protocol v4.0
                                </p>
                            </div>
                        </aside>
                    </motion.div>
                </TabsContent>

                {/* SECURITY TAB */}
                <TabsContent value="security" className="space-y-8 focus-visible:outline-none">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        <Card className="bg-[#0a0a0f] border-white/5 rounded-[2.5rem] overflow-hidden group">
                           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                           <CardHeader className="p-8 pb-4">
                                <CardTitle className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-white">
                                    <Lock className="h-4 w-4 text-violet-500" />
                                    Access Protocol
                                </CardTitle>
                           </CardHeader>
                           <CardContent className="p-8 pt-0 space-y-8">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Current Key</Label>
                                        <Input type="password" placeholder="••••••••" className="h-12 bg-white/5 border-white/10 rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">New Access Key</Label>
                                        <Input type="password" placeholder="Min. 12 characters recommended" className="h-12 bg-white/5 border-white/10 rounded-xl" />
                                    </div>
                                </div>
                                <Button className="w-full h-12 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all">UPDATE ACCESS</Button>
                           </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-violet-600/10 to-[#0a0a0f] border-violet-500/20 rounded-[2.5rem] overflow-hidden group">
                           <CardHeader className="p-8 pb-4">
                                <CardTitle className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-white">
                                    <Shield className="h-4 w-4 text-violet-500" />
                                    Biometric 2FA
                                </CardTitle>
                           </CardHeader>
                           <CardContent className="p-8 pt-0 space-y-12">
                                <p className="text-xs font-medium text-white/40 leading-relaxed">
                                    Add an extra identity layer to your node. Requires cryptographic confirmation for every new session initialization.
                                </p>
                                <div className="flex items-center justify-between p-6 bg-white/[0.03] border border-white/5 rounded-3xl">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-2xl bg-violet-600/20 flex items-center justify-center">
                                            <Smartphone className="h-6 w-6 text-violet-400" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-white uppercase tracking-widest">Mobile Sync</p>
                                            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">NOT ACTIVE</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="h-10 rounded-xl font-black text-[9px] uppercase tracking-widest border-white/10 hover:bg-violet-600 hover:text-white hover:border-violet-600">INITIALIZE</Button>
                                </div>
                           </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>
            </AnimatePresence>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
