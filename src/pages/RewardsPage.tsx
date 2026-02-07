import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Gift, Share2, Copy, Users, Star, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function RewardsPage() {
  const copyReferralCode = () => {
    navigator.clipboard.writeText("ASH123");
    toast.success("Referral code copied!");
  };

  const handleShare = () => {
    const shareData = {
      title: 'Join me on StreamVault',
      text: 'Use my referral code ASH123 to get 500 credits on StreamVault!',
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData).catch((err) => {
        console.error("Error sharing:", err);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Referral link copied to clipboard!");
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-background py-12 px-4 space-y-12">
        <div className="container max-w-5xl space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gradient">
              Rewards & Referrals
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Earn credits by watching streams, engaging with creators, and inviting friends.
            </p>
          </div>

          {/* Current Level */}
          <div className="grid md:grid-cols-2 gap-6">
             <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  Current Level: Gold
                </CardTitle>
                <CardDescription>You are top 5% of viewers this month!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>XP Progress</span>
                    <span>3,450 / 5,000 XP</span>
                  </div>
                  <Progress value={69} className="h-3" indicatorClassName="bg-gradient-to-r from-yellow-500 to-amber-600" />
                  <p className="text-xs text-muted-foreground">Next reward: 500 Credits at Level Platinum</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-6 w-6 text-primary" />
                  Available Rewards
                </CardTitle>
                <CardDescription>Claim your earned bonuses.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">Weekly Streak Bonus</p>
                      <p className="text-xs text-muted-foreground">Log in 7 days in a row</p>
                    </div>
                  </div>
                  <Button size="sm" variant="secondary">Claim 100 Cr</Button>
                </div>
                 <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 opacity-50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold">Community Hero</p>
                      <p className="text-xs text-muted-foreground">Gift 5 subs in a month</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" disabled>Locked</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Referral System */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/50 via-primary/20 to-blue-900/50 border border-white/10 p-8 md:p-12 text-center space-y-8">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            
            <div className="relative z-10 space-y-4">
              <h2 className="text-3xl font-bold">Invite Friends & Earn</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Share your unique referral link. When your friends sign up and spend their first $10, you both get <span className="text-white font-bold">500 Credits</span>.
              </p>
            </div>

            <div className="relative z-10 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <div className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-3 font-mono text-center sm:text-left flex items-center justify-between">
                <span>ASH123</span>
                <span className="text-xs text-muted-foreground hidden sm:inline">Ref Code</span>
              </div>
              <Button onClick={copyReferralCode} size="lg" className="rounded-xl gap-2 font-bold shadow-glow">
                <Copy className="h-4 w-4" />
                Copy Code
              </Button>
            </div>

            <div className="relative z-10 flex justify-center gap-4">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-12 w-12 border-white/10 hover:bg-white/10"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
              </Button>
               {/* Mock external share buttons */}
            </div>

            {/* Stats */}
            <div className="relative z-10 grid grid-cols-3 gap-4 pt-8 border-t border-white/10 max-w-2xl mx-auto">
              <div>
                <div className="text-2xl font-black text-white">12</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Friends Invited</div>
              </div>
              <div>
                <div className="text-2xl font-black text-primary">4</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Active</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">2,000</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Credits Earned</div>
              </div>
            </div>
          </div>

          {/* Daily Quests */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Daily Quests</h2>
              <Button variant="ghost" className="text-primary hover:text-primary/80">View All <ArrowRight className="h-4 w-4 ml-1" /></Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-card/30 border-white/5 hover:bg-card/50 transition-colors">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="h-10 w-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                        <Check className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-white/50">
                        +50 XP
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold">Watch a Stream</h4>
                      <p className="text-xs text-muted-foreground mt-1">Watch any live stream for 15 minutes.</p>
                    </div>
                    <Progress value={i * 33} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
