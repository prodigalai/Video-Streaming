import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, ArrowRight, RefreshCw, CheckCircle2, Sparkles, Globe, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function VerifyEmailPage() {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const email = location.state?.email || "user@nexus.com";
  const role = location.state?.role || "fan";

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleDeclinePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      const internalRole = role === 'fan' ? 'viewer' : role;
      
      login(internalRole);
      toast.success("Identity Verified!", {
        icon: <ShieldCheck className="h-4 w-4 text-primary" />,
        style: { background: '#0f0f14', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }
      });
      
      if (role === 'agent') navigate("/onboarding/agent");
      else if (role === 'creator') navigate("/onboarding/creator");
      else navigate("/onboarding/fan");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 text-white/5 pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 rounded-full blur-[120px]" />
        <div className="cosmos-ambient opacity-30" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[480px] z-10"
      >
        <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-4 group mb-12">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-2xl shadow-violet-500/20 group-hover:scale-105 transition-transform">
                    <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                    <span className="text-xl font-black text-white uppercase tracking-[0.2em] leading-none">Fans on Chain</span>
                    <p className="text-[10px] text-violet-400 font-bold uppercase tracking-widest leading-none mt-1">Verification Node</p>
                </div>
            </Link>
            
            <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Security Verification</h1>
            <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">
                Code sent to <span className="text-violet-400">{email}</span>
            </p>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 lg:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
            
            <form onSubmit={handleVerify} className="space-y-8 text-center">
                <div className="grid grid-cols-6 gap-2 sm:gap-3">
                    {otp.map((digit, index) => (
                        <Input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handleDeclinePaste}
                            className="h-14 sm:h-16 text-center text-xl font-black bg-black/50 border-white/5 focus:border-violet-500/50 focus:ring-violet-500/20 transition-all rounded-xl text-white outline-none"
                        />
                    ))}
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-14 bg-violet-600 hover:bg-violet-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-violet-500/20 transition-all active:scale-[0.98] border-none group"
                  disabled={isLoading || otp.join("").length !== 6}
                >
                    {isLoading ? "Authenticating..." : "Establish Identity"}
                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                </Button>
            </form>

            <div className="mt-8 text-center flex flex-col items-center gap-4">
                <Button 
                    variant="ghost" 
                    onClick={() => timeLeft === 0 && setTimeLeft(30)} // Mock resend
                    disabled={timeLeft > 0 || isLoading}
                    className="text-[10px] font-black uppercase tracking-widest text-violet-400 hover:text-white hover:bg-white/5 transition-all"
                >
                    {timeLeft > 0 ? (
                        <span className="flex items-center gap-2">
                            Resend link in {timeLeft}s
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <RefreshCw className="h-3 w-3" />
                            Request New Code
                        </span>
                    )}
                </Button>
            </div>
        </div>
        
        <div className="text-center mt-10">
            <Link to="/auth/login" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors">
                Cancel Authentication
            </Link>
        </div>
        
        <p className="mt-8 text-center text-[8px] font-black uppercase tracking-[0.4em] text-white/20">
            Fans on Chain Limited / Protocol 2.5
        </p>
      </motion.div>
    </div>
  );
}
