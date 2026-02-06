import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-gradient-primary text-primary-foreground",
        secondary: "border-border/50 bg-secondary/80 text-secondary-foreground backdrop-blur-sm",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow-[0_0_8px_hsl(var(--destructive)/0.4)]",
        outline: "text-foreground border-border/50",
        premium: "border-transparent bg-gradient-primary text-primary-foreground shadow-glow",
        glass: "border-white/10 bg-black/40 text-white backdrop-blur-md",
        live: "border-transparent bg-live text-white animate-pulse shadow-[0_0_12px_hsl(var(--live-red)/0.5)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
