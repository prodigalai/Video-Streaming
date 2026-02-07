import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Zap, Shield, BarChart3, Globe, Sparkles, Wallet } from "lucide-react";

export default function CreatorsPage() {
  const features = [
    {
      icon: Wallet,
      title: "Instant Crypto Payouts",
      description: "Get paid instantly in USDC/SOL. No minimum thresholds, no 30-day holds."
    },
    {
      icon: Shield,
      title: "Complete Ownership",
      description: "You own your content and your audience. No algorithm changes taking away your reach."
    },
    {
      icon: BarChart3,
      title: "Deep Analytics",
      description: "Understand your audience with real-time insights and growth metrics."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connect with fans worldwide without border restrictions or payment hurdles."
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "Ultra-low latency streaming and 4K uploads for the best viewer experience."
    },
    {
      icon: Sparkles,
      title: "AI-Powered Tools",
      description: "Use our AI studio to edit, caption, and optimize your content automatically."
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        
        {/* Hero Section */}
        <div className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-background to-background pointer-events-none" />
          <div className="container max-w-5xl relative z-10 text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gradient leading-tight">
              Create. Earn. <br /> Own Your Future.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              The next-generation platform for creators. Zero friction, instant monetization, and total freedom.
            </p>
            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 h-14 rounded-full glow-primary" asChild>
                <Link to="/auth/register">Start Creating Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-14 rounded-full border-primary/20 hover:bg-primary/10">
                View Success Stories
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="py-20 px-4 bg-white/5 border-y border-white/5">
          <div className="container max-w-6xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Everything You Need to Scale</h2>
              <p className="text-muted-foreground">Built by creators, for creators.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <Card key={i} className="bg-background/50 border-white/10 hover:border-primary/50 transition-all hover:-translate-y-1 duration-300 group">
                    <CardHeader>
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-background transition-colors">
                        <Icon className="h-6 w-6 text-primary group-hover:text-background transition-colors" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 px-4 text-center">
          <div className="container max-w-3xl space-y-8 p-12 rounded-3xl bg-gradient-to-b from-primary/10 to-transparent border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to take control?</h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of creators who are building the future of content on StreamVault.
            </p>
            <Button size="lg" className="text-lg px-12 h-14 rounded-full glow-primary" asChild>
              <Link to="/auth/register">Join for Free</Link>
            </Button>
            <p className="text-xs text-muted-foreground">No credit card required. Cancel anytime.</p>
          </div>
        </div>

      </div>
    </MainLayout>
  );
}
