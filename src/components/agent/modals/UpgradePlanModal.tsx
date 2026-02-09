import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const plans = [
    {
        name: "Starter",
        price: "$0",
        period: "/month",
        features: ["Manage up to 3 Creators", "Basic Analytics", "Standard Support"],
        current: true,
        action: "Current Plan"
    },
    {
        name: "Pro Agency",
        price: "$49",
        period: "/month",
        features: ["Manage up to 25 Creators", "Advanced Analytics & Reports", "Priority Support", "Custom Contracts", "Bulk Invites"],
        current: false,
        action: "Upgrade to Pro",
        highlight: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        features: ["Unlimited Creators", "White-label Dashboard", "Dedicated Account Manager", "API Access"],
        current: false,
        action: "Contact Sales"
    }
];

export function UpgradePlanModal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[700px] bg-background">
        <DialogHeader className="text-center pb-6">
          <DialogTitle className="text-2xl font-bold">Upgrade Your Agency Plan</DialogTitle>
          <DialogDescription>
            Unlock powerful tools to scale your talent management business.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan, i) => (
                <div key={i} className={`relative flex flex-col p-4 rounded-xl border ${plan.highlight ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
                    {plan.highlight && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Most Popular
                        </div>
                    )}
                    <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
                    <div className="text-2xl font-black mb-4">
                        {plan.price}<span className="text-sm font-normal text-muted-foreground">{plan.period}</span>
                    </div>
                    
                    <ul className="space-y-2 mb-6 flex-1">
                        {plan.features.map((feature, idx) => (
                            <li key={idx} className="text-xs flex items-start gap-2 text-muted-foreground">
                                <Check className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <Button 
                        variant={plan.highlight ? 'default' : 'outline'} 
                        className="w-full"
                        disabled={plan.current}
                    >
                        {plan.action}
                    </Button>
                </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
