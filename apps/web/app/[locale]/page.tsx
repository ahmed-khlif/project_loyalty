import { ArrowUpRight, Check, Globe2, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@njiw/ui/components/button";
import { AppShell, PageContainer } from "@njiw/ui/components/layout";
import { BrandLogo } from "@/components/brand-logo";
import { MembershipPreview } from "@/components/home-preview";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale, isArabicLocale } from "@/i18n/routing";

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "home" });
  const nav = await getTranslations({ locale, namespace: "nav" });

  const statusRows = [
    [t("status.web"), t("status.ready")],
    [t("status.ui"), t("status.ready")],
    [t("status.api"), t("status.available")],
    [t("status.flows"), t("status.notImplemented")]
  ];

  return (
    <AppShell direction={isArabicLocale(locale) ? "rtl" : "ltr"} className="min-h-screen bg-canvas" lang={locale}>
      <div className="bg-forest text-white">
        <PageContainer className="flex min-h-[min(820px,90vh)] flex-col py-5 sm:py-7">
          <div className="flex min-w-0 items-center justify-between gap-4 border-b border-white/10 pb-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/65 sm:text-xs">
            <span className="min-w-0 truncate">{t("announcement")}</span>
            <Link href="/how-it-works" className="flex shrink-0 items-center gap-1.5 text-white transition-colors hover:text-coffee focus-visible:ring-white">
              {t("announcementCta")} <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>

          <header className="flex min-w-0 items-center justify-between gap-4 border-b border-white/10 py-5">
            <Link className="rounded-xl focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-forest" href="/" aria-label={`${t("footerBrand")} ${nav("home")}`}>
              <BrandLogo priority label={t("footerBrand")} />
            </Link>
            <nav className="hidden items-center gap-6 text-sm font-medium text-white/70 md:flex" aria-label={t("navigation")}>
              <Link href="/how-it-works" className="transition-colors hover:text-white">{nav("howItWorks")}</Link>
              <Link href="/membership" className="transition-colors hover:text-white">{nav("membership")}</Link>
              <Link href="/merchant" className="transition-colors hover:text-white">{t("forCafes")}</Link>
            </nav>
            <nav aria-label={t("rtl")} className="flex items-center gap-1 rounded-full border border-white/15 bg-black/10 p-1 text-xs">
              {routing.locales.map((key) => (
                <Link key={key} className={`${key !== locale ? "hidden sm:inline-flex" : "inline-flex"} rounded-full px-3 py-2 font-semibold transition-colors ${key === locale ? "bg-white text-forest" : "text-white/65 hover:bg-white/10 hover:text-white"}`} href="/" locale={key} aria-current={key === locale ? "page" : undefined}>
                  {key.toUpperCase()}
                </Link>
              ))}
            </nav>
          </header>

          <section className="grid min-w-0 grid-cols-1 flex-1 items-center gap-12 py-14 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:py-24">
            <div className="min-w-0 max-w-2xl">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-coffee">{t("eyebrow")}</p>
              <h1 className="max-w-xl text-5xl font-semibold leading-[0.96] tracking-[-0.07em] text-[#f7f6f2] sm:text-7xl lg:text-[5.25rem]">{t("title")}</h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">{t("body")}</p>
              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <Button asChild className="w-full bg-[#f7f6f2] text-forest hover:bg-white sm:w-auto">
                  <Link href="/how-it-works">{t("seeStatus")} <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto">
                  <Link href="/membership">{t("apiLiveness")}</Link>
                </Button>
              </div>
              <div className="mt-10 flex min-w-0 flex-wrap gap-2.5" aria-label={t("pillLabel")}>
                <span className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs text-white/75"><Sparkles className="size-3.5 text-coffee" aria-hidden="true" />{t("pillCustomer")}</span>
                <span className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs text-white/75"><HeartHandshake className="size-3.5 text-coffee" aria-hidden="true" />{t("pillCafes")}</span>
                <span className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs text-white/75"><ShieldCheck className="size-3.5 text-coffee" aria-hidden="true" />{t("pillTrust")}</span>
              </div>
            </div>
            <div className="min-w-0 rounded-[2rem] bg-white/5 p-2 ring-1 ring-white/10 sm:p-3">
              <MembershipPreview label={t("previewLabel")} title={t("previewTitle")} body={t("previewBody")} status={t("previewStatus")} slots={t("previewSlots")} />
            </div>
          </section>

          <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs text-white/50">
            <span>{t("heroNote")}</span>
            <span className="hidden sm:inline">{t("rtl")}</span>
          </div>
        </PageContainer>
      </div>

      <PageContainer className="py-14 sm:py-20">
        <section id="status" className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="max-w-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-coffee">{t("statusSubtitle")}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-foreground">{t("statusTitle")}</h2>
            <p className="mt-4 leading-7 text-muted-foreground">{t("footerNotice")}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {statusRows.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-4 py-4 shadow-sm">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="flex items-center gap-1.5 text-right text-sm font-medium text-foreground"><Check className="size-4 text-coffee" aria-hidden="true" />{value}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 rounded-xl bg-muted p-4 text-sm text-muted-foreground sm:col-span-2"><Globe2 className="size-4 text-foreground" aria-hidden="true" />{t("rtl")}</div>
          </div>
        </section>

        <footer className="mt-14 flex flex-col gap-2 border-t border-border pt-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>{t("footerBrand")}</span>
          <span>{t("footerNotice")}</span>
        </footer>
      </PageContainer>
    </AppShell>
  );
}
