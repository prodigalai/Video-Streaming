import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, UserPlus, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterPage() {
  const { login } = useAuth();
  const [role, setRole] = useState<'fan' | 'creator' | 'agent'>('fan');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      // Map 'fan' to 'viewer' for internal role
      const internalRole = role === 'fan' ? 'viewer' : (role as any);
      login(internalRole);
      
      toast.success("Account created successfully!");
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#05020d] flex items-center justify-center p-4 sm:p-6 pt-safe pb-safe relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="cosmos-particles" />
        <div className="ambient-orb orb-primary w-[500px] h-[500px] -top-[100px] -right-[100px] opacity-20" />
        <div className="ambient-orb orb-secondary w-[300px] h-[300px] bottom-[0] left-[0] opacity-20" />
      </div>

      <div className="w-full max-w-md z-10 space-y-6 sm:space-y-8 overflow-y-auto max-h-[100dvh] py-4">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group mb-4 sm:mb-6 min-h-[44px] items-center touch-manipulation">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl overflow-hidden flex items-center justify-center glow-primary-sm group-hover:shadow-glow transition-all duration-300">
              <img src="/logo.png" alt="StreamVault" className="h-full w-full object-cover" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-gradient tracking-tight">
              StreamVault
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Create an account</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Join the future of streaming and monetization</p>
        </div>

        <div className="glass-card p-5 sm:p-6 md:p-8 rounded-2xl border-white/10">
          <form onSubmit={handleRegister} className="space-y-5 sm:space-y-6">
            
            {/* Role Selection */}
            <div className="space-y-3">
              <Label>I want to join as a...</Label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('fan')}
                  className={cn(
                    "p-3 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all",
                    role === 'fan' ? "bg-primary/20 border-primary text-primary shadow-glow-primary" : "bg-transparent border-white/10 hover:bg-white/5 text-muted-foreground"
                  )}
                >
                  <UserPlus className="h-5 w-5" />
                  <span className="text-xs font-bold">Fan</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('creator')}
                  className={cn(
                    "p-3 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all",
                    role === 'creator' ? "bg-live/20 border-live text-live shadow-glow-live" : "bg-transparent border-white/10 hover:bg-white/5 text-muted-foreground"
                  )}
                >
                  <Video className="h-5 w-5" />
                  <span className="text-xs font-bold">Creator</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('agent')}
                  className={cn(
                    "p-3 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all",
                    role === 'agent' ? "bg-blue-500/20 border-blue-500 text-blue-500" : "bg-transparent border-white/10 hover:bg-white/5 text-muted-foreground"
                  )}
                >
                  <User className="h-5 w-5" />
                  <span className="text-xs font-bold">Agent</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    className="pl-10 bg-white/5 border-white/10 h-11 min-h-[44px]"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <div className="relative">
                  <Input 
                    id="dob" 
                    type="date"
                    className="bg-white/5 border-white/10 h-11 min-h-[44px]"
                    onChange={(e) => setFormData({...formData, dob: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  className="pl-10 bg-white/5 border-white/10 h-11"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="pl-10 pr-10 bg-white/5 border-white/10 h-11"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 font-bold text-base glow-primary transition-all" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          <p className="px-8 text-center text-xs text-muted-foreground mt-4">
            By clicking "Create Account", you agree to our{" "}
            <Link to="/legal/terms" className="underline hover:text-primary">Terms of Service</Link> and{" "}
            <Link to="/legal/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
          </p>
        </div>

        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/auth/login" className="underline underline-offset-4 hover:text-primary transition-colors font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
