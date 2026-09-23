import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@njiw/ui/components/card";
import { StatusBadge } from "@njiw/ui/components/states";
import { MarketingShell } from "@/components/marketing-shell";
import type { AppLocale } from "@/i18n/routing";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "marketing" });
  const common = await getTranslations({ locale, namespace: "common" });
  return <MarketingShell locale={locale} label={t("contactEyebrow")} backLabel={common("backHome")} languageLabel={common("language")}><main className="max-w-2xl py-12 sm:py-16"><StatusBadge status="neutral" className="mb-5">{t("contactEyebrow")}</StatusBadge><h1 className="text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-6xl">{t("contactTitle")}</h1><p className="mt-6 text-lg leading-8 text-muted-foreground">{t("contactBody")}</p><Card className="mt-8"><CardHeader><CardTitle>{t("contactUnavailable")}</CardTitle></CardHeader><CardContent><p className="leading-7 text-muted-foreground">{t("contactBody")}</p></CardContent></Card></main></MarketingShell>;
}
