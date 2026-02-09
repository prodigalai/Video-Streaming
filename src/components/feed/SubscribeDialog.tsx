import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Star, Shield, Zap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubscribeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  creatorName: string;
}

const TIERS = [
  {
    id: "monthly",
    name: "Monthly",
    price: "$9.99",
    period: "/mo",
    description: "Full access to all exclusive content",
    features: ["All photos & videos", "Direct messaging", "Chat priority"],
    icon: Sparkles,
    color: "bg-violet-600",
    popular: true
  },
  {
    id: "seasonal",
    name: "3 Months",
    price: "$24.99",
    period: "/3mo",
    description: "Best for dedicated fans",
    features: ["Save 15%", "Everything in Monthly", "Badge on profile"],
    icon: Star,
    color: "bg-fuchsia-600",
    popular: false
  }
];

export function SubscribeDialog({ isOpen, onOpenChange, creatorName }: SubscribeDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-[#0f0f13] border-white/10 text-white">
        <div className="relative h-32 w-full bg-gradient-to-br from-violet-600 to-fuchsia-700">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="h-16 w-16 text-white/20 animate-pulse" />
            </div>
        </div>
        
        <div className="p-6">
            <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-black text-center mb-2 uppercase tracking-tight">
                    Subscribe to {creatorName}
                </DialogTitle>
                <DialogDescription className="text-center text-muted-foreground font-medium">
                    Choose your access level and join the inner circle.
                </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-4">
                {TIERS.map((tier) => (
                    <div 
                        key={tier.id}
                        className={cn(
                            "relative group cursor-pointer p-4 rounded-2xl border transition-all duration-300",
                            tier.popular ? "bg-white/5 border-violet-500/50 shadow-[0_0_20px_rgba(139,92,246,0.1)]" : "bg-white/[0.02] border-white/5 hover:border-white/10"
                        )}
                    >
                        {tier.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-violet-600 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                                Best Value
                            </div>
                        )}
                        
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", tier.color)}>
                                    <tier.icon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-base">{tier.name}</h4>
                                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{tier.description}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-xl font-black">{tier.price}</span>
                                <span className="text-xs text-muted-foreground">{tier.period}</span>
                            </div>
                        </div>

                        <ul className="space-y-2 mb-4">
                            {tier.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-xs text-white/70">
                                    <Check className="h-3 w-3 text-violet-500" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Button className={cn(
                            "w-full rounded-full font-black uppercase text-xs tracking-widest h-11 transition-all active:scale-[0.98]",
                            tier.popular ? "bg-violet-600 hover:bg-violet-700 text-white" : "bg-white/10 hover:bg-white/20 text-white"
                        )}>
                            Subscribe Now
                        </Button>
                    </div>
                ))}
            </div>

            <p className="mt-6 text-[10px] text-center text-muted-foreground uppercase tracking-wider font-medium">
                Payments are secure & encrypted. Cancel anytime.
            </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
