import type { ReactNode } from "react";
import { BrandWordmark } from "@njiw/ui/components/brand-wordmark";
import { AppShell, PageContainer } from "@njiw/ui/components/layout";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { LocaleSwitcher } from "./locale-switcher";

export function MarketingShell({ locale, label, backLabel, languageLabel, children }: { locale: AppLocale; label: string; backLabel: string; languageLabel: string; children: ReactNode }) {
  return <AppShell direction={locale === "ar" ? "rtl" : "ltr"} className="min-h-screen"><PageContainer className="py-5 sm:py-8"><header className="flex items-center justify-between gap-4 border-b border-border pb-5"><Link href="/" aria-label={backLabel} className="rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"><BrandWordmark showArabic={locale === "ar"} /></Link><div className="flex items-center gap-3"><span className="hidden text-sm text-muted-foreground sm:inline">{label}</span><LocaleSwitcher locale={locale} label={languageLabel} /></div></header>{children}<footer className="mt-12 border-t border-border pt-5 text-sm text-muted-foreground">{backLabel}</footer></PageContainer></AppShell>;
}
