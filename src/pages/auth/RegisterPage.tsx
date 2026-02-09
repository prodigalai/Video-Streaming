import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, UserPlus, Video, Building2, ChevronRight, ArrowLeft, CheckCircle2, Sparkles, Globe, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type RegisterStep = 'role' | 'details';

export default function RegisterPage() {
  const [step, setStep] = useState<RegisterStep>('role');
  const [role, setRole] = useState<'fan' | 'creator' | 'agent'>('fan');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    agencyName: "",
    referralCode: "",
    termsAccepted: false
  });

  const handleRoleSelect = (selectedRole: 'fan' | 'creator' | 'agent') => {
    setRole(selectedRole);
    setStep('details');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
        toast.error("You must accept the terms and conditions");
        return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created! Please verify your email.", {
        icon: <ShieldCheck className="h-4 w-4 text-primary" />,
        style: { background: '#0f0f14', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }
      });
      navigate("/auth/verify-email", { state: { email: formData.email, role } });
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#050508] overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 text-white/5 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-violet-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 rounded-full blur-[120px]" />
        <div className="cosmos-ambient opacity-30" />
      </div>

      {/* Left Side - Visual Branding (Desktop) */}
      <div className="hidden lg:flex relative w-1/2 flex-col justify-between p-16 z-10 border-r border-white/5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
            <Link to="/" className="flex items-center gap-4 group">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-2xl shadow-violet-500/20 group-hover:scale-105 transition-transform">
                    <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                    <span className="text-xl font-black text-white uppercase tracking-[0.2em]">Fans on Chain</span>
                    <p className="text-[10px] text-violet-400 font-bold uppercase tracking-widest leading-none">Limited Edition</p>
                </div>
            </Link>
        </motion.div>

        <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="px-3 py-1 bg-violet-600/20 border border-violet-500/30 rounded-full text-[10px] font-black uppercase tracking-widest text-violet-300">
                        Join the Elite
                    </div>
                </div>
                <h1 className="text-7xl font-black text-white leading-[1.1] tracking-tighter">
                    Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400">Exclusive</span> Circle.
                </h1>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.3 }}
               className="space-y-6"
            >
                {[
                    "Instant Global Payouts",
                    "Blockchain Security Layer",
                    "Premium Analytics Engine",
                    "Direct Creator Access"
                ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-4 text-white/60">
                        <div className="h-6 w-6 rounded-full bg-violet-600/10 border border-violet-500/20 flex items-center justify-center">
                            <CheckCircle2 className="h-3 w-3 text-violet-400" />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-widest">{feature}</span>
                    </div>
                ))}
            </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center gap-4 text-[10px] font-black tracking-[0.3em] uppercase text-white/20"
        >
            <div className="h-px w-12 bg-white/10" />
            Empowering Excellence Since 2026
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12 z-10 relative overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[480px] my-12"
        >
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 lg:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
                
                <div className="text-center mb-10 space-y-2">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                        {step === 'role' ? "Select Level" : "Identity Setup"}
                    </h2>
                    <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">
                        {step === 'role' 
                            ? "Authorize your specialized role" 
                            : `Establishing ${role} credentials`}
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {step === 'role' ? (
                        <motion.div 
                          key="role-selection"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-4"
                        >
                            {[
                                { id: 'fan', label: 'Fan / Viewer', desc: 'Secure Access & Streaming', icon: Sparkles, color: 'text-violet-400', g: 'from-violet-500/20' },
                                { id: 'creator', label: 'Creator', desc: 'Vault Management & Streaming', icon: Video, color: 'text-fuchsia-400', g: 'from-fuchsia-500/20' },
                                { id: 'agent', label: 'Agency Manager', desc: 'Enterprise Operations', icon: Building2, color: 'text-blue-400', g: 'from-blue-500/20' }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleRoleSelect(item.id as any)}
                                    className="w-full group relative flex items-center gap-5 p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-white/20 hover:bg-white/[0.02] transition-all overflow-hidden text-left"
                                >
                                    <div className={cn("absolute inset-y-0 left-0 w-1 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity", item.g.replace('from-', 'to-'))} />
                                    <div className={cn("h-14 w-14 rounded-xl flex items-center justify-center shrink-0 bg-white/5 border border-white/10 group-hover:border-violet-500/50 transition-colors shadow-2xl", item.color)}>
                                        <item.icon className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-black text-white uppercase tracking-wider">{item.label}</h3>
                                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">{item.desc}</p>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-white/20 group-hover:text-violet-500 transition-all group-hover:translate-x-1" />
                                </button>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.form 
                          key="details-form"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          onSubmit={handleRegister} 
                          className="space-y-5"
                        >
                            <Button 
                                variant="ghost" 
                                className="h-8 px-0 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white mb-2"
                                onClick={() => setStep('role')}
                            >
                                <ArrowLeft className="h-3 w-3 mr-2" />
                                Reset Selection
                            </Button>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/60 ml-1">Legal Name</Label>
                                    <Input 
                                        placeholder="Identity" 
                                        className="h-12 bg-black/50 border-white/5 focus:border-violet-500/50 rounded-xl px-4 text-sm text-white"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/60 ml-1">Birth Date</Label>
                                    <Input 
                                        type="date"
                                        className="h-12 bg-black/50 border-white/5 focus:border-violet-500/50 rounded-xl px-4 text-sm text-white invert grayscale contrast-200"
                                        onChange={(e) => setFormData({...formData, dob: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-white/60 ml-1">Nexus Email</Label>
                                <Input 
                                    type="email" 
                                    placeholder="name@nexus.com" 
                                    className="h-12 bg-black/50 border-white/5 focus:border-violet-500/50 rounded-xl px-4 text-sm text-white"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                            </div>

                            {role === 'agent' && (
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/60 ml-1">Enterprise Name</Label>
                                    <Input 
                                        placeholder="Agency" 
                                        className="h-12 bg-black/50 border-white/5 focus:border-violet-500/50 rounded-xl px-4 text-sm text-white"
                                        value={formData.agencyName}
                                        onChange={(e) => setFormData({...formData, agencyName: e.target.value})}
                                        required
                                    />
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-white/60 ml-1">Secure Key</Label>
                                <div className="relative group">
                                    <Input 
                                        id="password" 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="••••••••" 
                                        className="h-12 bg-black/50 border-white/5 focus:border-violet-500/50 rounded-xl px-4 pr-11 text-sm text-white"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        required
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors p-1"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 pt-3 px-1">
                                <Checkbox 
                                    id="terms" 
                                    className="border-white/20 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600 rounded-md"
                                    checked={formData.termsAccepted}
                                    onCheckedChange={(checked) => setFormData({...formData, termsAccepted: checked as boolean})}
                                />
                                <Label htmlFor="terms" className="text-[10px] font-black uppercase tracking-widest text-white/40 leading-relaxed cursor-pointer hover:text-white transition-colors">
                                    I accept the <Link to="/legal/terms" className="text-violet-400">Protocol</Link> & <Link to="/legal/privacy" className="text-violet-400">Safety Guard</Link>
                                </Label>
                            </div>

                            <Button 
                              type="submit" 
                              className="w-full h-14 bg-violet-600 hover:bg-violet-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-violet-500/20 transition-all active:scale-[0.98] border-none mt-6 group"
                              disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        <span>Allocating Vault...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span>Initialize Access</span>
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                )}
                            </Button>
                        </motion.form>
                    )}
                </AnimatePresence>

                <div className="text-center text-[10px] font-black uppercase tracking-[0.2em] mt-10 text-white/30">
                    Already an initiate?{" "}
                    <Link to="/auth/login" className="text-violet-400 hover:text-white transition-colors ml-1 underline underline-offset-4">
                        Vault Login
                    </Link>
                </div>
            </div>

            <p className="mt-8 text-center text-[8px] font-black uppercase tracking-[0.4em] text-white/20">
                Fans on Chain Limited Edition Security System
            </p>
        </motion.div>
      </div>
    </div>
  );
}
