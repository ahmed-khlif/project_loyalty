import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@njiw/ui/components/card";
import { StatusBadge } from "@njiw/ui/components/states";
import { MarketingShell } from "@/components/marketing-shell";
import type { AppLocale } from "@/i18n/routing";

export default async function HowItWorksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "marketing" });
  const common = await getTranslations({ locale, namespace: "common" });
  return <MarketingShell locale={locale} label={t("howEyebrow")} backLabel={common("backHome")} languageLabel={common("language")}><main className="py-12 sm:py-16"><StatusBadge status="info" className="mb-5">{t("howEyebrow")}</StatusBadge><h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-6xl">{t("howTitle")}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{t("howBody")}</p><div className="mt-10 grid gap-5 md:grid-cols-3"><Card><CardHeader><CardTitle>{t("customerTitle")}</CardTitle></CardHeader><CardContent><p className="leading-7 text-muted-foreground">{t("customerBody")}</p></CardContent></Card><Card><CardHeader><CardTitle>{t("cafeTitle")}</CardTitle></CardHeader><CardContent><p className="leading-7 text-muted-foreground">{t("cafeBody")}</p></CardContent></Card><Card><CardHeader><CardTitle>{t("privacyTitle")}</CardTitle></CardHeader><CardContent><p className="leading-7 text-muted-foreground">{t("privacyBody")}</p></CardContent></Card></div></main></MarketingShell>;
}
