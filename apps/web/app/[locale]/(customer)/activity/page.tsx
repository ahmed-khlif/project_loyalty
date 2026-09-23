import { getTranslations } from "next-intl/server";
import { CustomerSection } from "@/components/role-pages";
import { CustomerFrame } from "@/components/route-shells";
import type { AppLocale } from "@/i18n/routing";

export default async function ActivityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "customer" });
  const states = await getTranslations({ locale, namespace: "states" });
  return <CustomerFrame locale={locale} active="activity" title={t("activityTitle")} description={t("activityBody")}><CustomerSection title={t("activityTitle")} body={t("activityBody")} notice={t("notConnected")} state={{ loading: states("loading"), empty: states("empty"), error: states("error") }} /></CustomerFrame>;
}
