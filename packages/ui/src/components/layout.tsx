import * as React from "react";
import { cn } from "../lib/utils";

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: "light" | "dark";
  direction?: "ltr" | "rtl";
}

const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(({ className, theme = "light", direction, ...props }, ref) => (
  <div ref={ref} data-theme={theme} dir={direction} className={cn("min-h-screen bg-background text-foreground", className)} {...props} />
));
AppShell.displayName = "AppShell";

const PageContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12", className)} {...props} />
));
PageContainer.displayName = "PageContainer";

export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(({ className, eyebrow, title, description, actions, ...props }, ref) => (
  <header ref={ref} className={cn("flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between", className)} {...props}>
    <div className="max-w-2xl space-y-2">
      {eyebrow ? <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p> : null}
      <h1 className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">{title}</h1>
      {description ? <p className="max-w-xl text-base leading-7 text-muted-foreground">{description}</p> : null}
    </div>
    {actions ? <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div> : null}
  </header>
));
PageHeader.displayName = "PageHeader";

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(({ className, title, description, action, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-start justify-between gap-4", className)} {...props}>
    <div className="space-y-1">
      <h2 className="text-lg font-semibold tracking-[-0.02em] text-foreground">{title}</h2>
      {description ? <p className="text-sm leading-6 text-muted-foreground">{description}</p> : null}
    </div>
    {action ? <div className="shrink-0">{action}</div> : null}
  </div>
));
SectionHeader.displayName = "SectionHeader";

export { AppShell, PageContainer, PageHeader, SectionHeader };
