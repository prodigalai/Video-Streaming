import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  Users,
  BarChart2,
  Lock,
  ShieldCheck,
  Briefcase,
  CheckCircle2,
  Sparkles,
  Zap,
  Shield,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function AgentOnboardingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      localStorage.setItem(`onboarding_${user?.id}`, 'completed');
      navigate("/studio/dashboard");
      toast.success("Agency Terminal Established!", {
        icon: <Briefcase className="h-4 w-4 text-primary" />,
        style: { background: '#0f0f14', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] bg-violet-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="cosmos-ambient opacity-30" />
      </div>

       <div className="w-full max-w-[1000px] z-10 grid md:grid-cols-5 bg-white/[0.03] border border-white/10 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[600px] relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
          
          {/* Left Sidebar - Navigation & Status */}
          <div className="hidden md:flex md:col-span-2 bg-black/40 p-10 flex-col justify-between border-r border-white/5 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-violet-600/[0.02] pointer-events-none" />
             
             <div className="relative z-10">
                 <div className="h-14 w-14 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                     <Briefcase className="h-7 w-7 text-white" />
                 </div>
                 <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Agency <br/> Portal</h2>
                 <p className="text-sm text-white/40 leading-relaxed max-w-[200px] font-medium uppercase tracking-wider">Establish your talent empire on the chain.</p>
             </div>

             <div className="space-y-6 relative z-10">
                 {[ 
                    { id: 1, label: "Operational Rights", icon: Shield },
                    { id: 2, label: "Talent Roster", icon: Users },
                    { id: 3, label: "Agency Terminal", icon: Target }
                 ].map((s) => (
                     <div key={s.id} className="flex items-center gap-4 group">
                         <div className={cn(
                             "h-8 w-8 rounded-xl flex items-center justify-center text-xs font-black border transition-all duration-500 shadow-lg",
                             step >= s.id ? "bg-violet-600 border-violet-500 text-white" : "border-white/10 text-white/30 bg-white/5"
                         )}>
                             {step > s.id ? <CheckCircle2 className="h-4 w-4" /> : s.id}
                         </div>
                         <div className="flex flex-col">
                             <span className={cn("text-[10px] uppercase tracking-[0.2em] font-black transition-colors", step === s.id ? "text-violet-400" : "text-white/20")}>Phase 0{s.id}</span>
                             <span className={cn("text-xs font-bold uppercase tracking-widest", step === s.id ? "text-white" : "text-white/40")}>
                                {s.label}
                             </span>
                         </div>
                     </div>
                 ))}
             </div>
             
             <div className="pt-10 border-t border-white/5 relative z-10">
                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20">
                    Fans on Chain / Agent Protocol 1.2
                </p>
             </div>
          </div>

          {/* Right Main Content */}
          <div className="col-span-1 md:col-span-3 p-10 md:p-14 flex flex-col relative overflow-hidden">
             
             <div className="flex-1 flex flex-col justify-center relative z-10">
                 <AnimatePresence mode="wait">
                     {step === 1 && (
                         <motion.div 
                            key="step1"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-8"
                         >
                             <div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3">Management Authority</h3>
                                <p className="text-white/40 text-sm leading-relaxed">Agents act as primary operators for creators, facilitating growth and operational excellence.</p>
                             </div>
                             
                             <div className="grid gap-4">
                                 <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:border-violet-500/20 transition-all group">
                                     <div className="flex items-center gap-4 mb-3">
                                         <div className="h-10 w-10 bg-violet-600/10 rounded-xl flex items-center justify-center group-hover:bg-violet-600/20 transition-colors">
                                             <ShieldCheck className="h-5 w-5 text-violet-500" />
                                         </div>
                                         <h4 className="font-black text-white uppercase tracking-widest text-xs">Primary Rights</h4>
                                     </div>
                                     <ul className="text-xs text-white/50 space-y-3 font-medium">
                                         <li className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-violet-500" /> Executive roster analytics access</li>
                                         <li className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-violet-500" /> Content optimization & publishing</li>
                                         <li className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-violet-500" /> Sponsorship & contract management</li>
                                     </ul>
                                 </div>
                                 <div className="p-5 rounded-2xl bg-fuchsia-600/[0.03] border border-fuchsia-500/10">
                                     <div className="flex items-start gap-3">
                                         <Lock className="h-4 w-4 text-fuchsia-500 mt-0.5" />
                                         <p className="text-[10px] text-fuchsia-400 font-bold uppercase tracking-widest leading-relaxed">
                                             Security strictly prohibits unauthorized withdrawal of creator capital. All payouts require multi-factor authorization.
                                         </p>
                                     </div>
                                 </div>
                             </div>
                         </motion.div>
                     )}

                     {step === 2 && (
                         <motion.div 
                            key="step2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-8"
                         >
                             <div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3">Talent Acquisition</h3>
                                <p className="text-white/40 text-sm leading-relaxed">Populate your agency by inviting established icons or emerging talent.</p>
                             </div>

                             <div className="space-y-4">
                                 <div className="flex gap-5 items-center p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all group cursor-pointer">
                                     <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-xl">
                                         <Users className="h-7 w-7 text-blue-500" />
                                     </div>
                                     <div>
                                         <h4 className="font-black text-white uppercase tracking-widest text-xs mb-1">Direct Invitation</h4>
                                         <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Protocol-based secure linking</p>
                                     </div>
                                     <ArrowRight className="ml-auto h-5 w-5 text-white/10 group-hover:text-white transition-all group-hover:translate-x-1" />
                                 </div>
                                  <div className="flex gap-5 items-center p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all group cursor-pointer">
                                     <div className="h-14 w-14 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-xl">
                                         <Zap className="h-7 w-7 text-purple-500" />
                                     </div>
                                     <div>
                                         <h4 className="font-black text-white uppercase tracking-widest text-xs mb-1">Roster Scaling</h4>
                                         <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Manage up to 100 creators simultaneously</p>
                                     </div>
                                     <ArrowRight className="ml-auto h-5 w-5 text-white/10 group-hover:text-white transition-all group-hover:translate-x-1" />
                                 </div>
                             </div>
                         </motion.div>
                     )}

                     {step === 3 && (
                         <motion.div 
                            key="step3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-8"
                         >
                             <div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3">Agency Terminal</h3>
                                <p className="text-white/40 text-sm leading-relaxed">Utilize the advanced dashboard to monitor real-time revenue and engagement metrics.</p>
                             </div>

                             <div className="grid grid-cols-2 gap-4 pt-2">
                                 <div className="bg-white/5 border border-white/5 rounded-[2rem] p-6 text-center hover:bg-white/10 transition-all group">
                                     <div className="h-12 w-12 bg-violet-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <BarChart2 className="h-6 w-6 text-violet-500" />
                                     </div>
                                     <h4 className="font-black text-white text-[10px] uppercase tracking-widest mb-1">Revenue Stream</h4>
                                     <p className="text-[8px] text-white/30 font-bold uppercase tracking-[0.2em]">Aggregated Payouts</p>
                                 </div>
                                 <div className="bg-white/5 border border-white/5 rounded-[2rem] p-6 text-center hover:bg-white/10 transition-all group">
                                     <div className="h-12 w-12 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <Target className="h-6 w-6 text-blue-500" />
                                     </div>
                                     <h4 className="font-black text-white text-[10px] uppercase tracking-widest mb-1">Targeting</h4>
                                     <p className="text-[8px] text-white/30 font-bold uppercase tracking-[0.2em]">Audience Insights</p>
                                 </div>
                             </div>

                             <div className="p-6 bg-violet-600/10 rounded-[2rem] border border-violet-500/20 text-center relative overflow-hidden">
                                 <div className="absolute inset-0 bg-violet-600/5 animate-pulse" />
                                 <p className="text-violet-400 font-black text-[10px] uppercase tracking-[0.3em] relative z-10">Terminal Access Ready</p>
                             </div>
                         </motion.div>
                     )}
                 </AnimatePresence>
             </div>

             <div className="pt-10 flex justify-between mt-auto border-t border-white/5">
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
                     {step === 3 ? "Access Dashboard" : "Next Phase"}
                     {step !== 3 && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                 </Button>
             </div>
          </div>
       </div>
    </div>
  );
}
