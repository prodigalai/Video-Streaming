import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Shield, Users, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AgentOnboardingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-foreground">Welcome to Agent Portal</h1>
          <p className="text-xl text-muted-foreground">Your operational command center for creator management.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-primary/20 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        What You Can Do
                    </CardTitle>
                    <CardDescription>You have operational permissions to help creators grow.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ul className="space-y-3">
                        {[
                            "Manage Content & Feed Posts",
                            "Reply to Direct Messages",
                            "View Subscriber Analytics",
                            "Track Earnings Performance"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <div className="mt-1 h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                    <Check className="h-3 w-3 text-green-500" />
                                </div>
                                <span className="text-sm font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card className="border-border/50 bg-muted/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-muted-foreground">
                        <Lock className="h-5 w-5" />
                        Restricted Actions
                    </CardTitle>
                    <CardDescription>These actions are reserved for the account owner.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ul className="space-y-3">
                        {[
                            "Wallet Withdrawals & Transfers",
                            "KYC Identity Verification",
                            "Device Management",
                            "Changing Creator Passwords"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-muted-foreground">
                                <div className="mt-1 h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                                    <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                </div>
                                <span className="text-sm">{item}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Your Assigned Creators
                </CardTitle>
                <CardDescription>You have been granted access to manage the following accounts:</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-4">
                    {[
                        { name: "Luna Live", avatar: "luna" },
                        { name: "GamerPro", avatar: "gamer" },
                        { name: "Chef Maria", avatar: "maria" }
                    ].map((creator, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-border/50">
                            <img 
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${creator.avatar}`} 
                                className="h-10 w-10 rounded-full bg-background" 
                                alt={creator.name}
                            />
                            <span className="font-bold text-sm">{creator.name}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="pt-6">
                <Button size="lg" className="w-full text-lg font-bold" onClick={() => navigate("/agent/dashboard")}>
                    Continue to Dashboard
                </Button>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
