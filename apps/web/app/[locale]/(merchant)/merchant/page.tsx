import { getTranslations } from "next-intl/server";
import { OperationsOverview } from "@/components/role-pages";
import { MerchantFrame } from "@/components/route-shells";
import type { AppLocale } from "@/i18n/routing";

export default async function MerchantPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "merchant" });
  return <MerchantFrame locale={locale} active="overview" title={t("title")} description={t("description")}><OperationsOverview notConnected={t("notConnected")} cards={[{ title: t("setup"), body: t("setupBody") }, { title: t("programs"), body: t("programsBody") }, { title: t("activity"), body: t("activityBody") }, { title: t("team"), body: t("teamBody") }, { title: t("billing"), body: t("billingBody") }]} /></MerchantFrame>;
}
