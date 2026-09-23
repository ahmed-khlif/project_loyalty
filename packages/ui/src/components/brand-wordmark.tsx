import * as React from "react";
import { cn } from "../lib/utils";

export interface BrandWordmarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  showArabic?: boolean;
}

const BrandWordmark = React.forwardRef<HTMLSpanElement, BrandWordmarkProps>(({ className, showArabic = false, ...props }, ref) => (
  <span ref={ref} className={cn("inline-flex items-baseline gap-2 font-semibold tracking-[-0.04em] text-foreground", className)} {...props}>
    <span aria-label="njiw.">njiw<span className="text-coffee">.</span></span>
    {showArabic ? <span dir="rtl" lang="ar" className="font-arabic text-[0.85em] font-medium tracking-normal">نجيو</span> : null}
  </span>
));
BrandWordmark.displayName = "BrandWordmark";

export { BrandWordmark };
