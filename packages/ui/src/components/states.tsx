import * as React from "react";
import { AlertCircle, CheckCircle2, Info, LoaderCircle } from "lucide-react";
import { cn } from "../lib/utils";

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(({ className, title, description, action, ...props }, ref) => (
  <div ref={ref} className={cn("flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/50 p-6 text-center", className)} {...props}>
    <Info className="mb-3 size-5 text-muted-foreground" aria-hidden="true" />
    <h3 className="break-words font-medium text-foreground">{title}</h3>
    {description ? <p className="mt-1 max-w-md break-words text-sm leading-6 text-muted-foreground">{description}</p> : null}
    {action ? <div className="mt-4">{action}</div> : null}
  </div>
));
EmptyState.displayName = "EmptyState";

const LoadingState = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children = "Loading", ...props }, ref) => (
  <div ref={ref} role="status" aria-live="polite" className={cn("flex min-h-40 items-center justify-center gap-3 rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground", className)} {...props}>
    <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
    <span className="min-w-0 break-words">{children}</span>
  </div>
));
LoadingState.displayName = "LoadingState";

const ErrorState = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn("flex min-h-40 items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-sm text-destructive", className)} {...props}>
    <AlertCircle className="size-5 shrink-0" aria-hidden="true" />
    <span className="min-w-0 break-words">{children}</span>
  </div>
));
ErrorState.displayName = "ErrorState";

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: "neutral" | "success" | "warning" | "error" | "info";
}

const statusClasses: Record<StatusBadgeProps["status"], string> = {
  neutral: "bg-muted text-muted-foreground",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  error: "bg-destructive/15 text-destructive",
  info: "bg-info/15 text-info"
};

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(({ className, status, children, ...props }, ref) => (
  <span ref={ref} className={cn("inline-flex min-h-7 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", statusClasses[status], className)} {...props}>
    {status === "success" ? <CheckCircle2 className="size-3.5" aria-hidden="true" /> : null}
    {status === "error" ? <AlertCircle className="size-3.5" aria-hidden="true" /> : null}
    <span className="min-w-0 break-words">{children}</span>
  </span>
));
StatusBadge.displayName = "StatusBadge";

export { EmptyState, ErrorState, LoadingState, StatusBadge };
