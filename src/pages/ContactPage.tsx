import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Phone, Globe, Shield, Sparkles, Send, ArrowRight, User, AtSign, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ContactInfoCard = ({ icon: Icon, title, value, label }: any) => (
  <div className="flex gap-6 p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 group hover:bg-white/[0.05] transition-all duration-500">
    <div className="h-12 w-12 rounded-2xl bg-violet-600/10 flex items-center justify-center shrink-0 group-hover:bg-violet-600 group-hover:text-white transition-all duration-500">
      <Icon className="h-5 w-5 text-violet-400 group-hover:text-white transition-colors" />
    </div>
    <div className="space-y-1">
      <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">{label}</p>
      <h4 className="text-sm font-black text-white uppercase tracking-wider">{title}</h4>
      <p className="text-sm font-medium text-white/60">{value}</p>
    </div>
  </div>
);

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Transmission Received", {
        description: "Your signal has been encrypted and sent to our response team.",
        style: { background: '#0f0f14', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }
    });
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#050508] relative overflow-hidden pb-20">
        
        {/* Ambient Atmosphere */}
        <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-blue-600/[0.05] to-transparent -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-fuchsia-600/[0.05] to-transparent -z-10 pointer-events-none" />
        
        <div className="container max-w-6xl py-12 sm:py-20 px-4 sm:px-6 relative">
          
          <div className="grid lg:grid-cols-12 gap-16 items-start">
             
             {/* Left Side: Info */}
             <div className="lg:col-span-5 space-y-12">
                <div className="space-y-4">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-600/10 border border-violet-500/20"
                    >
                        <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                        <span className="text-[10px] font-black text-violet-300 uppercase tracking-[0.2em]">Live Response Protocol</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-[1.1] uppercase"
                    >
                        Establish <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400">Connection.</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-white/40 max-w-sm font-medium leading-relaxed"
                    >
                        Need assistance with your node or vault? Our specialized envoys are standing by.
                    </motion.p>
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="grid gap-4"
                >
                    <ContactInfoCard label="Transmission" title="Digital Mail" value="envoys@fansoonchain.com" icon={Mail} />
                    <ContactInfoCard label="Infrastructure" title="Global HQ" value="Nexus Tower, Block 9, Cyber Domain" icon={Globe} />
                    <ContactInfoCard label="Live Assist" title="Emergency Uplink" value="+1 (555) NXS-VLT" icon={Phone} />
                </motion.div>

                <div className="p-8 rounded-[2rem] bg-violet-600/5 border border-violet-500/10 space-y-4">
                    <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-violet-400" />
                        <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Active Security</h4>
                    </div>
                    <p className="text-xs text-white/30 font-medium leading-relaxed uppercase tracking-wide">
                        All transmissions are end-to-end encrypted with RSA-4096. Your identity and signal origin are protected by the FOC safety guard.
                    </p>
                </div>
             </div>

             {/* Right Side: Form */}
             <div className="lg:col-span-7">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 sm:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
                    
                    <div className="mb-10 space-y-2">
                        <h2 className="text-2xl font-black text-white uppercase tracking-tight">Signal Input</h2>
                        <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em]">Decrypt your message below</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/50 ml-1">Identity Name</label>
                                <div className="relative group/field">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within/field:text-violet-500 transition-colors" />
                                    <Input 
                                        placeholder="Full Identity" 
                                        className="h-14 bg-black/40 border-white/5 focus:border-violet-500/50 focus:ring-violet-500/10 rounded-2xl pl-12 text-white placeholder:text-white/10 transition-all font-bold text-sm"
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/50 ml-1">Transmission Email</label>
                                <div className="relative group/field">
                                    <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within/field:text-violet-500 transition-colors" />
                                    <Input 
                                        type="email"
                                        placeholder="nexus@id.com" 
                                        className="h-14 bg-black/40 border-white/5 focus:border-violet-500/50 focus:ring-violet-500/10 rounded-2xl pl-12 text-white placeholder:text-white/10 transition-all font-bold text-sm"
                                        required 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/50 ml-1">Signal Category</label>
                            <select className="flex h-14 w-full rounded-2xl border border-white/5 bg-black/40 px-6 py-2 text-sm font-bold text-white focus:outline-none focus:border-violet-500/50 transition-all appearance-none cursor-pointer hover:bg-white/5">
                                <option className="bg-[#050508]">TECHNICAL ASSISTANCE</option>
                                <option className="bg-[#050508]">VAULT / WALLET ISSUES</option>
                                <option className="bg-[#050508]">AGENCY PARTNERSHIPS</option>
                                <option className="bg-[#050508]">SAFETY & COMPLIANCE</option>
                                <option className="bg-[#050508]">OTHER TRANSMISSIONS</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/50 ml-1">Encrypted Message</label>
                            <div className="relative group/field">
                                <FileText className="absolute left-4 top-6 h-4 w-4 text-white/20 group-focus-within/field:text-violet-500 transition-colors" />
                                <Textarea 
                                    placeholder="Input your signal data here..." 
                                    className="min-h-[160px] bg-black/40 border-white/5 focus:border-violet-500/50 focus:ring-violet-500/10 rounded-[2rem] pl-12 py-6 text-white placeholder:text-white/10 transition-all font-medium text-sm leading-relaxed"
                                    required 
                                />
                            </div>
                        </div>

                        <Button size="lg" className="w-full h-16 bg-violet-600 hover:bg-violet-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-violet-500/30 border-none transition-all active:scale-95 group mt-4">
                            Establish Uplink
                            <Send className="h-4 w-4 ml-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <div className="inline-flex items-center gap-3 text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">
                           <span className="h-px w-8 bg-white/10" />
                           Priority Response: 12H Average
                           <span className="h-px w-8 bg-white/10" />
                        </div>
                    </div>
                </motion.div>
             </div>
          </div>

          <div className="text-center pt-20">
             <p className="text-[8px] font-black text-white/10 uppercase tracking-[0.5em]">Fans on Chain Limited Communications Layer / Secure-ID: 772-NX</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
