import { ArrowUpRight, Check, Globe2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@njiw/ui/components/button";
import { AppShell, PageContainer } from "@njiw/ui/components/layout";
import { StatusBadge } from "@njiw/ui/components/states";
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
    <AppShell direction={isArabicLocale(locale) ? "rtl" : "ltr"} className="min-h-screen" lang={locale}>
      <PageContainer className="flex min-h-screen flex-col py-6">
        <header className="flex items-center justify-between gap-4">
          <Link className="rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" href="/" aria-label={`${t("footerBrand")} ${nav("home")}`}>
            <BrandLogo priority />
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
                <Link href="/how-it-works">{t("seeStatus")} <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/membership">{t("apiLiveness")}</Link>
              </Button>
            </div>
          </div>
          <MembershipPreview label={t("previewLabel")} title={t("previewTitle")} body={t("previewBody")} status={t("previewStatus")} slots={t("previewSlots")} />
        </section>

        <section id="status" className="grid gap-8 border-t border-border py-12 lg:grid-cols-[0.8fr_1.2fr] lg:py-16">
          <div className="max-w-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-coffee">{t("statusSubtitle")}</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-foreground">{t("statusTitle")}</h2>
            <p className="mt-3 leading-7 text-muted-foreground">{t("footerNotice")}</p>
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

        <footer className="flex flex-col gap-2 border-t border-border py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>{t("footerBrand")}</span>
          <span>{t("footerNotice")}</span>
        </footer>
      </PageContainer>
    </AppShell>
  );
}
