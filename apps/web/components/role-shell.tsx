import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@njiw/ui/components/badge";
import { BrandWordmark } from "@njiw/ui/components/brand-wordmark";
import { Button } from "@njiw/ui/components/button";
import { Card } from "@njiw/ui/components/card";
import { AppShell, PageContainer } from "@njiw/ui/components/layout";
import { StatusBadge } from "@njiw/ui/components/states";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { LocaleSwitcher } from "./locale-switcher";

export interface RoleNavItem {
  href: string;
  label: string;
  active?: boolean;
}

export interface RoleShellProps {
  locale: AppLocale;
  roleLabel: string;
  title: string;
  description: string;
  previewLabel: string;
  notConnectedLabel: string;
  languageLabel: string;
  backLabel: string;
  navItems: RoleNavItem[];
  children: ReactNode;
}

export function RoleShell({ locale, roleLabel, title, description, previewLabel, notConnectedLabel, languageLabel, backLabel, navItems, children }: RoleShellProps) {
  return (
    <AppShell direction={locale === "ar" ? "rtl" : "ltr"} className="min-h-screen">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground">Skip to content</a>
      <PageContainer className="py-5 sm:py-8">
        <header className="flex min-w-0 items-center justify-between gap-4 border-b border-border pb-5">
          <Link href="/" aria-label={backLabel} className="min-w-0 shrink rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"><BrandWordmark showArabic={locale === "ar"} /></Link>
          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">{roleLabel}</span>
            <LocaleSwitcher locale={locale} label={languageLabel} />
          </div>
        </header>

        <div className="grid gap-8 py-8 lg:grid-cols-[15rem_1fr] lg:py-10">
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="mb-3 lg:hidden">
              <span className="text-sm font-medium text-muted-foreground">{roleLabel}</span>
            </div>
            <nav aria-label={roleLabel} className="grid min-w-0 grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} aria-current={item.active ? "page" : undefined} className={`rounded-lg px-3 py-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring ${item.active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          <main id="main-content" className="w-full min-w-0">
            <div className="mb-8 flex flex-col gap-4 border-b border-border pb-8">
              <StatusBadge status="neutral" className="w-fit">{previewLabel}</StatusBadge>
              <h1 className="max-w-3xl break-words text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl">{title}</h1>
              <p className="max-w-2xl break-words text-base leading-7 text-muted-foreground">{description}</p>
              <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground"><Badge variant="outline" className="min-w-0">{notConnectedLabel}</Badge></div>
            </div>
            {children}
          </main>
        </div>

        <footer className="flex items-center gap-3 border-t border-border pt-5 text-sm text-muted-foreground">
          <Button asChild variant="ghost" size="sm"><Link href="/"><ArrowLeft className="size-4" aria-hidden="true" />{backLabel}</Link></Button>
        </footer>
      </PageContainer>
    </AppShell>
  );
}

export function PreviewNotice({ children }: { children: ReactNode }) {
  return <Card className="border-info/30 bg-info/5 p-4 text-sm leading-6 text-muted-foreground">{children}</Card>;
}
