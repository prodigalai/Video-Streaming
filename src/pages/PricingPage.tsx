import { MainLayout } from "@/components/layout/MainLayout";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
        <MainLayout>
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="container max-w-6xl space-y-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Simple Pricing</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transparent fees. You keep 85% of your earnings. No hidden costs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 space-y-6">
              <h3 className="text-2xl font-bold">Standard</h3>
              <p className="text-muted-foreground h-12">The basics for starting your journey.</p>
              <div className="text-4xl font-black">Free</div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> 85% Payout Rate</li>
                <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> Basic Analytics</li>
                <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> Unlimited Uploads</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-primary/50 bg-primary/10 p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-black text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
              <h3 className="text-2xl font-bold">Pro Creator</h3>
              <p className="text-muted-foreground h-12">Enhanced tools for growing creators.</p>
              <div className="text-4xl font-black">$29<span className="text-lg text-muted-foreground font-medium">/mo</span></div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> 90% Payout Rate</li>
                <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> Advanced Analytics</li>
                <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> Priority Support</li>
                <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> Custom Emotes</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 space-y-6">
              <h3 className="text-2xl font-bold">Enterprise / Agency</h3>
              <p className="text-muted-foreground h-12">For managed talent and agencies.</p>
              <div className="text-4xl font-black">Custom</div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> Custom Contracts</li>
                <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> Agency Dashboard</li>
                <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> Dedicated Account Manager</li>
                <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> Multi-Creator Tools</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
