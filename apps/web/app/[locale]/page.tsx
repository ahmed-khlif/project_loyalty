import { ArrowUpRight, Check, Globe2, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@njiw/ui/components/button";
import { BrandWordmark } from "@njiw/ui/components/brand-wordmark";
import { Card, CardContent, CardHeader, CardTitle } from "@njiw/ui/components/card";
import { AppShell, PageContainer } from "@njiw/ui/components/layout";
import { StatusBadge } from "@njiw/ui/components/states";
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
    <AppShell direction={isArabicLocale(locale) ? "rtl" : "ltr"} className="min-h-screen" lang={locale}>
      <PageContainer className="flex min-h-screen flex-col py-6">
        <header className="flex items-center justify-between gap-4">
          <Link className="rounded-md text-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" href="/" aria-label={`${t("footerBrand")} ${nav("home")}`}>
            <BrandWordmark showArabic={isArabicLocale(locale)} />
          </Link>
          <nav aria-label={t("rtl")} className="flex items-center gap-1 rounded-full border border-border bg-card p-1 text-xs">
            {routing.locales.map((key) => (
              <Link key={key} className={`rounded-full px-3 py-2 font-medium ${key === locale ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`} href="/" locale={key} aria-current={key === locale ? "page" : undefined}>
                {key.toUpperCase()}
              </Link>
            ))}
          </nav>
        </header>

        <section className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div className="max-w-2xl">
            <StatusBadge status="info" className="mb-5 rounded-full border border-info/20 bg-info/10 px-3 py-1.5 text-sm">
              {t("eyebrow")}
            </StatusBadge>
            <h1 className="max-w-xl text-5xl font-semibold leading-[0.98] tracking-[-0.07em] text-forest sm:text-7xl">{t("title")}</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">{t("body")}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild>
                <a href="#status">{t("seeStatus")} <ArrowUpRight className="size-4" aria-hidden="true" /></a>
              </Button>
              <Button asChild variant="outline">
                <a href="http://localhost:3001/api/v1/health/live">{t("apiLiveness")}</a>
              </Button>
            </div>
          </div>

          <Card id="status" className="overflow-hidden border-border bg-card shadow-sm">
            <CardHeader className="border-b border-border bg-forest text-white">
              <div className="flex items-center justify-between gap-4">
                <CardTitle className="text-white">{t("statusTitle")}</CardTitle>
                <ShieldCheck className="size-5 text-coffee" aria-hidden="true" />
              </div>
              <p className="text-sm text-white/70">{t("statusSubtitle")}</p>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              {statusRows.map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="flex items-center gap-1.5 text-right text-sm font-medium text-foreground"><Check className="size-4 text-coffee" aria-hidden="true" />{value}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 rounded-lg bg-muted p-3 text-sm text-muted-foreground"><Globe2 className="size-4 text-foreground" aria-hidden="true" />{t("rtl")}</div>
            </CardContent>
          </Card>
        </section>

        <footer className="flex flex-col gap-2 border-t border-border py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>{t("footerBrand")}</span>
          <span>{t("footerNotice")}</span>
        </footer>
      </PageContainer>
    </AppShell>
  );
}
