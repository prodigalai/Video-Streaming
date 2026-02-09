import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  Wallet, 
  Gift, 
  PlayCircle,
  CheckCircle2,
  X,
  Sparkles,
  ShieldCheck,
  Zap,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function FanOnboardingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      localStorage.setItem(`onboarding_${user?.id}`, 'completed');
      navigate("/");
      toast.success("Welcome to the inner circle!", {
        icon: <ShieldCheck className="h-4 w-4 text-primary" />,
        style: { background: '#0f0f14', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }
      });
    }
  };

  const skipOnboarding = () => {
      localStorage.setItem(`onboarding_${user?.id}`, 'completed');
      navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-violet-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-fuchsia-600/10 rounded-full blur-[120px]" />
        <div className="cosmos-ambient opacity-30" />
      </div>

       <div className="max-w-[1000px] w-full grid md:grid-cols-2 gap-12 items-center z-10">
          
          {/* Left Column - Dynamic Visuals */}
          <div className="hidden md:flex flex-col items-center justify-center h-full min-h-[500px] relative">
             <AnimatePresence mode="wait">
                 <motion.div 
                    key={step}
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="relative text-center space-y-8"
                 >
                    <div className="relative">
                        <div className="absolute inset-0 bg-violet-600/20 blur-[60px] rounded-full" />
                        <div className={cn(
                            "h-56 w-56 mx-auto rounded-[2.5rem] flex items-center justify-center shadow-2xl relative z-10 border border-white/10 overflow-hidden",
                            step === 1 ? "bg-gradient-to-br from-violet-600 to-indigo-600" :
                            step === 2 ? "bg-gradient-to-br from-fuchsia-600 to-pink-600" :
                            "bg-gradient-to-br from-emerald-500 to-teal-600"
                        )}>
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                            {step === 1 && <PlayCircle className="h-24 w-24 text-white drop-shadow-2xl" />}
                            {step === 2 && <Star className="h-24 w-24 text-white drop-shadow-2xl" />}
                            {step === 3 && <Zap className="h-24 w-24 text-white drop-shadow-2xl" />}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                            {step === 1 ? "Immersive Content" : step === 2 ? "Exclusive Rewards" : "Instant Access"}
                        </h3>
                        <p className="text-white/40 font-black uppercase tracking-[0.2em] text-[10px]">
                            Protocol Phase 0{step}
                        </p>
                    </div>
                 </motion.div>
             </AnimatePresence>
          </div>

          {/* Right Column - Premium Content Card */}
          <div className="bg-white/[0.03] border border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
             
             <button onClick={skipOnboarding} className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors group">
                <X className="h-6 w-6 group-hover:rotate-90 transition-transform" />
             </button>

             <div className="space-y-10">
                {/* Branding Detail */}
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <span className="text-sm font-black text-white uppercase tracking-[0.2em] leading-none block">Fans on Chain</span>
                        <span className="text-[10px] text-violet-400 font-bold uppercase tracking-widest mt-1 block">Onboarding Sequence</span>
                    </div>
                </div>

                {/* Progress Indicators */}
                <div className="flex gap-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? 'w-12 bg-violet-600 shadow-[0_0_10px_rgba(139,92,246,0.5)]' : 'w-3 bg-white/10'}`} />
                    ))}
                </div>

                {/* Step Content */}
                <div className="min-h-[240px]">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div 
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h1 className="text-3xl font-black text-white uppercase tracking-tight leading-none">The Future of <br/> Creators is here.</h1>
                                <p className="text-white/60 leading-relaxed">Experience a direct, uncensored connection with the world's most talented creators.</p>
                                <ul className="space-y-4 pt-2">
                                    {[
                                        "Follow top-tier talent instantly",
                                        "Browse high-fidelity 4K stream reels",
                                        "Real-time encrypted chat interactions"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm font-medium text-white/80">
                                            <div className="h-5 w-5 rounded-full bg-violet-600/20 flex items-center justify-center">
                                                <CheckCircle2 className="h-3 w-3 text-violet-500" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div 
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h1 className="text-3xl font-black text-white uppercase tracking-tight leading-none">Unlock the <br/> Extraordinary.</h1>
                                <p className="text-white/60 leading-relaxed">Direct support that actually reaches the creator. No middlemen, no nonsense.</p>
                                <div className="grid grid-cols-1 gap-4 pt-2">
                                    <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-violet-500/30 transition-all cursor-default group">
                                        <h4 className="font-black text-white text-xs uppercase tracking-widest mb-1 group-hover:text-violet-400 transition-colors">Digital Collectibles</h4>
                                        <p className="text-xs text-white/40 leading-relaxed">Exclusive badges and VIP ranking for top supporters.</p>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-fuchsia-500/30 transition-all cursor-default group">
                                        <h4 className="font-black text-white text-xs uppercase tracking-widest mb-1 group-hover:text-fuchsia-400 transition-colors">Backstage Access</h4>
                                        <p className="text-xs text-white/40 leading-relaxed">Behind-the-scenes content unlocked via PPV or Subs.</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div 
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h1 className="text-3xl font-black text-white uppercase tracking-tight leading-none">Seamless <br/> Transactions.</h1>
                                <p className="text-white/60 leading-relaxed">Fans on Chain supports a wide variety of ways to fuel your experience.</p>
                                
                                <div className="p-6 rounded-[2rem] bg-gradient-to-br from-violet-600/10 to-transparent border border-violet-500/20 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-20">
                                        <Wallet className="h-12 w-12 text-violet-400" />
                                    </div>
                                    <div className="relative">
                                        <h4 className="font-black text-white text-xs uppercase tracking-widest mb-2">Nexus Wallet</h4>
                                        <p className="text-sm text-white/60 leading-relaxed">We support credit cards, Apple Pay, and direct crypto settlements (BTC, ETH, SOL).</p>
                                        <div className="flex gap-2 mt-4">
                                            <div className="h-8 w-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-[10px] font-bold text-white/40 uppercase">Card</div>
                                            <div className="h-8 w-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-[10px] font-bold text-white/40 uppercase">Crypto</div>
                                            <div className="h-8 w-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-[10px] font-bold text-white/40 uppercase">Pay</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Actions */}
                <div className="pt-6 flex items-center justify-between border-t border-white/5">
                    <Button 
                        variant="ghost" 
                        onClick={() => setStep(Math.max(1, step - 1))}
                        disabled={step === 1}
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-white hover:bg-transparent"
                    >
                        Previous
                    </Button>
                    <Button 
                        onClick={handleNext} 
                        className="bg-violet-600 hover:bg-violet-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl h-14 px-10 shadow-xl shadow-violet-500/20 transition-all active:scale-[0.98] border-none group"
                    >
                        {step === 3 ? "Complete Establishment" : "Continue"}
                        {step !== 3 && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                    </Button>
                </div>

             </div>
          </div>

       </div>
    </div>
  );
}
