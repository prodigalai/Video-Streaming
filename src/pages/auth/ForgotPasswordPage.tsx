import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      toast.success("Reset link sent!");
    }, 1500);
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#05020d] flex items-center justify-center p-4 sm:p-6 pt-safe pb-safe relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="cosmos-particles" />
        <div className="ambient-orb orb-primary w-[500px] h-[500px] -top-[100px] -left-[100px] opacity-20" />
        <div className="ambient-orb orb-secondary w-[300px] h-[300px] bottom-[0] right-[0] opacity-20" />
      </div>

      <div className="w-full max-w-md z-10 space-y-6 sm:space-y-8">
        <div className="text-center space-y-2">
           {!isSent ? (
              <>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Reset Password</h1>
                <p className="text-sm sm:text-base text-muted-foreground">Enter your email to receive a reset link</p>
              </>
           ) : (
                <>
                <div className="h-16 w-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
                    <Mail className="h-8 w-8 text-green-500" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Check your email</h1>
                <p className="text-sm sm:text-base text-muted-foreground">We've sent a password reset link to <br/><span className="text-white font-medium">{email}</span></p>
                </>
           )}
        </div>

        <div className="glass-card p-5 sm:p-6 md:p-8 rounded-2xl border-white/10">
          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    className="pl-10 bg-white/5 border-white/10 h-11"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                </div>

                <Button type="submit" className="w-full h-11 font-bold text-base glow-primary transition-all" disabled={isLoading}>
                {isLoading ? "Sending Link..." : "Send Reset Link"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
            </form>
          ) : (
            <div className="space-y-4">
                <Button variant="outline" className="w-full h-11 border-white/10 hover:bg-white/5" onClick={() => setIsSent(false)}>
                    Use different email
                </Button>
                <Button asChild className="w-full h-11 glow-primary">
                    <Link to="/auth/login">Back to Sign In</Link>
                </Button>
            </div>
          )}
        </div>

        <p className="px-8 text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link to="/auth/login" className="underline underline-offset-4 hover:text-primary transition-colors font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
