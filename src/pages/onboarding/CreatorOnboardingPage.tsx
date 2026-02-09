import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  Video,
  DollarSign,
  User,
  Image as ImageIcon,
  CheckCircle2,
  Upload,
  Camera,
  Sparkles,
  Zap,
  Gift,
  ShieldCheck,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function CreatorOnboardingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({
      displayName: user?.name || "",
      bio: "",
      category: "",
      avatar: null as File | null
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      localStorage.setItem(`onboarding_${user?.id}`, 'completed');
      navigate("/studio/dashboard");
      toast.success("Identity Established! Welcome to the Studio.", {
        icon: <Sparkles className="h-4 w-4 text-primary" />,
        style: { background: '#0f0f14', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }
      });
    }
  };

  const categories = ["Gaming", "Music", "Art", "Lifestyle", "Tech", "Education"];

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-fuchsia-600/10 rounded-full blur-[120px]" />
        <div className="cosmos-ambient opacity-30" />
      </div>

       <div className="w-full max-w-2xl z-10">
          
          <div className="text-center mb-12">
              <Link to="/" className="inline-flex items-center gap-4 group mb-8">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-2xl shadow-violet-500/20 group-hover:scale-105 transition-transform">
                      <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left font-black">
                      <span className="text-xl text-white uppercase tracking-[0.2em] leading-none">Creator Setup</span>
                      <p className="text-[10px] text-violet-400 uppercase tracking-widest leading-none mt-1">Fans on Chain Node</p>
                  </div>
              </Link>
          </div>

          <div className="bg-white/[0.03] border border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
             
             {/* Progress Pipeline */}
             <div className="flex items-center justify-between mb-12 relative">
                 <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-white/5 -z-10" />
                 <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-violet-600 -z-10 transition-all duration-700 shadow-[0_0_10px_rgba(139,92,246,0.5)]" style={{ width: `${((step - 1) / 2) * 100}%` }} />
                 
                 {[ 
                    { id: 1, label: "Identity", icon: User },
                    { id: 2, label: "Stream", icon: Video },
                    { id: 3, label: "Economy", icon: DollarSign }
                 ].map((s) => (
                     <div key={s.id} className="flex flex-col items-center gap-3">
                         <div className={cn(
                             "h-12 w-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 bg-[#050508] shadow-xl",
                             step >= s.id ? "border-violet-600 text-violet-400 scale-110" : "border-white/5 text-white/20"
                         )}>
                             <s.icon className="h-5 w-5" />
                         </div>
                         <span className={cn("text-[9px] font-black uppercase tracking-[0.2em]", step >= s.id ? "text-white" : "text-white/20")}>
                             {s.label}
                         </span>
                     </div>
                 ))}
             </div>

             <AnimatePresence mode="wait">
                 {/* Step 1: Profile Setup */}
                 {step === 1 && (
                     <motion.div 
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                     >
                         <div className="flex flex-col items-center justify-center gap-4">
                             <div className="h-32 w-32 rounded-[2.5rem] bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center cursor-pointer hover:border-violet-500/50 hover:bg-white/10 transition-all relative group overflow-hidden shadow-2xl">
                                 <Camera className="h-10 w-10 text-white/20 group-hover:text-white/60 transition-colors" />
                                 <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                                 <div className="absolute inset-0 bg-violet-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                             </div>
                             <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Upload Profile Signature</span>
                         </div>

                         <div className="space-y-6">
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Creator Name</Label>
                                <Input 
                                    value={profileData.displayName} 
                                    onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                                    placeholder="Your Public Alias" 
                                    className="bg-white/5 border-white/5 h-14 rounded-2xl focus:border-violet-500/50 focus:ring-violet-500/20 transition-all px-6 font-medium"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Bio / Manifest</Label>
                                <Textarea 
                                    value={profileData.bio} 
                                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                                    placeholder="Briefly describe your content ecosystem..." 
                                    className="bg-white/5 border-white/5 min-h-[120px] rounded-2xl focus:border-violet-500/50 focus:ring-violet-500/20 transition-all px-6 py-4 font-medium"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Primary Dimension</Label>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setProfileData({...profileData, category: cat})}
                                            className={cn(
                                                "px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                                                profileData.category === cat 
                                                    ? "bg-violet-600 text-white border-violet-500 shadow-lg shadow-violet-500/20" 
                                                    : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                                            )}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                         </div>
                     </motion.div>
                 )}

                 {/* Step 2: Content Strategy */}
                 {step === 2 && (
                     <motion.div 
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                     >
                         <div className="text-center mb-8">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Service Selection</h3>
                            <p className="text-sm text-white/40 font-medium">Identify your primary methods of engagement.</p>
                         </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             {[
                                 { icon: Video, color: "text-violet-500", bg: "bg-violet-500", title: "Live Protocol", desc: "Real-time stream sync." },
                                 { icon: Upload, color: "text-blue-500", bg: "bg-blue-500", title: "Deep Content", desc: "High-fidelity VODs." },
                                 { icon: ImageIcon, color: "text-fuchsia-500", bg: "bg-fuchsia-500", title: "Static Posts", desc: "Digital narratives." },
                                 { icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500", title: "Premium PPV", desc: "High-value unlocks." }
                             ].map((item, i) => (
                                 <div key={i} className="p-6 rounded-[2rem] border border-white/5 bg-white/5 hover:border-violet-500/30 cursor-pointer transition-all group relative">
                                     <div className="flex items-center justify-between mb-4">
                                         <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center bg-opacity-10", item.bg)}>
                                            <item.icon className={cn("h-5 w-5", item.color)} />
                                         </div>
                                         <div className="h-5 w-5 rounded-full border border-white/10 flex items-center justify-center transition-colors group-hover:border-violet-500/50">
                                            <div className="h-2 w-2 rounded-full bg-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                         </div>
                                     </div>
                                     <h4 className="font-black text-white uppercase tracking-widest text-[10px]">{item.title}</h4>
                                     <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1">{item.desc}</p>
                                 </div>
                             ))}
                         </div>
                     </motion.div>
                 )}

                 {/* Step 3: Monetization education */}
                 {step === 3 && (
                     <motion.div 
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                     >
                         <div className="text-center mb-8">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Economic Engine</h3>
                            <p className="text-sm text-white/40 font-medium">Direct realization of value through multiple channels.</p>
                         </div>

                         <div className="space-y-4">
                             {[
                                 { icon: Sparkles, color: "text-violet-500", bg: "bg-violet-500/10", title: "Subscriptions", desc: "Automated recurring capital from your fans." },
                                 { icon: Video, color: "text-fuchsia-500", bg: "bg-fuchsia-500/10", title: "Premium Unlock", desc: "On-demand access for exclusive media." },
                                 { icon: Gift, color: "text-blue-500", bg: "bg-blue-500/10", title: "Protocol Tips", desc: "Instant value transfer during live sync." }
                             ].map((item, i) => (
                                 <div key={i} className="flex gap-5 items-start p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/[0.07] transition-all group">
                                     <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg", item.bg)}>
                                         <item.icon className={cn("h-6 w-6", item.color)} />
                                     </div>
                                     <div>
                                         <h4 className="font-black text-white uppercase tracking-widest text-[10px] mb-1">{item.title}</h4>
                                         <p className="text-xs text-white/40 leading-relaxed font-medium">{item.desc}</p>
                                     </div>
                                 </div>
                             ))}
                         </div>
                     </motion.div>
                 )}
             </AnimatePresence>

             <div className="pt-12 flex justify-between border-t border-white/5 mt-8">
                 <Button 
                    variant="ghost" 
                    onClick={() => setStep(step - 1)}
                    disabled={step === 1}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-white hover:bg-transparent"
                 >
                     Previous
                 </Button>
                 <Button 
                    onClick={handleNext} 
                    className="bg-violet-600 hover:bg-violet-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl h-14 px-10 shadow-xl shadow-violet-500/20 transition-all active:scale-[0.98] border-none group"
                 >
                     {step === 3 ? "Access Studio" : "Next Phase"}
                     {step !== 3 && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                 </Button>
             </div>

          </div>
       </div>
    </div>
  );
}
