import { getTranslations } from "next-intl/server";
import { StaffOverview } from "@/components/role-pages";
import { StaffFrame } from "@/components/route-shells";
import type { AppLocale } from "@/i18n/routing";

export default async function StaffPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "staff" });
  return <StaffFrame locale={locale} active="overview" title={t("title")} description={t("description")}><StaffOverview notConnected={t("notConnected")} cards={[{ title: t("branch"), body: t("branchUnavailable") }, { title: t("scanner"), body: t("scannerBody") }, { title: t("recent"), body: t("recentBody") }, { title: t("exceptions"), body: t("exceptionsBody") }]} /></StaffFrame>;
}
