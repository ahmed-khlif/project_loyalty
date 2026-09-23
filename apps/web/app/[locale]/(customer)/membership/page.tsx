import { getTranslations } from "next-intl/server";
import { CustomerOverview } from "@/components/role-pages";
import { CustomerFrame } from "@/components/route-shells";
import type { AppLocale } from "@/i18n/routing";

export default async function MembershipPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "customer" });
  return <CustomerFrame locale={locale} active="membership" title={t("title")} description={t("description")}><CustomerOverview href="/membership/credential" strings={{ membership: t("membership"), progress: t("progress"), credential: t("credential"), reward: t("reward"), notConnected: t("notConnected"), progressUnavailable: t("progressUnavailable"), credentialBody: t("credentialBody"), rewardBody: t("rewardBody"), noReward: t("notEnrolledTitle"), progressReserved: t("progressUnavailable"), noCounter: t("progressUnavailable") }} /></CustomerFrame>;
}
