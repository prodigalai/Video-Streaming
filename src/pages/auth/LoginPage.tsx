import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'viewer' | 'creator' | 'agent'>('viewer');
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? "/";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      login(role); 
      toast.success(`Welcome back, ${role}!`, {
        icon: <ShieldCheck className="h-4 w-4 text-primary" />,
        style: { background: '#0f0f14', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }
      });
      
      if (role === 'agent') navigate("/agent/onboarding");
      else if (role === 'creator') navigate("/studio/dashboard");
      else navigate(from, { replace: true });
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#050508] overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 rounded-full blur-[120px]" />
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
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-7xl font-black text-white leading-[1.1] tracking-tighter"
            >
                Enter the <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400">Limited</span> Vault.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-white/50 max-w-md font-medium leading-relaxed"
            >
                The world's most exclusive creator network. Secured by blockchain, driven by passion.
            </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center gap-8"
        >
            <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-violet-600 rounded-full" />
                <span className="text-xs font-black text-white uppercase tracking-widest text-white/40">Established 2026</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <Globe className="h-3 w-3 text-violet-400" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest font-mono">Global Node: Active</span>
            </div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[440px]"
        >
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 lg:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                {/* Decorative subtle top light */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
                
                <div className="text-center mb-10 space-y-2">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">Passport Access</h2>
                    <p className="text-sm text-white/40 font-medium uppercase tracking-widest">Sign in to your account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Role Selector Upgrade */}
                    <div className="grid grid-cols-3 gap-2 p-1.5 bg-black/40 rounded-2xl border border-white/5">
                        {(['viewer', 'creator', 'agent'] as const).map((r) => (
                            <button
                                key={r}
                                type="button"
                                onClick={() => setRole(r)}
                                className={cn(
                                    "text-[10px] font-black py-2.5 rounded-xl transition-all uppercase tracking-widest relative z-10",
                                    role === r 
                                        ? "bg-violet-600 text-white shadow-xl shadow-violet-500/20 scale-[1.02]" 
                                        : "text-white/40 hover:text-white"
                                )}
                            >
                                {r}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-white/60 ml-1">Identity (Email)</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <Globe className="h-4 w-4 text-white/20 group-focus-within:text-violet-500 transition-colors" />
                                </div>
                                <Input 
                                    type="email" 
                                    placeholder="name@nexus.com" 
                                    className="h-12 bg-black/50 border-white/5 focus:border-violet-500/50 focus:ring-violet-500/20 transition-all rounded-xl pl-11 text-white placeholder:text-white/20"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-white/60">Secure Key</Label>
                                <Link to="/auth/forgot-password" className="text-[10px] text-violet-400 hover:text-white font-black uppercase tracking-widest transition-colors leading-none">
                                    Forgot?
                                </Link>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <Lock className="h-4 w-4 text-white/20 group-focus-within:text-violet-500 transition-colors" />
                                </div>
                                <Input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    className="h-12 bg-black/50 border-white/5 focus:border-violet-500/50 focus:ring-violet-500/20 transition-all rounded-xl pl-11 pr-11 text-white placeholder:text-white/20"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-14 bg-violet-600 hover:bg-violet-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-violet-500/20 transition-all active:scale-[0.98] border-none mt-4 group"
                      disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Verifying...</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <span>Authenticate Access</span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        )}
                    </Button>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/5" />
                        </div>
                        <div className="relative flex justify-center text-[8px] font-black uppercase tracking-[0.3em]">
                            <span className="bg-[#0f0f13] px-4 text-white/20">
                                External Authentication
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" type="button" className="h-12 bg-black/40 border-white/5 hover:bg-white/5 rounded-xl font-bold text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-all">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-4 w-4 mr-2" alt="Google" />
                            Google
                        </Button>
                        <Button variant="outline" type="button" className="h-12 bg-black/40 border-white/5 hover:bg-white/5 rounded-xl font-bold text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-all">
                            <svg className="mr-2 h-4 w-4 fill-white" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg>
                            Apple
                        </Button>
                    </div>
                </form>

                <div className="text-center text-[10px] font-black uppercase tracking-[0.2em] mt-10 text-white/30">
                    New to the network?{" "}
                    <Link to="/auth/register" className="text-violet-400 hover:text-white transition-colors ml-1 underline underline-offset-4">
                        Request Invite
                    </Link>
                </div>
            </div>

            {/* Support link for footer */}
            <p className="mt-8 text-center text-[8px] font-black uppercase tracking-[0.4em] text-white/20">
                Encrypted with RSA-4096 / Fans on Chain Limited
            </p>
        </motion.div>
      </div>
    </div>
  );
}

function Loader2({ className }: { className?: string }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={cn("animate-spin", className)}
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    );
}
