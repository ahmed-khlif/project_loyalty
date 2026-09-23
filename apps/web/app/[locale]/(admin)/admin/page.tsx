import { getTranslations } from "next-intl/server";
import { OperationsOverview } from "@/components/role-pages";
import { AdminFrame } from "@/components/route-shells";
import type { AppLocale } from "@/i18n/routing";

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "admin" });
  return <AdminFrame locale={locale} active="overview" title={t("title")} description={t("description")}><OperationsOverview notConnected={t("notConnected")} cards={[{ title: t("queue"), body: t("queueBody") }, { title: t("merchants"), body: t("merchantsBody") }, { title: t("support"), body: t("supportBody") }, { title: t("audit"), body: t("auditBody") }]} /></AdminFrame>;
}
