import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const badgeVariants = cva("inline-flex min-h-7 items-center rounded-full border px-2.5 py-1 text-xs font-medium", {
  variants: {
    variant: {
      default: "border-transparent bg-primary text-primary-foreground",
      outline: "border-border bg-transparent text-foreground",
      secondary: "border-transparent bg-secondary text-secondary-foreground"
    }
  },
  defaultVariants: { variant: "default" }
});

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant, ...props }, ref) => <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
